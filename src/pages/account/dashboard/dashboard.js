import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".dashboard-page__breadcrumbs");
  initPageFooter();
});
