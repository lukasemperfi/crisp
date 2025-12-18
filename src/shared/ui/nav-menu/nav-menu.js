export function initActiveLink(
  selector = ".nav-menu__link",
  activeClass = "active"
) {
  const normalizePath = (path) => {
    if (!path) {
      return "/";
    }
    return "/" + path.replace(/^\/+|\/+$/g, "");
  };

  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll(selector).forEach((link) => {
    const hrefAttr = link.getAttribute("href");

    if (!hrefAttr || hrefAttr.startsWith("#")) {
      return;
    }

    const linkPath = normalizePath(hrefAttr);

    if (linkPath === currentPath) {
      link.classList.add(activeClass);

      link.style.pointerEvents = "none";
      link.style.cursor = "default";
      link.setAttribute("aria-disabled", "true");
    } else {
      link.classList.remove(activeClass);
      link.style.pointerEvents = "";
      link.style.cursor = "";
      link.removeAttribute("aria-disabled");
    }
  });
}
