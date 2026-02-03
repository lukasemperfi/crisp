import { store } from "@/app/store/index.js";
import { initAuthListener } from "@/entities/auth/model/auth-slice";
import { fetchCartProducts } from "../features/cart/model/cart-slice";
import { supabase } from "../shared/api/supabase/client";

initializeApp();

function initializeApp() {
  initAuthListener();
  initializeCart();
}

async function initializeCart() {
  try {
    const cartItems = store.getState().cart.items;
    const user = await supabase.auth.getUser();
    const userId = user?.data?.user?.id || null;

    if (cartItems && cartItems.length > 0) {
      fetchCartProducts(userId);
    }
  } catch (error) {
    console.error("Помилка під час ініціалізації кошика:", error);
  }
}
