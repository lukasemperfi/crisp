import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { cartThunks } from "@/features/cart/model/cart-slice";
import { debounce } from "@/shared/helpers/debounce";
import { showToast } from "@/shared/ui/toast/toast";

const baseUrl =
  import.meta.env.MODE === "development"
    ? "/"
    : import.meta.env.VITE_PROD_URL || "";

export function createProductCard(product) {
  const {
    id,
    product_images,
    title,
    sku,
    subtitle,
    weight,
    weight_unit,
    packaging_types,
    discount_price,
    price,
    price_unit,
    product_statuses,
  } = product;
  const images = product_images.sort((a, b) => a.sort_order - b.sort_order);
  const statuses = {
    regular: {
      name: "regular",
      class: "",
    },
    sale: {
      name: "Акция",
      class: "product-card__status_sale",
    },
    new: {
      name: "Новинка",
      class: "product-card__status_new",
    },
  };

  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <div class="product-card__badge">-30%</div>
    <div class="product-card__image">
        <picture>
            <source type="image/webp" srcset="">
            <img class="product-card-__image" src="/images/products/img-1.jpg" loading="eager" alt="image" fetchpriority="high">
        </picture>
    </div>
    <div class="product-card__category">TOP women</div>
    <div class="product-card__name">Angels malu zip jeans slim black used</div>
    <div class="product-card__price price">
        <div class="price__current">139,00 EUR</div>
        <div class="price__old">119,00 EUR</div>
    </div>
    `;

  // const addButton = card.querySelector(".product-card__buy-button");

  // const addItemHandler = (id) => {
  //   cartThunks.addItem(String(id));
  //   showToast("Товар успешно добавлен в корзину!", "success");
  // };

  // const debouncedAddItem = debounce(addItemHandler, 300);

  // addButton.addEventListener("click", () => {
  //   debouncedAddItem(id);
  // });

  return card;
}
