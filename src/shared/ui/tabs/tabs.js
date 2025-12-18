export function initTabs(container, updateURL = false) {
  const navButtons = container.querySelectorAll(".tabs__nav-btn");
  const panels = container.querySelectorAll(".tabs__panel");
  let activeIndex = parseInt(container.dataset.activeIndex) || 0;
  console.log(
    "initTabs called with container:",
    container,
    "updateURL:",
    updateURL
  );
  navButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => switchTab(index, updateURL));
  });

  function switchTab(index, updateURL) {
    if (index === activeIndex) return;

    navButtons.forEach((btn, i) => {
      btn.setAttribute("aria-selected", i === index);
    });

    panels.forEach((panel, i) => {
      panel.hidden = i !== index;
    });

    activeIndex = index;
    container.dataset.activeIndex = index;

    if (updateURL && window.history.pushState) {
      const url = new URL(window.location);
      url.hash = `#tab-${container.dataset.tabsId}-${index}`;
      window.history.pushState({}, "", url);
      //   window.history.replaceState({}, '', url); To avoid cluttering browser history
    }
  }

  function handleHash() {
    const hash = window.location.hash;
    const match = hash.match(
      new RegExp(`#tab-${container.dataset.tabsId}-(\\d+)`)
    );
    if (match) {
      const index = parseInt(match[1]);
      if (index >= 0 && index < navButtons.length) {
        switchTab(index, false);
      }
    }
  }

  switchTab(activeIndex, updateURL);
  handleHash();

  window.addEventListener("hashchange", handleHash);

  return { switchTab, getActiveIndex: () => activeIndex };
}
