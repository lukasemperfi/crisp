import { supabase } from "@/shared/api/supabase/client.js";

class UserProfile {
  async getProfile() {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      if (userError) throw userError;
      return null;
    }

    const userId = user.id;

    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      if (error) {
        console.error("Ошибка Supabase при получении профиля:", error);
        throw error;
      }

      return profile;
    } catch (e) {
      console.error("Ошибка в UserProfile.getProfile:", e);
      throw e;
    }
  }

  async updateProfile(newData) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Необходимо авторизоваться для обновления профиля.");
    }

    const userId = user.id;
    const profilePayload = getProfilePayload(newData);

    const finalData = {
      ...profilePayload,
    };

    if (Object.keys(finalData).length > 0) {
      try {
        const { error } = await supabase
          .from("profiles")
          .update(finalData)
          .eq("id", userId);

        if (error) throw error;
      } catch (e) {
        console.error("Ошибка при обновлении таблицы 'profiles':", e);
        throw new Error("Не удалось обновить данные профиля.");
      }
    }

    return true;
  }
}

export const userProfileApi = new UserProfile();

const getProfilePayload = (data) => {
  const allowedKeys = [
    "first_name",
    "last_name",
    "is_subscribed_for_newsletter",
    "company",
    "fax",
    "street_address",
    "country",
    "state",
    "postal_code",
    "phone_number",
  ];

  return Object.keys(data).reduce((acc, key) => {
    if (allowedKeys.includes(key) && data[key] !== undefined) {
      acc[key] = data[key];
    }
    return acc;
  }, {});
};
