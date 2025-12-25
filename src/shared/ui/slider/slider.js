import Swiper from "swiper";

export const renderSlider = ({
  container,
  items = [],
  renderItem,
  swiperOptions = {},
}) => {
  const sliderEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!sliderEl) {
    console.error("renderSlider: container not found");
    return;
  }

  if (typeof renderItem !== "function") {
    console.error("renderSlider: renderItem must be a function");
    return;
  }

  // Очистка контейнера
  sliderEl.innerHTML = "";

  // Создаём swiper-wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "swiper-wrapper";

  // Добавляем слайды
  const fragment = document.createDocumentFragment();
  items.forEach((item, index) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const content = renderItem(item, index);

    if (!(content instanceof HTMLElement)) {
      console.error("renderSlider: renderItem must return HTMLElement");
      return;
    }

    slide.appendChild(content);
    fragment.appendChild(slide);
  });

  wrapper.appendChild(fragment);
  sliderEl.appendChild(wrapper);

  // Уничтожаем старый Swiper
  if (sliderEl.swiper) {
    sliderEl.swiper.destroy(true, true);
  }

  // Создаём новый Swiper
  const swiper = new Swiper(sliderEl, {
    slidesPerView: "auto", // автоадаптив по умолчанию
    spaceBetween: 16,
    loop: items.length > 1,
    ...swiperOptions,
  });

  return swiper;
};
