export function redirect(url, delay = 0, replace = false) {
  if (typeof url !== "string" || !url.trim()) {
    throw new Error("URL must be a non-empty string");
  }

  setTimeout(() => {
    if (replace) {
      window.location.replace(url);
    } else {
      window.location.href = url;
    }
  }, delay);
}
