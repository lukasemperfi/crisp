export class FilterPanelController {
  constructor(containerSelector) {
    this._container =
      typeof containerSelector === "string"
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!this._container) {
      throw new Error("FilterPanelController: container not found");
    }

    this._state = {};
    this._listeners = {
      change: [],
      apply: [],
    };

    this._handleChange = this._onChange.bind(this);
    this._handleClick = this._onClick.bind(this);

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
    if (!input) {
      return;
    }

    if (input.type === "checkbox") {
      if (!input.name) {
        return;
      }
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

    if (checked) {
      if (!this._state[name].includes(value)) {
        this._state[name].push(Number(value));
      }
    } else {
      this._state[name] = this._state[name].filter((v) => v !== Number(value));
    }

    if (this._state[name].length === 0) {
      delete this._state[name];
    }
  }

  _updateRange(input) {
    const wrapper = input.closest(".price-range");
    if (!wrapper) {
      return;
    }

    const filterId = wrapper.dataset.filterId;
    if (!filterId) {
      return;
    }

    const minInput = wrapper.querySelector(".price-range__input_min");
    const maxInput = wrapper.querySelector(".price-range__input_max");

    if (!minInput || !maxInput) {
      return;
    }

    this._state[filterId] = {
      min: Number(minInput.value),
      max: Number(maxInput.value),
    };
  }
}
