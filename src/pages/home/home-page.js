import { initHeader } from "@/widgets/header/header.js";
// import { initProducts } from "./sections/products/products.js";
// import { initManufacturerSection } from "./sections/manufacturer/manufacturer.js";
// import { initNewsSection } from "@/widgets/news-section/news-section.js";
// import { initHero } from "./sections/hero/hero.js";
// import { initGoal } from "./sections/goal/goal.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer";
import { initHeroSection } from "./sections/hero-section/hero-section";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initHeroSection();
  initPageFooter();
  // initProducts();
  // initManufacturerSection();
  // initNewsSection();
  // initHero();
  // initGoal();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
