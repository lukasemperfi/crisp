import { CartTable } from "@/features/cart/ui/cart-table/cart-table";
import { mockProducts } from "../../../../shared/helpers/mock-products";

export const initCartContent = async () => {
  const cartTableContainer = document.querySelector(".cart-section__col-1");
  const cartTable = CartTable({ items: products });

  cartTableContainer.append(cartTable);
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
