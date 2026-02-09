import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";
import { MiniCart } from "@/features/cart/ui/mini-cart/mini-cart";
import { store } from "@/app/store";
import {
  selectCartCount,
  selectCartTotalSum,
} from "@/features/cart/model/cart-slice";
import { formatPrice } from "@/shared/helpers/format-price";
import { Modal } from "@/shared/ui/modal/modal";
import { LoginForm } from "@/entities/auth/ui/login-form/login-form";
import { authApi } from "@/entities/auth/api/auth";
import { createComponent } from "@/shared/lib/core/core";
import { baseUrl } from "@/shared/helpers/base-url";
import { loginUser, logoutUser } from "@/entities/auth/model/auth-slice";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { productsApi } from "../../entities/product/api/products";
import { debounce } from "../../shared/helpers/debounce";

export async function initHeader() {
  initMenu();
  initResizeHandler();
  initActiveLink(".nav-menu__link");
  initDesktopHeaderSearch();
  initMobileSearch();
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
  const container = document.querySelector(".header__auth");

  if (!container) {
    console.error("Container is not found");
    return;
  }

  store.subscribe("auth", (newState) => {
    if (newState.isAuth) {
      container.replaceChildren(Profile());
    } else {
      container.replaceChildren(AuthButtons());
    }
  });
}

function AuthButtons(initialProps = {}) {
  return createComponent(initialProps, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        const authSpinner = createOverlaySpinner({
          successText: "Вход выполнен успешно!",
        });

        const loginForm = LoginForm({
          onSubmit: async (data) => {
            try {
              authSpinner.show();
              await loginUser(data.email, data.password);
              authSpinner.success();

              location.reload();
            } catch (error) {
              authSpinner.hide();

              console.error("Ошибка входа:", error);
            }
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
                  <a href="${baseUrl}account/dashboard/" class="profile-menu__link">Account</a>
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

        logoutBtn.addEventListener("click", async () => {
          await logoutUser();
          emit("logout");

          el.querySelector(`[id="${popoverId}"]`).hidePopover();
        });
      }
    },
  });
}

function initDesktopHeaderSearch() {
  const container = document.querySelector(".header__center-block");
  const search = HeaderSearch();

  container.append(search);
}

function Popover(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit, { runOnce }) {
      const { isOpen = false, content = "", targetEl } = props;

      if (runOnce) {
        el.className = "ui-popover";
        el.innerHTML = `<div class="ui-popover__content"></div>`;
        el._els = {
          content: el.querySelector(".ui-popover__content"),
        };
      }

      el._els.content.innerHTML = content;

      if (isOpen && targetEl) {
        el.classList.add("ui-popover_open");

        const rect = targetEl.getBoundingClientRect();
        el.style.top = `${rect.bottom + window.scrollY + 5}px`;
        el.style.left = `${rect.left + window.scrollX}px`;
        el.style.width = `${rect.width}px`;
      } else {
        el.classList.remove("ui-popover_open");
      }
    },
  });
}

function HeaderSearch(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit, { runOnce }) {
      const { isOpen = false } = props;

      if (runOnce) {
        el._lastSearchValue = "";
        el.className = "header-search";
        el.innerHTML = `
          <div class="header-search__trigger">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="6.15385" cy="6.15385" r="4.95385" stroke="white" stroke-width="2.4" />
              <path d="M11.4872 11.4873L16 16.0001" stroke="white" stroke-width="2.4" />
            </svg>
            <div class="header-search__label">search</div>
          </div>
          <div class="header-search__wrapper">
            <div class="header-search__field-container">
              <input type="text" class="header-search__input" placeholder="Search">
              <div class="header-search__icon-right">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="5" cy="5" r="4.3" stroke="white" stroke-width="1.4" />
                  <path d="M8.5 8.5L11 11" stroke="white" stroke-width="1.4" />
                </svg>
              </div>
            </div>
          </div>
        `;

        el._els = {
          input: el.querySelector(".header-search__input"),
          trigger: el.querySelector(".header-search__trigger"),
          container: el.querySelector(".header-search__field-container"),
        };

        el._productsList = SearchProductsList({ items: [], isLoading: false });
        el._popover = Popover({
          targetEl: el._els.container,
          content: el._productsList.outerHTML,
        });
        document.body.appendChild(el._popover);

        const performSearch = debounce(async (value) => {
          try {
            const results = await productsApi.searchProductsByName(value);
            el._lastSearchValue = value;

            el._productsList.update({ items: results || [], isLoading: false });

            const isFocused = document.activeElement === el._els.input;
            el._popover.update({
              isOpen: isFocused && value.length > 0,
              content: el._productsList.innerHTML,
            });
          } catch (error) {
            el._productsList.update({ isLoading: false });
            console.error("Search API error:", error);
          }
        }, 300);

        const updateSearch = (e) => {
          const value = e.target.value.trim();
          const isFocused = document.activeElement === el._els.input;

          if (value.length > 0) {
            el._popover.update({ isOpen: isFocused });

            if (value !== el._lastSearchValue) {
              el._productsList.update({ isLoading: true });
              el._popover.update({ content: el._productsList.innerHTML });
              performSearch(value);
            }
          } else {
            el._lastSearchValue = "";
            el._popover.update({ isOpen: false });
          }
        };

        el._els.trigger.addEventListener("click", () => {
          el.update({ isOpen: true });
        });

        el._els.input.addEventListener("input", (e) => {
          updateSearch(e);
          emit("search", { value: e.target.value });
        });

        el._els.input.addEventListener("focus", (e) => {
          if (e.target.value.trim().length > 0) {
            el._popover.update({ isOpen: true });
          }
        });

        el._els.input.addEventListener("blur", () => {
          el._popover.update({ isOpen: false });
          if (!el._els.input.value) el.update({ isOpen: false });
        });
      }

      if (isOpen) {
        el.classList.add("header-search_open");
        setTimeout(() => el._els.input.focus(), 100);
      } else {
        el.classList.remove("header-search_open");
        el._els.input.value = "";
        el._lastSearchValue = "";
        el._popover.update({ isOpen: false });
      }
    },
  });
}

async function initMobileSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchContainer = document.querySelector(".search-group");

  if (!searchInput || !searchContainer) return;

  let lastSearchValue = "";

  const productsList = SearchProductsList({ items: [], isLoading: false });
  const searchPopover = Popover({
    targetEl: searchContainer,
    content: productsList.outerHTML,
  });
  document.body.appendChild(searchPopover);

  const performSearch = debounce(async (value) => {
    try {
      const results = await productsApi.searchProductsByName(value);
      lastSearchValue = value;
      productsList.update({ items: results || [], isLoading: false });

      searchPopover.update({
        isOpen: document.activeElement === searchInput && value.length > 0,
        content: productsList.innerHTML,
      });
    } catch (error) {
      productsList.update({ isLoading: false });
      console.error("Search API error:", error);
    }
  }, 300);

  const updateSearch = (e) => {
    const value = e.target.value.trim();
    const isFocused = document.activeElement === searchInput;

    if (value.length > 0) {
      searchPopover.update({ isOpen: isFocused });

      if (value !== lastSearchValue) {
        productsList.update({ isLoading: true });
        searchPopover.update({ content: productsList.innerHTML });
        performSearch(value);
      }
    } else {
      lastSearchValue = "";
      searchPopover.update({ isOpen: false });
    }
  };

  searchInput.addEventListener("input", updateSearch);

  searchInput.addEventListener("focus", (e) => {
    const value = e.target.value.trim();
    if (value.length > 0) {
      searchPopover.update({ isOpen: true });
    }
  });

  searchInput.addEventListener("blur", () => {
    searchPopover.update({ isOpen: false });
  });
}

function SearchProductsList(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit, { runOnce }) {
      const { items = [], isLoading = false } = props;

      if (runOnce) el.className = "search-products";

      if (isLoading) {
        el.innerHTML = `
          <div class="search-products__loader">
            <div class="spinner"></div>
            <span>Searching...</span>
          </div>`;
        return;
      }

      if (items.length === 0) {
        el.innerHTML = `<div class="search-products__empty">No products found</div>`;
        return;
      }

      el.innerHTML = items
        .map(
          (item) => `
        <div class="search-product-card">
          <div class="search-product-card__image"><img src="${item.images[0].image_path_jpg}"></div>
          <div class="search-product-card__info">
            <div class="search-product-card__title">${item.name}</div>
          </div>
        </div>
      `,
        )
        .join("");
    },
  });
}
