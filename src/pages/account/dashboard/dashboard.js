import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { DashboardInfo } from "./ui/dashboard-info/dashboard-info";
import { userProfileApi } from "@/entities/account/api/profile";
import { supabase } from "@/shared/api/supabase/client";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".dashboard-page__breadcrumbs");
  initProfileSection();

  const userProfileData = await userProfileApi.getProfile();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  initDashboardInfo({ ...userProfileData, ...user });

  initPageFooter();
});

function initDashboardInfo(props) {
  const container = document.querySelector(".profile-section__content");

  container.replaceChildren(
    DashboardInfo({
      userInfo: props,
    }),
  );
}
