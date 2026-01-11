import { productsApi } from "@/entities/product/api/products";
import { productFiltersApi } from "@/entities/product/api/filters";
import { ProductList } from "@/entities/product/ui/product-list/product-list";
import { FiltersBar } from "@/features/product-filters/ui/filter-bar";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import queryString from "query-string";
import { Banner } from "../../../../widgets/banner/banner";
import { mockProducts } from "../../../../shared/helpers/mock-products";
import { debounce } from "../../../../shared/helpers/debounce";

export const initProducts = async () => {
  const urlParams = parseUrlParams(window.location.search);
  const DEFAULT_QUERY = {
    page: 0,
    limit: 24,
    sort: "price_desc",
  };

  let queryState = {
    page: urlParams.page ?? DEFAULT_QUERY.page,
    limit: urlParams.limit ?? DEFAULT_QUERY.limit,
    sort: urlParams.sort ?? DEFAULT_QUERY.sort,
  };

  const applyNewParams = (newFilters) => {
    const newState = {
      limit: queryState.limit,
      sort: queryState.sort,
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

  const filters = await productFiltersApi.getFilters();
  const filterConfig = [
    {
      id: "brand",
      title: "Brand",
      type: "checkbox-list",
      defaultOpen: true,
      options: filters.brands,
      defaultValue: urlParams.brand || [],
    },
    {
      id: "size",
      title: "Size (Inches)",
      type: "size-grid",
      defaultOpen: true,
      options: filters.sizes,
      defaultValue: urlParams.size || [],
    },
    {
      id: "length",
      title: "Dress length",
      type: "checkbox-list",
      defaultOpen: true,
      options: filters.lengths,
      defaultValue: urlParams.length || [],
    },
    {
      id: "color",
      title: "Color",
      type: "color-grid",
      defaultOpen: true,
      options: filters.colors,
      defaultValue: urlParams.color || [],
    },
    {
      id: "price",
      title: "Price",
      type: "price-range",
      defaultOpen: true,
      options: filters.priceRange,
      defaultValue: urlParams.price || null,
    },
  ];

  const filtersBar = new FiltersBar(".products__aside", filterConfig, {
    showSelectedFilters: true,
  });

  Dropdown(".products__sort", {
    options: [
      { value: "new", label: "Newest" },
      { value: "price_asc", label: "Price (Low to High)" },
      { value: "price_desc", label: "Price (High to Low)" },
    ],
    defaultValue: queryState.sort,
    onChange: (value) => applyNewParams({ ...urlParams, sort: value }),
  });

  Dropdown(".products__limit", {
    options: [
      { value: "48", label: "48" },
      { value: "24", label: "24" },
      { value: "8", label: "8" },
    ],
    defaultValue: String(queryState.limit),
    onChange: (value) => applyNewParams({ ...urlParams, limit: Number(value) }),
  });

  filtersBar.onApply((filters) => {
    applyNewParams(filters);
  });

  const updateUrlPage = (page) => {
    const newState = { ...urlParams, page };
    const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
    const query = stringifyUrlParams(cleanedState);
    const newUrl = query ? `?${query}` : window.location.pathname;

    window.history.pushState({ path: newUrl }, "", newUrl);
  };

  let currentPage = queryState.page;
  const bannerData = {
    className: "catalog__list-banner full-width",
    pictureProps: {
      jpgSrc: "images/catalog-page/list-banner-desktop.jpg",
      webpSrc: "images/catalog-page/list-banner-desktop.webp",
      mobileJpgSrc: "images/catalog-page/list-banner-mobile.jpg",
      mobileWebpSrc: "images/catalog-page/list-banner-mobile.webp",
      alt: "New Collection",
    },
    textBlockProps: {
      title: "Shopping without limits.",
      text: "You can choose the best option for you, and it does not matter whether you are in Prague or San Francisco. We will deliver your purchase anywhere!",
      buttonText: "Shop Now",
    },
  };

  const banner = Banner(bannerData);

  const loadProducts = async () => {
    const { data, count } = await productsApi.getAllProducts({
      ...urlParams,
      page: currentPage,
      limit: queryState.limit,
      sort: queryState.sort,
    });
    console.log("data", data);

    productList.appendProducts(data);

    initCatalogListBanner(banner);

    if (currentPage !== queryState.page || currentPage > 0) {
      updateUrlPage(currentPage);
    }

    if ((currentPage + 1) * queryState.limit >= count) {
      productList.hideLoadMore();
    } else {
      productList.showLoadMore();
    }

    currentPage++;
  };

  const productList = new ProductList(".products__list", [], loadProducts);

  await loadProducts();
};

const stringifyOptions = {
  arrayFormat: "comma",
  skipEmptyString: true,
  skipNull: true,
};

export const stringifyUrlParams = (params) => {
  const flatParams = { ...params };

  if (params.price) {
    flatParams.minPrice = params.price.min;
    flatParams.maxPrice = params.price.max;
    delete flatParams.price;
  }

  return queryString.stringify(flatParams, stringifyOptions);
};

export const parseUrlParams = (query) => {
  const parsed = queryString.parse(query, {
    arrayFormat: "comma",
    parseNumbers: true,
    parseBooleans: true,
  });

  const result = { ...parsed };

  if (result.minPrice !== undefined || result.maxPrice !== undefined) {
    result.price = {
      min: Number(result.minPrice) || 0,
      max: Number(result.maxPrice) || 0,
    };
    delete result.minPrice;
    delete result.maxPrice;
  }

  const arrayFields = ["brand", "size", "length", "color"];
  arrayFields.forEach((field) => {
    if (result[field] && !Array.isArray(result[field])) {
      result[field] = [result[field]];
    }
  });

  return result;
};

export const removeDefaultParams = (params, defaults) => {
  const cleaned = { ...params };

  Object.keys(defaults).forEach((key) => {
    if (cleaned[key] === defaults[key]) {
      delete cleaned[key];
    }
  });

  return cleaned;
};

export function insertBannerIntoList({
  listSelector,
  element,
  insertAfterRow = 2,
}) {
  const list = document.querySelector(listSelector);
  if (!list) {
    console.error("insertBannerIntoList: container not found.");
    return;
  }

  if (!element) {
    console.error("insertBannerIntoList: element not found.");
    return;
  }

  if (list.contains(element)) {
    list.removeChild(element);
  }

  const items = Array.from(list.children);

  if (items.length === 0) {
    return;
  }

  const rows = getRows(items);

  if (rows.length < insertAfterRow) {
    return;
  }

  const lastItemInRow = rows[insertAfterRow - 1].slice(-1)[0];

  list.insertBefore(element, lastItemInRow.nextSibling);

  function getRows(items) {
    const rows = [];

    let currentRowTop = null;
    let currentRow = [];

    items.forEach((item) => {
      const top = Math.round(item.getBoundingClientRect().top);

      if (currentRowTop === null) {
        currentRowTop = top;
        currentRow.push(item);
        return;
      }

      if (top === currentRowTop) {
        currentRow.push(item);
      } else {
        rows.push(currentRow);
        currentRow = [item];
        currentRowTop = top;
      }
    });

    if (currentRow.length) {
      rows.push(currentRow);
    }

    return rows;
  }
}

function initCatalogListBanner(banner) {
  const insertBanner = () => {
    insertBannerIntoList({
      listSelector: ".catalog__list",
      element: banner,
      insertAfterRow: 2,
    });
  };

  const list = document.querySelector(".catalog__list");

  if (!list) {
    return;
  }

  insertBanner();

  const observer = new ResizeObserver(() => {
    insertBanner();
  });

  observer.observe(list);
}
