import Swiper from "swiper";

export const initSwiper = (container, options) => {
  return new Swiper(container, {
    ...options,
  });
};
