export function ColorFilter(
  container,
  { colors = [], title = "Color", showTitle = true } = {}
) {
  if (!container || !colors || !Array.isArray(colors)) {
    console.error("ColorFilter Error: container or colors array not found.");
    return;
  }

  const optionsHtml = colors
    .map((color) => createColorOptionHtml(color))
    .join("");

  const template = `
    <div class="color-filter">
      ${showTitle ? `<div class="color-filter__title">${title}</div>` : ""}
      <div class="color-filter__grid">
        ${optionsHtml}
      </div>
    </div>
  `;

  container.innerHTML = template;
}

function createColorOptionHtml(color) {
  const hex = (color.hex_code || "").toLowerCase();
  const isWhite = hex === "#ffffff" || hex === "#fff" || hex === "white";

  const whiteModifier = isWhite ? "color-filter__box_is-white" : "";

  return `
    <label class="color-filter__item" title="${color.name}" style="${
    color.available ? "" : "display: none;"
  }">
      <input type="checkbox" 
             class="color-filter__input" 
             name="filter-color" 
             value="${color.id}">
      <span class="color-filter__box ${whiteModifier}" style="background-color: ${
    color.hex_code
  };"></span>
    </label>
  `;
}
