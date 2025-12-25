import Swiper from "swiper";

export const renderSlider = ({
  container,
  items = [],
  renderItem,
  swiperOptions = {},
}) => {
  const parentEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!parentEl) {
    console.error("renderSlider: container not found");
    return;
  }

  parentEl.innerHTML = "";

  const swiperMainEl = document.createElement("div");
  swiperMainEl.className = "swiper";

  const wrapper = document.createElement("div");
  wrapper.className = "swiper-wrapper";

  items.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const content = renderItem(item, index);
    if (content instanceof HTMLElement) {
      slide.appendChild(content);
      wrapper.appendChild(slide);
    }
  });

  swiperMainEl.appendChild(wrapper);
  parentEl.appendChild(swiperMainEl);

  const swiper = new Swiper(swiperMainEl, {
    ...swiperOptions,
  });

  return swiper;
};
