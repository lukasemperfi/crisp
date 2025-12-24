import { initSwiper } from "@/shared/lib/swiper/init-swiper";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";

import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";

export const initHeroSection = () => {
  const swiper = initSwiper(".hero-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    speed: 600,
    preventClicks: true,
    slidesPerView: "2",
    loop: false,
    coverflowEffect: {
      rotate: 0,
      stretch: 65,
      depth: 163,
      modifier: 1,
      slideShadows: false,
    },
    breakpoints: {
      0: {
        coverflowEffect: {
          stretch: 52,
        },
      },
      550: {
        coverflowEffect: {
          stretch: 65,
        },
      },
    },
    modules: [EffectCoverflow, Navigation, Pagination],
    navigation: {
      prevEl: ".slider-nav-left",
      nextEl: ".slider-nav-right",
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return `<span class="${className}"></span>`;
      },
    },
  });
};
