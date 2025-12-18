import { QuantityComponent } from "@/shared/ui/table/quantity";
import { Cart } from "@/features/cart/ui/cart";
import { createFormattedCurrencyElement } from "@/shared/ui/table/helpers";
import { initCheckoutForm } from "../../../features/checkout/ui/checkout-form";
import { ordersApi } from "@/entities/order/api/order";
import { mapProductsToTableRows } from "../../../features/cart/ui/map-products-to-table-rows";
import { OrderTable } from "../../profile/order/order-table";

const columns = [
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
const footer = {
  leftAction: null,

  rightGroup: [
    {
      type: "total",
      text: "Всего",
      amountKey: "totalAmount",
      unit: "грн.",
    },
  ],
};

export const initCheckoutSection = async () => {
  const checkoutContainer = document.querySelector(".checkout-section__cart");
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  if (!orderId) {
    Cart({ container: checkoutContainer, columns, footer });
  } else {
    const order = await ordersApi.getOrderById(orderId);
    const rows = mapProductsToTableRows(order.products, order.items);

    OrderTable({
      container: checkoutContainer,
      columns: columns,
      footer,
      rows,
    });
  }

  initCheckoutForm();
};
