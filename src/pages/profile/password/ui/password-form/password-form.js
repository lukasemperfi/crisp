import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import {
  PASSWORD_FORM_SELECTORS,
  initPasswordFormValidation,
} from "./validation";

export const initPasswordForm = () => {
  initPasswordFormValidation().onSuccess(async (event) => {
    event.preventDefault();

    const form = document.querySelector(PASSWORD_FORM_SELECTORS.FORM);
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const overlay = createOverlaySpinner({
      successText: "Данные изменены успешно!",
    });

    try {
      overlay.success();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      overlay.hide();
    }
  });
};
