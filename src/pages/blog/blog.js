import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initBlogContent } from "./sections/blog-content/blog-content.js";
import { initRecomendationSection } from "./sections/recomendation-section/recomendation-section.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".blog-page__breadcrumbs");
  initBlogContent();
  initRecomendationSection();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
