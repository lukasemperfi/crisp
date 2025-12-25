import { renderSlider } from "@/shared/ui/slider/slider";
import { mockProducts } from "@/shared/helpers/mock-products";
import { createProductCard } from "@/entities/product/ui/product-card/product-card";
import { Navigation } from "swiper/modules";
import { renderProductList } from "@/entities/product/ui/product-list/product-list";

export const initFeaturedProductsSection = () => {
  const BREAKPOINT = 470;
  let swipers = {
    featured: null,
    popular: null,
  };

  const commonSwiperOptions = {
    loop: true,
    modules: [Navigation],
    breakpoints: {
      471: {
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

  const updateView = () => {
    const isMobile = window.innerWidth <= BREAKPOINT;

    if (isMobile) {
      Object.keys(swipers).forEach((key) => {
        if (swipers[key]) {
          swipers[key].destroy(true, true);
          swipers[key] = null;
        }
      });

      renderProductList(mockProducts, ".featured-slider__slider-container", 4);
      renderProductList(mockProducts, ".popular-slider__slider-container", 4);
    } else {
      swipers.featured = renderSlider({
        container: ".featured-slider__slider-container",
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

      swipers.popular = renderSlider({
        container: ".popular-slider__slider-container",
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
    }
  };

  updateView();

  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const currentlyMobile = !swipers.featured;

    if (isMobile !== currentlyMobile) {
      updateView();
    }
  });
};
