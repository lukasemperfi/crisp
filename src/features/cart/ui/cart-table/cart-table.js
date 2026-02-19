import { createComponent } from "@/shared/lib/core/core";
import { CartProductCard } from "@/features/cart/ui/cart-product-card/cart-product-card";
import { baseUrl } from "@/shared/helpers/base-url";
import { cartThunks } from "../../model/cart-slice";

export function CartTable(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { items = [], userId } = props;

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
                <button class="button button_elevated button_gray continue-shopping-btn">continue shopping</button>
                <button class="button button_elevated button_gray clear-cart-btn">clear shopping cart</button>
          </footer>
          `;

        el._els = {
          list: el.querySelector(".cart-table__list"),
          continueShoppingBtn: el.querySelector(".continue-shopping-btn"),
          clearCartBtn: el.querySelector(".clear-cart-btn"),
        };
        el._els.continueShoppingBtn.addEventListener("click", () => {
          window.location.href = `${baseUrl}catalog/`;
        });
        el._els.clearCartBtn.addEventListener("click", () => {
          cartThunks.clearCart();
          renderList(el._els.list, [], userId);
        });
      }

      renderList(el._els.list, items, userId);
    },
  });
}

function renderList(container, products, userId) {
  container.innerHTML = "";

  if (!products || !Array.isArray(products) || products.length === 0) {
    container.innerHTML = `<div class="cart-table__empty-message">Cart is empty</div>`;
    return;
  }

  products.forEach((product) => {
    const productCard = CartProductCard({ product, userId });

    container.appendChild(productCard);
  });
}
