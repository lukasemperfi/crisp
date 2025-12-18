import Swiper from "swiper";
// import "swiper/css";

export const initSwiper = (container, options) => {
  return new Swiper(container, {
    ...options,
  });
};
