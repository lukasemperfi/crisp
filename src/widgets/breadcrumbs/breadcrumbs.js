const breadcrumbNames = {
  cart: "Shopping Cart",
  registration: "Create New Customer Account",
};

export const initBreadcrumbs = (containerSelector, breadcrumbClass = "") => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }

  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  const mode = import.meta.env.MODE;
  let basePath = mode === "production" ? "/crisp/" : import.meta.env.BASE_URL;
  const normalizedBasePath = basePath.endsWith("/") ? basePath : basePath + "/";

  if (parts.length > 0 && parts[0] === normalizedBasePath.replace(/\//g, "")) {
    parts.shift();
  }

  const separator = `<span class= "breadcrumbs__separator">/</span>`;
  let accumulatedPath = "";

  const createBreadcrumbItem = (part, isLast) => {
    accumulatedPath += part + "/";

    const fullHref = normalizedBasePath + accumulatedPath;

    const name =
      breadcrumbNames[part] || decodeURIComponent(part.replace(/-/g, " "));

    if (isLast) {
      return `<li class="breadcrumbs__item"> ${separator} <span class="breadcrumbs__link breadcrumbs__link_current">${name}</span></li>`;
    } else {
      return `<li class="breadcrumbs__item"> ${separator} <a class="breadcrumbs__link" href="${fullHref}" name="${name}" aria-label="${name}">${name}</a></li>`;
    }
  };

  const html = `
        <ul class="breadcrumbs ${breadcrumbClass}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${basePath}" name="breadcrumb-link" aria-label="Home">Home</a></li>
          ${parts
            .map((part, index) =>
              createBreadcrumbItem(part, index === parts.length - 1),
            )
            .join("")}
        </ul>
      `;

  container.innerHTML = html;
};
