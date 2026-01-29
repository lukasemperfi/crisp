import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { DashboardInfo } from "./ui/dashboard-info/dashboard-info";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".dashboard-page__breadcrumbs");
  initProfileSection();
  initDashboardInfo();
  initPageFooter();
});

function initDashboardInfo() {
  const container = document.querySelector(".profile-section__content");

  container.replaceChildren(DashboardInfo());
}
