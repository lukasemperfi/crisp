import { createComponent } from "@/shared/lib/core/core";
import { FormField } from "@/shared/ui/form-field/form-field";
import { Accordion2 } from "@/shared/ui/accordion/accordion";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import {
  countries,
  regionsByCountry,
  shippingTaxRules,
} from "@/shared/lib/location";

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        el.className = "order-summary";

        el.innerHTML = `
          <div class="order-summary__section">
            <h3 class="order-summary__title">Order Summary</h3>
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Cart Subtotal</span>
                <span>120.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Shipping</span>
                <span class="js-tax-value">0.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Flat Rate - Fixed</span>
              </div>
              <hr class="order-summary__divider" />
              <div class="order-summary__row order-summary__row_total">
                <span>Order Total</span>
                <span class="js-total-value">120.00 EUR</span>
              </div>
            </div>
            <div class="order-summary__cart-items">
            
            </div>   
          </div>

        `;

        el._els = {
          accordion: Accordion2({
            items: [
              {
                title: "1 Item in Cart",
                content: `<div>Cart Item</div>`,
                isActive: true,
              },
            ],
            isSingleOpen: true,
          }),
        };

        const cartItemsContainer = el.querySelector(
          ".order-summary__cart-items",
        );
        cartItemsContainer.append(el._els.accordion);
      }
    },
  });
}
