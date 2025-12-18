export const REQUIRED_RULE = {
  rule: "required",
  errorMessage: "Поле обязательно для заполнения",
};

export const EMAIL_RULE = {
  rule: "email",
  errorMessage: "Введите корректный email",
};

export const FULL_NAME_RULE = {
  rule: "customRegexp",
  value:
    /^[\p{L}\p{M}]+(?:-[\p{L}\p{M}]+)?\s+[\p{L}\p{M}]+(?:-[\p{L}\p{M}]+)?(?:\s+[\p{L}\p{M}]+(?:-[\p{L}\p{M}]+)?)?$/u,
  errorMessage: "Введите корректное ФИО",
};
export const PHONE_RULE = {
  rule: "customRegexp",
  value: /^(?:\+380\d{9}|0\d{9})$/,
  errorMessage: "Введите корректный номер (+380501234567, 0501234567)",
};

export const PASSWORD_RULE = {
  rule: "password",
  errorMessage: "Минимум восемь символов, одна буква и одна цифра",
};

export const CONFIRM_PASSWORD_RULE = {
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

export const AGREE_RULE = {
  ...REQUIRED_RULE,
  errorMessage: "Подтвердите согласие",
};

export const FILE_RULE = [
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
