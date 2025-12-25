import { renderSlider } from "@/shared/ui/slider/slider";
import { mockProducts } from "@/shared/helpers/mock-products";
import { createProductCard } from "@/entities/product/ui/product-card/product-card";
import { Navigation } from "swiper/modules";

export const initFeaturedProductsSection = () => {
  const commonSwiperOptions = {
    loop: true,
    modules: [Navigation],
    breakpoints: {
      470: {
        slidesPerView: 3,
        spaceBetween: 16,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
      1920: {
        slidesPerView: 5,
        spaceBetween: 27,
      },
    },
  };

  renderSlider({
    container: ".featured-products__featured-slider",
    items: mockProducts,
    renderItem: (product) => createProductCard(product),
    swiperOptions: {
      ...commonSwiperOptions,
      navigation: {
        prevEl: ".featured-slider__left-nav",
        nextEl: ".featured-slider__right-nav",
      },
    },
  });

  renderSlider({
    container: ".featured-products__popular-slider",
    items: mockProducts,
    renderItem: (product) => createProductCard(product),
    swiperOptions: {
      ...commonSwiperOptions,
      navigation: {
        prevEl: ".popular-slider__left-nav",
        nextEl: ".popular-slider__right-nav",
      },
    },
  });
};
