const breadcrumbNames = {
  cart: "Shopping Cart",
  registration: "Create New Customer Account",
  "account/dashboard": "MyDashboard",
};

export const initBreadcrumbs = (containerSelector, breadcrumbClass = "") => {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  const mode = import.meta.env.MODE;
  let basePath = mode === "production" ? "/crisp/" : import.meta.env.BASE_URL;
  const normalizedBasePath = basePath.endsWith("/") ? basePath : basePath + "/";

  const baseNoSlash = normalizedBasePath.replace(/\//g, "");
  if (parts.length > 0 && parts[0] === baseNoSlash) {
    parts.shift();
  }

  const separator = `<span class="breadcrumbs__separator">/</span>`;
  let accumulatedPath = "";

  const html = `
    <ul class="breadcrumbs ${breadcrumbClass}">
      <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${basePath}" name="breadcrumb-link" aria-label="Home">Home</a></li>
      ${parts
        .map((part, index) => {
          accumulatedPath += (index === 0 ? "" : "/") + part;

          if (part === "account" && parts[index + 1] === "dashboard") {
            return "";
          }

          const name =
            breadcrumbNames[accumulatedPath] ||
            breadcrumbNames[part] ||
            decodeURIComponent(part.replace(/-/g, " "));

          const fullHref = normalizedBasePath + accumulatedPath + "/";
          const isLast = index === parts.length - 1;

          if (isLast) {
            return `<li class="breadcrumbs__item"> ${separator} <span class="breadcrumbs__link breadcrumbs__link_current">${name}</span></li>`;
          } else {
            return `<li class="breadcrumbs__item"> ${separator} <a class="breadcrumbs__link" href="${fullHref}" name="${name}" aria-label="${name}">${name}</a></li>`;
          }
        })
        .join("")}
    </ul>
  `;

  container.innerHTML = html;
};
