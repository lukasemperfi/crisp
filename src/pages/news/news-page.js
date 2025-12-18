import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initNewsGallerySection } from "@/pages/news/sections/news-gallery/news-gallery.js";
import { initNewsPageBreadcrumbs } from "@/pages/news/sections/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initNewsPageBreadcrumbs();
  initNewsGallerySection();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
