import { createComponent, createSlot } from "@/shared/lib/core/core";

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { subtotal = 0, tax = 0, total = 0, currency = "$" } = props;

      if (runOnce) {
        el.className = "order-summary";

        el.innerHTML = `
        <div class="order-summary__section order-summary__section--top">
          <div class="order-summary__block">
            <h3 class="order-summary__title">Apply Discount Code</h3>
      
            <div class="order-summary__field order-summary__field--inline">
              <input
                type="text"
                class="order-summary__input"
                placeholder="Enter discount code"
              />
              <button type="button" class="order-summary__button">
                Apply Discount
              </button>
            </div>
          </div>
      
          <div class="order-summary__block">
            <div class="order-summary__header">
              <h3 class="order-summary__title">Estimate Shipping and Tax</h3>
              <span class="order-summary__icon order-summary__icon--collapse"></span>
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
                  <span class="order-summary__radio-title">Flat Rate</span>
                  <span class="order-summary__radio-text">Fixed 5.00 EUR</span>
                </div>
              </label>
      
              <label class="order-summary__radio">
                <input type="radio" name="shipping" />
                <span class="order-summary__radio-control"></span>
      
                <div class="order-summary__radio-content">
                  <span class="order-summary__radio-title">Best Way</span>
                  <span class="order-summary__radio-text order-summary__radio-text--muted">
                    Table Rate 10.00 EUR
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>
      
        <div class="order-summary__section order-summary__section--bottom">
          <div class="order-summary__totals">
            <div class="order-summary__row">
              <span>Subtotal</span>
              <span>120.00 EUR</span>
            </div>
      
            <div class="order-summary__row order-summary__row--muted">
              <span>Tax</span>
              <span>0.00 EUR</span>
            </div>
      
            <div class="order-summary__divider"></div>
      
            <div class="order-summary__row order-summary__row--total">
              <span>Order Total</span>
              <span>120.00 EUR</span>
            </div>
          </div>
      
          <button class="order-summary__link">
            Check Out with Multiple Addresses
          </button>
      
          <button class="order-summary__cta">
            Proceed to checkout
          </button>
        </div>

            
        `;

        el._els = {
          subtotal: el.querySelector(".js-subtotal"),
          tax: el.querySelector(".js-tax"),
          total: el.querySelector(".js-total"),
        };
      }

      //   el._els.subtotal.textContent = `${currency}${subtotal.toFixed(2)}`;
      //   el._els.tax.textContent = `${currency}${tax.toFixed(2)}`;
      //   el._els.total.textContent = `${currency}${total.toFixed(2)}`;
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
