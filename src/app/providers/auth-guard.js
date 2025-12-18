import { baseUrl } from "@/shared/helpers/base-url";
import { supabase } from "@/shared/api/supabase/client";

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

export async function requireAuth(redirectPath = baseUrl) {
  const session = await getSession();

  if (!session) {
    window.location.href = redirectPath;
    return;
  }

  const privateContent = document.querySelector("#private-content");

  privateContent.removeAttribute("id");
}

export async function requireGuest(redirectPath = baseUrl) {
  const session = await getSession();

  if (session) {
    window.location.href = redirectPath;
    return;
  }

  const privateContent = document.querySelector("#private-content");

  privateContent.removeAttribute("id");
}
