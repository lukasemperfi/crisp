import { Table } from "@/shared/ui/table/table";
import { TableModel } from "@/shared/ui/table/model/table-model";
import { store } from "@/app/store";
import { mapProductsToTableRows } from "./map-products-to-table-rows";

export function Cart({
  container,
  columns = [],
  footer = {},
  showHeader = true,
  onChange,
}) {
  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cart");

  const initialEmptyRows = [];
  const tableModel = new TableModel(initialEmptyRows);

  const initialData = {
    columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer,
    showHeader,
  };

  const table = new Table(cartContainer, initialData);

  container.appendChild(cartContainer);

  cartContainer.addEventListener("dataUpdateRequest", (event) => {
    const { action, itemId, newQuantity } = event.detail;

    if (action === "updateQuantity") {
      store.dispatch({
        type: "cart/setQuantity",
        payload: {
          productId: String(itemId),
          quantity: newQuantity,
        },
      });
    }
  });

  store.subscribe("cart", async (newState) => {
    const cartItems = newState.items;
    const cartProducts = newState.products;
    const newRows = mapProductsToTableRows(cartProducts, cartItems);

    tableModel.setRows(newRows);

    const newTotalAmount = tableModel.calculateTotalAmount();

    table.update({
      rows: newRows,
      totalAmount: newTotalAmount,
    });

    if (onChange) {
      onChange();
    }
  });
}
