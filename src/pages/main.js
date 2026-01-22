import { store } from "@/app/store/index.js";
import { fetchCartProducts } from "../features/cart/model/cart-slice";

initializeApp();

async function initializeApp() {
  initializeCart();
}

function initializeCart() {
  try {
    const cartItems = store.getState().cart.items;

    if (cartItems && cartItems.length > 0) {
      fetchCartProducts();
    }
  } catch (error) {
    console.error("Помилка під час ініціалізації кошика:", error);
  }
}

store.subscribe("cart", async (newState) => {
  console.log("cart: onchange", newState);
});
