import { productsApi } from "@/entities/product/api/products";
import { initProductSlider } from "@/entities/product/ui/product-slider/product-slider";

export const initRecomendationSection = async () => {
  const commonOptions = {
    totalLimit: 16,
    pageSizeMobile: 4,
    swiperOptions: {
      breakpoints: {
        471: { slidesPerView: 3, spaceBetween: 16 },
        1024: { slidesPerView: 4, spaceBetween: 20 },
        1920: { slidesPerView: 5, spaceBetween: 27 },
      },
    },
  };

  initProductSlider({
    ...commonOptions,
    containerSelector: ".featured-slider__slider-container",
    fetchProducts: productsApi.getFeaturedProducts,
    navSelectors: {
      prevEl: ".featured-slider__left-nav",
      nextEl: ".featured-slider__right-nav",
    },
  });
};
