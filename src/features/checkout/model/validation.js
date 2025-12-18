import JustValidate from "just-validate";
import {
  FULL_NAME_RULE,
  REQUIRED_RULE,
  EMAIL_RULE,
  PHONE_RULE,
} from "@/shared/lib/just-validate/rules";

export const CHECKOUT_FORM_SELECTORS = {
  FORM: "#checkout-form",

  // Common Fields
  FULL_NAME: "#checkout-form-full-name",
  EMAIL: "#checkout-form-email",
  PHONE: "#checkout-form-phone",

  //Nova Poshta
  COUNTRY: "#checkout-form-country",
  REGION: "#checkout-form-region",
  CITY: "#checkout-form-city",

  // courier
  ADDRESS: "#checkout-form-address",
};

///////////////////////////////////////////////////

const COMMON_RULES = {
  [CHECKOUT_FORM_SELECTORS.FULL_NAME]: [REQUIRED_RULE, FULL_NAME_RULE],
  [CHECKOUT_FORM_SELECTORS.EMAIL]: [REQUIRED_RULE, EMAIL_RULE],
  [CHECKOUT_FORM_SELECTORS.PHONE]: [REQUIRED_RULE, PHONE_RULE],
};

export function initCheckoutFormValidation() {
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
    CHECKOUT_FORM_SELECTORS.FORM,
    validatorConfig
  );

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  return validator;
}
