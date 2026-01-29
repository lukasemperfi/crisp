import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";
import { MiniCart } from "../../features/cart/ui/mini-cart/mini-cart";
import { store } from "../../app/store";
import {
  selectCartCount,
  selectCartTotalSum,
} from "../../features/cart/model/cart-slice";
import { formatPrice } from "@/shared/helpers/format-price";
import { Modal } from "../../shared/ui/modal/modal";
import { LoginForm } from "../../entities/auth/ui/login-form/login-form";
import { authApi } from "../../entities/auth/api/auth";
import { createComponent } from "../../shared/lib/core/core";
import { baseUrl } from "../../shared/helpers/base-url";

export async function initHeader() {
  initMenu();
  initResizeHandler();
  initActiveLink(".nav-menu__link");
  initMiniCart();
  initAuth();

  observeHeaderHeight();
}

function initMenu() {
  const menuButton = document.querySelector(".header__burger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  document.addEventListener("click", (event) => {
    const isClickInsideMenu = mobileMenu.contains(event.target);
    const isClickOnButton = menuButton.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnButton &&
      mobileMenu.classList.contains("is-open")
    ) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "auto";
  }
}

function initResizeHandler() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuButton = document.querySelector(".header__burger-btn");

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

function observeHeaderHeight(selector = ".header") {
  const header = document.querySelector(selector);
  if (!header) return null;

  const root = document.documentElement;

  const observer = new ResizeObserver((entries) => {
    const height = entries[0].target.offsetHeight;
    root.style.setProperty("--header-height", `${height}px`);
  });

  observer.observe(header);

  return observer;
}

function initMiniCart() {
  const miniCartContainer = document.querySelector(".cart-item__popover");
  const countContainer = document.querySelector(".cart-item__count");
  const totalSumContainer = document.querySelector(".cart-item__total");
  const miniCart = MiniCart({ items: [] });

  miniCartContainer.appendChild(miniCart);

  store.subscribe("cart", async (newState) => {
    const cartViewItems = newState.viewItems;
    const cartCount = selectCartCount(newState);
    const cartTotalSum = selectCartTotalSum(newState);

    miniCart.update({ items: cartViewItems, totalSum: cartTotalSum });
    countContainer.textContent = cartCount;
    totalSumContainer.textContent = `${formatPrice(cartTotalSum)} EUR`;
  });
}

async function initAuth() {
  // const isAuth = await getSession();

  const container = document.querySelector(".header__auth");

  if (container) {
    // container.replaceChildren(AuthButtons());
    container.replaceChildren(Profile());
  }

  store.subscribe("auth", (newState) => {});
}

function AuthButtons(initialProps = {}) {
  return createComponent(initialProps, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        const loginForm = LoginForm({
          onSubmit: async (data) => {
            console.log("Данные для входа:", data);
          },
        });

        const myModal = Modal({
          isOpen: false,
          content: loginForm,
          className: "login-modal",
        });

        document.body.appendChild(myModal);

        myModal.addEventListener("close", () => {
          myModal.update({ isOpen: false });
        });

        el.className = "auth";
        el.innerHTML = `
          <button class="auth__login" name="login" aria-label="SIGN IN">
            <span class="auth__link">SIGN IN</span>
          </button>
          <a href="${baseUrl}registration/" class="auth__link" name="registration" aria-label="CREATE AN ACCOUNT">
            CREATE AN ACCOUNT
          </a>
        `;

        const loginBtn = el.querySelector(".auth__login");
        loginBtn.addEventListener("click", (e) => {
          e.preventDefault();

          myModal.update({ isOpen: true });

          emit("login", { originalEvent: e });
        });
      }
    },
  });
}

function Profile(initialProps = {}) {
  return createComponent(initialProps, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        el.className = "profile-menu";

        const popoverId = "profile-popover-main";

        el.innerHTML = `
          <button class="profile-menu__trigger" popovertarget="${popoverId}">
            Profile
          </button>

          <div id="${popoverId}" popover class="profile-menu__popover">
            <nav class="profile-menu__nav">
              <ul class="profile-menu__list">
                <li class="profile-menu__item">
                  <a href="#" class="profile-menu__link">Account</a>
                </li>
              </ul>
              <div class="profile-menu__divider"></div>
              <button class="profile-menu__logout-btn">
                Logout
              </button>
            </nav>
          </div>
        `;

        const logoutBtn = el.querySelector(".profile-menu__logout-btn");
        logoutBtn.addEventListener("click", () => {
          console.log("Logging out...");
          emit("logout");

          el.querySelector(`[id="${popoverId}"]`).hidePopover();
        });
      }
    },
  });
}
