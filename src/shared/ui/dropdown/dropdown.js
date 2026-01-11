export function Dropdown(container, props = {}) {
  const {
    options = [],
    defaultValue = "",
    onChange = () => {},
    name = "",
    placeholder = "Не выбрано",
  } = props;

  const root =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!root) {
    throw new Error("Dropdown: container not found");
  }

  let currentValue = "";
  let isOpen = false;

  const getLabelByValue = (val) =>
    options.find((o) => o.value === val)?.label ?? placeholder;

  const open = () => {
    isOpen = true;
    dropdown.classList.add("dropdown_is-open");
  };

  const close = () => {
    isOpen = false;
    dropdown.classList.remove("dropdown_is-open");
  };

  const toggle = () => (isOpen ? close() : open());

  const setValue = (val, emit = true) => {
    currentValue = val;
    if (nativeSelect) nativeSelect.value = val;

    valueEl.textContent = getLabelByValue(val);

    trigger.classList.toggle("dropdown__trigger_is-empty", !val);

    if (emit) onChange(val);
  };

  root.innerHTML = `
    <div class="dropdown">
      <select
        class="dropdown__native"
        ${name ? `name="${name}"` : ""}
      >
        <option value="">${placeholder}</option>
        ${options
          .map(
            (o) => `
            <option 
              value="${o.value}" 
              ${o.disabled ? "disabled" : ""}
            >
              ${o.label}
            </option>`
          )
          .join("")}
      </select>

      <button type="button" class="dropdown__trigger">
        <span class="dropdown__value"></span>
        ${createArrowIcon("dropdown__icon")}
      </button>

      <div class="dropdown__menu">
        ${options
          .map(
            (o) => `
              <button
                type="button"
                class="dropdown__option ${
                  o.disabled ? "dropdown__option_is-disabled" : ""
                }"
                data-value="${o.value}"
                ${o.disabled ? "disabled" : ""}
              >
                ${o.label}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  const dropdown = root.querySelector(".dropdown");
  const nativeSelect = root.querySelector(".dropdown__native");
  const trigger = root.querySelector(".dropdown__trigger");
  const valueEl = root.querySelector(".dropdown__value");
  const menu = root.querySelector(".dropdown__menu");

  const availableOptions = options.filter((o) => !o.disabled);
  const hasDefault = availableOptions.some((o) => o.value === defaultValue);

  const initialValue = hasDefault
    ? defaultValue
    : availableOptions[0]?.value ?? "";

  setValue(initialValue, false);

  trigger.addEventListener("click", toggle);

  menu.addEventListener("click", (e) => {
    const option = e.target.closest(".dropdown__option");
    if (!option || option.hasAttribute("disabled")) return;

    setValue(option.dataset.value);
    close();
  });

  nativeSelect.addEventListener("change", (e) => {
    setValue(e.target.value);
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target)) close();
  });
}

function createArrowIcon(className = "") {
  return `
  <svg class="${className}" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L5.35352 5.35352L10.3535 0.353516" stroke="currentColor" />
  </svg>
  `;
}
