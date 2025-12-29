import { createProductCard } from "@/entities/product/ui/product-card/product-card.js";

export function createProductListStructure(initialProducts, onLoadMore) {
  const wrapper = document.createElement("div");
  wrapper.className = "catalog";

  wrapper.innerHTML = `
    <div class="catalog__list"></div>
    <div class="catalog__actions">
      <button type="button" class="button button_outlined button_gray catalog__more-button">
        Load more
      </button>
    </div>
  `;

  const list = wrapper.querySelector(".catalog__list");
  const btn = wrapper.querySelector(".catalog__more-button");

  btn.addEventListener("click", onLoadMore);

  if (initialProducts && initialProducts.length > 0) {
    appendProducts(initialProducts, list);
  }

  return { wrapper, list, btn };
}

export function appendProducts(products, listContainer) {
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    const card = createProductCard(product);
    fragment.appendChild(card);
  });

  listContainer.appendChild(fragment);
}

export function renderProductList(products, containerSelector) {
  const mainContainer = document.querySelector(containerSelector);
  if (!mainContainer) return;

  mainContainer.innerHTML = "";
  const { wrapper } = createProductListStructure(products, () => {});

  wrapper.querySelector(".catalog__actions").style.display = "none";
  mainContainer.appendChild(wrapper);
}
