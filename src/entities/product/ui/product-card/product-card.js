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
            <div class="swiper product-card-swiper">
                <div class="swiper-wrapper">
                    ${images
                      .map(
                        (image, index) => `
                        <div class="swiper-slide">
                            <picture>
                                <source type="image/webp" srcset="${image.image_path_webp}">
                                <img class="product-card-swiper__image" src="${image.image_path_png}" loading="eager" alt="image-${index}" fetchpriority="high">
                            </picture>           
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            <div class="product-card-swiper__next">
            <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4167 20.083L12.075 18.7414L19.3584 11.458H0V9.54137H19.3584L12.075 2.25801L13.4167 0.916374L23 10.4997L13.4167 20.083Z"
                fill="none" />
        </svg>
            </div>
            <div class="product-card-swiper__prev">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.58332 21.083L10.925 19.7414L3.64164 12.458H23V10.5414H3.64164L10.925 3.25801L9.58332 1.91637L0 11.4997L9.58332 21.083Z"
                fill="none" />
        </svg>
            </div>
            <div class="product-card__zoom zoom">
                
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <div class="product-card__middle">
            <a class="product-card__title" href="${baseUrl}product/?id=${id}" name="product-card-title" aria-label="Перейти к товару">${title}</a>
            <div class="product-card__sku sku">
                <span class="sku__label">Арт:</span>
                <span class="sku__value">${sku}</span>
            </div>
            <div class="product-card__subtitle">${subtitle}</div>
            <div class="product-card__attributes">
                <div class="attributes__weight weight">
                    <div class="weight__icon-wrapper">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M16.9236 16.1065C16.7934 15.6621 14.6736 7.72638 14.3852 6.64644C14.0979 5.56702 13.347 5.27838 12.501 5.27838C12.2093 5.27838 11.0843 5.27838 9.74347 5.27838V4.28109C14.8724 3.80376 16.2402 0 16.2402 0H1.42024C1.42024 0 2.56722 4.01798 8.0516 4.30307V5.27782C6.80382 5.27782 5.77631 5.27782 5.49949 5.27782C4.65354 5.27782 3.90318 5.56645 3.61506 6.64592C3.32718 7.72586 1.20763 15.6615 1.07718 16.106C0.914593 16.663 0.965134 17.3903 2.09859 17.3903C2.2236 17.3903 2.50704 17.3903 2.90801 17.3903V18H14.9537V17.3908C15.4239 17.3908 15.7628 17.3908 15.9007 17.3908C17.0356 17.3908 17.0861 16.6635 16.9236 16.1065ZM9.00053 6.30887C11.7775 6.30887 14.0276 8.55778 14.0276 11.3346C14.0276 14.1113 11.7775 16.3608 9.00053 16.3608C6.22456 16.3608 3.97452 14.1114 3.97452 11.3346C3.97452 8.55773 6.22451 6.30887 9.00053 6.30887Z"
                        fill="#337D5A" />
                    <path
                        d="M6.11453 9.12209L5.59872 8.75488L5.44629 8.96858L5.95468 9.32917C6.00191 9.2566 6.06039 9.19183 6.11453 9.12209Z"
                        fill="#337D5A" />
                    <path
                        d="M7.53345 7.99626L7.25224 7.42773L7.0166 7.54475L7.3033 8.12183C7.38051 8.08084 7.45355 8.03252 7.53345 7.99626Z"
                        fill="#337D5A" />
                    <path
                        d="M5.35009 11.3347C5.35009 11.305 5.3586 11.2781 5.35969 11.249H4.71973V11.511H5.3682C5.36603 11.4512 5.35009 11.3951 5.35009 11.3347Z"
                        fill="#337D5A" />
                    <path
                        d="M12.9444 9.41075L12.8186 9.18164L12.1611 9.54148C12.2029 9.61618 12.2474 9.6931 12.2859 9.77055L12.9444 9.41075Z"
                        fill="#337D5A" />
                    <path
                        d="M11.4185 7.72106L11.1933 7.58594L10.8291 8.19238C10.9044 8.23687 10.9851 8.27228 11.0587 8.32122L11.4185 7.72106Z"
                        fill="#337D5A" />
                    <path
                        d="M9.19687 7.70474V7.03125H8.93457V7.69098C8.95655 7.69098 8.97797 7.68493 8.99996 7.68493C9.06804 7.68493 9.1304 7.70114 9.19687 7.70474Z"
                        fill="#337D5A" />
                    <path
                        d="M11.1158 15.2162L10.7654 14.5098C10.6895 14.5531 10.6143 14.5998 10.5352 14.6361L10.8796 15.3327L11.1158 15.2162Z"
                        fill="#337D5A" />
                    <path
                        d="M12.6859 13.7916L12.047 13.3379C11.9997 13.4115 11.9404 13.4763 11.8877 13.545L12.5331 14.0048L12.6859 13.7916Z"
                        fill="#337D5A" />
                    <path
                        d="M12.6508 11.3343C12.6508 11.3942 12.6365 11.4508 12.6338 11.5101H13.4138V11.248H12.6431C12.6425 11.2783 12.6508 11.3046 12.6508 11.3343Z"
                        fill="#337D5A" />
                    <path
                        d="M8.93457 14.9786V15.7262H9.19687V14.9648C9.1304 14.9682 9.06804 14.9846 8.99996 14.9846C8.97797 14.9847 8.95655 14.9786 8.93457 14.9786Z"
                        fill="#337D5A" />
                    <path
                        d="M5.78228 13.0195L5.18652 13.3436L5.31262 13.5733L5.90615 13.2503C5.86109 13.175 5.82237 13.0976 5.78228 13.0195Z"
                        fill="#337D5A" />
                    <path
                        d="M7.31185 14.5516C7.23355 14.5104 7.15526 14.4708 7.08056 14.4258L6.71387 15.0355L6.93882 15.1707L7.31185 14.5516Z"
                        fill="#337D5A" />
                    <path
                        d="M7.46191 13.89L7.66379 14.0043L8.92831 11.8889C8.97994 11.9004 9.02778 11.9202 9.08244 11.9202C9.52676 11.9202 9.88608 11.5604 9.88608 11.1171C9.88608 10.6732 9.52676 10.3135 9.08244 10.3135C8.63967 10.3135 8.2796 10.6732 8.2796 11.1171C8.2796 11.3709 8.4046 11.5873 8.58861 11.7356L7.46191 13.89ZM9.08291 10.8874C9.21122 10.8874 9.31363 10.9908 9.31363 11.1171C9.31363 11.244 9.21066 11.3477 9.08291 11.3477C8.95578 11.3477 8.85384 11.244 8.85384 11.1171C8.85384 10.9907 8.95578 10.8874 9.08291 10.8874Z"
                        fill="#337D5A" />
                </svg>
                    </div>
                    <div class="weight__value-wrapper">
                        <span class="weight__label">Масса:</span>
                        <span class="weight__value">${weight}${weight_unit}.</span>
                    </div>
                </div>
                <div class="attributes__packaging packaging">
                    <div class="packaging__icon-wrapper">
                      <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M11.4292 3.64492H8.31671V2.38667C8.31671 1.07072 7.27835 0 6.0013 0C4.7245 0 3.68563 1.07072 3.68563 2.38667V3.64492H0.570591L0 17.0948H12L11.4292 3.64492ZM4.20677 2.3864C4.20677 1.36691 5.01242 0.536862 6.00159 0.536862C6.99047 0.536862 7.79508 1.36721 7.79508 2.3864V3.64466H4.20677V2.3864Z"
                          fill="#337D5A" />
                      </svg>
                    </div>
                    <div class="packaging__value-wrapper">
                        <span class="packaging__label">Упаковка:</span>
                        <span class="packaging__value">${
                          packaging_types.name
                        }</span>
                    </div>
                </div>
            </div>
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
                        ? "price__old-price"
                        : "price__current-price"
                    }">
                        <span class="price-number">${price}</span>&nbsp;${price_unit}.
                    </span>
                </span>
            </div>
            <button class="bottom__button button button_primary button_size-sm product-card__buy-button"  name="product-card-button" aria-label="Купить товар">
                Купить
            </button>
        </div>
    `;

  initProductCardSwiper(card);

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

function initProductCardSwiper(cardElement) {
  const swiperEl = cardElement.querySelector(".product-card-swiper");

  if (!swiperEl) {
    return null;
  }

  return initSwiper(swiperEl, {
    slidesPerView: 1,
    navigation: {
      nextEl: cardElement.querySelector(".product-card-swiper__next"),
      prevEl: cardElement.querySelector(".product-card-swiper__prev"),
    },
    modules: [Navigation],
  });
}
