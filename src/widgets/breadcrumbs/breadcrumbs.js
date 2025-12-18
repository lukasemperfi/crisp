const breadcrumbNames = {
  catalog: "Магазин",
  product: "Карточка товара",
  production: "О производстве",
  "payment-delivery": "Оплата и доставка",
  gallery: "Галерея",
  "corporate-customers": "Оптовым и корпоративным клиентам",
  news: "Новости и статьи",
  contacts: "Контакты",
  "one-news": "Новости и статьи",
  login: "Вход",
  "forgot-password": "Восстановление пароля",
  registration: "Регистрация",
  checkout: "Оформление заказа",
  profile: "Личный кабинет",
  orders: "История заказов",
  order: "Заказ",
};

export const initBreadcrumbs = (containerSelector, breadcrumbClass = "") => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }

  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  const mode = import.meta.env.MODE;
  let basePath = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;
  const normalizedBasePath = basePath.endsWith("/") ? basePath : basePath + "/";

  if (parts.length > 0 && parts[0] === normalizedBasePath.replace(/\//g, "")) {
    parts.shift();
  }

  const arrowSvg = `
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `;

  let accumulatedPath = "";

  const createBreadcrumbItem = (part, isLast) => {
    accumulatedPath += part + "/";

    const fullHref = normalizedBasePath + accumulatedPath;

    const name =
      breadcrumbNames[part] || decodeURIComponent(part.replace(/-/g, " "));

    if (isLast) {
      return `<li class="breadcrumbs__item">${arrowSvg}<span class="breadcrumbs__link breadcrumbs__link_current">${name}</span></li>`;
    } else {
      return `<li class="breadcrumbs__item">${arrowSvg}<a class="breadcrumbs__link" href="${fullHref}" name="${name}" aria-label="${name}">${name}</a></li>`;
    }
  };

  const html = `
        <ul class="breadcrumbs ${breadcrumbClass}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${basePath}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${parts
            .map((part, index) =>
              createBreadcrumbItem(part, index === parts.length - 1)
            )
            .join("")}
        </ul>
      `;

  container.innerHTML = html;
};
