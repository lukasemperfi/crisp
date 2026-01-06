export const formatPrice = (value, locale = "ru-RU") => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};
