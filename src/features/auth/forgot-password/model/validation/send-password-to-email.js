import JustValidate from "just-validate";
import {
  EMAIL_RULE,
  REQUIRED_RULE,
  PASSWORD_RULE,
} from "@/shared/lib/just-validate/rules";

export const SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS = {
  FORM: "#send-password-to-email-form",
  EMAIL: "#send-password-to-email-form__email",
};

export function initSendPasswordToEmailFormValidation() {
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
    SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS.FORM,
    validatorConfig
  );

  validator.addField(SEND_PASSWORD_TO_EMAIL_FORM_SELECTORS.EMAIL, [
    REQUIRED_RULE,
    EMAIL_RULE,
  ]);

  return validator;
}
