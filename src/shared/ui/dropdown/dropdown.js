export const initDropdown = ({
  items = null,
  selector,
  onChange,
  defaultValues = [],
  disabled = false,
  multiple = false,
}) => {
  const select = document.querySelector(selector);
  const isMultiple = select.dataset.multiple === "true";
  const button = select.querySelector(".dropdown__button");
  const selectedText = select.querySelector(".dropdown__selected");
  const hiddenSelect = select.querySelector("select");
  const optionsContainer = select.querySelector(".dropdown__dropdown");

  const generateOptions = (items) => {
    return items
      .map(
        (option) => `
        <li class="dropdown__option" role="option" data-value="${option.value}">
          <div class="dropdown__label">${option.label}</div>
          ${multiple ? '<span class="dropdown__checkbox"></span>' : ""}
        </li>`
      )
      .join("");
  };

  if (items !== null) {
    optionsContainer.innerHTML = generateOptions(items);
  }

  let options = select.querySelectorAll(".dropdown__option");

  button.disabled = disabled;

  const setDisabled = (state) => {
    if (state) {
      button.disabled = true;
    } else {
      button.disabled = false;
    }
  };

  let selected = [];

  const toggleDropdown = () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
  };

  const closeDropdown = () => {
    button.setAttribute("aria-expanded", "false");
  };

  const updateSelected = () => {
    const labels = selected.map((opt) =>
      opt.querySelector(".dropdown__label").textContent.trim()
    );

    selectedText.textContent =
      labels.length > 0
        ? labels.join(", ")
        : selectedText.dataset.placeholder || "Select...";

    if (hiddenSelect) {
      // hiddenSelect.innerHTML = "";
      options.forEach((opt) => {
        const value = opt.dataset.value;
        const label = opt.querySelector(".dropdown__label").textContent.trim();
        const optionEl = document.createElement("option");
        optionEl.value = value;
        optionEl.textContent = label;
        if (opt.getAttribute("aria-selected") === "true") {
          optionEl.selected = true;
        }
        hiddenSelect.appendChild(optionEl);
      });

      hiddenSelect.dispatchEvent(new Event("change"));
    }
  };

  const handleOptionClick = (option) => {
    const isSelected = option.getAttribute("aria-selected") === "true";

    if (isMultiple) {
      if (isSelected) {
        option.setAttribute("aria-selected", "false");
        selected = selected.filter((opt) => opt !== option);
      } else {
        option.setAttribute("aria-selected", "true");
        selected.push(option);
      }
    } else {
      options.forEach((opt) => opt.removeAttribute("aria-selected"));
      option.setAttribute("aria-selected", "true");
      selected = [option];
      closeDropdown();
    }

    updateSelected();
  };

  button.addEventListener("click", toggleDropdown);

  optionsContainer.addEventListener("click", (e) => {
    const option = e.target.closest(".dropdown__option");
    if (!option) {
      return;
    }

    e.stopPropagation();
    handleOptionClick(option);

    if (onChange) {
      const value = option.dataset.value;
      const type = select.dataset.name;

      onChange(type, value);
    }
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      closeDropdown();
    }
  });

  selectedText.dataset.placeholder = selectedText.textContent.trim();

  if (defaultValues.length > 0) {
    options.forEach((opt) => {
      const value = opt.dataset.value;
      if (defaultValues.includes(value)) {
        opt.setAttribute("aria-selected", "true");
        selected.push(opt);
      }
    });
    updateSelected();
  }

  const reset = () => {
    options.forEach((opt) => opt.removeAttribute("aria-selected"));
    selected = [];
    updateSelected();
  };

  const updateOptions = (newItems) => {
    optionsContainer.innerHTML = generateOptions(newItems);

    options = select.querySelectorAll(".dropdown__option");

    selected = [];
    updateSelected();

    options.forEach((opt) => {
      opt.addEventListener("click", () => {
        handleOptionClick(opt);
      });
    });
  };

  return {
    reset,
    updateOptions,
    setDisabled,
  };
};
