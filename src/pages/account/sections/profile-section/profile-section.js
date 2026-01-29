export const initProfileSection = () => {
  initAccountMenu();
};

function initAccountMenu() {
  try {
    const currentUrl = window.location.href;
    const menuLinks = document.querySelectorAll(".account-menu-list__link");

    menuLinks.forEach((link) => {
      const linkUrl = link.href;

      if (linkUrl === currentUrl) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
      }
    });
  } catch (error) {
    console.error(error);
  }
}
