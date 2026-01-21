import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initCartContent } from "./sections/cart-content/cart-content";
import { MiniCart } from "../../features/cart/ui/mini-cart/mini-cart";
import { mockProducts } from "@/shared/helpers/mock-products";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initCartContent();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  const container = document.querySelector(".cart-page");
  const miniCart = MiniCart({ items: products });

  container.append(miniCart);
});

const products = mockProducts
  .map((product) => {
    const { variants, ...rest } = product;
    return {
      ...rest,
      sku: 434536465,
      quantity: 3,
      variant: variants[0],
    };
  })
  .slice(0, 5);
