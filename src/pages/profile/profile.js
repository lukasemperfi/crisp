import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initProfilePageBreadcrumbs } from "./sections/breadcrumbs/breadcrumbs";
import { initProfileSection } from "./sections/profile-section/profile-section";
import { requireAuth } from "@/app/providers/auth-guard";

document.addEventListener("DOMContentLoaded", async () => {
  await requireAuth();

  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initProfilePageBreadcrumbs();
  initProfileSection();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
