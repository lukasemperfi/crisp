import { CartTable } from "@/features/cart/ui/cart-table/cart-table";
import { initBreadcrumbs } from "../../../../widgets/breadcrumbs/breadcrumbs";
import { CartOrderSummary } from "../../../../features/cart/ui/cart-order-summary/cart-order-summary";
import { getCartViewItems } from "../../../../features/cart/model/get-cart-view-items";
import { store } from "../../../../app/store";

export const initCartContent = async () => {
  initBreadcrumbs(".cart-section__breadcrumbs");
  const cartTableContainer = document.querySelector(".cart-section__col-1");
  const cartOrderContainer = document.querySelector(".cart-section__col-2");

  const cartTable = CartTable({ items: [] });
  const cartOrderSummary = CartOrderSummary();

  cartTableContainer.append(cartTable);
  cartOrderContainer.append(cartOrderSummary);

  store.subscribe("cart", async (newState) => {
    const cartViewItems = await getCartViewItems(newState.items);
    console.log("cartpage: cartViewsItems", cartViewItems);
    cartTable.update({ items: cartViewItems });
  });
};
