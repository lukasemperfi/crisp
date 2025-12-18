import JustValidate from "just-validate";
import { REQUIRED_RULE } from "@/shared/lib/just-validate/rules";

export const LEGAL_ADDRESS_FORM_SELECTORS = {
  FORM: "#legal-address-form",
  COUNTRY: "#legal-address-country",
  REGION: "#legal-address-region",
  CITY: "#legal-address-city",
  ADDRESS: "#legal-address-address",
  LEGAL_OKPO: "#legal-entity-address-okpo",
  LEGAL_COUNTRY: "#legal-entity-address-country",
  LEGAL_REGION: "#legal-entity-address-region",
  LEGAL_CITY: "#legal-entity-address-city",
};

///////////////////////////////////////////////////

const COMMON_RULES = {
  [LEGAL_ADDRESS_FORM_SELECTORS.COUNTRY]: [REQUIRED_RULE],
  [LEGAL_ADDRESS_FORM_SELECTORS.REGION]: [REQUIRED_RULE],
  [LEGAL_ADDRESS_FORM_SELECTORS.CITY]: [REQUIRED_RULE],
  [LEGAL_ADDRESS_FORM_SELECTORS.LEGAL_COUNTRY]: [REQUIRED_RULE],
  [LEGAL_ADDRESS_FORM_SELECTORS.LEGAL_REGION]: [REQUIRED_RULE],
  [LEGAL_ADDRESS_FORM_SELECTORS.LEGAL_CITY]: [REQUIRED_RULE],
  [LEGAL_ADDRESS_FORM_SELECTORS.LEGAL_OKPO]: [REQUIRED_RULE],
};

export function initLegalAddressFormValidation() {
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
    LEGAL_ADDRESS_FORM_SELECTORS.FORM,
    validatorConfig
  );

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  return validator;
}
