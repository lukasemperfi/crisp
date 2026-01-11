import { baseUrl } from "@/shared/helpers/base-url";
import { ColorFilter } from "@/features/product-filters/ui/color/color";

export function createProductCard(product) {
  const {
    id,
    name,
    brand,
    base_price: price,
    discount_percent: discountRate,
    images = [],
    variants,
    tags,
  } = product;
  const tag = tags && tags.length > 0 ? tags[0].tag.name : "Uncategorized";
  const mainImage = images.find((img) => img.is_main) || images[0];
  const hasDiscount = discountRate > 0;
  const currentPrice = hasDiscount ? price * (1 - discountRate / 100) : price;
  const oldPrice = hasDiscount ? price : null;
  const discountPercent = discountRate;

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
          src="${mainImage?.image_path_jpg || ""}"
          loading="eager"
          alt="${name}"
          fetchpriority="high"
        >
    </div>

    <div class="product-card__category">${tag}</div>
    <a href="${baseUrl}product/?id=${id}" class="product-card__name">${name}</a>
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
    <div class="product-card__color"></div
  `;

  const uniqueColors = [
    ...new Map(
      variants.map((item) => [
        item.color.id,
        {
          ...item.color,
          available: true,
        },
      ])
    ).values(),
  ];

  ColorFilter(card.querySelector(".product-card__color"), {
    colors: uniqueColors,
    showTitle: false,
    selectionMode: "single",
  });

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
