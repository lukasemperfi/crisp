import { requireGuest } from "@/app/providers/auth-guard";
import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initLoginPageBreadcrumbs } from "@/pages/forgot-password/sections/breadcrumbs/breadcrumbs";
import { initForgotPasswordForm } from "../../features/auth/forgot-password/ui/forgot-password-form";

document.addEventListener("DOMContentLoaded", async () => {
  await requireGuest();
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initLoginPageBreadcrumbs();
  initForgotPasswordForm();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
