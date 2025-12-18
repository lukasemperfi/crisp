export function createFormattedCurrencyElement(amount, unit) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("currency-cell");

  const formattedAmount = Number(amount).toFixed(2);

  wrapper.innerHTML = `
        <span class="currency-cell__amount">${formattedAmount}</span>
        <span class="currency-cell__unit">${unit}</span>
    `;
  return wrapper;
}
