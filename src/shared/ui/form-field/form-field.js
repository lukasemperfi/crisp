import { createComponent } from "@/shared/lib/core/core";

export function FormField(initialProps) {
  return createComponent(initialProps, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const {
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
          <label class="form-field__label"></label>

          <div class="form-field__control">
            <input class="form-field__input" />
            ${
              withButton
                ? `<button type="button" class="form-field__action">
                     ${buttonText}
                   </button>`
                : ""
            }
          </div>

          <div class="form-field__message">
            <span class="form-field__message-text"></span>
            <span class="form-field__message-icon">X</span>
          </div>
        `;

        const input = el.querySelector(".form-field__input");

        Object.entries(inputProps).forEach(([key, value]) => {
          if (value === false || value == null) {
            return;
          }

          if (value === true) {
            input.setAttribute(key, "");
          } else {
            input.setAttribute(key, String(value));
          }
        });

        el._els = {
          input,
          messageText: el.querySelector(".form-field__message-text"),
        };
      }

      if (messageText !== undefined) {
        el._els.messageText.textContent = messageText;
      }
    },
  });
}
