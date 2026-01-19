import { createComponent } from "@/shared/lib/core/core";
import { FormField } from "../../../../shared/ui/form-field/form-field";

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
      
          <div class="order-summary__block">
            <div class="order-summary__header">
              <h3 class="order-summary__title">Estimate Shipping and Tax</h3>
              <span class="order-summary__icon"></span>
            </div>
      
            <p class="order-summary__description">
              Enter your destination to get a shipping estimate.
            </p>
      
            <div class="order-summary__form">
              <label class="order-summary__label">
                Country <span class="order-summary__required">*</span>
                <div class="order-summary__select">
                  <span>United States</span>
                  <span class="order-summary__chevron"></span>
                </div>
              </label>
      
              <label class="order-summary__label">
                State/Province <span class="order-summary__required">*</span>
                <div class="order-summary__select">
                  <span>Alaska</span>
                  <span class="order-summary__chevron"></span>
                </div>
              </label>
      
              <label class="order-summary__label">
                Zip/Postal Code
                <input type="text" class="order-summary__input" />
              </label>
            </div>
      
            <div class="order-summary__shipping">
              <label class="order-summary__radio">
                <input type="radio" name="shipping" checked />
                <span class="order-summary__radio-control"></span>
      
                <div class="order-summary__radio-content">
                  <span class="order-summary__radio-title order-summary__subtitle">Flat Rate</span>
                  <span class="order-summary__radio-text">Fixed 5.00 EUR</span>
                </div>
              </label>
      
              <label class="order-summary__radio">
                <input type="radio" name="shipping" />
                <span class="order-summary__radio-control"></span>
      
                <div class="order-summary__radio-content">
                  <span class="order-summary__radio-title order-summary__subtitle">Best Way</span>
                  <span class="order-summary__radio-text order-summary__radio-text">
                    Table Rate 10.00 EUR
                  </span>
                </div>
              </label>
            </div>
          </div>
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
      }
    },
  });
}

// export function CartOrderSummary(props) {
//   return createComponent(props, {
//     tag: "div",

//     render(el, props, emit, { runOnce }) {
//       const { subtotal = 0, tax = 0, total = 0, currency = "$" } = props;

//       if (runOnce) {
//         el.className = "cart-order-summary";

//         el.innerHTML = `
//             <div class="cart-order-summary__options">
//                 <div class="cart-order-summary__promo-code">
//                     <div class="cart-order-summary__title">Apply Discount Code</div>
//                     <input type="text" placeholder="Введите промокод">
//                 </div>

//                 <div class="cart-order-summary__shipping-estimator">
//                     <div class="cart-order-summary__title">Estimate Shipping and Tax</div>
//                 </div>
//             </div>
//             <div class="cart-order-summary__order-total">
//                 <div class="cart-order-summary__subtitle"><span>Subtotal</span><span>$0.00</span></div>
//                 <div class="cart-order-summary__subtitle"><span>Tax</span><span>$0.00</span></div>
//                 <div class="cart-order-summary__title"><span>Order Total</span><span>$0.00</span></div>
//                 <hr>
//                 <div class="cart-order-summary__footer">
//                     <a class="cart-order-summary__multiple-address" href="#">Check Out with Multiple Addresses</a>
//                     <button class="button button_solid button_black">proceed to checkout</button>
//                 </div>
//             </div>
//         `;

//         el._els = {
//           subtotal: el.querySelector(".js-subtotal"),
//           tax: el.querySelector(".js-tax"),
//           total: el.querySelector(".js-total"),
//         };
//       }

//       //   el._els.subtotal.textContent = `${currency}${subtotal.toFixed(2)}`;
//       //   el._els.tax.textContent = `${currency}${tax.toFixed(2)}`;
//       //   el._els.total.textContent = `${currency}${total.toFixed(2)}`;
//     },
//   });
// }
