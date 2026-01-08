import { productsApi } from "@/entities/product/api/products";
import { productFiltersApi } from "@/entities/product/api/filters";
import { ProductList } from "@/entities/product/ui/product-list/product-list";
import { FiltersBar } from "@/features/product-filters/ui/filter-bar";
import { debounce } from "@/shared/helpers/debounce";
import {
  stringifyUrlParams,
  parseUrlParams,
  removeDefaultParams,
} from "@/entities/product/model/url-params";
import { createPaginationController } from "@/entities/product/model/pagination-controller";

export const initProducts = async () => {
  const urlParams = parseUrlParams(window.location.search);

  const DEFAULT_QUERY = {
    page: 0,
  };

  const queryState = {
    page: urlParams.page ?? DEFAULT_QUERY.page,
    limit: 8,
    sort: undefined,
  };

  let isInitialLoad = true;

  const applyNewParams = (newFilters) => {
    const newState = {
      ...newFilters,
      page: 0,
    };

    const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
    const query = stringifyUrlParams(cleanedState);

    if (query) {
      window.location.search = query;
    } else {
      window.location.href = window.location.pathname;
    }
  };

  const tagFilters = await productFiltersApi.getTags();

  const filterConfig = [
    {
      id: "tag",
      title: "Shop Some Wear:",
      type: "checkbox-list",
      defaultOpen: true,
      options: tagFilters,
      defaultValue: urlParams.tag || [],
      accordion: false,
      singleSelect: true,
    },
  ];

  const filtersBar = new FiltersBar(".products__aside", filterConfig, {
    showSelectedFilters: false,
    showApplyButton: false,
    showAboutDresses: false,
  });

  const debouncedApplyParams = debounce((filters) => {
    applyNewParams(filters);
  }, 1000);

  filtersBar.onChange((filters) => {
    debouncedApplyParams(filters);
  });

  const updateUrlPage = (page) => {
    const newState = { ...urlParams, page };
    const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
    const query = stringifyUrlParams(cleanedState);
    const newUrl = query ? `?${query}` : window.location.pathname;

    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  const productList = new ProductList(".products__list", []);

  const pagination = createPaginationController({
    initialPage: queryState.page,
    limit: queryState.limit,

    getData: ({ page, limit }) =>
      productsApi.getAllProducts({
        ...urlParams,
        page,
        limit,
        sort: queryState.sort,
      }),

    onData: (data) => {
      console.log(data);

      productList.appendProducts(data);
      productList.showLoadMore();
    },

    onEnd: () => {
      productList.hideLoadMore();
    },

    onPageChange: (page) => {
      console.log("page", page);
      if (isInitialLoad) {
        isInitialLoad = false;
        return;
      }

      updateUrlPage(page);
    },
  });

  productList.setLoadMoreHandler(pagination.loadNext);

  await pagination.loadNext();
  isInitialLoad = false;
};
