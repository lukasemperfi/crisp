import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";
import { store } from "@/app/store";
import { AUTH_STATUS } from "@/entities/auth/model/auth-slice";
import { logoutUser } from "@/entities/auth/model/auth-slice";
import { getSession } from "@/app/providers/auth-guard";
import { CartPopup } from "@/features/cart/ui/cart-popup";
import { selectCartCount } from "@/features/cart/model/cart-slice";
import { supabase } from "../../shared/api/supabase/client";
import { userProfileApi } from "../../entities/profile/api/profile";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;

export async function initHeader() {
  initMenu();
  initResizeHandler();
  initActiveLink(".nav-menu__link");
  initHeaderAuth();
  initCartPopup();

  store.subscribe("cart", async (newState) => {
    const cartCount = selectCartCount(newState);
    updateCartCounter(cartCount);
  });
}

function initMenu() {
  const menuButton = document.querySelector(".middle-header__burger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeButton = document.querySelector(".mobile-menu__close");

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    });
  }
}

function initResizeHandler() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuButton = document.querySelector(".middle-header__burger-btn");

  if (!mobileMenu || !menuButton) {
    return;
  }

  window.addEventListener("resize", function () {
    if (mobileMenu.classList.contains("is-open")) {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    }
  });
}

async function initHeaderAuth() {
  const isAuth = await getSession();
  let profileData = null;

  if (isAuth) {
    profileData = await userProfileApi.getProfile();
  }

  const auth = createAuthComponent({ baseUrl });
  const authMobile = createAuthComponent({ baseUrl });

  const profile = createProfile({
    name: profileData ? profileData["full_name"] : "",
    items: [
      { label: "Профиль", href: `${baseUrl}profile/` },
      {
        label: "Выйти",
        onClick: async () => {
          await logoutUser();
          window.location.reload();
        },
        className: "logout",
      },
    ],
  });

  const profileMobile = createProfile({
    name: profileData ? profileData["full_name"] : "",
    items: [
      { label: "Профиль", href: `${baseUrl}profile/` },
      {
        label: "Выйти",
        onClick: async () => {
          await logoutUser();
          window.location.reload();
        },
        className: "logout",
      },
    ],
  });

  const authContainer = document.querySelector(".top-header__auth");
  const mobileAuthContainer = document.querySelector(".mobile-menu__auth");

  if (isAuth) {
    auth.mount(authContainer);
    authMobile.mount(mobileAuthContainer);
  } else {
    profile.mount(authContainer);
    profileMobile.mount(mobileAuthContainer);
  }

  const renderHeaderUI = (state) => {
    authContainer.innerHTML = "";
    mobileAuthContainer.innerHTML = "";

    if (!state.isAuth && state.status === AUTH_STATUS.IDLE) {
      auth.mount(authContainer);
      authMobile.mount(mobileAuthContainer);
    }
    if (state.isAuth && state.status === AUTH_STATUS.SUCCEEDED) {
      profile.mount(authContainer);
      profileMobile.mount(mobileAuthContainer);
    }
  };

  store.subscribe("auth", (newState) => {
    renderHeaderUI(newState);
  });
}

function initCartPopup() {
  const cartPopupBtn = document.querySelector(".cart-btn");
  const cartPopupContainer = document.querySelector(".middle-header__content");

  CartPopup({ trigger: cartPopupBtn, cartPopupContainer });
}

function createAuthComponent(initialProps = {}) {
  let props = {
    className: "",
    baseUrl: "/",
    ...initialProps,
  };

  const el = document.createElement("div");

  function render() {
    el.className = `auth ${props.className}`.trim();

    el.innerHTML = `
      <a href="${props.baseUrl}login/" class="auth__login" name="login" aria-label="Вход">
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.49977 5.37972C6.72278 5.37972 7.71432 4.17544 7.71432 2.68988C7.71432 1.20428 7.38879 0 5.49977 0C3.61076 0 3.28516 1.20428 3.28516 2.68988C3.28516 4.17544 4.2767 5.37972 5.49977 5.37972Z" fill="#93B474" />
          <path d="M9.68262 9.55787C9.68303 9.38582 9.68381 9.53307 9.68262 9.55787V9.55787Z" fill="#93B474" />
          <path d="M9.67726 9.37801C9.63624 6.79012 9.29826 6.05271 6.71191 5.58594C6.71191 5.58594 6.34784 6.04985 5.49927 6.04985C4.6507 6.04985 4.28656 5.58594 4.28656 5.58594C1.72843 6.04762 1.3699 6.77409 1.32275 9.29394C1.31889 9.4997 1.3171 9.51052 1.31641 9.48663C1.31656 9.53138 1.31675 9.61417 1.31675 9.75852C1.31675 9.75852 1.9325 10.9998 5.49927 10.9998C9.06597 10.9998 9.68178 9.75852 9.68178 9.75852C9.68178 9.66577 9.68185 9.60128 9.68194 9.55741C9.68125 9.57218 9.67987 9.54355 9.67726 9.37801Z" fill="#93B474" />
        </svg>
        <span class="auth__link">Вход</span>
      </a>

      <a href="${props.baseUrl}registration/" class="auth__link" name="registration" aria-label="Регистрация">
        Регистрация
      </a>
    `;

    setActiveLink();
  }

  function setActiveLink() {
    const currentPath = window.location.pathname.replace(/\/+$/, "");

    const links = el.querySelectorAll("a");

    links.forEach((link) => {
      const linkPath = link.getAttribute("href").replace(/\/+$/, "");

      if (linkPath === currentPath) {
        link.classList.add("active");
        link.addEventListener("click", preventDefault);
      } else {
        link.classList.remove("active");
        link.removeEventListener("click", preventDefault);
      }
    });
  }

  function preventDefault(e) {
    e.preventDefault();
  }

  function mount(parent) {
    parent.appendChild(el);
  }

  function update(newProps = {}) {
    props = { ...props, ...newProps };
    render();
  }

  function destroy() {
    const links = el.querySelectorAll("a");
    links.forEach((link) => link.removeEventListener("click", preventDefault));
    el.remove();
  }

  render();

  return { el, mount, update, destroy };
}

function createProfile(initialProps = {}) {
  let props = {
    name: "Profile",
    className: "",
    items: [],
    ...initialProps,
  };

  const wrapper = document.createElement("div");
  wrapper.className = `profile ${props.className}`.trim();

  const button = document.createElement("button");
  const menu = document.createElement("div");

  let menuId = "profile-menu-" + Math.random().toString(36).slice(2);

  function render() {
    button.className = "profile-button";
    button.setAttribute("popovertarget", menuId);

    button.innerHTML = `
    <span class="profile-button__icon" style="display:flex;align-items:center;margin-right:6px;">
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.49977 5.37972C6.72278 5.37972 7.71432 4.17544 7.71432 2.68988C7.71432 1.20428 7.38879 0 5.49977 0C3.61076 0 3.28516 1.20428 3.28516 2.68988C3.28516 4.17544 4.2767 5.37972 5.49977 5.37972Z" fill="#93B474"/>
        <path d="M9.68262 9.55787C9.68303 9.38582 9.68381 9.53307 9.68262 9.55787V9.55787Z" fill="#93B474"/>
        <path d="M9.67726 9.37801C9.63624 6.79012 9.29826 6.05271 6.71191 5.58594C6.71191 5.58594 6.34784 6.04985 5.49927 6.04985C4.6507 6.04985 4.28656 5.58594 4.28656 5.58594C1.72843 6.04762 1.3699 6.77409 1.32275 9.29394C1.31889 9.4997 1.3171 9.51052 1.31641 9.48663C1.31656 9.53138 1.31675 9.61417 1.31675 9.75852C1.31675 9.75852 1.9325 10.9998 5.49927 10.9998C9.06597 10.9998 9.68178 9.75852 9.68178 9.75852C9.68178 9.66577 9.68185 9.60128 9.68194 9.55741C9.68125 9.57218 9.67987 9.54355 9.67726 9.37801Z" fill="#93B474"/>
      </svg>
    </span>
    <span class="profile-button__name auth__link">${props.name}</span>
  `;

    menu.id = menuId;
    menu.className = "profile-menu";
    menu.setAttribute("popover", "");
    menu.setAttribute("role", "menu");

    menu.innerHTML = `
      <ul>
        ${props.items
          .map((item, index) => {
            if (item.href) {
              return `<li data-index="${index}">
                <a href="${item.href}">${item.label}</a>
              </li>`;
            }

            return `<li data-index="${index}" class="menu-action ${
              item.className ? item.className : ""
            }">${item.label}</li>`;
          })
          .join("")}
      </ul>
    `;
  }

  function attachEvents() {
    props.items.forEach((item, index) => {
      if (item.onClick) {
        const li = menu.querySelector(`li[data-index="${index}"]`);
        li.addEventListener("click", item.onClick);
      }
    });
  }

  function detachEvents() {
    props.items.forEach((item, index) => {
      if (item.onClick) {
        const li = menu.querySelector(`li[data-index="${index}"]`);
        li?.removeEventListener("click", item.onClick);
      }
    });
  }

  function mount(parent) {
    wrapper.appendChild(button);
    wrapper.appendChild(menu);
    parent.appendChild(wrapper);
    attachEvents();
  }

  function update(newProps = {}) {
    detachEvents();
    props = { ...props, ...newProps };
    render();
    attachEvents();
  }

  function destroy() {
    detachEvents();
    wrapper.remove();
  }

  render();

  return { el: wrapper, mount, update, destroy };
}

function updateCartCounter(count) {
  const counterEl = document.querySelector(".cart-btn_counter");

  counterEl.innerHTML = count;

  return counterEl;
}
