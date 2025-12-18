import JustValidate from "just-validate";

export const REG_FORM_SELECTORS = {
  FORM: "#registration-form",

  // Common Fields
  FULL_NAME: "#registration-full-name",
  EMAIL: "#registration-email",
  PHONE: "#registration-phone",
  COUNTRY: "#registration-country",
  REGION: "#registration-region",
  CITY: "#registration-city",
  PASSWORD: "#registration-password",
  CONFIRM_PASSWORD: "#registration-confirm-password",
  AGREE: "#registration-agree",
  FILE: "#registration__avatar-file",

  //  FOP Fields
  FOP_EDRPOU: "#registration-fop-edrpou",
  FOP_COUNTRY: "#registration-fop-country",
  FOP_REGION: "#registration-fop-region",
  FOP_CITY: "#registration-fop-city",

  // Legal Entity Field
  LEGAL_OKPO: "#registration-legal-entity-okpo",
  LEGAL_COUNTRY: "#registration-legal-entity-country",
  LEGAL_REGION: "#registration-legal-entity-region",
  LEGAL_CITY: "#registration-legal-entity-city",
};

////RULES/////
const REQUIRED_RULE = {
  rule: "required",
  errorMessage: "Поле обязательно для заполнения",
};

const FULL_NAME_RULE = {
  rule: "customRegexp",
  value:
    /^[А-ЯЁІЇЄҐа-яёіїєґ]+(?:-[А-ЯЁІЇЄҐа-яёіїєґ]+)?\s+[А-ЯЁІЇЄҐа-яёіїєґ]+(?:-[А-ЯЁІЇЄҐа-яёіїєґ]+)?(?:\s+[А-ЯЁІЇЄҐа-яёіїєґ]+(?:-[А-ЯЁІЇЄҐа-яёіїєґ]+)?)?$/,
  errorMessage: "Введите корректное ФИО",
};
const EMAIL_RULE = { rule: "email", errorMessage: "Введите корректный email" };
const PHONE_RULE = {
  rule: "customRegexp",
  value: /^(?:\+380\d{9}|0\d{9})$/,
  errorMessage: "Введите корректный номер (+380501234567, 0501234567)",
};

const PASSWORD_RULE = {
  rule: "password",
  errorMessage: "Минимум восемь символов, одна буква и одна цифра",
};

const CONFIRM_PASSWORD_RULE = {
  validator: (value, fields) => {
    if (
      fields[REG_FORM_SELECTORS.PASSWORD] &&
      fields[REG_FORM_SELECTORS.PASSWORD].elem
    ) {
      const repeatPasswordValue =
        fields[REG_FORM_SELECTORS.PASSWORD].elem.value;

      return value === repeatPasswordValue;
    }

    return true;
  },
  errorMessage: "Пароли должны быть одинаковыми",
};

const AGREE_RULE = {
  ...REQUIRED_RULE,
  errorMessage: "Подтвердите согласие",
};

const FILE_RULE = [
  {
    rule: "files",
    value: {
      files: {
        extensions: ["jpeg", "jpg", "png"],
        types: ["image/jpeg", "image/jpg", "image/png"],
      },
    },
    errorMessage: "Неверный формат (JPG, PNG)",
  },
  {
    rule: "files",
    value: {
      files: {
        maxSize: 2000000,
      },
    },
    errorMessage: "Макс 2MB",
  },
];

const OKPO_CODE_RULE = [
  {
    rule: "minNumber",
    value: 8,
  },
  {
    rule: "maxNumber",
    value: 8,
  },
];

///////////////////////////////////////////////////

const COMMON_RULES = {
  [REG_FORM_SELECTORS.FULL_NAME]: [REQUIRED_RULE, FULL_NAME_RULE],
  [REG_FORM_SELECTORS.EMAIL]: [REQUIRED_RULE, EMAIL_RULE],
  [REG_FORM_SELECTORS.PHONE]: [REQUIRED_RULE, PHONE_RULE],
  [REG_FORM_SELECTORS.COUNTRY]: [REQUIRED_RULE],
  [REG_FORM_SELECTORS.REGION]: [REQUIRED_RULE],
  [REG_FORM_SELECTORS.CITY]: [REQUIRED_RULE],
  [REG_FORM_SELECTORS.PASSWORD]: [REQUIRED_RULE, PASSWORD_RULE],
  [REG_FORM_SELECTORS.CONFIRM_PASSWORD]: [REQUIRED_RULE, CONFIRM_PASSWORD_RULE],
  [REG_FORM_SELECTORS.AGREE]: [AGREE_RULE],
  [REG_FORM_SELECTORS.FILE]: [...FILE_RULE],
};

export function initRegistrationFormValidation() {
  const validatorConfig = {
    errorFieldCssClass: "form-field__input_error",
    errorLabelCssClass: "form-field__error",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
    errorFieldStyle: {},
    errorLabelStyle: {},
  };

  const validator = new JustValidate(REG_FORM_SELECTORS.FORM, validatorConfig);

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  return validator;
}
