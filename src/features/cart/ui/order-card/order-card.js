import { CartProductCard } from "../cart-product-card/cart-product-card";

export function OrderCard(props) {
  return CartProductCard({ className: "order-card", ...props });
}
