import { FilterPanel } from "@/features/product-filters/ui/filter-panel";

export function FiltersBar(container, filterConfig, filterOptions) {
  const _container =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!_container) {
    throw new Error("FiltersBar: container not found");
  }

  _container.innerHTML = `
    <div class="filters-bar">
      <button class="filters-bar__toggle">
        <span class="filters-bar__value">Filter</span>
        <span class="filters-bar__icon">${createArrowIcon()}</span>
      </button>
      <div class="filters-bar__content">
        <div class="filters-bar__filters"></div>
        <div class="filters-bar__category-description"></div>
      </div>
    </div>
  `;

  const filtersBar = _container.querySelector(".filters-bar");

  const filterPanel = new FilterPanel(
    filtersBar.querySelector(".filters-bar__filters"),
    filterConfig,
    filterOptions
  );

  AboutDresses(filtersBar.querySelector(".filters-bar__category-description"));

  const toggleBtn = filtersBar.querySelector(".filters-bar__toggle");

  toggleBtn.addEventListener("click", () => {
    filtersBar.classList.toggle("filters-bar_is-open");
  });

  return filterPanel;
}

function AboutDresses(container, props = {}) {
  const { className = "" } = props;

  const _container =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!_container) {
    throw new Error("AboutDresses: container not found");
  }

  const render = () => {
    _container.innerHTML = `
        <div class="about-dresses ${className}">
          <h3 class="about-dresses__title">About Dresses</h3>
          <p class="about-dresses__text">
            Every day we’re gonna be dropping the latest trends to help you nail every Summer sitch. Whether it’s a
            graduation, your mate's wedding, or just a cute day at the races with the gals, our occasion dresses
            have got you covered. Not looking for something fancy? No stress. We’ve got day dresses for days (aka
            bodycon dresses, t-shirt dresses, oversized shirt dresses).
          </p>
        </div>
      `;
  };

  render();
}

function createArrowIcon(className = "") {
  return `
  <svg class="${className}" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L4.35352 4.35352L8.35352 0.353516" stroke="black" />
  </svg>
  `;
}
