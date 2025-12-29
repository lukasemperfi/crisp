export class ProductManager {
  constructor({ containerSelector, fetchFn, limit = 8, initialFilters = {} }) {
    this.containerSelector = containerSelector;
    this.fetchFn = fetchFn;
    this.limit = limit;
    this.filters = initialFilters;
    this.page = 0;
    this.ui = null;
  }

  async init(createStructureFn, appendFn) {
    this.appendFn = appendFn;

    try {
      const { data, count } = await this.fetchFn(this.filters, {
        page: this.page,
        limit: this.limit,
      });

      const { wrapper, list, btn } = createStructureFn(data, () =>
        this.loadNextPage()
      );

      this.ui = { list, btn };

      const mainContainer = document.querySelector(this.containerSelector);
      if (mainContainer) {
        mainContainer.innerHTML = "";
        mainContainer.appendChild(wrapper);
      }

      this._updateButtonVisibility(data.length, count);
    } catch (error) {
      console.error("Initial load error:", error);
    }
  }

  async updateFilters(newFilters) {
    this.filters = { ...this.filters, ...newFilters };
    this.page = 0;

    if (this.ui) this.ui.list.innerHTML = "";
    await this.fetchAndRender();
  }

  async loadNextPage() {
    this.page += 1;
    await this.fetchAndRender();
  }

  async fetchAndRender() {
    if (!this.ui) return;

    const { btn, list } = this.ui;
    btn.disabled = true;
    btn.textContent = "Loading...";

    try {
      const { data, count } = await this.fetchFn(this.filters, {
        page: this.page,
        limit: this.limit,
      });

      if (data.length > 0) {
        this.appendFn(data, list);
      }

      this._updateButtonVisibility(data.length, count);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      btn.disabled = false;
      btn.textContent = "Load more";
    }
  }

  _updateButtonVisibility(currentBatchLength, totalCount) {
    if (!this.ui) return;
    const itemsOnScreen = this.ui.list.children.length;
    this.ui.btn.style.display =
      itemsOnScreen >= totalCount || currentBatchLength < this.limit
        ? "none"
        : "block";
  }
}
