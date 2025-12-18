import JustValidate from "just-validate";
import {
  EMAIL_RULE,
  REQUIRED_RULE,
  PASSWORD_RULE,
} from "@/shared/lib/just-validate/rules";

export const LOGIN_FORM_SELECTORS = {
  FORM: "#login-form",
  EMAIL: "#login-email",
  PASSWORD: "#login-password",
};

export function initLoginFormValidation() {
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
    LOGIN_FORM_SELECTORS.FORM,
    validatorConfig
  );

  validator
    .addField(LOGIN_FORM_SELECTORS.EMAIL, [REQUIRED_RULE, EMAIL_RULE])
    .addField(LOGIN_FORM_SELECTORS.PASSWORD, [REQUIRED_RULE, PASSWORD_RULE]);

  return validator;
}
