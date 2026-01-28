import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { RegistrationForm } from "../../entities/auth/ui/registration-form/registration-form";
import { baseUrl } from "../../shared/helpers/base-url";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".registration-page__breadcrumbs");

  const form = RegistrationForm({
    onSubmit: (data) => console.log("Success:", data),
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

  initPageFooter();
});
