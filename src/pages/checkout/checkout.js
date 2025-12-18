import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initCheckoutSection } from "./sections/checkout-section";
import { initCheckoutPageBreadcrumbs } from "./sections/breadcrumbs/breadcrumbs";
import { baseUrl } from "@/shared/helpers/base-url";
import { store } from "@/app/store";
import { requireAuth } from "@/app/providers/auth-guard";
import { getSession } from "@/app/providers/auth-guard";
import { redirect } from "@/shared/helpers/redirect";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const orderId = urlParams.get("orderId");

  await requireCartAndAuth(orderId);

  if (!orderId) {
    store.subscribe("cart", () => {
      const isCartEmpty = store.getState().cart.items.length === 0;

      if (isCartEmpty) {
        redirect(`${baseUrl}`, 0, true);
      }
    });
  }

  store.subscribe("auth", (newState) => {
    if (!newState.isAuth) {
      redirect(`${baseUrl}`, 0, true);
    }
  });

  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initCheckoutPageBreadcrumbs();
  initCheckoutSection();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});

function requireCart() {
  const isCartEmpty = store.getState().cart.items.length === 0;

  if (isCartEmpty) {
    window.location.replace(`${baseUrl}`);
    return;
  }

  const privateContent = document.querySelector("#private-content");

  if (privateContent) {
    privateContent.removeAttribute("id");
  }
}

async function requireCartAndAuth(orderId) {
  const isAuthenticated = await getSession();
  const isCartEmpty = store.getState().cart.items.length === 0;

  if (!isAuthenticated) {
    redirect(`${baseUrl}`, 0, true);
    return;
  }

  if (!orderId) {
    if (isCartEmpty) {
      redirect(`${baseUrl}`, 0, true);
      return;
    }
  }

  const privateContent = document.querySelector("#private-content");

  if (privateContent) {
    privateContent.removeAttribute("id");
  }
}
