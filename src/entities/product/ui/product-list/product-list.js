import { store } from "@/app/store/index.js";
import { fetchProducts } from "@/entities/product/model/products-slice.js";
import { PRODUCTS_STATUS } from "@/entities/product/model/products-slice.js";
import { createProductCard } from "@/entities/product/ui/product-card/product-card.js";

export const filteredProductList = async (containerSelector) => {
  let prevProducts = null;

  store.subscribe("products", (newState) => {
    if (newState.status === PRODUCTS_STATUS.SUCCEEDED) {
      const same =
        prevProducts &&
        JSON.stringify(prevProducts) === JSON.stringify(newState.items);

      if (same) {
        return;
      }

      prevProducts = newState.items;

      renderProductList(newState.items, containerSelector);
    }
  });

  store.subscribe("productFilters", async (newState) => {
    const newFilters = newState.filters;
    const isInitialized = newState.isInitialized;

    if (!isInitialized) {
      return;
    }

    await fetchProducts(newFilters);
  });
};

export const productList = async (containerSelector) => {
  // const state = store.getState().products;
  // let prevProducts = null;
  // store.subscribe("products", (newState) => {
  //   if (newState.status === PRODUCTS_STATUS.SUCCEEDED) {
  //     const same =
  //       prevProducts &&
  //       JSON.stringify(prevProducts) === JSON.stringify(newState.items);
  //     if (same) {
  //       return;
  //     }
  //     prevProducts = newState.items;
  //     renderProductList(newState.items, containerSelector);
  //   }
  // });
  // if (state.items.length === 0 && state.status === PRODUCTS_STATUS.IDLE) {
  //   await fetchProducts();
  // } else if (state.status === PRODUCTS_STATUS.SUCCEEDED) {
  //   renderProductList(state.items, containerSelector);
  // }
};

export function renderProductList(products, containerSelector, limit = null) {
  const mainContainer = document.querySelector(containerSelector);

  if (!mainContainer) {
    console.error(
      `Ошибка: Основной контейнер с селектором "${containerSelector}" не найден.`
    );
    return;
  }

  mainContainer.innerHTML = "";

  const displayedProducts =
    limit && typeof limit === "number" ? products.slice(0, limit) : products;

  const productListWrapper = document.createElement("div");
  productListWrapper.className = "catalog";

  const catalogDiv = document.createElement("div");
  catalogDiv.className = "catalog__list";

  displayedProducts.forEach((product) => {
    const card = createProductCard(product);
    catalogDiv.appendChild(card);
  });

  const loadMoreWrapper = document.createElement("div");
  loadMoreWrapper.className = "catalog__actions";

  const loadMoreButton = document.createElement("button");
  loadMoreButton.className =
    "button button_outlined button_gray catalog__more-button";
  loadMoreButton.name = "Load more";
  loadMoreButton.setAttribute("aria-label", "Перейти в магазин");
  loadMoreButton.textContent = "Load more";

  loadMoreWrapper.appendChild(loadMoreButton);
  productListWrapper.appendChild(catalogDiv);
  productListWrapper.appendChild(loadMoreWrapper);
  mainContainer.appendChild(productListWrapper);
}
