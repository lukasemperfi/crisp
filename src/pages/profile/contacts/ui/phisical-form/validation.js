import JustValidate from "just-validate";
import {
  EMAIL_RULE,
  FILE_RULE,
  FULL_NAME_RULE,
  PHONE_RULE,
  REQUIRED_RULE,
} from "@/shared/lib/just-validate/rules";

export const PROFILE_CONTACTS_FORM_SELECTORS = {
  FORM: "#profile-contacts-form",
  FULL_NAME: "#profile-contacts-full-name",
  EMAIL: "#profile-contacts-email",
  PHONE: "#profile-contacts-phone",
  FILE: "#profile-contacts__avatar-file",
};

///////////////////////////////////////////////////

const COMMON_RULES = {
  [PROFILE_CONTACTS_FORM_SELECTORS.FULL_NAME]: [REQUIRED_RULE, FULL_NAME_RULE],
  [PROFILE_CONTACTS_FORM_SELECTORS.EMAIL]: [REQUIRED_RULE, EMAIL_RULE],
  [PROFILE_CONTACTS_FORM_SELECTORS.PHONE]: [REQUIRED_RULE, PHONE_RULE],
  [PROFILE_CONTACTS_FORM_SELECTORS.FILE]: [...FILE_RULE],
};

export function initProfileContactsFormValidation() {
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
    PROFILE_CONTACTS_FORM_SELECTORS.FORM,
    validatorConfig
  );

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  return validator;
}
