import { createComponent } from "@/shared/lib/core/core";
import { CartProductCard } from "@/features/cart/ui/cart-product-card/cart-product-card";

export function CartTable(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { items = [] } = props;

      if (runOnce) {
        el.className = "cart-table";

        el.innerHTML = `
          <header class="cart-table__header cart-table-header">
             <div class="cart-table-header__title">Product</div> 
             <div class="cart-table-header__title">Price</div> 
             <div class="cart-table-header__title">Size</div> 
             <div class="cart-table-header__title">Quantity</div> 
             <div class="cart-table-header__title">Total</div> 
             <div class="cart-table-header__title"></div>   
          </header>
          <div class="cart-table__list"></div> 
          <footer class="cart-table__footer">
                <button class="button button_elevated button_gray">continue shopping</button>
                <button class="button button_elevated button_gray">clear shopping cart</button>
          </footer>
          `;

        el._els = {
          list: el.querySelector(".cart-table__list"),
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
    const productCard = CartProductCard({ product });

    container.appendChild(productCard);
  });
}
