export const Accordion = (containerSelector, items, config = {}) => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`Accordion: Container '${containerSelector}' not found`);
    return;
  }

  const { isSingleOpen = true } = config;

  const accordionRoot = document.createElement("div");
  accordionRoot.className = "accordion";

  accordionRoot.innerHTML = items
    .map(
      (item) => `
    <div class="accordion__item ${item.isActive ? "is-active" : ""}">
      <button class="accordion__button" type="button">
        <span class="accordion__title">${item.title}</span> 
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

  container.innerHTML = "";
  container.appendChild(accordionRoot);

  const itemElements = accordionRoot.querySelectorAll(".accordion__item");

  itemElements.forEach((itemEl) => {
    const btn = itemEl.querySelector(".accordion__button");

    btn.addEventListener("click", () => {
      const isActive = itemEl.classList.contains("is-active");

      if (isSingleOpen && !isActive) {
        itemElements.forEach((el) => el.classList.remove("is-active"));
      }

      itemEl.classList.toggle("is-active");
    });
  });
};
