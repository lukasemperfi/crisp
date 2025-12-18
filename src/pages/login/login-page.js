import { requireGuest } from "@/app/providers/auth-guard";
import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initLoginPageBreadcrumbs } from "./sections/breadcrumbs/breadcrumbs";
import { initLoginForm } from "@/features/auth/login/ui/login-form";

document.addEventListener("DOMContentLoaded", async () => {
  await requireGuest();
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initLoginPageBreadcrumbs();
  initLoginForm();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
