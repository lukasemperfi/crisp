import JustValidate from "just-validate";
import { REQUIRED_RULE } from "@/shared/lib/just-validate/rules";
import { PASSWORD_RULE } from "@/shared/lib/just-validate/rules";

export const PASSWORD_FORM_SELECTORS = {
  FORM: "#password-form",
  CURRENT_PASSWORD: "#password-current_password",
  PASSWORD: "#password-new_password",
  CONFIRM_PASSWORD: "#password-confirm_password",
};

///////////////////////////////////////////////////

const CONFIRM_PASSWORD_RULE = {
  validator: (value, fields) => {
    if (
      fields[PASSWORD_FORM_SELECTORS.PASSWORD] &&
      fields[PASSWORD_FORM_SELECTORS.PASSWORD].elem
    ) {
      const repeatPasswordValue =
        fields[PASSWORD_FORM_SELECTORS.PASSWORD].elem.value;

      return value === repeatPasswordValue;
    }

    return true;
  },
  errorMessage: "Пароли должны быть одинаковыми",
};

const COMMON_RULES = {
  [PASSWORD_FORM_SELECTORS.CURRENT_PASSWORD]: [REQUIRED_RULE, PASSWORD_RULE],
  [PASSWORD_FORM_SELECTORS.PASSWORD]: [REQUIRED_RULE, PASSWORD_RULE],
  [PASSWORD_FORM_SELECTORS.CONFIRM_PASSWORD]: [
    REQUIRED_RULE,
    CONFIRM_PASSWORD_RULE,
  ],
};

export function initPasswordFormValidation() {
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
    PASSWORD_FORM_SELECTORS.FORM,
    validatorConfig
  );

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  return validator;
}
