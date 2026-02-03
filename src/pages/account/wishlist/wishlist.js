import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { userProfileApi } from "../../../entities/account/api/profile";
import { delay } from "../../../shared/helpers/delay";
import {
  ProductList,
  ProductList2,
} from "../../../entities/product/ui/product-list/product-list";
import { mockProducts } from "../../../shared/helpers/mock-products";
import { createProductCard } from "../../../entities/product/ui/product-card/product-card";
import { IconCross, IconEdit, IconHeart } from "@/shared/ui/icons/icons";
import { CartProductCard } from "../../../features/cart/ui/cart-product-card/cart-product-card";
import { productsApi } from "../../../entities/product/api/products";
import { supabase } from "../../../shared/api/supabase/client";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".wishlist-page__breadcrumbs");
  initProfileSection();
  initPageFooter();

  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id || null;

  const products = await productsApi.getWishlistProducts(userId);

  document
    .querySelector(".profile-section__content")
    .append(Wihslist(products, userId));
});

function Wihslist(products, userId) {
  const el = document.createElement("div");
  el.className = "wishlist";

  el.innerHTML = `
    <div class="wishlist__actions">
      <button class="button button_elevated button_gray">share wish list</button>
      <button class="button button_elevated button_gray">update wish list</button>
      <button class="button button_elevated button_gray">Add all to cart</button>
    </div>  
  `;

  const productList2 = new ProductList2({
    initialProducts: products,
    renderItem: (product) => WihslistCard(product, userId),
  });

  el.prepend(productList2.getElement());

  return el;
}

function WihslistCard(product, userId) {
  const el = document.createElement("div");

  el.className = "wishlist-card";

  el.innerHTML = `
    <div class="wishlist-card__actions actions">
      <button class="actions__btn actions__btn_remove">
        ${IconCross()}  
      </button>
      <button class="actions__btn actions__btn_edit">
        ${IconEdit()}
      </button>
    </div>  
  `;

  const card = createProductCard(product);

  el.prepend(card);

  const removeBtn = el.querySelector(".actions__btn_remove");

  removeBtn.addEventListener("click", async (e) => {
    await productsApi.removeFromWishlist(userId, product.id);
    location.reload();
  });

  return el;
}
