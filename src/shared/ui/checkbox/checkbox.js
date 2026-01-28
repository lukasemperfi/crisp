import { createComponent } from "@/shared/lib/core/core";

export function Checkbox(props) {
  return createComponent(props, {
    tag: "label",

    render(el, props, emit, { runOnce }) {
      const { label = "", inputProps = {} } = props;

      if (runOnce) {
        el.className = "checkbox";

        el.innerHTML = `
            <input type="checkbox" class="checkbox__input">
            <span class="checkbox__box"></span>
            <span class="checkbox__text"></span>
        `;

        const input = el.querySelector(".checkbox__input");

        Object.entries(inputProps).forEach(([key, value]) => {
          if (value === false || value == null) return;
          input.setAttribute(key, value === true ? "" : String(value));
        });

        el._els = {
          input,
          labelSpan: el.querySelector(".checkbox__text"),
        };
      }

      if (label !== undefined) {
        el._els.labelSpan.textContent = label;
      }
    },
  });
}
