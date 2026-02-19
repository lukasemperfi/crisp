import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initCheckoutContent } from "./sections/checkout-content/checkout-content";
import { baseUrl } from "@/shared/helpers/base-url";
import { redirect } from "@/shared/helpers/redirect";
import { store } from "@/app/store";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initPageFooter();

  const state = store.getState().cart;

  if (state.items.length === 0) {
    redirect(`${baseUrl}catalog/`, 0, true);
    return;
  }

  initCheckoutContent();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  store.subscribe("cart", (newState) => {
    if (newState.items.length === 0) {
      redirect(`${baseUrl}catalog/`, 0, true);
    }
  });
});
