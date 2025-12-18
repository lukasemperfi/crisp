import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initNewsSection } from "@/widgets/news-section/news-section.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initHeroSection } from "./sections/hero/hero";
import { initProducerSection } from "@/widgets/producer/producer.js";
import { initGallerySection } from "./sections/gallery-section/gallery-section";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initHeroSection();
  initProducerSection();
  initGallerySection();
  initNewsSection();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
