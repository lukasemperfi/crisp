import { createComponent, createSlot } from "@/shared/lib/core/core";

export function CartOrderSummary(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { subtotal = 0, tax = 0, total = 0, currency = "$" } = props;

      if (runOnce) {
        el.className = "cart-order-summary";

        el.innerHTML = `
            <div class="cart-order-summary__options">
                <div class="cart-order-summary__promo-code">
                    <div class="cart-order-summary__title">Apply Discount Code</div>
                    <input type="text" placeholder="Введите промокод">
                </div>

                <div class="cart-order-summary__shipping-estimator">
                    <div class="cart-order-summary__title">Estimate Shipping and Tax</div>
                </div>        
            </div>
            <div class="cart-order-summary__order-total">
                <div class="cart-order-summary__subtitle"><span>Subtotal</span><span>$0.00</span></div>
                <div class="cart-order-summary__subtitle"><span>Tax</span><span>$0.00</span></div>
                <div class="cart-order-summary__title"><span>Order Total</span><span>$0.00</span></div>
                <hr>
                <div class="cart-order-summary__footer">
                    <a class="cart-order-summary__multiple-address" href="#">Check Out with Multiple Addresses</a>
                    <button class="button button_solid button_black">proceed to checkout</button>                
                </div>
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
