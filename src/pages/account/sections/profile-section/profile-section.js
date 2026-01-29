export const initProfileSection = () => {
  initAccountMenu();
};

function initAccountMenu() {
  try {
    const currentUrl = window.location.href;
    const menuLinks = document.querySelectorAll(".account-menu-list__link");
    toogleAccountMenu();

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

function toogleAccountMenu() {
  const menu = document.querySelector(".profile-section__menu");
  const toggleBtn = document.querySelector(".profile-section__menu-toggle");
  const rightIcon = document.querySelector(
    ".profile-section__menu-toggle-right-icon"
  );
  const leftIcon = document.querySelector(
    ".profile-section__menu-toggle-left-icon"
  );

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("show");
    toggleBtn.classList.toggle("show");
  });
}
