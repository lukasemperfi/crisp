import { baseUrl } from "@/shared/helpers/base-url";

export function createProductCard(product) {
  const {
    id,
    name,
    category,
    price,
    discountRate,
    images = [],
    badge = {},
  } = product;

  const mainImage = images.find((img) => img.is_main) || images[0];
  const hasDiscount = discountRate > 0;
  const currentPrice = hasDiscount ? price * (1 - discountRate) : price;
  const oldPrice = hasDiscount ? price : null;
  const discountPercent = hasDiscount ? Math.round(discountRate * 100) : null;

  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    ${
      hasDiscount
        ? `<div class="product-card__badge">-${discountPercent}%</div>`
        : ""
    }

    <div class="product-card__image">

        <img
          class="product-card__image"
          src="${baseUrl}${mainImage?.image_path_jpg || ""}"
          loading="eager"
          alt="${name}"
          fetchpriority="high"
        >
    </div>

<div class="product-card__category">${badge.label}</div>


    <div class="product-card__name">${name}</div>

    <div class="product-card__price price">
      <div class="price__current">
        ${formatPrice(currentPrice)}
      </div>
      ${
        hasDiscount
          ? `<div class="price__old">${formatPrice(oldPrice)}</div>`
          : ""
      }
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

function formatPrice(value, currency = "EUR", locale = "de-DE") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

{
  /* <picture>
<source
  type="image/webp"
  srcset="${baseUrl}${mainImage?.image_path_webp || ""}"
>
<img
  class="product-card__image"
  src="${baseUrl}${mainImage?.image_path_jpg || ""}"
  loading="eager"
  alt="${name}"
  fetchpriority="high"
>
</picture> */
}
