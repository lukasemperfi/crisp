import { CartTable } from "@/features/cart/ui/cart-table/cart-table";

export const initCartContent = async () => {
  const cartTableContainer = document.querySelector(".cart-section__col-1");
  const cartTable = CartTable();

  cartTableContainer.append(cartTable);
};
