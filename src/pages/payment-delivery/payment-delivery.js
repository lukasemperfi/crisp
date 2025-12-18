import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initGoal } from "@/pages/home/sections/goal/goal.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initHeroSection } from "@/pages/payment-delivery/sections/hero/hero.js";
import { initPaymentDeliveryTabs } from "@/pages/payment-delivery/sections/payment-delivery-tabs/payment-delivery-tabs";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initHeroSection();
  initPaymentDeliveryTabs();
  initGoal();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
