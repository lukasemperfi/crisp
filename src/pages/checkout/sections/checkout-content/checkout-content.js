import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { CartOrderSummary } from "@/features/cart/ui/cart-order-summary/cart-order-summary";

export const initCheckoutContent = async () => {
  initBreadcrumbs(".checkout-section__breadcrumbs");

  const col1Container = document.querySelector(".checkout-section__col-1");
  const checkoutOrderContainer = document.querySelector(
    ".checkout-section__col-2"
  );

  const cartOrderSummary = CartOrderSummary();

  checkoutOrderContainer.append(cartOrderSummary);
};
