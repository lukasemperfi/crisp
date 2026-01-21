import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initCartContent } from "./sections/cart-content/cart-content";
import { MiniCart } from "../../features/cart/ui/mini-cart/mini-cart";
import { mockProducts } from "@/shared/helpers/mock-products";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initCartContent();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
