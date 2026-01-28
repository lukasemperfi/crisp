import { createComponent } from "@/shared/lib/core/core";
import { IconCross2 } from "@/shared/ui/icons/icons";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

export function Modal(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const { isOpen = false, content = "", size = "md" } = props;

      if (runOnce) {
        el.className = "modal";

        el.innerHTML = `
          <div class="modal__overlay">
            <div class="modal__window">
              <header class="modal__header">
                <button class="modal__close-btn" type="button" aria-label="Close modal">
                  ${IconCross2({ size: 21, className: "modal__close-icon" })}
                </button>
              </header>
              <div class="modal__content"></div>
            </div>
          </div>
        `;

        el._els = {
          overlay: el.querySelector(".modal__overlay"),
          window: el.querySelector(".modal__window"),
          body: el.querySelector(".modal__content"),
          closeBtn: el.querySelector(".modal__close-btn"),
        };

        el._els.overlay.onclick = (e) => {
          if (e.target === el._els.overlay) emit("close");
        };

        el._els.closeBtn.onclick = () => emit("close");

        const handleEsc = (e) => {
          if (e.key === "Escape" && el.classList.contains("modal_open")) {
            emit("close");
          }
        };
        document.addEventListener("keydown", handleEsc);

        el.onDestroy = () => {
          document.removeEventListener("keydown", handleEsc);
          clearAllBodyScrollLocks();
        };
      }

      if (isOpen) {
        el.classList.add("modal_open");
        disableBodyScroll(el._els.body, {
          reserveScrollBarGap: true,
        });
      } else {
        el.classList.remove("modal_open");
        enableBodyScroll(el._els.body);
      }

      el._els.window.className = `modal__window modal__window_size_${size}`;

      renderContent(el._els.body, content);
    },
  });
}

function renderContent(container, content) {
  if (!content) {
    container.innerHTML = "";
    return;
  }
  if (content instanceof HTMLElement) {
    if (container.firstChild !== content) {
      container.innerHTML = "";
      container.appendChild(content);
    }
  } else {
    container.innerHTML = content;
  }
}
