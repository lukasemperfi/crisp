import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";
import { MiniCart } from "../../features/cart/ui/mini-cart/mini-cart";
import { mockProducts } from "@/shared/helpers/mock-products";

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
  const miniCart = MiniCart({ items: products });
  const miniCartContainer = document.querySelector(".cart-item__popover");

  miniCartContainer.append(miniCart);
}

const products = mockProducts
  .map((product) => {
    const { variants, ...rest } = product;
    return {
      ...rest,
      sku: 434536465,
      quantity: 3,
      variant: variants[0],
    };
  })
  .slice(0, 6);
