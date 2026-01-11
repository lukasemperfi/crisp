export function SizeFilter(
  container,
  {
    sizes = [],
    title = "Size",
    showTitle = true,
    selectionMode = "multiple",
  } = {}
) {
  if (!container || !sizes || !Array.isArray(sizes)) {
    console.error("SizeFilter Error: container or sizes array not found.");
    return;
  }

  const sortedSizes = [...sizes].sort((a, b) => a.sort_order - b.sort_order);

  const optionsHtml = sortedSizes
    .map((size) => createSizeOptionHtml(size))
    .join("");

  const template = `
    <div class="size-filter">
    <div class="size-filter__header">
     ${showTitle ? `<div class="size-filter__title">${title}</div>` : ""}
     <a class="size-filter__guide" href="#" name="size guide">Size guide</a>
    </div>
      <div class="size-filter__grid">
        ${optionsHtml}
      </div>
    </div>
  `;

  container.innerHTML = template;

  if (selectionMode === "single") {
    const inputs = container.querySelectorAll(".size-filter__input");

    inputs.forEach((input) => {
      input.addEventListener("change", () => {
        if (!input.checked) return;

        inputs.forEach((other) => {
          if (other !== input) {
            other.checked = false;
          }
        });
      });
    });
  }
}

function createSizeOptionHtml(size) {
  const disabledClass = size.availible ? "" : "size-filter__box_disabled";

  return `
    <label class="size-filter__item" title="${size.name}">
      <input type="checkbox" 
             class="size-filter__input" 
             name="filter-size" 
             value="${size.name}" ${!size.availible ? "disabled" : ""} />
      <span class="size-filter__box ${disabledClass}">
        ${size.name}
      </span>
    </label>
  `;
}
