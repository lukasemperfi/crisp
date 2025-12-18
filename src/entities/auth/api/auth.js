import { supabase } from "@/shared/api/supabase/client.js";

class Auth {
  onAuthChange(callback) {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(event, session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }
  async login({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }
    return data;
  }

  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    return true;
  }

  async registerUser(data) {
    const {
      email,
      password,
      full_name,
      phone,
      person_type,
      upload_file,
      country,
      region,
      city,
      address,
    } = data;

    const { data: userData, error: signUpError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (signUpError) {
      console.error("Ошибка регистрации в Auth:", signUpError.message);
      throw signUpError;
    }

    const userId = userData.user.id;
    let avatarUrl = null;

    if (upload_file && upload_file.name) {
      const fileExt = upload_file.name.split(".").pop();
      const filePath = `${userId}.${fileExt}`;

      const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, upload_file, {
          cacheControl: "no-cache",
          upsert: true,
        });

      if (uploadErr) {
        console.warn(
          "Предупреждение: Ошибка загрузки аватара, продолжение регистрации:",
          uploadErr.message
        );
      }

      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      avatarUrl = urlData.publicUrl;
    }

    const profileData = {
      id: userId,
      full_name: full_name,
      phone: phone,
      country: country || null,
      region: region || null,
      city: city || null,
      address: address || null,
      person_type: person_type,
      avatar_url: avatarUrl,
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([profileData]);

    if (profileError) {
      console.error("Ошибка вставки в profiles:", profileError.message);
      throw profileError;
    }

    if (person_type === "fop" && data.fop) {
      const fopDetails = {
        profile_id: userId,
        edrpou: data.fop.edrpou,
        country: data.fop.country || null,
        region: data.fop.region || null,
        city: data.fop.city || null,
        address: data.fop.address || null,
      };

      const { error: fopError } = await supabase
        .from("fop_details")
        .insert([fopDetails]);

      if (fopError) {
        console.error("Ошибка вставки в fop_details:", fopError.message);
        throw fopError;
      }
    } else if (person_type === "legal" && data.legal_entity) {
      const legalDetails = {
        profile_id: userId,
        okpo: data.legal_entity.okpo,
        country: data.legal_entity.country || null,
        region: data.legal_entity.region || null,
        city: data.legal_entity.city || null,
        address: data.legal_entity.address || null,
        postal_code: data.legal_entity.postal_code || null,
      };

      const { error: legalError } = await supabase
        .from("legal_entity_details")
        .insert([legalDetails]);

      if (legalError) {
        console.error(
          "Ошибка вставки в legal_entity_details:",
          legalError.message
        );
        throw legalError;
      }
    }

    return userData;
  }
}

export const authApi = new Auth();
