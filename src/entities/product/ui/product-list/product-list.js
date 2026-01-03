import { createProductCard } from "@/entities/product/ui/product-card/product-card.js";

export class ProductList {
  constructor(
    containerSelector,
    initialProducts = [],
    onLoadMore,
    showEmptyMessageOnInit = false
  ) {
    this._container =
      typeof containerSelector === "string"
        ? document.querySelector(containerSelector)
        : containerSelector;

    if (!this._container) {
      throw new Error("ProductList: container not found");
    }

    this._onLoadMore = onLoadMore;
    this._products = [];
    this._showEmptyMessageOnInit = showEmptyMessageOnInit;
    this._initialized = false;

    if (initialProducts.length > 0) {
      this._renderStructure();
      this.appendProducts(initialProducts);
    } else {
      if (this._showEmptyMessageOnInit) {
        this._renderStructure();
        this._renderEmptyMessage();
      }
    }
  }

  _renderStructure() {
    if (this._initialized) return;

    this._container.innerHTML = "";

    this._wrapper = document.createElement("div");
    this._wrapper.className = "catalog";

    this._wrapper.innerHTML = `
      <div class="catalog__list"></div>
      <div class="catalog__actions">
        <button type="button" class="button button_outlined button_gray catalog__more-button">
          Load more
        </button>
      </div>
    `;

    this._list = this._wrapper.querySelector(".catalog__list");
    this._btnWrapper = this._wrapper.querySelector(".catalog__actions");
    this._btn = this._wrapper.querySelector(".catalog__more-button");

    // --- Добавляем спиннер ---
    this._loader = document.createElement("div");
    this._loader.className = "catalog__loader";
    this._loader.style.display = "none";
    this._loader.innerHTML = `<div class="spinner"></div>`;
    this._btnWrapper.appendChild(this._loader);

    // --- Добавляем стили для спиннера ---
    const style = document.createElement("style");
    style.textContent = `
      .catalog__loader {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
      .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(0,0,0,0.2);
        border-top-color: rgba(0,0,0,0.8);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `;
    document.head.appendChild(style);
    // --- Конец изменений ---

    this._btn.addEventListener("click", () => {
      if (typeof this._onLoadMore === "function") {
        this.showLoader(); // показываем спиннер при нажатии
        this._onLoadMore().finally(() => {
          this.hideLoader(); // скрываем спиннер после загрузки
        });
      }
    });

    this._container.appendChild(this._wrapper);
    this._initialized = true;
  }

  appendProducts(products) {
    if (!products || products.length === 0) {
      // if (this._initialized) {
      this._renderStructure();
      this._renderEmptyMessage();
      // }
      return;
    }

    if (!this._initialized) {
      this._renderStructure();
    }

    this._hideEmptyMessage();
    this.showLoadMore();

    const fragment = document.createDocumentFragment();

    products.forEach((product) => {
      const card = createProductCard(product);
      fragment.appendChild(card);
      this._products.push(product);
    });

    this._list.appendChild(fragment);
  }

  clear() {
    if (this._list) this._list.innerHTML = "";
    this._products = [];
    this._hideEmptyMessage();
  }

  hideLoadMore() {
    if (this._btnWrapper) this._btnWrapper.style.display = "none";
    if (this._btn) this._btn.style.display = "none";
  }

  showLoadMore() {
    if (this._btnWrapper) this._btnWrapper.style.display = "";
    if (this._btn) this._btn.style.display = "";
  }

  getProducts() {
    return [...this._products];
  }

  _renderEmptyMessage() {
    if (!this._emptyMessage) {
      this._emptyMessage = document.createElement("div");
      this._emptyMessage.className = "catalog__empty";
      this._emptyMessage.textContent = "No products found";
      this._wrapper.appendChild(this._emptyMessage);
    }
    this.hideLoadMore();
    this._emptyMessage.style.display = "";
  }

  _hideEmptyMessage() {
    if (this._emptyMessage) {
      this._emptyMessage.style.display = "none";
    }
  }

  // --- Методы лоадера ---
  showLoader() {
    if (this._loader) {
      this._loader.style.display = "";
      this._btn.style.display = "none";
    }
  }

  hideLoader() {
    if (this._loader) {
      this._loader.style.display = "none";
      this._btn.style.display = "";
    }
  }
}
