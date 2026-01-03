export function Dropdown(container, props = {}) {
  const {
    options = [],
    defaultValue = "",
    onChange = () => {},
    name = "",
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
    options.find((o) => o.value === val)?.label ?? "";

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
    nativeSelect.value = val;
    valueEl.textContent = getLabelByValue(val);

    if (emit) onChange(val);
  };

  root.innerHTML = `
    <div class="dropdown">
      <select
        class="dropdown__native"
        ${name ? `name="${name}"` : ""}
      >
        ${options
          .map((o) => `<option value="${o.value}">${o.label}</option>`)
          .join("")}
      </select>

      <button type="button" class="dropdown__trigger">
        <span class="dropdown__value"></span>
        <span class="dropdown__icon">${createArrowIcon()}</span>
      </button>

      <div class="dropdown__menu">
        ${options
          .map(
            (o) => `
              <button
                type="button"
                class="dropdown__option"
                data-value="${o.value}"
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

  const hasDefault = options.some((o) => o.value === defaultValue);

  const initialValue = hasDefault ? defaultValue : options[0]?.value ?? "";

  setValue(initialValue, false);

  trigger.addEventListener("click", toggle);

  menu.addEventListener("click", (e) => {
    const option = e.target.closest(".dropdown__option");
    if (!option) return;

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
  <svg class="${className}" width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L4.35352 4.35352L8.35352 0.353516" stroke="black" />
  </svg>
  `;
}
