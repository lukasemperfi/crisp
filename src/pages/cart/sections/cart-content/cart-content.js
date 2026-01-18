import { CartTable } from "@/features/cart/ui/cart-table/cart-table";
import { mockProducts } from "@/shared/helpers/mock-products";
import { initBreadcrumbs } from "../../../../widgets/breadcrumbs/breadcrumbs";
import { CartOrderSummary } from "../../../../features/cart/ui/cart-order-summary/cart-order-summary";

export const initCartContent = async () => {
  initBreadcrumbs(".cart-section__breadcrumbs");
  const cartTableContainer = document.querySelector(".cart-section__col-1");
  const cartOrderContainer = document.querySelector(".cart-section__col-2");
  const cartTable = CartTable({ items: products });
  const cartOrderSummary = CartOrderSummary();

  cartTableContainer.append(cartTable);
  cartOrderContainer.append(cartOrderSummary);
};

const products = mockProducts
  .map((product) => {
    const { variants, ...rest } = product;
    return {
      ...rest,
      sku: 434536465,
      quantity: 3,
      variant: variants[0],
    };
  })
  .slice(0, 2);
