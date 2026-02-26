import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer";
import { initHeroSection } from "./sections/hero-section/hero-section";
import { initProducts } from "./sections/products-section/products-section";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initHeroSection();
  initBreadcrumbs(".products__top");
  initProducts();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
