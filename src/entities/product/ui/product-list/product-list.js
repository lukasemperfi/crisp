import { createProductCard } from "@/entities/product/ui/product-card/product-card.js";

export function initProductListContainer(containerSelector, onLoadMore) {
  const mainContainer = document.querySelector(containerSelector);
  if (!mainContainer) {
    return null;
  }

  mainContainer.innerHTML = `
    <div class="catalog">
      <div class="catalog__list"></div>
      <div class="catalog__actions">
        <button class="button button_outlined button_gray catalog__more-button">
          Load more
        </button>
      </div>
    </div>
  `;

  const list = mainContainer.querySelector(".catalog__list");
  const btn = mainContainer.querySelector(".catalog__more-button");

  btn.addEventListener("click", onLoadMore);

  return { list, btn };
}

export function appendProducts(products, listContainer) {
  products.forEach((product) => {
    const card = createProductCard(product);
    listContainer.appendChild(card);
  });
}

export function renderProductList(products, containerSelector) {
  const mainContainer = document.querySelector(containerSelector);

  if (!mainContainer) {
    console.error(
      `Ошибка: Основной контейнер с селектором "${containerSelector}" не найден.`
    );
    return;
  }

  mainContainer.innerHTML = "";

  const productListWrapper = document.createElement("div");
  productListWrapper.className = "catalog";

  const catalogDiv = document.createElement("div");
  catalogDiv.className = "catalog__list";

  products.forEach((product) => {
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
