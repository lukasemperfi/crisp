import { CartTable } from "@/features/cart/ui/cart-table/cart-table";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { CartOrderSummary } from "@/features/cart/ui/cart-order-summary/cart-order-summary";
import { store } from "@/app/store";
import { supabase } from "@/shared/api/supabase/client";
import { selectCartTotalSum } from "@/features/cart/model/cart-slice";

export const initCartContent = async () => {
  initBreadcrumbs(".cart-section__breadcrumbs");

  const cartTableContainer = document.querySelector(".cart-section__col-1");
  const cartOrderContainer = document.querySelector(".cart-section__col-2");
  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id || null;

  const cartTable = CartTable({ items: [], userId });
  const cartOrderSummary = CartOrderSummary();

  cartTableContainer.append(cartTable);
  cartOrderContainer.append(cartOrderSummary);

  store.subscribe("cart", async (newState) => {
    const cartViewItems = newState.viewItems;
    const cartTotalSum = selectCartTotalSum(newState);

    cartTable.update({ items: cartViewItems });
    cartOrderSummary.update({ subtotal: cartTotalSum });
  });
};
