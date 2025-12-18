import { loginUser } from "@/entities/auth/model/auth-slice";
import {
  LOGIN_FORM_SELECTORS,
  initLoginFormValidation,
} from "../model/validation/login";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { store } from "@/app/store";
import { AUTH_STATUS } from "@/entities/auth/model/auth-slice";
import { redirect } from "@/shared/helpers/redirect";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;

export const initLoginForm = () => {
  const overlay = createOverlaySpinner({
    successText: "Вы успешно вошли в систему!",
  });
  const validator = initLoginFormValidation();

  validator.onSuccess(async (event) => {
    event.preventDefault();

    const form = document.querySelector(LOGIN_FORM_SELECTORS.FORM);
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());

    await loginUser(email, password);
  });

  store.subscribe("auth", async (newState) => {
    if (newState.status === AUTH_STATUS.LOADING) {
      overlay.show();
    }
    if (newState.status === AUTH_STATUS.SUCCEEDED) {
      overlay.success();
      redirect(baseUrl, 2000);
      //TODO: clearForm
    }
    if (newState.status === AUTH_STATUS.FAILED) {
      validator.showErrors({
        [LOGIN_FORM_SELECTORS.EMAIL]: "",
      });
      validator.showErrors({
        [LOGIN_FORM_SELECTORS.PASSWORD]: "Неверный пароль или email",
      });
      overlay.hide();
    }
  });
};
