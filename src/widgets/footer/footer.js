export const initPageFooter = () => {
  initFooterAccordion();
};

const initFooterAccordion = (
  titleSelector = ".js-accordion-title",
  parentSelector = ".page-footer-item",
  breakpoint = 500
) => {
  const accordionTitles = document.querySelectorAll(titleSelector);

  if (!accordionTitles.length) {
    return;
  }

  accordionTitles.forEach((title) => {
    title.addEventListener("click", () => {
      if (window.innerWidth <= breakpoint) {
        const parent = title.closest(parentSelector);
        const isActive = parent.classList.contains("is-active");

        document.querySelectorAll(parentSelector).forEach((item) => {
          item.classList.remove("is-active");
        });

        if (!isActive) {
          parent.classList.add("is-active");
        }
      }
    });
  });
};
