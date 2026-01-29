import { createComponent } from "@/shared/lib/core/core.js";

export function DashboardContent(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        el.className = "dashboard-content";

        el.innerHTML = ` `;
      }
    },
  });
}
