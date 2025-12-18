import { initTabs } from "@/shared/ui/tabs/tabs.js";

export const initPaymentDeliveryTabs = () => {
  const tabsContainer = document.querySelector(
    '[data-tabs-id="payment-delivery-tabs-section__tabs"]'
  );
  initTabs(tabsContainer, true);
};
