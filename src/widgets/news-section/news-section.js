import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { initPlay } from "@/shared/ui/video-card/video-card.js";

export const initNewsSection = () => {
  const newsSectionSwiper = initNewsSectionSwiper();
  const { stopAllVideos } = initPlay(".news-section-card__image-wrapper");

  newsSectionSwiper.on("slideChange", () => {
    stopAllVideos();
  });
};

function initNewsSectionSwiper() {
  const newsSectionSwiper = initSwiper(".news-section-slider", {
    slidesPerView: "1",
    spaceBetween: 12,
    navigation: {
      nextEl: ".news-section-slider__nav-outside .news-section-slider__next",
      prevEl: ".news-section-slider__nav-outside .news-section-slider__prev",
    },
    modules: [Navigation],
    breakpoints: {
      500: { slidesPerView: "2", spaceBetween: 12 },
      660: { slidesPerView: "3", spaceBetween: 12 },
      768: { slidesPerView: "3", spaceBetween: 24 },
      1338: { slidesPerView: "3", spaceBetween: 33 },
    },
  });

  const nextInsideButton = document.querySelector(
    ".news-section-slider__nav-inside .news-section-slider__next"
  );
  const prevInsideButton = document.querySelector(
    ".news-section-slider__nav-inside .news-section-slider__prev"
  );

  if (nextInsideButton && prevInsideButton) {
    nextInsideButton.addEventListener("click", () => {
      newsSectionSwiper.slideNext();
    });

    prevInsideButton.addEventListener("click", () => {
      newsSectionSwiper.slidePrev();
    });
  }

  return newsSectionSwiper;
}
