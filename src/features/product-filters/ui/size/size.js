import { createComponent } from "@/shared/lib/core/core";

export function SizeFilter(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit) {
      const {
        sizes = [],
        title = "Size",
        showTitle = true,
        selectionMode = "multiple",
      } = props;

      if (!sizes || !Array.isArray(sizes)) {
        console.error("SizeFilter Error: sizes array not found.");
        return;
      }

      const sortedSizes = [...sizes].sort(
        (a, b) => a.sort_order - b.sort_order
      );

      const optionsHtml = sortedSizes.map(createSizeOptionHtml).join("");

      el.className = "size-filter";
      el.innerHTML = `
        <div class="size-filter__header">
          ${showTitle ? `<div class="size-filter__title">${title}</div>` : ""}
          <a class="size-filter__guide" href="#" name="size guide">Size guide</a>
        </div>
        <div class="size-filter__grid">
          ${optionsHtml}
        </div>
      `;

      const inputs = el.querySelectorAll(".size-filter__input");

      if (selectionMode === "single") {
        inputs.forEach((input) => {
          input.addEventListener("change", () => {
            if (!input.checked) return;

            inputs.forEach((other) => {
              if (other !== input) other.checked = false;
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

function createSizeOptionHtml(size) {
  const disabledClass = size.available ? "" : "size-filter__box_disabled";

  return `
    <label class="size-filter__item" title="${size.name}">
      <input type="checkbox"
             class="size-filter__input"
             name="filter-size"
             value="${size.id}" ${!size.available ? "disabled" : ""} />
      <span class="size-filter__box ${disabledClass}">
        ${size.name}
      </span>
    </label>
  `;
}

// import { createComponent } from "@/shared/lib/core/core";

// export function SizeFilter(props) {
//   return createComponent(props, {
//     tag: "div",
//     render(el, props) {
//       const {
//         sizes = [],
//         title = "Size",
//         showTitle = true,
//         selectionMode = "multiple",
//       } = props;

//       el.className = "size-filter";

//       const sortedSizes = [...sizes].sort(
//         (a, b) => a.sort_order - b.sort_order
//       );

//       const optionsHtml = sortedSizes
//         .map((size) => createSizeOptionHtml(size))
//         .join("");

//       el.innerHTML = `
//           <div class="size-filter__header">
//             ${showTitle ? `<div class="size-filter__title">${title}</div>` : ""}
//           <a class="size-filter__guide" href="#" name="size guide">Size guide</a>
//           </div>
//             <div class="size-filter__grid">${optionsHtml}</div>
//       `;

//       if (selectionMode === "single") {
//         const inputs = el.querySelectorAll(".size-filter__input");

//         inputs.forEach((input) => {
//           input.addEventListener("change", () => {
//             if (!input.checked) return;

//             inputs.forEach((other) => {
//               if (other !== input) {
//                 other.checked = false;
//               }
//             });
//           });
//         });
//       }

//       const emitChange = () => {
//         el.dispatchEvent(
//           new CustomEvent("onChange", {
//             detail: { header: headerEl.innerHTML },
//             bubbles: true,
//           })
//         );
//       };
//     },
//   });
// }

// export function SizeFilter(
//   container,
//   {
//     sizes = [],
//     title = "Size",
//     showTitle = true,
//     selectionMode = "multiple",
//     onChange = null,
//   } = {}
// ) {
//   if (!container || !sizes || !Array.isArray(sizes)) {
//     console.error("SizeFilter Error: container or sizes array not found.");
//     return;
//   }

// const sortedSizes = [...sizes].sort((a, b) => a.sort_order - b.sort_order);

// const optionsHtml = sortedSizes
//   .map((size) => createSizeOptionHtml(size))
//   .join("");

//   const template = `
//     <div class="size-filter">
//     <div class="size-filter__header">
//      ${showTitle ? `<div class="size-filter__title">${title}</div>` : ""}
//      <a class="size-filter__guide" href="#" name="size guide">Size guide</a>
//     </div>
//       <div class="size-filter__grid">
//         ${optionsHtml}
//       </div>
//     </div>
//   `;

//   container.innerHTML = template;

//   if (selectionMode === "single") {
//     const inputs = container.querySelectorAll(".size-filter__input");

//     inputs.forEach((input) => {
//       input.addEventListener("change", () => {
//         if (!input.checked) return;

//         inputs.forEach((other) => {
//           if (other !== input) {
//             other.checked = false;
//           }
//         });

//         if (typeof onChange === "function") {
//           onChange(Number(input.value));
//         }
//       });
//     });
//   }
// }

// function createSizeOptionHtml(size) {
//   const disabledClass = size.available ? "" : "size-filter__box_disabled";

//   return `
//     <label class="size-filter__item" title="${size.name}">
//       <input type="checkbox"
//              class="size-filter__input"
//              name="filter-size"
//              value="${size.id}" ${!size.available ? "disabled" : ""} />
//       <span class="size-filter__box ${disabledClass}">
//         ${size.name}
//       </span>
//     </label>
//   `;
// }
