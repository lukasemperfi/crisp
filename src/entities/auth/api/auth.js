import { supabase } from "@/shared/api/supabase/client.js";

class Auth {
  onAuthChange(callback) {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        callback(event, session);
      },
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
      first_name,
      last_name,
      is_subscribed_for_newsletter,
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
    const profileData = {
      id: userId,
      first_name: first_name,
      last_name: last_name,
      is_subscribed_for_newsletter: is_subscribed_for_newsletter || false,
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .insert([profileData]);

    if (profileError) {
      console.error("Ошибка вставки в profiles:", profileError.message);
      throw profileError;
    }

    return userData;
  }
}

export const authApi = new Auth();
