const mode = import.meta.env.MODE;
export const baseUrl =
  mode === "production" ? "/crisp/" : import.meta.env.BASE_URL;
