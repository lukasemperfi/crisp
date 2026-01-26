import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";
import { MiniCart } from "../../features/cart/ui/mini-cart/mini-cart";
import { store } from "../../app/store";
import {
  selectCartCount,
  selectCartTotalSum,
} from "../../features/cart/model/cart-slice";
import { formatPrice } from "@/shared/helpers/format-price";

export async function initHeader() {
  initMenu();
  initResizeHandler();
  initActiveLink(".nav-menu__link");

  initMiniCart();

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
