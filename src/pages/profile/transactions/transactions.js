import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initProfilePageBreadcrumbs } from "@//pages/profile/sections/breadcrumbs/breadcrumbs";

import { createFormattedCurrencyElement } from "@/shared/ui/table/helpers";
import { TransactionsTable } from "./transactions-table";
import { renderDetailsLink } from "../../../shared/ui/table/action-cell";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { requireAuth } from "../../../app/providers/auth-guard";

const transactionsColumns = [
  {
    key: "dateAdded",
    label: "Добавлено",
    type: "text",
    width: "max-content",
    align: "center",
  },
  {
    key: "status",
    label: "Статус",
    type: "text",
    width: "max-content",
    align: "center",
  },
  {
    key: "amount",
    label: "Сумма",
    type: "currency",
    width: "max-content",
    align: "center",
    render: (rowData) => {
      const wrapper = document.createElement("div");
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.gap = "12px";

      const viewLink = renderDetailsLink(rowData);
      wrapper.appendChild(
        createFormattedCurrencyElement(rowData.amount, "грн.")
      );
      wrapper.appendChild(viewLink);

      return wrapper;
    },
  },
];

document.addEventListener("DOMContentLoaded", async () => {
  await requireAuth();

  const transactionsTableContainer = document.querySelector(
    ".profile-section__content"
  );

  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initProfilePageBreadcrumbs();
  initProfileSection();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  if (transactions.length === 0) {
    transactionsTableContainer.innerHTML = `<div class="table__empty-message" style="height: 100%">У вас нет заказов!</div>`;
  } else {
    TransactionsTable({
      container: transactionsTableContainer,
      columns: transactionsColumns,
      footer: null,
      rows: transactions,
    });
  }
});

const transactions = [
  {
    id: 8,
    dateAdded: "10.12.2025",
    status: "Платеж принят",
    amount: 1500.5,
  },
  {
    id: 10,
    dateAdded: "05.12.2025",
    status: "Платеж принят",
    amount: 540.0,
  },
  {
    id: 7,
    dateAdded: "28.11.2025",
    status: "Платеж принят",
    amount: 3200.75,
  },
];
