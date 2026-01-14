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
             <div class="cart-table-header__col-1">Product</div> 
             <div class="cart-table-header__col-2">Price</div> 
             <div class="cart-table-header__col-3">Size</div> 
             <div class="cart-table-header__col-4">Quantity</div> 
             <div class="cart-table-header__col-5">Total</div> 
             <div class="cart-table-header__col-6"></div>   
          </header>
          <div class="cart-table__body">
            <div class="cart-table__list"></div> 
          </div>
          <footer class="cart-table__footer">
            <div class="cart-table__actions">
                <button class="button button_elevated button_gray">continue shopping</button>
                <button class="button button_elevated button_gray">clear shopping cart</button>
            </div> 
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
