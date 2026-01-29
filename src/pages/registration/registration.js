import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { RegistrationForm } from "../../entities/auth/ui/registration-form/registration-form";
import { baseUrl } from "../../shared/helpers/base-url";
import { registerUser } from "../../entities/auth/model/auth-slice";
import { showToast } from "../../shared/ui/toast/toast";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".registration-page__breadcrumbs");
  showToast("Товар успешно добавлен в корзину!", "success", 9999999999999);

  const form = RegistrationForm({
    onSubmit: async ({ confirm_password, ...restData }) => {
      console.log("Success:", restData);

      await registerUser(restData);
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

  initPageFooter();
});
