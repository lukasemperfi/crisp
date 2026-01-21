import { createComponent } from "@/shared/lib/core/core";
import { CartProductCard } from "@/features/cart/ui/cart-product-card/cart-product-card";
import { IconCross2 } from "../../../../shared/ui/icons/icons";
import { OrderCard } from "../order-card/order-card";

export function MiniCart(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { items = [] } = props;

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
                  <span>$123.00</span>
                </div>
            
                <button class="mini-cart__cart-btn button button_outlined button_gray button_fill" type="button">
                  View and edit cart
                </button>
                <button class="mini-cart__checkout-btn button button_solid button_black button_fill" type="button">
                  Go to checkout
              </button>
              </footer> 
          `;

        el._els = {
          list: el.querySelector(".mini-cart__items"),
        };
      }

      renderList(el._els.list, items);
    },
  });
}

function renderList(container, products) {
  container.innerHTML = "";

  if (!products || !Array.isArray(products)) {
    return;
  }

  products.forEach((product) => {
    const productCard = OrderCard({ product });

    container.appendChild(productCard);
  });
}
