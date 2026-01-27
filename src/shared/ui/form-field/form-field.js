import { createComponent } from "@/shared/lib/core/core";

export function FormField(initialProps) {
  return createComponent(initialProps, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const {
        label = "",
        messageText = "",
        buttonText = "",
        withButton = false,
        inputProps = {},
      } = props;

      if (runOnce) {
        el.className = ["form-field", withButton && "form-field_with-button"]
          .filter(Boolean)
          .join(" ");

        el.innerHTML = `
          <label class="form-field__label" for="${inputProps.id || ""}"></label>

          <div class="form-field__control">
            <input class="form-field__input" />
            ${withButton ? `<button type="button" class="form-field__action">${buttonText}</button>` : ""}
          </div>

          <div class="form-field__message">
            <span class="form-field__message-text"></span>
            <span class="form-field__message-icon">X</span>
          </div>
        `;

        const input = el.querySelector(".form-field__input");
        const labelEl = el.querySelector(".form-field__label");

        Object.entries(inputProps).forEach(([key, value]) => {
          if (value === false || value == null) return;
          input.setAttribute(key, value === true ? "" : String(value));
        });

        el._els = {
          input,
          label: labelEl,
          messageText: el.querySelector(".form-field__message-text"),
        };
      }

      if (label !== undefined) {
        el._els.label.textContent = label;
      }
      if (messageText !== undefined) {
        el._els.messageText.textContent = messageText;
      }
    },
  });
}
