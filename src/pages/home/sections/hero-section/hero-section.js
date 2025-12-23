import { initSwiper } from "@/shared/lib/swiper/init-swiper";

export const initHeroSection = () => {
  const swiper = initSwiper(".fashion-slider", {
    slidesPerView: "auto",
  });
};
