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
        ${
          product_statuses.name !== "regular"
            ? `<div class="product-card__status ${
                statuses[product_statuses.name].class
              }">${statuses[product_statuses.name].name}</div>`
            : ""
        }
        <div class="product-card__image-wrapper">
        <picture>
            <source type="image/webp" srcset="">
            <img class="product-card-swiper__image" src="" loading="eager" alt="image" fetchpriority="high">
        </picture>
    </div>
    <div class="product-card__middle">
        <a class="product-card__title" href="${baseUrl}product/?id=${id}" name="product-card-title"
            aria-label="Перейти к товару">${title}</a>
        <div class="product-card__subtitle">${subtitle}</div>
    </div>
    <div class="product-card__bottom">
        <div class="bottom__price price">
            <span class="price__label">Цена:</span>
            <span class="price__value">
                ${
                  discount_price !== null
                    ? `<span class="price__current-price">
                    <span class="price-number">${discount_price}</span>&nbsp;${price_unit}.
                </span>`
                    : ""
                }
                <span class="${
                  discount_price !== null
                    ? " price__old-price"
                    : "price__current-price"
                }">
                    <span class="price-number">${price}</span>&nbsp;${price_unit}.
                </span>
            </span>
        </div>
        <button></button>
    </div>
    `;

  const addButton = card.querySelector(".product-card__buy-button");

  const addItemHandler = (id) => {
    cartThunks.addItem(String(id));
    showToast("Товар успешно добавлен в корзину!", "success");
  };

  const debouncedAddItem = debounce(addItemHandler, 300);

  addButton.addEventListener("click", () => {
    debouncedAddItem(id);
  });

  return card;
}
