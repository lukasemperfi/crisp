import { createComponent } from "@/shared/lib/core/core";
import { FormField } from "../../../../shared/ui/form-field/form-field";
import { Accordion2 } from "../../../../shared/ui/accordion/accordion";
import { Dropdown } from "../../../../shared/ui/dropdown/dropdown";
import {
  countries,
  regionsByCountry,
  shippingTaxRules,
} from "../../../../shared/lib/location";

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        el.className = "order-summary";

        el.innerHTML = `
          <div class="order-summary__section order-summary__section_top">
            <div class="order-summary__block order-summary__block_discount">
              <h3 class="order-summary__title">Apply Discount Code</h3>
              <div class="order-summary__discount">
                ${FormField({
                  inputProps: { placeholder: "Enter discount code" },
                  withButton: true,
                  buttonText: `<span class="order-summary__discount-button mobile">Apply</span><span class="order-summary__discount-button desktop">Apply Discount</span>`,
                }).toHTML()}
              </div>
            </div>
            <div class="order-summary__block order-summary__block_shipping-estimate"></div>
          </div>

          <div class="order-summary__section order-summary__section_bottom">
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle">
                <span>Subtotal</span>
                <span>120.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Tax</span>
                <span class="js-tax-value">0.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__row--total order-summary__title">
                <span>Order Total</span>
                <span class="js-total-value">120.00 EUR</span>
              </div>
            </div>
            <div class="order-summary__divider"></div>
            <div class="order-summary__actions">
                <button class="button order-summary__link order-summary__link_muted">Check Out with Multiple Addresses</button>
                <button class="order-summary__cta button button_solid button_black">Proceed to checkout</button>          
            </div>
          </div>
        `;

        let currentCountry = "";
        let currentRegion = "";

        const shippingContainer = el.querySelector(
          ".order-summary__block_shipping-estimate"
        );
        const shippingAccordion = Accordion2({
          items: [
            {
              title: "Estimate Shipping and Tax",
              content: createShipingEstimateContent(),
              isActive: true,
            },
          ],
          isSingleOpen: true,
        });
        shippingContainer.append(shippingAccordion);

        const countryControl = el.querySelector(
          ".shipping-estimate__control_country"
        );
        const stateControl = el.querySelector(
          ".shipping-estimate__control_state"
        );

        const countryDropdown = Dropdown({
          name: "country",
          placeholder: "Select country",
          options: countries,
        });

        const stateDropdown = Dropdown({
          name: "state",
          placeholder: "Select state",
          options: [],
          disabled: true,
        });

        countryControl.append(countryDropdown);
        stateControl.append(stateDropdown);

        const updateTaxes = () => {
          const taxEl = el.querySelector(".js-tax-value");
          const totalEl = el.querySelector(".js-total-value");
          const flatLabel = el.querySelector('label[for="shipping-flat"]');
          const bestLabel = el.querySelector('label[for="shipping-best"]');
          const radioInputs = el.querySelectorAll('input[name="shipping"]');

          const subtotal = 120.0;

          if (currentCountry && currentRegion) {
            const rule = shippingTaxRules[currentCountry]?.[currentRegion];

            if (rule) {
              radioInputs.forEach((input) => (input.disabled = false));

              flatLabel.textContent = `Fixed ${rule.flatRate.toFixed(2)} EUR`;
              bestLabel.textContent = `Table Rate ${rule.bestWay.toFixed(
                2
              )} EUR`;

              const selectedMethod = el.querySelector(
                'input[name="shipping"]:checked'
              )?.id;
              const currentTax =
                selectedMethod === "shipping-flat"
                  ? rule.flatRate
                  : rule.bestWay;

              taxEl.textContent = `${currentTax.toFixed(2)} EUR`;
              totalEl.textContent = `${(subtotal + currentTax).toFixed(2)} EUR`;
              return;
            }
          }

          radioInputs.forEach((input) => (input.disabled = true));

          flatLabel.textContent = "Fixed 0.00 EUR";
          bestLabel.textContent = "Table Rate 0.00 EUR";
          taxEl.textContent = "0.00 EUR";
          totalEl.textContent = `${subtotal.toFixed(2)} EUR`;
        };

        countryDropdown.addEventListener("onChange", (event) => {
          currentCountry = event.detail;
          currentRegion = "";

          const regions = regionsByCountry[currentCountry] || [];
          stateDropdown.update({
            options: regions,
            disabled: regions.length === 0,
            defaultValue: "",
          });

          updateTaxes();
        });

        stateDropdown.addEventListener("onChange", (event) => {
          currentRegion = event.detail;
          updateTaxes();
        });

        el.addEventListener("change", (event) => {
          if (event.target.name === "shipping") {
            updateTaxes();
          }
        });

        updateTaxes();
      }
    },
  });
}

function createShipingEstimateContent() {
  return `
    <div class="shipping-estimate">
      <div class="shipping-estimate__fields">
        <div class="shipping-estimate__field">
          <div class="shipping-estimate__label">Country *</div>
          <div class="shipping-estimate__control_country"></div>
        </div>
        <div class="shipping-estimate__field">
          <div class="shipping-estimate__label">State/Province *</div>
          <div class="shipping-estimate__control_state"></div>
        </div>
      </div>

      <div class="shipping-methods">
        <div class="shipping-methods__item shipping-methods__item_flat-rate">
          <div class="order-summary__subtitle shipping-methods__title">Flat Rate</div>
          <div class="radio">
            <input type="radio" id="shipping-flat" name="shipping" disabled />
            <label for="shipping-flat" class="radio__label">Fixed 0.00 EUR</label>
          </div>
        </div>
        <div class="shipping-methods__item">
          <div class="order-summary__subtitle shipping-methods__title">Best Way</div>
          <div class="radio">
            <input type="radio" id="shipping-best" name="shipping" disabled />
            <label for="shipping-best" class="radio__label">Table Rate 0.00 EUR</label>
          </div>
        </div>
      </div>
    </div>
  `;
}
