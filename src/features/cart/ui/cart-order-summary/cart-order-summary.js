import { createComponent } from "@/shared/lib/core/core";
import { FormField } from "../../../../shared/ui/form-field/form-field";
import { Accordion2 } from "../../../../shared/ui/accordion/accordion";

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { subtotal = 0, tax = 0, total = 0, currency = "$" } = props;

      if (runOnce) {
        el.className = "order-summary";

        el.innerHTML = `
        <div class="order-summary__section ">
          <div class="order-summary__block order-summary__block_discount">
            <h3 class="order-summary__title">Apply Discount Code</h3>
            <div class="order-summary__discount">
              ${FormField({
                placeholder: "Enter discount code",
                withButton: true,
                buttonText: "Apply Discount",
                messageText: "Some error",
              })}
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

        </div> 
        `;

        el._els = {
          accordionContainer: el.querySelector(
            ".order-summary__block_shipping-estimate",
          ),
          shippingAccordion: Accordion2({
            items: [
              {
                title: "Estimate Shipping and Tax",
                content: createShipingEstimateContent(),
                isActive: true,
              },
            ],
            isSingleOpen: true,
          }),
        };
      }

      el._els.accordionContainer.append(el._els.shippingAccordion);
    },
  });
}

const createShipingEstimateContent = () => {
  return `
    <div class="order-summary__shipping-estimate-content shipping-estimate-content">
      <p class="shipping-estimate-content__description">
        Enter your destination to get a shipping estimate.
      </p>

      <div class="shipping-estimate-content__shipping shipping">
        <div class="shipping__field shipping__field_country"></div>
        <div class="shipping__field shipping__field_region"></div>
        <div class="shipping__field shipping__field_zip-code"></div>

        <div class="shipping__field shipping__field_flat-rate">
          <div class="shipping__subtitle order-summary__subtitle">Flat Rate</div>

          <div class="shipping__radio radio">
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

        <div class="shipping__field shipping__field_best-way">
          <div class="shipping__subtitle order-summary__subtitle">Best Way</div>

          <div class="shipping__radio radio">
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
