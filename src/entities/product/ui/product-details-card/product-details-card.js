import Swiper from "swiper";
import { Thumbs } from "swiper/modules";

export const ProductDetailsCard = ({ container, product }) => {
  const mountPoint =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!mountPoint) {
    console.error("ProductDetailsCard: container not found");
    return;
  }

  if (!product) {
    console.error("ProductDetailsCard: product is required");
    return;
  }

  mountPoint.innerHTML = "";
  // --- create root ---
  const root = document.createElement("div");
  root.className = "product-details-card";

  // --- prepare images ---
  const images = product.images
    ?.slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((img) => img.image_path_jpg);

  // --- HTML ---
  root.innerHTML = `
    <div class="product-details-card__col product-details-card__col_media">
      <div class="product-details-card__slider"></div>
    </div>

    <div class="product-details-card__col product-details-card__col_info">
      info
    </div>
  `;

  mountPoint.appendChild(root);

  const slider = ProductDetailsCardSlider({
    container: root.querySelector(".product-details-card__slider"),
    images,
  });

  return {
    root,
    slider,
    destroy() {
      slider?.destroy();
      root.remove();
    },
  };
};

function ProductDetailsCardSlider({ container, images = [] }) {
  const mountPoint =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!mountPoint) {
    console.error("ProductDetailsCardSlider: container not found");
    return;
  }

  const root = document.createElement("div");
  root.className = "card-slider";

  root.innerHTML = `
  <div class="card-slider__col-1">
    <div class="card-slider__thumbs thumbs-slider swiper">
      <div class="swiper-wrapper">
        ${images
          .map(
            (src) => `
          <div class="swiper-slide">
            <div class="thumbs-slider__card">
              <img class="thumbs-slider__img" src="${src}" alt="thumbs image" />
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  </div>

    <div class="card-slider__main main-slider swiper">
      <div class="swiper-wrapper">
        ${images
          .map(
            (src) => `
            <div class="swiper-slide">
              <div class="main-slider__card">
                <img class="main-slider__img" src="${src}" alt="thumbs image" />
              </div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  mountPoint.appendChild(root);

  const thumbsSwiper = new Swiper(root.querySelector(".card-slider__thumbs"), {
    direction: "vertical",
    slidesPerView: "auto",
    spaceBetween: 12,

    watchSlidesProgress: true,
  });

  const mainSwiper = new Swiper(root.querySelector(".card-slider__main"), {
    modules: [Thumbs],
    spaceBetween: 10,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });

  return {
    root,
    thumbsSwiper,
    mainSwiper,
    destroy() {
      thumbsSwiper.destroy();
      mainSwiper.destroy();
      root.remove();
    },
  };
}
