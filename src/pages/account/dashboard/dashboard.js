import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".dashboard-page__breadcrumbs");
  initProfileSection();
  initPageFooter();
});
