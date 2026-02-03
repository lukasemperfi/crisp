import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initCheckoutContent } from "./sections/checkout-content/checkout-content";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initCheckoutContent();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
