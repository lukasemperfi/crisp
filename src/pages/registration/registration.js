import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { RegistrationForm } from "../../entities/auth/ui/registration-form/registration-form";
import { baseUrl } from "../../shared/helpers/base-url";
import { registerUser } from "../../entities/auth/model/auth-slice";
import { createOverlaySpinner } from "../../shared/ui/overlay-spinner/overlay-spinner";
import { requireGuest } from "../../app/providers/auth-guard";

document.addEventListener("DOMContentLoaded", async () => {
  await requireGuest(`${baseUrl}catalog/`);
  initHeader();
  initBreadcrumbs(".registration-page__breadcrumbs");
  initRegistrtionForm();
  initPageFooter();
});

function initRegistrtionForm() {
  const authSpinner = createOverlaySpinner({
    successText: "Вход выполнен успешно!",
  });

  const form = RegistrationForm({
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
    onBack: () => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = baseUrl;
      }
    },
  });

  const contentEl = document.querySelector(".registration-page__content");

  contentEl.appendChild(form);
}
