import { QuantityComponent } from "@/shared/ui/table/quantity";
import { createDeleteButton } from "@/shared/ui/table/table";
import { store } from "@/app/store";
import { baseUrl } from "../../../shared/helpers/base-url";
import { Cart } from "./cart";
import { createFormattedCurrencyElement } from "@/shared/ui/table/helpers";

export function CartPopup({ trigger, cartPopupContainer }) {
  const columns = [
    {
      key: "productName",
      label: "Товар",
      type: "text",
      width: "1fr",
      align: "left",
      cellClass: "table__cell_product-name",
    },

    {
      key: "quantity",
      label: "Кол-во",
      type: "component",
      cellClass: "table__cell_quantity",
      render: (rowData) => {
        const quantityComp = new QuantityComponent(
          rowData.quantity,
          rowData.id
        );

        return quantityComp.element;
      },
      width: "1fr",
    },
    {
      key: "total",
      label: "Итоговая стоимость",
      type: "currency",
      width: "0.5fr",
      align: "left",
      cellClass: "table__cell_total-cost",
      render: (rowData) => {
        return createFormattedCurrencyElement(rowData.total, "грн.");
      },
    },
    {
      key: "deleteAction",
      label: "",
      type: "action",
      width: "50px",
      align: "right",
      cellClass: "table__cell_delete-action",
      render: (rowData) => {
        return createDeleteButton(rowData.id, handleItemDelete);
      },
    },
  ];

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
        text: "Перейти в корзину",
        className: "button_primary button_size-lg",
        href: `${baseUrl}cart/`,
      },
    ],
  };

  if (!cartPopupContainer) {
    console.error("Контейнер не найден.");
    return;
  }

  const cartPopup = createPopup(trigger);

  cartPopupContainer.appendChild(cartPopup);

  Cart({
    container: cartPopup,
    columns,
    footer,
    showHeader: false,
  });
}

function createPopup(trigger) {
  const cartPopup = document.createElement("div");
  cartPopup.classList.add("cart-popup");
  const cartPopupId = "cart-popup-" + Math.random().toString(36).slice(2);
  setTrigger(trigger, cartPopupId);
  setCartPopupTarget(cartPopup, cartPopupId);

  return cartPopup;
}

function setTrigger(trigger, cartPopupId) {
  trigger.setAttribute("popovertarget", cartPopupId);
}

function setCartPopupTarget(cartPopup, cartPopupId) {
  cartPopup.id = cartPopupId;
  cartPopup.setAttribute("popover", "");
}

function handleItemDelete(itemId) {
  store.dispatch({
    type: "cart/removeItem",
    payload: { productId: itemId },
  });
}
