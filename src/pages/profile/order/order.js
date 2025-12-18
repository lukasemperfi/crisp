import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initProfilePageBreadcrumbs } from "@//pages/profile/sections/breadcrumbs/breadcrumbs";

import { ordersApi } from "@/entities/order/api/order";
import { createFormattedCurrencyElement } from "@/shared/ui/table/helpers";
import { createTableActionCell } from "../../../shared/ui/table/action-cell";
import { QuantityComponent } from "../../../shared/ui/table/quantity";
import { baseUrl } from "../../../shared/helpers/base-url";
import { mapProductsToTableRows } from "../../../features/cart/ui/map-products-to-table-rows";
import { OrderTable } from "./order-table";
import { requireAuth } from "../../../app/providers/auth-guard";

const orderColumns = [
  {
    key: "productName",
    label: "Товар",
    type: "text",
    width: "1fr",
    align: "left",
  },

  {
    key: "quantity",
    label: "Кол-во",
    type: "component",
    render: (rowData) => {
      const quantityComp = new QuantityComponent(rowData.quantity, rowData.id);

      return quantityComp.element;
    },
    width: "1fr",
  },
  {
    key: "price",
    label: "Цена за товар",
    type: "currency",
    width: "1fr",
    render: (rowData) => {
      return createFormattedCurrencyElement(rowData.price, "грн.");
    },
  },
  {
    key: "total",
    label: "Итоговая стоимость",
    type: "currency",
    width: "1fr",
    render: (rowData) => {
      return createFormattedCurrencyElement(rowData.total, "грн.");
    },
  },
];

document.addEventListener("DOMContentLoaded", async () => {
  await requireAuth();

  const orderTableContainer = document.querySelector(
    ".profile-section__content"
  );
  const title = document.querySelector(".user-info-bar__title");
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  const footer = {
    leftAction: null,

    rightGroup: [
      {
        type: "total",
        text: "Всего",
        amountKey: "totalAmount",
        unit: "грн.",
      },
      {
        type: "button",
        text: "Оформить заказ",
        className: "button_primary button_size-lg order-link",
        href: `${baseUrl}checkout/?orderId=${orderId}`,
      },
    ],
  };

  title.innerHTML = `Заказ №${orderId}`;

  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initProfilePageBreadcrumbs();

  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  const order = await ordersApi.getOrderById(orderId);

  const rows = mapProductsToTableRows(order.products, order.items);

  if (order.length === 0) {
    orderTableContainer.innerHTML = `<div class="table__empty-message" style="height: 100%">У вас нет заказов!</div>`;
  } else {
    OrderTable({
      container: orderTableContainer,
      columns: orderColumns,
      footer,
      rows,
    });
  }
});
