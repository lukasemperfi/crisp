export function showToast(message, type = "info", duration = 3000) {
  const container = document.getElementById("toast-container");

  if (!container) {
    console.error("Контейнер #toast-container не найден.");
    return;
  }

  const toast = document.createElement("div");
  toast.className = `toast-notification ${type}`;
  toast.textContent = message;

  let timerId;

  const hideAndRemoveToast = () => {
    if (!toast.classList.contains("show")) {
      return;
    }

    toast.classList.remove("show");

    toast.addEventListener("transitionend", function handler() {
      if (!toast.classList.contains("show")) {
        toast.remove();
      }
      toast.removeEventListener("transitionend", handler);
    });
  };

  container.prepend(toast);

  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  timerId = setTimeout(() => {
    hideAndRemoveToast();
  }, duration);

  toast.addEventListener("click", () => {
    clearTimeout(timerId);

    hideAndRemoveToast();
  });
}
