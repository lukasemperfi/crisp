import { initTabs } from "@/shared/ui/tabs/tabs.js";

export function initProductTabs() {
  initTabs(document.querySelector('[data-tabs-id="product-tabs"]'), true);
}
