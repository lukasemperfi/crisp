import JustValidate from "just-validate";
import { REQUIRED_RULE } from "@/shared/lib/just-validate/rules";

export const ADDRESS_FORM_SELECTORS = {
  FORM: "#address-form",
  COUNTRY: "#address-country",
  REGION: "#address-region",
  CITY: "#address-city",
  ADDRESS: "#address-address",
};

///////////////////////////////////////////////////

const COMMON_RULES = {
  [ADDRESS_FORM_SELECTORS.COUNTRY]: [REQUIRED_RULE],
  [ADDRESS_FORM_SELECTORS.REGION]: [REQUIRED_RULE],
  [ADDRESS_FORM_SELECTORS.CITY]: [REQUIRED_RULE],
};

export function initAddressFormValidation() {
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
    ADDRESS_FORM_SELECTORS.FORM,
    validatorConfig
  );

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  return validator;
}
