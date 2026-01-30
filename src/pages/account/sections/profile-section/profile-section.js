import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { baseUrl } from "../../../../shared/helpers/base-url";

export const initProfileSection = () => {
  initAccountMenu();
};

function initAccountMenu() {
  const container = document.querySelector(".profile-section__menu");
  const currentPath = window.location.pathname;

  const menu = [
    {
      id: 1,
      value: `${baseUrl}account/dashboard/`,
      label: "Account Dashboard",
    },
    {
      id: 5,
      value: `${baseUrl}account/dahboard/`,
      label: "Account Information",
    },
    { id: 9, value: `${baseUrl}account/dashoard/`, label: "Address Book" },
    { id: 31, value: `${baseUrl}account/dashbard/`, label: "My Orders" },
    { id: 10, value: `${baseUrl}account/dashbord/`, label: "My Wishlist" },
    {
      id: 13,
      value: `${baseUrl}account/dashboar/`,
      label: "Newsletter Subscriptions",
    },
  ];

  const currentItem = menu.find((item) => item.value === currentPath);

  const defaultValue = currentItem ? currentItem.value : "";

  const dropdown = Dropdown({
    name: "account-menu",
    defaultValue,
    options: menu,
  });

  container.replaceChildren(dropdown);

  dropdown.addEventListener("onChange", (event) => {
    const value = event.detail;

    if (!value || value === window.location.pathname) {
      return;
    }
    window.location.href = value;
  });
}

// function initAccountMenu() {
//   try {
//     const currentUrl = window.location.href;
//     const menuLinks = document.querySelectorAll(".account-menu-list__link");

//     menuLinks.forEach((link) => {
//       const linkUrl = link.href;

//       if (linkUrl === currentUrl) {
//         link.classList.add("active");
//         link.setAttribute("aria-current", "page");
//       }
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }
