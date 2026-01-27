import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".registration-page__breadcrumbs");
  initPageFooter();
});
