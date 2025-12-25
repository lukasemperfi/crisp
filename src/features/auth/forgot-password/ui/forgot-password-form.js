import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { redirect } from "@/shared/helpers/redirect";
import {
  SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS,
  initSendPasswordToEmailFormValidation,
} from "../model/validation/send-password-to-email";
import {
  PASSWORD_RESET_FORM_SELECTORS,
  initResetPasswordFormValidation,
} from "../model/validation/password-reset-form";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/crisp/" : import.meta.env.BASE_URL;

export const initForgotPasswordForm = () => {
  const overlay = createOverlaySpinner({ successText: "Пароль изменен!" });
  const sendPasswordValidator = initSendPasswordToEmailFormValidation();
  const resetPasswordValidator = initResetPasswordFormValidation();

  sendPasswordValidator.onSuccess(onSendPasswordToEmailFormSuccess);
  resetPasswordValidator.onSuccess(onResetPasswordFormSuccess);

  async function onSendPasswordToEmailFormSuccess(event) {
    event.preventDefault();

    const form = document.querySelector(
      SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS.FORM
    );
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    overlay.show();

    const isEmailConfirmed = await getRandomBooleanWithDelay(2000);

    if (isEmailConfirmed) {
      overlay.hide();
      hideSendPasswordToEmailForm();
      showPasswordResetForm();
    } else {
      overlay.hide();
      sendPasswordValidator.showErrors({
        [SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS.EMAIL]: "Неверный email",
      });
    }
  }

  async function onResetPasswordFormSuccess(event) {
    event.preventDefault();

    const form = document.querySelector(PASSWORD_RESET_FORM_SELECTORS.FORM);
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    overlay.show();

    const isEmailConfirmed = await getRandomBooleanWithDelay(2000);

    if (isEmailConfirmed) {
      overlay.hide();
      overlay.success();
      redirect(`${baseUrl}login/`, 2000);
    } else {
      overlay.hide();
      resetPasswordValidator.showErrors({
        [PASSWORD_RESET_FORM_SELECTORS.NEW_PASSWORD]:
          "Новый пароль должен отличаться от старого",
      });
    }
  }
};

///////////////////////////////////////////////////////

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getRandomBooleanWithDelay(delayInMs) {
  await delay(delayInMs);

  return Math.random() < 0.5;
}

////////////////////////////////////////////////////////

function hideSendPasswordToEmailForm() {
  const form = document.querySelector(
    SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS.FORM
  );
  form.style.display = "none";
}

function showPasswordResetForm() {
  const form = document.querySelector(PASSWORD_RESET_FORM_SELECTORS.FORM);
  form.style.display = "block";
}
