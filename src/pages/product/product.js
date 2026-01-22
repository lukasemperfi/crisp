import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initProductContent } from "./sections/product-content/product-content.js";
import { initRecomendationSection } from "./sections/recomendation-section/recomendation-section.js";
import { productsApi } from "@/entities/product/api/products";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = await productsApi.getProductById(id);

  initHeader();
  initProductContent(product);
  initRecomendationSection();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
