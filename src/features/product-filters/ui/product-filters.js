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

  // НАСТРОЙКИ
  const priceStep = 10; // Желаемый шаг цены (кратность)
  const collisionGap = 5; // Физическое расстояние между ползунками (в единицах шкалы)
  // Настройте его так, чтобы прямоугольники касались как вам нужно

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

    // 1. ЛОГИКА СТОЛКНОВЕНИЯ (на "плавных" значениях)
    if (rawMax - rawMin < collisionGap) {
      if (e?.target.classList.contains("price-range__input_min")) {
        rawMin = rawMax - collisionGap;
        minRange.value = rawMin;
      } else {
        rawMax = rawMin + collisionGap;
        maxRange.value = rawMax;
      }
    }

    // 2. ПРОГРАММНЫЙ ШАГ ЦЕНЫ (Округление для текста)
    // Округляем плавное значение ползунка до ближайшего priceStep
    let displayMin = Math.round(rawMin / priceStep) * priceStep;
    let displayMax = Math.round(rawMax / priceStep) * priceStep;

    // Гарантируем, что цена не выйдет за пределы min/max из-за округления
    displayMin = Math.max(min, Math.min(max, displayMin));
    displayMax = Math.max(min, Math.min(max, displayMax));

    // Синхронизируем текст при столкновении
    if (rawMax - rawMin <= collisionGap) {
      if (e?.target.classList.contains("price-range__input_min")) {
        displayMin = displayMax;
      } else {
        displayMax = displayMin;
      }
    }

    minText.textContent = `${displayMin.toFixed(2)} EUR`;
    maxText.textContent = `${displayMax.toFixed(2)} EUR`;

    // 3. ОБНОВЛЕНИЕ CSS (используем плавные значения для точности полоски)
    const percent1 = ((rawMin - min) / (max - min)) * 100;
    const percent2 = ((rawMax - min) / (max - min)) * 100;

    track.style.left = percent1 + "%";
    track.style.right = 100 - percent2 + "%";
  };

  wrapper.addEventListener("input", updateUI);
  setTimeout(() => updateUI(), 0);

  return wrapper;
}
// export function createPriceRange(item) {
//   const wrapper = document.createElement("div");
//   wrapper.className = "price-range";

//   const range = item.options[0];
//   const min = range.min || 0;
//   const max = range.max || 1000;
//   const priceGap = 50;

//   wrapper.innerHTML = `
//     <div class="price-range__values">
//       <span class="price-range__value price-range__value_min">${min}€</span>
//       <span class="price-range__value price-range__value_max">${max}€</span>
//     </div>
//     <div class="price-range__slider">
//       <div class="price-range__track"></div>
//       <input type="range" class="price-range__input price-range__input_min" min="${min}" max="${max}" value="${min}">
//       <input type="range" class="price-range__input price-range__input_max" min="${min}" max="${max}" value="${max}">
//     </div>
//   `;

//   const minRange = wrapper.querySelector(".price-range__input_min");
//   const maxRange = wrapper.querySelector(".price-range__input_max");
//   const minText = wrapper.querySelector(".price-range__value_min");
//   const maxText = wrapper.querySelector(".price-range__value_max");
//   const track = wrapper.querySelector(".price-range__track");

//   const updateUI = (e) => {
//     let minVal = parseFloat(minRange.value);
//     let maxVal = parseFloat(maxRange.value);

//     if (maxVal - minVal < priceGap) {
//       if (e?.target.classList.contains("price-range__input_min")) {
//         minRange.value = maxVal - priceGap;
//       } else if (e?.target.classList.contains("price-range__input_max")) {
//         maxRange.value = minVal + priceGap;
//       }
//     }

//     const visualMin = parseFloat(minRange.value);
//     const visualMax = parseFloat(maxRange.value);

//     let displayMin = visualMin;
//     let displayMax = visualMax;

//     if (visualMax - visualMin <= priceGap) {
//       if (e?.target.classList.contains("price-range__input_min")) {
//         displayMin = visualMax;
//       } else {
//         displayMax = visualMin;
//       }
//     }

//     minText.textContent = `${displayMin.toFixed(2)} EUR`;
//     maxText.textContent = `${displayMax.toFixed(2)} EUR`;

//     const percent1 = ((visualMin - min) / (max - min)) * 100;
//     const percent2 = ((visualMax - min) / (max - min)) * 100;

//     track.style.left = percent1 + "%";
//     track.style.right = 100 - percent2 + "%";
//   };

//   wrapper.addEventListener("input", updateUI);
//   setTimeout(() => updateUI(), 0);

//   return wrapper;
// }
