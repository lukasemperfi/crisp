import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { initPlay } from "@/shared/ui/video-card/video-card.js";

export const initManufacturerSection = () => {
  const manufacturerSwiper = initManufacturerSwiper();
  const { stopAllVideos } = initPlay(".manufacturer__card");

  manufacturerSwiper.on("slideChange", () => {
    stopAllVideos();
  });
};

function initManufacturerSwiper() {
  return initSwiper(".manufacturer-slider", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".manufacturer-slider__next",
      prevEl: ".manufacturer-slider__prev",
    },
    modules: [Navigation],
  });
}
