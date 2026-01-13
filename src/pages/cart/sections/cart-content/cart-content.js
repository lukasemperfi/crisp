import { CartProductCard } from "@/features/cart/ui/cart-product-card/cart-product-card";

export const initCartContent = async () => {
  const cartTableContainer = document.querySelector(".cart-section__col-1");
  const cartProductCard = CartProductCard();

  cartTableContainer.append(cartProductCard);
};
