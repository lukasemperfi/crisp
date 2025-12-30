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
    "color-grid": createColorGrid,
    "price-range": createPriceRange,
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
      <span class="filter-checkbox-list__box"></span> <span class="filter-checkbox-list__label">${opt.name}</span>
    `;
    wrapper.appendChild(label);
  });

  return wrapper;
}

function createSelectionGrid(item, baseClass, isColor = false) {
  const wrapper = document.createElement("div");
  wrapper.className = baseClass;

  item.options.forEach((opt) => {
    const label = document.createElement("label");
    label.className = `${baseClass}__item`;

    const colorValue = (opt.hex_code || "").toLowerCase();
    const isWhite =
      colorValue === "#ffffff" ||
      colorValue === "#fff" ||
      colorValue === "white";

    const boxStyle = isColor ? `style="background-color: ${opt.hex_code}"` : "";

    const whiteModifier =
      isColor && isWhite ? `${baseClass}__box_is-white` : "";

    label.innerHTML = `
      <input 
        type="checkbox" 
        class="${baseClass}__input" 
        name="${item.id}" 
        value="${opt.id}"
      >
      <span class="${baseClass}__box ${whiteModifier}" ${boxStyle}>
        ${isColor ? "" : opt.name}
      </span>
    `;

    wrapper.appendChild(label);
  });

  return wrapper;
}

export function createSizeGrid(item) {
  return createSelectionGrid(item, "size-grid");
}

export function createColorGrid(item) {
  return createSelectionGrid(item, "color-grid", true);
}

export function createPriceRange(item) {
  const wrapper = document.createElement("div");
  wrapper.className = "price-range";

  const range = item.options[0];
  const min = range.min || 0;
  const max = range.max || 1000;

  const priceStep = 10;

  wrapper.innerHTML = `
    <div class="price-range__values">
      <span class="price-range__value price-range__value_min"></span>
      <span class="price-range__value price-range__value_max"></span>
    </div>
    <div class="price-range__slider">
      <div class="price-range__track"></div>
      <input type="range" class="price-range__input price-range__input_min" 
        min="${min}" max="${max}" value="${min}" step="any">
      <input type="range" class="price-range__input price-range__input_max" 
        min="${min}" max="${max}" value="${max}" step="any">
    </div>
  `;

  const minRange = wrapper.querySelector(".price-range__input_min");
  const maxRange = wrapper.querySelector(".price-range__input_max");
  const minText = wrapper.querySelector(".price-range__value_min");
  const maxText = wrapper.querySelector(".price-range__value_max");
  const track = wrapper.querySelector(".price-range__track");

  const updateUI = (e) => {
    let rawMin = parseFloat(minRange.value);
    let rawMax = parseFloat(maxRange.value);

    if (rawMax - rawMin < priceStep) {
      if (e?.target.classList.contains("price-range__input_min")) {
        rawMin = rawMax - priceStep;
        minRange.value = rawMin;
      } else {
        rawMax = rawMin + priceStep;
        maxRange.value = rawMax;
      }
    }

    let displayMin = Math.round(rawMin / priceStep) * priceStep;
    let displayMax = Math.round(rawMax / priceStep) * priceStep;

    displayMin = Math.max(min, Math.min(max, displayMin));
    displayMax = Math.max(min, Math.min(max, displayMax));

    if (rawMax - rawMin <= priceStep) {
      if (e?.target.classList.contains("price-range__input_min")) {
        displayMin = displayMax - priceStep;
      } else {
        displayMax = displayMin + priceStep;
      }
    }

    minText.textContent = `${displayMin.toFixed(2)} EUR`;
    maxText.textContent = `${displayMax.toFixed(2)} EUR`;

    const percent1 = ((rawMin - min) / (max - min)) * 100;
    const percent2 = ((rawMax - min) / (max - min)) * 100;

    track.style.left = percent1 + "%";
    track.style.right = 100 - percent2 + "%";
  };

  wrapper.addEventListener("input", updateUI);
  updateUI();

  return wrapper;
}
