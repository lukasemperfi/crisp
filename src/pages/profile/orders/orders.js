import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initProfilePageBreadcrumbs } from "@//pages/profile/sections/breadcrumbs/breadcrumbs";
import { initProfileSection } from "@//pages/profile/sections/profile-section/profile-section";
import { Table } from "@/shared/ui/table/table";
import { TableModel } from "@/shared/ui/table/model/table-model";
import { store } from "@/app/store";
import { ordersApi } from "@/entities/order/api/order";
import { createFormattedCurrencyElement } from "@/shared/ui/table/helpers";
import { createTableActionCell } from "../../../shared/ui/table/action-cell";
import { requireAuth } from "../../../app/providers/auth-guard";

export const ordersColumns = [
  {
    key: "orderNumber",
    label: "№ Заказа",
    type: "text",
    width: "1fr",
    align: "left",
  },
  {
    key: "date",
    label: "Дата",
    type: "text",
    width: "1fr",
  },
  {
    key: "itemsCount",
    label: "Кол-во товаров",
    type: "text",
    width: "1fr",
  },
  {
    key: "status",
    label: "Статус",
    type: "text",
    width: "1fr",
  },
  {
    key: "total",
    label: "Стоимость",
    type: "currency",
    width: "1fr",

    render: (rowData) => {
      return createFormattedCurrencyElement(rowData.total, "грн.");
    },
  },
  {
    key: "actions",
    label: "Функции",
    type: "component",
    width: "1fr",
    render: (rowData) => createTableActionCell(rowData),
  },
];

document.addEventListener("DOMContentLoaded", async () => {
  await requireAuth();

  const ordersTableContainer = document.querySelector(
    ".profile-section__content"
  );

  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initProfilePageBreadcrumbs();
  initProfileSection();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  const orders = await ordersApi.getOrders();
  const rows = mapOrdersToRows(orders);

  if (orders.length === 0) {
    ordersTableContainer.innerHTML = `<div class="table__empty-message" style="height: 100%">У вас нет заказов!</div>`;
  } else {
    OrdersTable({
      container: ordersTableContainer,
      columns: ordersColumns,
      rows,
    });
  }
});

export function OrdersTable({
  container,
  columns = [],
  rows = [],
  footer = {},
  showHeader = true,
}) {
  container.innerHTML = "";

  const tableContainer = document.createElement("div");
  tableContainer.classList.add("orders-table");

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

export function mapOrdersToRows(orders) {
  return orders.map((order) => {
    const orderDate = new Date(order.created_at);
    const date = orderDate.toLocaleString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return {
      id: order.id,
      orderNumber: order.order_number,
      date,
      itemsCount: order.order_items.reduce(
        (sum, item) => sum + item.quantity,
        0
      ),
      status: order.status,
      total: order.total_amount,
    };
  });
}

const mockOrders = [
  {
    id: 8,
    order_number: "00037542cot6",
    created_at: "2025-12-09T17:07:16.353551+00:00",
    status: "новый",
    full_name: "fdhg df",
    email: "d@gmail.com",
    phone: "0885544546",
    delivery_method: "pickup",
    payment_method: "cashless",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 36,
        product_id: 2,
      },
      {
        quantity: 20,
        product_id: 3,
      },
    ],
    order_delivery_details: null,
  },
  {
    id: 7,
    order_number: "83688412sjdo",
    created_at: "2025-12-09T12:34:48.605926+00:00",
    status: "новый",
    full_name: "апр апр",
    email: "віп@gmail.co",
    phone: "0778885544",
    delivery_method: "courier",
    payment_method: "cash",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 21,
        product_id: 2,
      },
      {
        quantity: 9,
        product_id: 4,
      },
      {
        quantity: 2,
        product_id: 20,
      },
    ],
    order_delivery_details: {
      city: null,
      region: null,
      address: "street",
      country: null,
    },
  },
  {
    id: 6,
    order_number: "836597689vuq",
    created_at: "2025-12-09T12:34:19.866233+00:00",
    status: "новый",
    full_name: "апр апр",
    email: "віп@gmail.co",
    phone: "0778885544",
    delivery_method: "pickup",
    payment_method: "cashless",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 21,
        product_id: 2,
      },
      {
        quantity: 9,
        product_id: 4,
      },
      {
        quantity: 2,
        product_id: 20,
      },
    ],
    order_delivery_details: null,
  },
  {
    id: 5,
    order_number: "83624156l6g9",
    created_at: "2025-12-09T12:33:44.244359+00:00",
    status: "новый",
    full_name: "апр апр",
    email: "віп@gmail.co",
    phone: "0778885544",
    delivery_method: "nova_poshta",
    payment_method: "liqpay",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 21,
        product_id: 2,
      },
      {
        quantity: 9,
        product_id: 4,
      },
      {
        quantity: 2,
        product_id: 20,
      },
    ],
    order_delivery_details: {
      city: "vbn",
      region: "kujawsko-pomorskie",
      address: null,
      country: "PL",
    },
  },
  {
    id: 4,
    order_number: "83317063i96n",
    created_at: "2025-12-09T12:28:37.274204+00:00",
    status: "новый",
    full_name: "dfg dfg",
    email: "d@gmail.co",
    phone: "0778885544",
    delivery_method: "nova-poshta",
    payment_method: "cashless",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 21,
        product_id: 2,
      },
      {
        quantity: 9,
        product_id: 4,
      },
      {
        quantity: 2,
        product_id: 20,
      },
    ],
    order_delivery_details: null,
  },
  {
    id: 3,
    order_number: "83162546ld2k",
    created_at: "2025-12-09T12:26:02.724824+00:00",
    status: "новый",
    full_name: "Jhon Dow",
    email: "ff@gmail.com",
    phone: "0445558888",
    delivery_method: "nova-poshta",
    payment_method: "cashless",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 21,
        product_id: 2,
      },
      {
        quantity: 9,
        product_id: 4,
      },
      {
        quantity: 2,
        product_id: 20,
      },
    ],
    order_delivery_details: null,
  },
  {
    id: 2,
    order_number: "81248245avxj",
    created_at: "2025-12-09T11:54:08.359449+00:00",
    status: "новый",
    full_name: "Anatolii Lukianenko",
    email: "some@gmail.com",
    phone: "0998885566",
    delivery_method: "nova-poshta",
    payment_method: "cashless",
    user_id: "bbdffdfc-2b42-434c-bd29-0460989211ae",
    order_items: [
      {
        quantity: 21,
        product_id: 2,
      },
      {
        quantity: 9,
        product_id: 4,
      },
      {
        quantity: 2,
        product_id: 20,
      },
    ],
    order_delivery_details: null,
  },
];
