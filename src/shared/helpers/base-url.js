const mode = import.meta.env.MODE;
export const baseUrl =
  mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;
