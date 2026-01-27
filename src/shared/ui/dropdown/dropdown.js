import { createComponent } from "@/shared/lib/core/core";

export function Dropdown(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit, { runOnce }) {
      const {
        options = [],
        defaultValue = "",
        name = "",
        placeholder = "Не выбрано",
        disabled = false, // Извлекаем disabled
      } = props;

      el.className = `dropdown ${disabled ? "dropdown_is-disabled" : ""}`;

      el.innerHTML = `
          <select 
            class="dropdown__native" 
            ${name ? `name="${name}"` : ""} 
            ${disabled ? "disabled" : ""}
          >
            <option value="">${placeholder}</option>
            ${options
              .map(
                (o) =>
                  `<option value="${o.value}" ${o.disabled ? "disabled" : ""}>
                    ${o.label}
                  </option>`
              )
              .join("")}
          </select>

          <button 
            type="button" 
            class="dropdown__trigger" 
            ${disabled ? "disabled" : ""}
          >
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
                } 
                ${o.value === defaultValue ? "dropdown__option_selected" : ""}"
                data-value="${o.value}"
                ${o.disabled || disabled ? "disabled" : ""}
              >
                ${o.label}
              </button>`
              )
              .join("")}
          </div>
      `;

      const nativeSelect = el.querySelector(".dropdown__native");
      const trigger = el.querySelector(".dropdown__trigger");
      const valueEl = el.querySelector(".dropdown__value");
      const menu = el.querySelector(".dropdown__menu");
      const optionButtons = menu.querySelectorAll(".dropdown__option");

      let isOpen = false;

      const open = () => {
        if (disabled) return; // Защита от открытия
        isOpen = true;
        el.classList.add("dropdown_is-open");
      };

      const close = () => {
        isOpen = false;
        el.classList.remove("dropdown_is-open");
      };

      const toggle = () => (isOpen ? close() : open());

      const getLabelByValue = (val) => {
        const currentOptions = props.options || [];
        return (
          currentOptions.find((o) => o.value == val)?.label ??
          props.placeholder ??
          "Не выбрано"
        );
      };

      const highlightSelected = (val) => {
        optionButtons.forEach((btn) => {
          btn.classList.toggle(
            "dropdown__option_selected",
            btn.dataset.value === val
          );
        });
      };

      const setValue = (val, emitEvent = true) => {
        props.value = val;
        nativeSelect.value = val;
        valueEl.textContent = getLabelByValue(val);
        trigger.classList.toggle("dropdown__trigger_is-empty", !val);

        highlightSelected(val);

        if (emitEvent) {
          emit("onChange", val);
        }
      };

      if (defaultValue) {
        setValue(defaultValue, false);
      } else {
        valueEl.textContent = placeholder;
        trigger.classList.add("dropdown__trigger_is-empty");
      }

      // Слушатели событий
      trigger.addEventListener("click", toggle);

      menu.addEventListener("click", (e) => {
        const option = e.target.closest(".dropdown__option");
        if (!option || option.disabled) return;
        setValue(option.dataset.value);
        close();
      });

      nativeSelect.addEventListener("change", (e) => {
        setValue(e.target.value);
      });

      document.addEventListener("click", (e) => {
        if (!el.contains(e.target)) close();
      });
    },
  });
}

function createArrowIcon(className = "") {
  return `
  <svg class="${className}" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L5.35352 5.35352L10.3535 0.353516" stroke="currentColor" />
  </svg>
  `;
}
