import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { cartThunks } from "@/features/cart/model/cart-slice";
import { debounce } from "@/shared/helpers/debounce";
import { showToast } from "@/shared/ui/toast/toast";

export function renderProductDetailsCard(product, containerSelector) {
  if (!product || Object.keys(product).length === 0) {
    console.warn(
      "⚠️ renderProductDetailsCard: пустой или неверный объект product"
    );
    return;
  }

  if (!containerSelector || typeof containerSelector !== "string") {
    console.warn(
      "⚠️ renderProductDetailsCard: containerSelector должен быть строкой"
    );
    return;
  }

  const container = document.querySelector(containerSelector);
  const card = createProductDetailsCard(product);

  container.innerHTML = "";
  container.appendChild(card);
}

export function createProductDetailsCard(product) {
  const {
    id,
    product_images,
    title,
    sku,
    subtitle,
    composition,
    energy_value,
    energy_unit,
    shelf_life_days,
    storage_conditions,
    weight,
    weight_unit,
    packaging_types,
    discount_price,
    price,
    price_unit,
    product_statuses,
  } = product;

  const images = product_images?.sort((a, b) => a.sort_order - b.sort_order);
  const statuses = {
    regular: {
      name: "regular",
      class: "",
    },
    sale: {
      name: "Акция",
      class: "product-details-card__status_sale",
    },
    new: {
      name: "Новинка",
      class: "product-details-card__status_new",
    },
  };

  const card = document.createElement("div");
  card.className = "product-details-card";

  card.innerHTML = `
  <div class="product-details-card__col-1">
      <div class="product-details-card__image-wrapper">
          <div class="swiper product-details-card-swiper">
              <div class="swiper-wrapper">
                    ${images
                      .map(
                        (image, index) => `
                        <div class="swiper-slide">
                            <picture>
                                <source type="image/webp" srcset="${image.image_path_webp}">
                                <img class="product-details-card-swiper__image" src="${image.image_path_png}" loading="eager" alt="image-${index}" fetchpriority="high">
                            </picture>           
                        </div>
                    `
                      )
                      .join("")}
              </div>
          </div>
          <div class="product-details-card-swiper__next">
              <svg width="23" height="21" viewBox="0 0 23 21" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M13.4167 20.083L12.075 18.7414L19.3584 11.458H0V9.54137H19.3584L12.075 2.25801L13.4167 0.916374L23 10.4997L13.4167 20.083Z"
                      fill="none" />
              </svg>
          </div>
          <div class="product-details-card-swiper__prev">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9.58332 21.083L10.925 19.7414L3.64164 12.458H23V10.5414H3.64164L10.925 3.25801L9.58332 1.91637L0 11.4997L9.58332 21.083Z"
                      fill="none" />
              </svg>
          </div>
          <div class="product-details-card__zoom zoom">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_241_161)">
                      <path
                          d="M18.3691 17.3004L13.9977 12.9289C15.0813 11.6078 15.7344 9.91562 15.7344 8.07129C15.7344 3.84082 12.3018 0.408203 8.07129 0.408203C3.83711 0.408203 0.408203 3.84082 0.408203 8.07129C0.408203 12.3018 3.83711 15.7344 8.07129 15.7344C9.91562 15.7344 11.6041 15.085 12.9252 14.0014L17.2967 18.3691C17.5936 18.666 18.0723 18.666 18.3691 18.3691C18.666 18.076 18.666 17.5936 18.3691 17.3004ZM8.07129 14.2092C4.6832 14.2092 1.92969 11.4557 1.92969 8.07129C1.92969 4.68691 4.6832 1.92969 8.07129 1.92969C11.4557 1.92969 14.2129 4.68691 14.2129 8.07129C14.2129 11.4557 11.4557 14.2092 8.07129 14.2092Z"
                          fill="white" />
                  </g>
                  <defs>
                      <clipPath>
                          <rect width="19" height="19" fill="white" />
                      </clipPath>
                  </defs>
              </svg>
          </div>
      </div>
  </div>
  <div class="product-details-card__col-2">
      <div class="product-details-card__info info">
          <div class="info__top">
              <div class="info__title">${title}</div>
              <div class="info__sku">Арт: ${sku}</div>
          </div>
          <div class="info__subtitle">${subtitle}</div>
          <div class="info__properties properties">
              <div class="properties__composition properties__title">Состав:</div>
              <div class="properties__composition properties__value">${composition}</div>
              <div class="properties__weight properties__title">Масса нетто:</div>
              <div class="properties__weight properties__value">${weight}${weight_unit}.</div>
              <div class="properties__energy properties__title">Энергетическая ценность:</div>
              <div class="properties__energy properties__value">${energy_value} ${energy_unit}.</div>
              <div class="properties__shelf-life properties__title">Срок годности:</div>
              <div class="properties__shelf-life properties__value">${shelf_life_days} месяцев, с даты расфасовки
              (указана на упаковке)</div>
          </div>
          <div class="info__storage-conditions storage-conditions">
              <div class="storage-conditions__icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14" cy="14" r="14" fill="#93B474" />
                      <g clip-path="url(#clip0_14178_2724)">
                          <path
                              d="M14.1025 18.2978C13.1702 18.2978 12.4146 17.5424 12.4146 16.6099V7.68796C12.4146 6.7558 13.1703 6 14.1025 6C15.0345 6 15.7905 6.7558 15.7905 7.68796V16.6099C15.7906 17.5424 15.0348 18.2978 14.1025 18.2978Z"
                              fill="white" />
                          <path
                              d="M13.9942 23.0001C14.7932 23.0001 15.441 22.3523 15.441 21.5533C15.441 20.7542 14.7932 20.1064 13.9942 20.1064C13.1951 20.1064 12.5474 20.7542 12.5474 21.5533C12.5474 22.3523 13.1951 23.0001 13.9942 23.0001Z"
                              fill="white" />
                      </g>
                      <defs>
                          <clipPath id="clip0_14178_2724">
                              <rect width="21" height="21" fill="white" transform="translate(4 2)" />
                          </clipPath>
                      </defs>
                  </svg>
              </div>
              <div class="storage-conditions__text">${storage_conditions}</div>
          </div>
          <div class="info__bottom">
              <div class="info__price price">
                <span class="price__label">Ваша цена:</span>
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
                                ? "price__old-price"
                                : "price__current-price"
                            }">
                                <span class="price-number">${price}</span>&nbsp;${price_unit}.
                    </span>
                </span>
              </div>
              <a class="info__button button button_primary button_size-lg" href="#"
                  name="product-card-button" aria-label="Купить товар">
                  Заказать
              </a>
          </div>
      </div>
  </div>
    `;

  initProductDetailsCardSwiper(card);

  const addButton = card.querySelector(
    '.info__button[name="product-card-button"]'
  );

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

function initProductDetailsCardSwiper(cardElement) {
  const swiperEl = cardElement.querySelector(".product-details-card-swiper");

  if (!swiperEl) {
    return null;
  }

  return initSwiper(swiperEl, {
    slidesPerView: "auto",
    navigation: {
      nextEl: cardElement.querySelector(".product-details-card-swiper__next"),
      prevEl: cardElement.querySelector(".product-details-card-swiper__prev"),
    },
    modules: [Navigation],
  });
}
