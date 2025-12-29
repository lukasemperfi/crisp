export class ProductManager {
  constructor({ containerSelector, fetchFn, limit = 8, initialFilters = {} }) {
    this.containerSelector = containerSelector;
    this.fetchFn = fetchFn;
    this.limit = limit;
    this.filters = initialFilters;
    this.page = 0;

    this.ui = null;
  }

  init(initUIFn, appendFn) {
    this.ui = initUIFn(this.containerSelector, () => this.loadNextPage());
    this.appendFn = appendFn;

    return this.fetchAndRender();
  }

  async updateFilters(newFilters) {
    this.filters = { ...this.filters, ...newFilters };
    this.page = 0;
    this.ui.list.innerHTML = "";
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

      const itemsOnScreen = list.children.length;
      btn.style.display =
        itemsOnScreen >= count || data.length < this.limit ? "none" : "block";
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      btn.disabled = false;
      btn.textContent = "Load more";
    }
  }
}
