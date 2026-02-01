import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { AddressForm } from "@/entities/account/ui/address-form/address-form";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".address-page__breadcrumbs");
  initProfileSection();
  initAddressForm();
  initPageFooter();
});

function initAddressForm() {
  const authSpinner = createOverlaySpinner({
    successText: "Вход выполнен успешно!",
  });

  const form = AddressForm({
    onSubmit: async ({ confirm_password, ...restData }) => {
      try {
        authSpinner.show();
        await registerUser(restData);
        authSpinner.success();

        location.reload();
      } catch (error) {
        authSpinner.hide();
        console.error("Ошибка входа:", error);
      }
    },
  });

  const contentEl = document.querySelector(".profile-section__content");

  contentEl.appendChild(form);
}
