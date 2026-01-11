export const Accordion = (containerSelector, items, config = {}) => {
  const root = document.querySelector(containerSelector);
  if (!root) return;

  const { isSingleOpen = true } = config;

  root.innerHTML = items
    .map(
      (item) => `
    <div class="accordion">
      <button class="accordion__title" type="button">
        ${item.title}
        <span class="accordion__icon"></span>
      </button>
      <div class="accordion__content">
        <div class="accordion__inner">
          ${item.content}
        </div>
      </div>
    </div>
  `
    )
    .join("");

  const accordions = root.querySelectorAll(".accordion");

  accordions.forEach((el) => {
    const btn = el.querySelector(".accordion__title");

    btn.addEventListener("click", () => {
      const isActive = el.classList.contains("is-active");

      if (isSingleOpen && !isActive) {
        accordions.forEach((item) => item.classList.remove("is-active"));
      }

      el.classList.toggle("is-active");
    });
  });
};
