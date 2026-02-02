import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { InfoForm } from "@/entities/account/ui/info-form/info-form";
import { userProfileApi } from "../../../entities/account/api/profile";
import { delay } from "../../../shared/helpers/delay";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".info-page__breadcrumbs");
  initProfileSection();
  initPageFooter();

  // const userProfileData = await userProfileApi.getProfile();

  initInfoForm({});
});

function initInfoForm(userProfileData) {
  const authSpinner = createOverlaySpinner({
    successText: "Data is updated!",
  });

  const form = InfoForm({
    userProfileData,
    onSubmit: async (data) => {
      try {
        console.log("data", data);
        authSpinner.show();
        // await userProfileApi.updateProfile(data);
        await delay(500);
        authSpinner.success();

        location.reload();
      } catch (error) {
        console.error("Ошибка входа:", error);
      }
    },
  });

  const contentEl = document.querySelector(".profile-section__content");

  contentEl.appendChild(form);
}
