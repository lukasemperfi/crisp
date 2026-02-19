import { createComponent } from "@/shared/lib/core/core";
import { IconCross2 } from "@/shared/ui/icons/icons";
import { OrderCard } from "../order-card/order-card";
import { baseUrl } from "@/shared/helpers/base-url";
import { formatPrice } from "@/shared/helpers/format-price";

export function MiniCart(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { items = [], totalSum = 0 } = props;

      if (runOnce) {
        el.className = "mini-cart";

        el.innerHTML = `
              <header class="mini-cart__header">
                <button 
                class="mini-cart__close" 
                type="button"
                popovertarget="cart-item__popover"
                popovertargetaction="hide"
                aria-label="Close"             
                >
                  ${IconCross2({
                    size: 23,
                    className: "mini-cart__close-icon",
                  })}
                </button>
              </header>
            
              <div class="mini-cart__body">
                <div class="mini-cart__items"></div>
              </div>
            
              <footer class="mini-cart__footer">
                <div class="mini-cart__total">
                  <span>Cart Subtotal:</span>
                  <span class="mini-cart__total-sum">${totalSum} EUR</span>
                </div>
            
                <a href="${baseUrl}cart/" class="mini-cart__cart-btn button button_outlined button_gray button_fill" type="button">
                  View and edit cart
                </a>
                <a href="${baseUrl}checkout/" name="checkout" class="mini-cart__checkout-btn button button_solid button_black button_fill" type="button">
                  Go to checkout
              </a>
              </footer> 
          `;

        el._els = {
          list: el.querySelector(".mini-cart__items"),
          totalSum: el.querySelector(".mini-cart__total-sum"),
          footer: el.querySelector(".mini-cart__footer"),
        };
      }

      const isEmpty = items.length === 0;

      // Управляем видимостью футера
      el._els.footer.style.display = isEmpty ? "none" : "block";

      renderList(el._els.list, items);
      el._els.totalSum.textContent = `${formatPrice(totalSum)} EUR`;
    },
  });
}

function renderList(container, products) {
  container.innerHTML = "";

  if (!products || !Array.isArray(products) || products.length === 0) {
    container.innerHTML = `<div class="mini-cart__empty-message">Cart is Empty</div>`;
    return;
  }

  products.forEach((product) => {
    const productCard = OrderCard({ product });

    container.appendChild(productCard);
  });
}
