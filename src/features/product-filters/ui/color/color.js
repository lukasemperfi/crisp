export function ColorFilter(
  container,
  {
    colors = [],
    title = "Color",
    showTitle = true,
    maxVisibleColors = null,
    selectionMode = "multiple",
    onChange = null,
  } = {}
) {
  if (!container || !Array.isArray(colors)) {
    console.error("ColorFilter Error: container or colors array not found.");
    return;
  }

  const hasLimit = typeof maxVisibleColors === "number" && maxVisibleColors > 0;
  const visibleColors = hasLimit ? colors.slice(0, maxVisibleColors) : colors;
  const hiddenColors = hasLimit ? colors.slice(maxVisibleColors) : [];

  const visibleHtml = visibleColors
    .map((color) => createColorOptionHtml(color))
    .join("");

  const hiddenHtml = hiddenColors
    .map((color) => createColorOptionHtml(color, true))
    .join("");

  const moreButtonHtml =
    hasLimit && hiddenColors.length
      ? `<button class="color-filter__more-btn" type="button">…</button>`
      : "";

  const template = `
    <div class="color-filter">
      ${showTitle ? `<div class="color-filter__title">${title}</div>` : ""}
      <div class="color-filter__grid">
        ${visibleHtml}
        ${moreButtonHtml}
        ${hiddenHtml}
      </div>
    </div>
  `;

  container.innerHTML = template;

  if (hasLimit && hiddenColors.length) {
    const moreBtn = container.querySelector(".color-filter__more-btn");
    const hiddenItems = container.querySelectorAll(
      ".color-filter__item_is-hidden"
    );

    moreBtn.addEventListener("click", () => {
      hiddenItems.forEach((item) => {
        item.style.display = "";
      });
      moreBtn.remove();
    });
  }
  const inputs = container.querySelectorAll(".color-filter__input");
  if (selectionMode === "single") {
    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (!input.checked) return;

        inputs.forEach((other) => {
          if (other !== input) {
            other.checked = false;
          }
        });

        if (typeof onChange === "function") {
          onChange(Number(input.value));
        }
      });
    });
  }
}

function createColorOptionHtml(color, isHidden = false) {
  const hex = (color.hex_code || "").toLowerCase();
  const isWhite = hex === "#ffffff" || hex === "#fff" || hex === "white";

  const whiteModifier = isWhite ? "color-filter__box_is-white" : "";
  const hiddenClass = isHidden ? "color-filter__item_is-hidden" : "";
  const hiddenStyle = isHidden ? "display: none;" : "";

  return `
    <label
      class="color-filter__item ${hiddenClass}"
      title="${color.name}"
      style="${!color.available ? "opacity: 0.2; pointer-events: none;" : ""}"
    >
      <input
        type="checkbox"
        class="color-filter__input"
        name="filter-color"
        value="${color.id}"
      />
      <span
        class="color-filter__box ${whiteModifier}"
        style="background-color: ${color.hex_code};"
      ></span>
    </label>
  `;
}
