import { createComponent } from "@/shared/lib/core/core";

export function ColorFilter(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit) {
      const {
        colors = [],
        title = "Color",
        showTitle = true,
        maxVisibleColors = null,
        selectionMode = "multiple",
        selectedId = null,
      } = props;

      if (!Array.isArray(colors)) {
        console.error("ColorFilter Error: colors array not found.");
        return;
      }

      const hasLimit =
        typeof maxVisibleColors === "number" && maxVisibleColors > 0;

      const visibleColors = hasLimit
        ? colors.slice(0, maxVisibleColors)
        : colors;
      const hiddenColors = hasLimit ? colors.slice(maxVisibleColors) : [];

      const visibleHtml = visibleColors
        .map((color) => createColorOptionHtml(color, false, selectedId))
        .join("");

      const hiddenHtml = hiddenColors
        .map((color) => createColorOptionHtml(color, true, selectedId))
        .join("");

      const moreButtonHtml =
        hasLimit && hiddenColors.length
          ? `<button class="color-filter__more-btn" type="button">…</button>`
          : "";

      el.className = "color-filter";

      el.innerHTML = `
        ${showTitle ? `<div class="color-filter__title">${title}</div>` : ""}
        <div class="color-filter__grid">
          ${visibleHtml}
          ${moreButtonHtml}
          ${hiddenHtml}
        </div>
      `;

      if (hasLimit && hiddenColors.length) {
        const moreBtn = el.querySelector(".color-filter__more-btn");
        const hiddenItems = el.querySelectorAll(
          ".color-filter__item_is-hidden"
        );

        if (moreBtn) {
          moreBtn.addEventListener("click", () => {
            hiddenItems.forEach((item) => {
              item.style.display = "";
            });
            moreBtn.remove();
          });
        }
      }

      const inputs = el.querySelectorAll(".color-filter__input");

      if (selectionMode === "single" && selectedId != null) {
        inputs.forEach((input) => {
          input.checked = Number(input.value) === Number(selectedId);
        });
      }

      if (selectionMode === "single") {
        inputs.forEach((input) => {
          input.addEventListener("change", () => {
            if (!input.checked) return;

            inputs.forEach((other) => {
              if (other !== input) {
                other.checked = false;
              }
            });

            emit("onChange", { selected: Number(input.value) });
          });
        });
      } else {
        inputs.forEach((input) => {
          input.addEventListener("change", () => {
            const selected = Array.from(inputs)
              .filter((i) => i.checked)
              .map((i) => Number(i.value));

            emit("onChange", { selected });
          });
        });
      }
    },
  });
}

function createColorOptionHtml(color, isHidden = false, selectedId = null) {
  const hex = (color.hex_code || "").toLowerCase();
  const isWhite = hex === "#ffffff" || hex === "#fff" || hex === "white";

  const whiteModifier = isWhite ? "color-filter__box_is-white" : "";
  const hiddenClass = isHidden ? "color-filter__item_is-hidden" : "";
  const isChecked = Number(color.id) === Number(selectedId);

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
        ${isChecked ? "checked" : ""}
      />
      <span
        class="color-filter__box ${whiteModifier}"
        style="background-color: ${color.hex_code};"
      ></span>
    </label>
  `;
}
