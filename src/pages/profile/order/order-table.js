import { Table } from "@/shared/ui/table/table";
import { TableModel } from "@/shared/ui/table/model/table-model";

export function OrderTable({
  container,
  columns = [],
  rows = [],
  footer = {},
  showHeader = true,
}) {
  if (!container) {
    return;
  }

  container.innerHTML = "";

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("order-table");

  const tableModel = new TableModel(rows);

  const initialData = {
    columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer,
    showHeader,
  };

  const table = new Table(tableContainer, initialData);

  container.appendChild(tableContainer);

  table.element.addEventListener("dataUpdateRequest", (event) => {
    const { action, itemId, newQuantity } = event.detail;

    if (action === "updateQuantity") {
      const updatedRows = tableModel.updateQuantity(itemId, newQuantity);

      const newTotalAmount = tableModel.calculateTotalAmount();

      table.update({
        rows: updatedRows,
        totalAmount: newTotalAmount,
      });
    }
  });
}
