import { initTabs } from "@/shared/ui/tabs/tabs.js";
export const initCorporateSection = () => {
  const tabsContainer = document.querySelector(
    '[data-tabs-id="corporate-section-tabs"]'
  );
  initTabs(tabsContainer, true);
};
