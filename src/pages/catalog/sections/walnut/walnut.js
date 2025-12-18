import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";

export const initWalnutSection = () => {
  initWalnutSwiper();
};

function initWalnutSwiper() {
  return initSwiper(".walnut-slider", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".walnut-slider__next",
      prevEl: ".walnut-slider__prev",
    },
    modules: [Navigation],
  });
}
