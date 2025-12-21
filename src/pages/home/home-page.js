import { initHeader } from "@/widgets/header/header.js";
// import { initProducts } from "./sections/products/products.js";
// import { initManufacturerSection } from "./sections/manufacturer/manufacturer.js";
// import { initNewsSection } from "@/widgets/news-section/news-section.js";
// import { initHero } from "./sections/hero/hero.js";
// import { initGoal } from "./sections/goal/goal.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
// import { initPageFooter } from "@/widgets/footer/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  // initProducts();
  // initManufacturerSection();
  // initNewsSection();
  // initHero();
  // initGoal();
  // initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
