import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { AddressForm } from "@/entities/account/ui/address-form/address-form";
import { userProfileApi } from "../../../entities/account/api/profile";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".address-page__breadcrumbs");
  initProfileSection();
  initPageFooter();

  const userProfileData = await userProfileApi.getProfile();
  initAddressForm(userProfileData);
});

function initAddressForm(userProfileData) {
  const authSpinner = createOverlaySpinner({
    successText: "Вход выполнен успешно!",
  });

  const form = AddressForm({
    userProfileData,
    onSubmit: async (data) => {
      try {
        authSpinner.show();
        await userProfileApi.updateProfile(data);
        authSpinner.success("Data is updated!");

        location.reload();
      } catch (error) {
        console.error("Ошибка входа:", error);
      } finally {
        authSpinner.hide();
      }
    },
  });

  const contentEl = document.querySelector(".profile-section__content");

  contentEl.appendChild(form);
}
