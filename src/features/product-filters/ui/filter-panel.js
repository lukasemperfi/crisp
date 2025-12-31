export class FilterPanel {
  constructor(containerSelector, config) {
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
    this._state = {};
    this._container
      .querySelectorAll("input[type='checkbox']")
      .forEach((i) => (i.checked = false));
    this._container
      .querySelectorAll("input[type='range']")
      .forEach((i) => (i.value = i.min));
    this._container
      .querySelectorAll(".price-range__value_min")
      .forEach((el) => (el.textContent = ""));
    this._container
      .querySelectorAll(".price-range__value_max")
      .forEach((el) => (el.textContent = ""));
  }

  destroy() {
    this._container.removeEventListener("change", this._handleChange);
    this._container.removeEventListener("click", this._handleClick);
  }

  _emit(type) {
    const snapshot = this.getFilters();
    this._listeners[type].forEach((cb) => cb(snapshot));
  }

  _bindEvents() {
    this._container.addEventListener("change", this._handleChange);
    this._container.addEventListener("click", this._handleClick);
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

    this._emit("change");
  }

  _updateCheckbox(input) {
    const { name, value, checked } = input;

    if (!Array.isArray(this._state[name])) {
      this._state[name] = [];
    }

    const val = isNaN(value) ? value : Number(value);

    if (checked) {
      if (!this._state[name].includes(val)) {
        this._state[name].push(val);
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
    const filterPanel = document.createElement("div");
    filterPanel.className = "filter-panel";

    this._config.forEach((item) => {
      const content = this._createFilterContent(item);
      const accordion = this._createFilterItem({
        title: item.title,
        content,
        isOpen: item.defaultOpen,
      });
      filterPanel.appendChild(accordion);
    });

    filterPanel.appendChild(this._createApplyButton());
    this._container.appendChild(filterPanel);
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

  _createFilterItem({ title, content, isOpen = true }) {
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
}
