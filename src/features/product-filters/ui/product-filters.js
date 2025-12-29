export function renderFilterPanel(containerSelector, config) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = "";

  const filterPanel = document.createElement("div");
  filterPanel.className = "filter-panel";

  config.forEach((item) => {
    const content = createFilterContent(item);

    const accordion = createFilterItem({
      title: item.title,
      content: content,
      isOpen: item.defaultOpen,
    });

    filterPanel.appendChild(accordion);
  });

  container.appendChild(filterPanel);
}

export function createFilterItem({ title, content, isOpen = true }) {
  const item = document.createElement("div");
  item.className = "filter-panel__item filter-item";
  if (isOpen) item.classList.add("filter-item_is-open");

  item.innerHTML = `
    <div class="filter-item__header">
      <h3 class="filter-item__title">${title}</h3>
      <span class="filter-item__icon"></span>
    </div>
    <div class="filter-item__body">
      <div class="filter-item__content"></div>
    </div>
  `;

  item.querySelector(".filter-item__content").appendChild(content);

  const header = item.querySelector(".filter-item__header");
  header.addEventListener("click", () => {
    item.classList.toggle("filter-item_is-open");
  });

  return item;
}

export function createFilterContent(item) {
  const contentMap = {
    "checkbox-list": createCheckboxList,
    "size-grid": createSizeGrid,
  };

  const renderFn = contentMap[item.type];

  if (!renderFn) {
    console.error(`Unknown filter type: ${item.type}`);
    return document.createElement("div");
  }

  return renderFn(item);
}

function createCheckboxList(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "filter-checkbox-list";

  item.options.forEach((opt) => {
    const label = document.createElement("label");
    label.className = "filter-checkbox-list__label-wrapper";
    label.innerHTML = `
      <input type="checkbox" class="filter-checkbox-list__input" name="${item.id}" value="${opt.id}">
      <span class="filter-checkbox-list__box"></span> <span class="filter-checkbox-list__label">${opt.label}</span>
    `;
    wrapper.appendChild(label);
  });

  return wrapper;
}

function createSizeGrid(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "size-grid";

  item.options.forEach((opt) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "size-grid__btn";
    button.dataset.value = opt;
    button.textContent = opt;
    wrapper.appendChild(button);
  });

  return wrapper;
}
