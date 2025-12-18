import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";
import { initProductsSection } from "@/pages/catalog/sections/products/products.js";
import { initHeroSection } from "./sections/hero/hero";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initDropdown({ selector: ".top-header__lang" });
  initHeroSection();
  initWalnutSection();
  initProductsSection();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
