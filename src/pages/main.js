import { store } from "@/app/store/index.js";

store.subscribe("cart", async (newState) => {
  console.log("cart: onchange", newState);
});
