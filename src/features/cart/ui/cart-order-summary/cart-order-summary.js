import { createComponent } from "@/shared/lib/core/core";
import { FormField } from "../../../../shared/ui/form-field/form-field";
import { Accordion2 } from "../../../../shared/ui/accordion/accordion";
import { Dropdown } from "../../../../shared/ui/dropdown/dropdown";

const COUNTRY_OPTIONS = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
];

const STATE_OPTIONS = [
  { value: "al", label: "Alaska" },
  { value: "ny", label: "New York" },
];

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        el.className = "order-summary";

        el.innerHTML = `
          <div class="order-summary__section">
            <div class="order-summary__block order-summary__block_discount">
              <h3 class="order-summary__title">Apply Discount Code</h3>
              <div class="order-summary__discount">
                ${FormField({
                  inputProps: { placeholder: "Enter discount code" },
                  withButton: true,
                  buttonText: "Apply Discount",
                  messageText: "Some error",
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
        
              <div class="order-summary__row order-summary__subtitle  order-summary__row_muted">
                <span>Tax</span>
                <span>0.00 EUR</span>
              </div>
        
              <div class="order-summary__row order-summary__row--total order-summary__title">
                <span>Order Total</span>
                <span>120.00 EUR</span>
              </div>
            </div>

            <div class="order-summary__divider"></div>
        

            <div class="order-summary__actions">
                <button class="button order-summary__link order-summary__link_muted">
                  Check Out with Multiple Addresses
                </button>
            
                <button class="order-summary__cta button button_solid button_black">
                  Proceed to checkout
                </button>           
          </div>
          


        `;

        el._els = {
          shippingContainer: el.querySelector(
            ".order-summary__block_shipping-estimate",
          ),
        };

        el._els.shippingAccordion = Accordion2({
          items: [
            {
              title: "Estimate Shipping and Tax",
              content: createShipingEstimateContent(),
              isActive: true,
            },
          ],
          isSingleOpen: true,
        });

        el._els.shippingContainer.append(el._els.shippingAccordion);

        const countryControl = el.querySelector(
          ".shipping-estimate__control_country",
        );
        const stateControl = el.querySelector(
          ".shipping-estimate__control_state",
        );

        if (countryControl) {
          countryControl.append(
            Dropdown({
              name: "country",
              placeholder: "Select country",
              options: [
                { value: "us", label: "United States" },
                { value: "ca", label: "Canada" },
              ],
            }),
          );
        }

        if (stateControl) {
          stateControl.append(
            Dropdown({
              name: "state",
              placeholder: "Select state",
              options: [
                { value: "al", label: "Alaska" },
                { value: "ny", label: "New York" },
              ],
            }),
          );
        }
      }
    },
  });
}

const createShipingEstimateContent = () => {
  return `
        <div class="order-summary__shipping-estimate-content shipping-estimate">
          <p class="shipping-estimate__description">
            Enter your destination to get a shipping estimate.
          </p>

          <div class="shipping-estimate__methods shipping-methods">
            <div class="shipping-estimate__fields">
              <div class="shipping-estimate__field">
                <div class="shipping-estimate__label">
                  Country <span class="shipping-estimate__required">*</span>
                </div>
                <div class="shipping-estimate__control_country"></div>
              </div>

              <div class="shipping-estimate__field">
                <div class="shipping-estimate__label">
                  State/Province <span class="shipping-estimate__required">*</span>
                </div>
                <div class="shipping-estimate__control_state"></div>
              </div>

              <div class="shipping-estimate__field">
                <div class="shipping-estimate__label">
                  Zip/Postal Code
                </div>
                <div class="shipping-estimate__control_postal-code">
                  ${FormField().toHTML()}
                </div>
              </div>
            </div>

            <div class="shipping-methods__item shipping-methods__item_flat-rate">
              <div class="shipping-methods__title order-summary__subtitle">
                Flat Rate
              </div>

              <div class="shipping-methods__radio radio">
                <input
                  type="radio"
                  id="shipping-flat"
                  name="shipping"
                  checked
                />
                <label for="shipping-flat" class="radio__label">
                  Fixed 5.00 EUR
                </label>
              </div>
            </div>

            <div class="shipping-methods__item shipping-methods__item_best-way">
              <div class="shipping-methods__title order-summary__subtitle">
                Best Way
              </div>

              <div class="shipping-methods__radio radio">
                <input
                  type="radio"
                  id="shipping-best"
                  name="shipping"
                />
                <label for="shipping-best" class="radio__label">
                  Table Rate 10.00 EUR
                </label>
              </div>
            </div>
          </div>
        </div>

  `;
};
