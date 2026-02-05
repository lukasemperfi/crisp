import { createComponent } from "@/shared/lib/core/core";
import { FormField } from "@/shared/ui/form-field/form-field";
import { Accordion2 } from "@/shared/ui/accordion/accordion";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { formatPrice } from "@/shared/helpers/format-price";
import {
  countries,
  regionsByCountry,
  shippingTaxRules,
} from "@/shared/lib/location";
import { IconArrowDown } from "../../../../../../shared/ui/icons/icons";
import { OrderCard } from "../../../../../../features/cart/ui/order-card/order-card";
import { baseUrl } from "../../../../../../shared/helpers/base-url";

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const {
        items = [],
        cartCount = 0,
        shippingCost = 0,
        shippingLabel = "",
        subtotal = 0,
        total = 0,
      } = props;

      if (runOnce) {
        el.className = "order-summary";

        el.innerHTML = `
          <div class="order-summary__section">
            <h3 class="order-summary__title">Order Summary</h3>
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Cart Subtotal</span>
                <span class="js-subtotal-value">${subtotal} EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Shipping</span>
                <span class="js-tax-value">${shippingCost} EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span class="js-shipping-label">${shippingLabel}</span>
              </div>
              <hr class="order-summary__divider" />
              <div class="order-summary__row order-summary__row_total">
                <span>Order Total</span>
                <span class="js-total-value">${total} EUR</span>
              </div>
            </div>
            <div class="order-summary__cart-items"></div>   
          </div>

        `;

        el._els = {
          accordion: Accordion2({
            items: [
              {
                title: `${cartCount} Item${cartCount > 1 ? "s" : ""} in Cart`,
                content: "",
                isActive: true,
              },
            ],
            isSingleOpen: true,
          }),
          itemsList: el.querySelector(".order-summary__cart-items"),
          total: el.querySelector(".js-total-value"),
          subtotal: el.querySelector(".js-subtotal-value"),
          shippingCost: el.querySelector(".js-tax-value"),
          shippingLabel: el.querySelector(".js-shipping-label"),
        };

        const cartItemsContainer = el.querySelector(
          ".order-summary__cart-items",
        );
        const iconContainer =
          el._els.accordion.querySelector(".accordion__icon");

        iconContainer.innerHTML = IconArrowDown();

        cartItemsContainer.append(el._els.accordion);
      }

      el._els.accordion.update({
        items: [
          {
            title: `${cartCount} Item${cartCount > 1 ? "s" : ""} in Cart`,
            content: ItemsList(items),
            isActive: true,
          },
        ],
        isSingleOpen: true,
      });

      el._els.total.textContent = `${formatPrice(total)} EUR`;
      el._els.subtotal.textContent = `${formatPrice(subtotal)} EUR`;
      el._els.shippingCost.textContent = `${formatPrice(shippingCost)} EUR`;
      el._els.shippingLabel.textContent = shippingLabel;
    },
  });
}

function ItemsList(items) {
  if (!items || !Array.isArray(items)) {
    return;
  }

  const el = document.createElement("div");
  el.className = "items-list";

  items.forEach((item) => {
    const itemCard = CheckoutCard(item);

    el.appendChild(itemCard);
  });

  return el;
}

function CheckoutCard(item) {
  const el = document.createElement("div");

  el.className = "checkout-card";

  const orderCard = OrderCard({ product: item });

  el.append(orderCard);

  return el;
}
