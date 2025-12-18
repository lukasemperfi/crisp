import { baseUrl } from "../../helpers/base-url";
import { CopyButton } from "./copy-button";

export function createTableActionCell(rowData) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("table-action-cell");

  const detailsLink = renderDetailsLink(rowData);
  const copyButton = new CopyButton(rowData).element;

  wrapper.appendChild(detailsLink);
  wrapper.appendChild(copyButton);

  return wrapper;
}

export function renderDetailsLink(rowData) {
  const orderId = rowData.id;
  const url = `${baseUrl}profile/order/?orderId=${orderId}`;

  const iconHtml = `
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.8475 12.4669C23.6331 12.7602 18.5245 19.6484 11.9999 19.6484C5.47529 19.6484 0.36647 12.7602 0.152297 12.4672C-0.0507657 12.1889 -0.0507657 11.8115 0.152297 11.5333C0.36647 11.24 5.47529 4.35174 11.9999 4.35174C18.5245 4.35174 23.6331 11.24 23.8475 11.533C24.0508 11.8113 24.0508 12.1889 23.8475 12.4669ZM11.9999 5.93415C7.19383 5.93415 3.03127 10.506 1.79907 12.0006C3.02968 13.4966 7.18352 18.066 11.9999 18.066C16.8057 18.066 20.968 13.495 22.2007 11.9995C20.9701 10.5037 16.8163 5.93415 11.9999 5.93415Z"
            fill="#8A8A8A"
          />
          <path
            d="M11.9992 16.748C9.38163 16.748 7.25195 14.6184 7.25195 12.0008C7.25195 9.38317 9.38163 7.25349 11.9992 7.25349C14.6168 7.25349 16.7465 9.38317 16.7465 12.0008C16.7465 14.6184 14.6168 16.748 11.9992 16.748ZM11.9992 8.83595C10.2541 8.83595 8.83441 10.2557 8.83441 12.0008C8.83441 13.7459 10.2541 15.1656 11.9992 15.1656C13.7443 15.1656 15.164 13.7459 15.164 12.0008C15.164 10.2557 13.7444 8.83595 11.9992 8.83595Z"
            fill="#8A8A8A"
          />
        </svg>
      `;

  return createLinkIcon(url, iconHtml);
}

export function createLinkIcon(href, iconSvg) {
  const link = document.createElement("a");
  link.href = href;
  link.classList.add("view-link");
  link.setAttribute(
    "aria-label",
    `Перейти к деталям заказа №${href.split("/").pop()}`
  );
  link.innerHTML = iconSvg;

  const popup = document.createElement("div");
  popup.classList.add("view-link__popup");

  popup.innerHTML = `Просмотреть заказ`;

  link.appendChild(popup);

  return link;
}
