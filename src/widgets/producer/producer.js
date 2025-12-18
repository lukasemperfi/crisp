import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { initPlay } from "@/shared/ui/video-card/video-card.js";

export const initProducerSection = () => {
  const producerSwiper = initProducerSwiper();
  const { stopAllVideos } = initPlay(".producer__card");

  producerSwiper.on("slideChange", () => {
    stopAllVideos();
  });
};

function initProducerSwiper() {
  return initSwiper(".producer-slider", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".producer-slider__next",
      prevEl: ".producer-slider__prev",
    },
    modules: [Navigation],
  });
}
