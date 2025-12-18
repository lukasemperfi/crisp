import JustValidate from "just-validate";
import {
  EMAIL_RULE,
  REQUIRED_RULE,
  PASSWORD_RULE,
} from "@/shared/lib/just-validate/rules";

export const PASSWORD_RESET_FORM_SELECTORS = {
  FORM: "#password-reset-form",
  NEW_PASSWORD: "#password-reset-form__new-password",
  CONFIRM_NEW_PASSWORD: "#password-reset-form__confirm-new-password",
};

const CONFIRM_PASSWORD_RULE = {
  validator: (value, fields) => {
    if (
      fields[PASSWORD_RESET_FORM_SELECTORS.NEW_PASSWORD] &&
      fields[PASSWORD_RESET_FORM_SELECTORS.NEW_PASSWORD].elem
    ) {
      const repeatPasswordValue =
        fields[PASSWORD_RESET_FORM_SELECTORS.NEW_PASSWORD].elem.value;

      return value === repeatPasswordValue;
    }

    return true;
  },
  errorMessage: "Пароли должны быть одинаковыми",
};

export function initResetPasswordFormValidation() {
  const validatorConfig = {
    errorFieldCssClass: "form-field__input_error",
    errorLabelCssClass: "form-field__error",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
    errorFieldStyle: {},
    errorLabelStyle: {},
  };

  const validator = new JustValidate(
    PASSWORD_RESET_FORM_SELECTORS.FORM,
    validatorConfig
  );

  validator.addField(PASSWORD_RESET_FORM_SELECTORS.NEW_PASSWORD, [
    REQUIRED_RULE,
    PASSWORD_RULE,
  ]);

  validator.addField(PASSWORD_RESET_FORM_SELECTORS.CONFIRM_NEW_PASSWORD, [
    REQUIRED_RULE,
    CONFIRM_PASSWORD_RULE,
  ]);

  return validator;
}
