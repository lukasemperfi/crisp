import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initProductContent } from "./sections/product-content/product-content.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  initHeader();
  initProductContent({});
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
