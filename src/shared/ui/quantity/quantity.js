import { createComponent } from "@/shared/lib/core/core";

export function Quantity(props = {}) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit) {
      const { initialValue = 1, itemId, min = 1, max = 99 } = props;

      if (!el) {
        console.error("Quantity Error: container not found.");
        return;
      }

      el.className = "quantity";
      el.innerHTML = `
        <button class="quantity__decrease" type="button">${minusIcon()}</button>
        <input class="quantity__input" type="text" value="${initialValue}" name="quantity-input"/>
        <button class="quantity__increase" type="button">${plusIcon()}</button>
      `;

      const input = el.querySelector(".quantity__input");
      const increaseButton = el.querySelector(".quantity__increase");
      const decreaseButton = el.querySelector(".quantity__decrease");

      const notifyChange = (newValue) => {
        emit("onChange", {
          itemId,
          value: newValue,
        });
      };

      const clamp = (value) => {
        value = Math.max(min, value);
        value = Math.min(max, value);
        return value;
      };

      const updateQuantity = (delta) => {
        const currentValue = Number(input.value);
        let newValue = clamp(currentValue + delta);

        if (newValue !== currentValue) {
          input.value = newValue;
          notifyChange(newValue);
        }
      };

      const handleInputChange = (inputValue) => {
        let cleanValue = String(inputValue).replace(/[^0-9]/g, "");
        let newValue = Math.floor(Number(cleanValue));

        newValue = clamp(newValue);

        input.value = newValue;
        notifyChange(newValue);
      };

      const handleKeyDown = (e) => {
        if (
          [8, 9, 27, 13, 46].includes(e.keyCode) ||
          (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
          (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
          (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
          (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
          (e.keyCode >= 37 && e.keyCode <= 40)
        ) {
          return;
        }

        if (
          (e.keyCode < 48 || e.keyCode > 57) &&
          (e.keyCode < 96 || e.keyCode > 105)
        ) {
          e.preventDefault();
        }
      };

      const handlePaste = (e) => {
        e.preventDefault();

        const clipboardData = e.clipboardData || window.clipboardData;
        const pastedText = clipboardData.getData("Text");

        if (!/^[0-9]+$/.test(pastedText)) {
          return;
        }

        const pastedNumber = Number(pastedText);
        if (pastedNumber >= min && pastedNumber <= max) {
          document.execCommand("insertText", false, pastedText);
          handleInputChange(input.value);
        }
      };

      decreaseButton.addEventListener("click", () => updateQuantity(-1));
      increaseButton.addEventListener("click", () => updateQuantity(1));
      input.addEventListener("keydown", handleKeyDown);
      input.addEventListener("paste", handlePaste);
      input.addEventListener("change", (e) =>
        handleInputChange(e.target.value)
      );
    },
  });
}

const minusIcon = () => `
      <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="2" fill="#C4C4C4"/>
      </svg>
  `;

const plusIcon = () => `
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="5" width="12" height="2" fill="#C4C4C4"/>
      <rect x="7" width="12" height="2" transform="rotate(90 7 0)" fill="#C4C4C4"/>
    </svg>
  `;
