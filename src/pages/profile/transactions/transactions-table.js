import { Table } from "@/shared/ui/table/table";
import { TableModel } from "@/shared/ui/table/model/table-model";

export function TransactionsTable({
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
  tableContainer.classList.add("transactions-table");

  const tableModel = new TableModel(rows);

  const initialData = {
    columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer,
    showHeader,
  };

  new Table(tableContainer, initialData);

  container.appendChild(tableContainer);
}
