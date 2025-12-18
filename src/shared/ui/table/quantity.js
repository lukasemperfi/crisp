export class QuantityComponent {
  #element;
  #input;
  #increaseButton;
  #decreaseButton;
  #itemId;
  #min;
  #max;

  constructor(initialValue, itemId, min = 1, max = 99) {
    this.#itemId = itemId;

    this.#min = min;
    this.#max = max;

    this.#element = createQuantityDomStructure(initialValue);

    this.#input = this.#element.querySelector(".quantity__input");
    this.#increaseButton = this.#element.querySelector(".quantity__increase");
    this.#decreaseButton = this.#element.querySelector(".quantity__decrease");

    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.#decreaseButton.addEventListener("click", () =>
      this.#updateQuantity(-1)
    );
    this.#increaseButton.addEventListener("click", () =>
      this.#updateQuantity(1)
    );

    this.#input.addEventListener("keydown", this.#handleKeyDown.bind(this));
    this.#input.addEventListener("paste", this.#handlePaste.bind(this));

    this.#input.addEventListener("change", (e) =>
      this.#handleInputChange(e.target.value)
    );
  }

  #handlePaste(e) {
    e.preventDefault();
    const previousValue = this.#input.value;

    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedText = clipboardData.getData("Text");

    const isOnlyDigits = /^[0-9]+$/.test(pastedText);

    if (!isOnlyDigits) {
      this.#input.value = previousValue;
      return;
    }

    const pastedNumber = Number(pastedText);

    if (pastedNumber < this.#min || pastedNumber > this.#max) {
      this.#input.value = previousValue;
      return;
    }

    document.execCommand("insertText", false, pastedText);

    this.#handleInputChange(this.#input.value);
  }

  #handleKeyDown(e) {
    if (
      [8, 9, 27, 13, 46].includes(e.keyCode) ||
      (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) || // A
      (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) || // C
      (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) || // V
      (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) || // X
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
  }

  #updateQuantity(delta) {
    let currentValue = Number(this.#input.value);
    let newValue = currentValue + delta;

    newValue = Math.max(this.#min, newValue);
    newValue = Math.min(this.#max, newValue);

    if (newValue !== currentValue) {
      this.#input.value = newValue;
      this.#notifyChange(newValue);
    }
  }

  #handleInputChange(inputValue) {
    let cleanValue = String(inputValue).replace(/[^0-9]/g, "");

    let newValue = Math.floor(Number(cleanValue));

    newValue = Math.max(this.#min, newValue);
    newValue = Math.min(this.#max, newValue);

    this.#input.value = newValue;

    this.#notifyChange(newValue);
  }

  #notifyChange(newQuantity) {
    this.#element.dispatchEvent(
      new CustomEvent("quantityChange", {
        bubbles: true,
        detail: {
          itemId: this.#itemId,
          newQuantity: newQuantity,
        },
      })
    );
  }

  get element() {
    return this.#element;
  }
}

///////Fabrics/////////////

function createDecreaseIcon() {
  return `
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15004_11)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M2.56815 4.99357L6.4 1.22265L5.05478 0L0 4.99357L5.05478 10L6.4 8.77735L2.56815 4.99357Z"
                    fill="#8A8A8A" />
            </g>
            <defs>
                <clipPath id="clip0_15004_11">
                    <rect width="10" height="8" fill="white" transform="matrix(0 1 1 0 0 0)" />
                </clipPath>
            </defs>
        </svg>`;
}

function createIncreaseIcon() {
  return `
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15004_7)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.43185 4.99357L1.6 1.22265L2.94522 0L8 4.99357L2.94522 10L1.6 8.77735L5.43185 4.99357Z"
                    fill="#8A8A8A" />
            </g>
            <defs>
                <clipPath id="clip0_15004_7">
                    <rect width="10" height="8" fill="white" transform="matrix(0 1 -1 0 8 0)" />
                </clipPath>
            </defs>
        </svg>`;
}

function createQuantityDomStructure(initialValue) {
  const template = `
        <button class="quantity__decrease" type="button">${createDecreaseIcon()}</button>
        <input type="text" class="quantity__input" value="${initialValue}" aria-label="Количество" name="quantity-input">
        <button class="quantity__increase" type="button">${createIncreaseIcon()}</button>
    `;

  const container = document.createElement("div");
  container.classList.add("quantity");
  container.innerHTML = template;

  return container;
}
