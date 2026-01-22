import { store } from "@/app/store/index.js";
import {
  selectCartCount,
  selectCartProductIds,
} from "../features/cart/model/cart-slice";

store.subscribe("cart", async (newState) => {
  console.log("cart: onchange", newState);
  const ids = selectCartProductIds(newState);
  const count = selectCartCount(newState);
  console.log("ids and count", ids, count);
});
