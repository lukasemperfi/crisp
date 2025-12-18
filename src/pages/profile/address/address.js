import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initProfilePageBreadcrumbs } from "@//pages/profile/sections/breadcrumbs/breadcrumbs";
import { initProfileSection } from "@//pages/profile/sections/profile-section/profile-section";
import { initAddressForm } from "./ui/address-form/address-form";
import { initLegalAddressForm } from "./ui/legal-address-form/legal-address-form";
import { userProfileApi } from "../../../entities/profile/api/profile";
import { requireAuth } from "../../../app/providers/auth-guard";

document.addEventListener("DOMContentLoaded", async () => {
  await requireAuth();
  try {
    initDropdown({ selector: ".top-header__lang" });
    initHeader();
    initProfilePageBreadcrumbs();
    initProfileSection();

    const userProfileData = await userProfileApi.getProfile();

    if (userProfileData.person_type === "legal") {
      const lefalAddressForm = document.querySelector(
        ".legal-address-form-wrapper"
      );

      lefalAddressForm.style.display = "flex";

      initLegalAddressForm();
    } else {
      const addressForm = document.querySelector("#address-form");

      addressForm.style.display = "block";

      initAddressForm();
    }

    initPageFooter();
    lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
  } catch (error) {}
});
