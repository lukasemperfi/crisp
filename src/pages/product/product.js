import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initProductPageBreadcrumbs } from "@/pages/product/ui/breadcrumbs/breadcrumbs.js";
import { initProductContent } from "./sections/product-content/product-content.js";
import {
  fetchProductById,
  PRODUCT_STATUS,
} from "@/entities/product/model/product-slice.js";
import { store } from "@/app/store/index.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = await fetchProductById(id);

  initHeader();
  initDropdown({ selector: ".top-header__lang" });
  initProductPageBreadcrumbs();
  initProductContent(product);
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
