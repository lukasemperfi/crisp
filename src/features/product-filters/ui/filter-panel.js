export class FilterPanel {
  constructor(containerSelector, config, options = {}) {
    this._container =
      typeof containerSelector === "string"
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!this._container) {
      throw new Error("FilterPanel: container not found");
    }

    this._config = config;
    this._state = {};
    this._listeners = {
      change: [],
      apply: [],
    };
    this._showSelectedFilters = options.showSelectedFilters !== false;
    this._showApplyButton = options.showApplyButton !== false;

    this._handleChange = this._onChange.bind(this);
    this._handleClick = this._onClick.bind(this);

    this._renderPanel();
    this._applyDefaultValues();
    this._bindEvents();
  }

  getFilters() {
    return structuredClone(this._state);
  }

  onChange(cb) {
    this._listeners.change.push(cb);
  }

  onApply(cb) {
    this._listeners.apply.push(cb);
  }

  reset() {
    // Сброс состояния
    this._state = {};

    // Сброс всех чекбоксов
    this._container
      .querySelectorAll("input[type='checkbox']")
      .forEach((i) => (i.checked = false));

    // Сброс всех range фильтров
    this._container.querySelectorAll(".price-range").forEach((wrapper) => {
      const minInput = wrapper.querySelector(".price-range__input_min");
      const maxInput = wrapper.querySelector(".price-range__input_max");
      if (minInput && maxInput) {
        minInput.value = minInput.min;
        maxInput.value = maxInput.max;
        this._updatePriceRangeUI(wrapper); // Обновляем UI ползунков
      }
    });

    // Обновляем панель выбранных фильтров
    this._renderSelectedFilters();

    // Оповещаем слушателей
    this._emit("change");
  }

  destroy() {
    this._panel.removeEventListener("change", this._handleChange);
    this._panel.removeEventListener("click", this._handleClick);
  }

  _emit(type) {
    const snapshot = this.getFilters();
    this._listeners[type].forEach((cb) => cb(snapshot));
  }

  _bindEvents() {
    this._panel.addEventListener("change", this._handleChange);
    this._panel.addEventListener("click", this._handleClick);
  }

  _onClick(e) {
    if (e.target.closest(".filter-panel__apply-btn")) {
      this._emit("apply");
    }
  }

  _onChange(e) {
    const input = e.target;
    if (!input) return;

    if (input.type === "checkbox") {
      if (!input.name) return;
      this._updateCheckbox(input);
    }

    if (input.type === "range") {
      this._updateRange(input);
    }

    this._renderSelectedFilters(); // <== обновляем выбранные фильтры
    this._emit("change");
  }

  _updateCheckbox(input) {
    const { name, value, checked } = input;

    // Находим конфиг этого фильтра по ID
    const configItem = this._config.find((i) => i.id === name);
    const isSingleSelect = configItem?.singleSelect === true;

    if (!Array.isArray(this._state[name])) {
      this._state[name] = [];
    }

    const val = isNaN(value) ? value : Number(value);

    if (checked) {
      if (isSingleSelect) {
        const wrapper = this._container.querySelector(
          `[data-filter-id="${name}"]`
        );
        if (wrapper) {
          wrapper.querySelectorAll("input[type='checkbox']").forEach((i) => {
            if (i !== input) i.checked = false;
          });
        }
        this._state[name] = [val];
      } else {
        if (!this._state[name].includes(val)) {
          this._state[name].push(val);
        }
      }
    } else {
      this._state[name] = this._state[name].filter((v) => v !== val);
    }

    if (this._state[name].length === 0) delete this._state[name];
  }

  _updateRange(input) {
    const wrapper = input.closest(".price-range");
    if (!wrapper) return;

    const filterId = wrapper.dataset.filterId;
    if (!filterId) return;

    const minInput = wrapper.querySelector(".price-range__input_min");
    const maxInput = wrapper.querySelector(".price-range__input_max");

    if (!minInput || !maxInput) return;

    this._state[filterId] = {
      min: parseFloat(parseFloat(minInput.value).toFixed(2)),
      max: parseFloat(parseFloat(maxInput.value).toFixed(2)),
    };
  }

  _renderPanel() {
    this._container.innerHTML = "";

    this._panel = document.createElement("div");
    this._panel.className = "filter-panel";

    const selected = document.createElement("div");
    selected.className = "filter-panel__selected";

    const filters = document.createElement("div");
    filters.className = "filter-panel__filters";

    this._config.forEach((item) => {
      const content = this._createFilterContent(item);
      const accordion = this._createFilterItem({
        title: item.title,
        content,
        isOpen: item.defaultOpen,
        accordion: item.accordion !== false,
      });
      filters.appendChild(accordion);
    });

    if (this._showApplyButton) {
      filters.appendChild(this._createApplyButton());
    }

    this._panel.appendChild(selected);
    this._panel.appendChild(filters);
    this._container.appendChild(this._panel);
  }

  _applyDefaultValues() {
    this._config.forEach((item) => {
      if (!item.defaultValue) return;

      if (Array.isArray(item.defaultValue)) {
        item.defaultValue.forEach((val) => {
          const input = this._container.querySelector(
            `input[name="${item.id}"][value="${val}"]`
          );
          if (input) {
            input.checked = true;
            this._updateCheckbox(input);
          }
        });
      }

      if (typeof item.defaultValue === "object") {
        const wrapper = this._container.querySelector(
          `[data-filter-id="${item.id}"]`
        );
        if (!wrapper) return;

        const minInput = wrapper.querySelector(".price-range__input_min");
        const maxInput = wrapper.querySelector(".price-range__input_max");

        if (minInput && maxInput) {
          minInput.value = item.defaultValue.min;
          maxInput.value = item.defaultValue.max;
          this._updateRange(minInput);

          wrapper.dispatchEvent(new Event("input"));
        }
      }
    });

    this._renderSelectedFilters();
  }

  _createApplyButton(text = "APPLY") {
    const wrapper = document.createElement("div");
    wrapper.className = "filter-panel__footer";
    const btn = document.createElement("button");
    btn.classList.add(
      "button",
      "button_elevated",
      "button_gray",
      "filter-panel__apply-btn"
    );
    btn.textContent = text;
    wrapper.appendChild(btn);
    return wrapper;
  }

  // _createFilterItem({ title, content, isOpen = true }) {
  //   const item = document.createElement("div");
  //   item.className = "filter-panel__item filter-item";
  //   if (isOpen) item.classList.add("filter-item_is-open");

  //   item.innerHTML = `
  //       <div class="filter-item__header">
  //         <h3 class="filter-item__title">${title}</h3>
  //         <span class="filter-item__icon"></span>
  //       </div>
  //       <div class="filter-item__body">
  //         <div class="filter-item__content"></div>
  //       </div>
  //     `;
  //   item.querySelector(".filter-item__content").appendChild(content);

  //   item.querySelector(".filter-item__header").addEventListener("click", () => {
  //     item.classList.toggle("filter-item_is-open");
  //   });

  //   return item;
  // }

  _createAccordionItem({ title, content, isOpen }) {
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

    item.querySelector(".filter-item__header").addEventListener("click", () => {
      item.classList.toggle("filter-item_is-open");
    });

    return item;
  }

  _createStaticItem({ title, content }) {
    const item = document.createElement("div");
    item.className = "filter-panel__item filter-item filter-item_static";

    item.innerHTML = `
      <div class="filter-item__title">${title}</div>
      <div class="filter-item__body">
        <div class="filter-item__content"></div>
    </div>
    `;

    item.querySelector(".filter-item__content").appendChild(content);

    return item;
  }

  _createFilterItem({ title, content, isOpen = true, accordion = true }) {
    return accordion
      ? this._createAccordionItem({ title, content, isOpen })
      : this._createStaticItem({ title, content });
  }

  _createFilterContent(item) {
    const contentMap = {
      "checkbox-list": this._createCheckboxList,
      "size-grid": this._createSizeGrid,
      "color-grid": this._createColorGrid,
      "price-range": this._createPriceRange,
    };

    const fn = contentMap[item.type];
    if (!fn) return document.createElement("div");
    const content = fn.call(this, item);
    content.dataset.filterId = item.id;
    return content;
  }

  _createCheckboxList(item) {
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

  _createSelectionGrid(item, baseClass, isColor = false) {
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
      const boxStyle = isColor
        ? `style="background-color: ${opt.hex_code}"`
        : "";
      const whiteModifier =
        isColor && isWhite ? `${baseClass}__box_is-white` : "";

      label.innerHTML = `
          <input type="checkbox" class="${baseClass}__input" name="${
        item.id
      }" value="${opt.id}">
          <span class="${baseClass}__box ${whiteModifier}" ${boxStyle}>${
        isColor ? "" : opt.name
      }</span>
        `;
      wrapper.appendChild(label);
    });
    return wrapper;
  }

  _createSizeGrid(item) {
    return this._createSelectionGrid(item, "size-grid");
  }

  _createColorGrid(item) {
    return this._createSelectionGrid(item, "color-grid", true);
  }

  _createPriceRange(item) {
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
          <input type="range" class="price-range__input price-range__input_min" min="${min}" max="${max}" value="${min}" step="any">
          <input type="range" class="price-range__input price-range__input_max" min="${min}" max="${max}" value="${max}" step="any">
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

    wrapper.addEventListener("change", () => {
      const snappedMin = Math.round(minRange.value / priceStep) * priceStep;
      const snappedMax = Math.round(maxRange.value / priceStep) * priceStep;

      minRange.value = snappedMin.toFixed(2);
      maxRange.value = snappedMax.toFixed(2);
      updateUI();
    });

    updateUI();
    return wrapper;
  }
  _updatePriceRangeUI(wrapper) {
    const minInput = wrapper.querySelector(".price-range__input_min");
    const maxInput = wrapper.querySelector(".price-range__input_max");
    const minText = wrapper.querySelector(".price-range__value_min");
    const maxText = wrapper.querySelector(".price-range__value_max");
    const track = wrapper.querySelector(".price-range__track");

    const min = parseFloat(minInput.min);
    const max = parseFloat(maxInput.max);

    minText.textContent = `${min.toFixed(2)} EUR`;
    maxText.textContent = `${max.toFixed(2)} EUR`;

    track.style.left = "0%";
    track.style.right = "0%";
  }

  _renderSelectedFilters() {
    const selectedContainer = this._container.querySelector(
      ".filter-panel__selected"
    );
    selectedContainer.innerHTML = "";

    if (!this._showSelectedFilters) {
      selectedContainer.style.display = "none";
      return;
    }

    const filters = this.getFilters();
    const filterKeys = Object.keys(filters);

    if (filterKeys.length === 0) {
      selectedContainer.style.display = "none";
      return;
    }

    selectedContainer.style.display = "block";

    const wrapper = this._createSelectedFiltersWrapper();
    const header = this._createSelectedFiltersHeader();
    const mainList = this._createSelectedFiltersList(filters);

    wrapper.appendChild(header);
    wrapper.appendChild(mainList);
    selectedContainer.appendChild(wrapper);
  }

  _createSelectedFiltersWrapper() {
    const wrapper = document.createElement("div");
    wrapper.className = "selected-filters";
    return wrapper;
  }

  _createSelectedFiltersHeader() {
    const header = document.createElement("div");
    header.className = "selected-filters__header";
    header.innerHTML = `
    <div class="selected-filters__title">Filter</div>
    <button class="selected-filters__reset-btn">${this._closeIcon()} reset all</button>
  `;
    header
      .querySelector(".selected-filters__reset-btn")
      .addEventListener("click", () => this.reset());
    return header;
  }

  _createSelectedFiltersList(filters) {
    const main = document.createElement("div");
    main.className = "selected-filters__main";

    const list = document.createElement("div");
    list.className = "selected-filters__list";

    Object.keys(filters).forEach((key) => {
      const item = this._createSelectedFilterItem(key, filters[key]);
      list.appendChild(item);
    });

    main.appendChild(list);
    return main;
  }

  _createSelectedFilterItem(filterId, value) {
    const item = document.createElement("div");
    item.className = "selected-filters__list-item list-item";

    const title = document.createElement("div");
    title.className = "list-item__title";
    const configItem = this._config.find((i) => i.id === filterId);
    title.textContent = configItem?.title || filterId;
    item.appendChild(title);

    const valuesWrapper = document.createElement("div");
    valuesWrapper.className = "list-item__values values";

    if (Array.isArray(value)) {
      value.forEach((val) => {
        valuesWrapper.appendChild(
          this._createSelectedFilterValue(filterId, val)
        );
      });
    } else if (typeof value === "object") {
      valuesWrapper.appendChild(
        this._createSelectedFilterRange(filterId, value)
      );
    }

    item.appendChild(valuesWrapper);
    return item;
  }

  _createSelectedFilterValue(filterId, val) {
    const configItem = this._config.find((i) => i.id === filterId);
    const isColor = configItem?.type === "color-grid";

    const valueItem = document.createElement("div");
    valueItem.className = "values__item";

    if (isColor) {
      const option = configItem.options.find((o) => o.id === val);
      const colorValue = option?.hex_code.toLowerCase() || "#000";

      const isWhite =
        colorValue == "#ffffff" ||
        colorValue == "#fff" ||
        colorValue == "white";

      const whiteModifier = isWhite ? "color-grid__box_is-white" : "";

      valueItem.innerHTML = `
     <button class="values__item-remove-btn">${this._closeIcon()}<div class="color-grid__item">
          <span class="color-grid__box color-grid__box_selected-secondary ${whiteModifier}" style="background-color: ${colorValue}"></span>
      </div></button>

    `;
    } else {
      valueItem.innerHTML = `
      <button class="values__item-remove-btn">${this._closeIcon()}<div class="values__label">${this._getOptionLabel(
        filterId,
        val
      )}</div></button>
      
    `;
    }

    valueItem
      .querySelector(".values__item-remove-btn")
      .addEventListener("click", () =>
        this._removeSelectedFilter(filterId, val)
      );

    return valueItem;
  }

  _createSelectedFilterRange(filterId, value) {
    const valueItem = document.createElement("div");
    valueItem.className = "values__item";
    valueItem.innerHTML = `
    <button class="values__item-remove-btn">${this._closeIcon()}
    <div class="values__label">${value.min} - ${
      value.max
    } EUR</div><button class="values__item-remove-btn">
  `;
    valueItem
      .querySelector(".values__item-remove-btn")
      .addEventListener("click", () => this._removeSelectedFilter(filterId));
    return valueItem;
  }

  _getOptionLabel(filterId, valueId) {
    const configItem = this._config.find((i) => i.id === filterId);
    if (!configItem || !configItem.options) return valueId;
    const option = configItem.options.find((o) => o.id === valueId);
    return option?.name || valueId;
  }

  _removeSelectedFilter(filterId, val = null) {
    const wrapper = this._container.querySelector(
      `[data-filter-id="${filterId}"]`
    );
    if (!wrapper) return;

    if (val !== null) {
      const input = wrapper.querySelector(`input[value="${val}"]`);
      if (input) {
        input.checked = false;
        this._updateCheckbox(input);
      }
    } else {
      const minInput = wrapper.querySelector(".price-range__input_min");
      const maxInput = wrapper.querySelector(".price-range__input_max");
      if (minInput && maxInput) {
        minInput.value = minInput.min;
        maxInput.value = maxInput.max;
        delete this._state[filterId];
        this._updatePriceRangeUI(wrapper);
      }
    }

    this._renderSelectedFilters();
    this._emit("change");
  }

  _closeIcon(className = "") {
    return `
    <svg class="selected-filters__icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="-0.15 -0.15 9.49 9.49"><path d="M8.83887 0.353516L0.353586 8.8388" stroke="black"></path><path d="M8.83887 8.83887L0.353587 0.353585" stroke="black"></path></svg>
    `;
  }
}
