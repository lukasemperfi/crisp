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

// import { productsApi } from "@/entities/product/api/products";
// import { productFiltersApi } from "@/entities/product/api/filters";
// import { ProductList } from "@/entities/product/ui/product-list/product-list";
// import { FiltersBar } from "@/features/product-filters/ui/filter-bar";
// import { debounce } from "@/shared/helpers/debounce";
// import {
//   stringifyUrlParams,
//   parseUrlParams,
//   removeDefaultParams,
// } from "@/entities/product/model/url-params";

// export const initProducts = async () => {
//   const urlParams = parseUrlParams(window.location.search);
//   const DEFAULT_QUERY = {
//     page: 0,
//   };

//   let queryState = {
//     page: urlParams.page ?? DEFAULT_QUERY.page,
//   };

//   const applyNewParams = (newFilters) => {
//     const newState = {
//       ...newFilters,
//       page: 0,
//     };
//     const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
//     const query = stringifyUrlParams(cleanedState);

//     if (query) {
//       window.location.search = query;
//     } else {
//       window.location.href = window.location.pathname;
//     }
//   };

//   const tagFilters = await productFiltersApi.getTags();

//   const filterConfig = [
//     {
//       id: "tag",
//       title: "Shop Some Wear:",
//       type: "checkbox-list",
//       defaultOpen: true,
//       options: tagFilters,
//       defaultValue: urlParams.tag || [],
//       accordion: false,
//       singleSelect: true,
//     },
//   ];

//   const filtersBar = new FiltersBar(".products__aside", filterConfig, {
//     showSelectedFilters: false,
//     showApplyButton: false,
//     showAboutDresses: false,
//   });

//   const debouncedApplyParams = debounce((filters) => {
//     applyNewParams(filters);
//   }, 1000);

//   filtersBar.onChange((filters) => {
//     debouncedApplyParams(filters);
//   });

//   const updateUrlPage = (page) => {
//     const newState = { ...urlParams, page };
//     const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
//     const query = stringifyUrlParams(cleanedState);
//     const newUrl = query ? `?${query}` : window.location.pathname;

//     window.history.pushState({ path: newUrl }, "", newUrl);
//   };

//   let currentPage = queryState.page;

//   const loadProducts = async () => {
//     const { data, count } = await productsApi.getAllProducts({
//       ...urlParams,
//       page: currentPage,
//       limit: queryState.limit,
//       sort: queryState.sort,
//     });
//     console.log("data", data);

//     productList.appendProducts(data);

//     if (currentPage !== queryState.page || currentPage > 0) {
//       updateUrlPage(currentPage);
//     }

//     if ((currentPage + 1) * queryState.limit >= count) {
//       productList.hideLoadMore();
//     } else {
//       productList.showLoadMore();
//     }

//     currentPage++;
//   };

//   const productList = new ProductList(".products__list", [], loadProducts);

//   await loadProducts();
// };

// import { mockProducts } from "@/shared/helpers/mock-products";
// import { productsApi } from "@/entities/product/api/products";
// import { productFiltersApi } from "@/entities/product/api/filters";
// import { ProductList } from "@/entities/product/ui/product-list/product-list";
// import { FiltersBar } from "@/features/product-filters/ui/filter-bar";
// import { Dropdown } from "@/shared/ui/dropdown/dropdown";
// import queryString from "query-string";

// export const initProducts = async () => {
//   const urlParams = parseUrlParams(window.location.search);
//   const DEFAULT_QUERY = {
//     page: 0,
//     limit: 8,
//     sort: "new",
//   };

//   let queryState = {
//     page: urlParams.page ?? DEFAULT_QUERY.page,
//     limit: urlParams.limit ?? DEFAULT_QUERY.limit,
//     sort: urlParams.sort ?? DEFAULT_QUERY.sort,
//   };

//   const applyNewParams = (newFilters) => {
//     const newState = {
//       limit: queryState.limit,
//       sort: queryState.sort,
//       ...newFilters,
//       page: 0,
//     };
//     const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
//     const query = stringifyUrlParams(cleanedState);

//     if (query) {
//       window.location.search = query;
//     } else {
//       window.location.href = window.location.pathname;
//     }
//   };

//   const filterConfig = [
//     {
//       id: "brand",
//       title: "Brand",
//       type: "checkbox-list",
//       defaultOpen: true,
//       options: mockFilters.brands,
//       defaultValue: urlParams.brand || [],
//     },
//     {
//       id: "size",
//       title: "Size (Inches)",
//       type: "size-grid",
//       defaultOpen: true,
//       options: mockFilters.sizes,
//       defaultValue: urlParams.size || [],
//     },
//     {
//       id: "length",
//       title: "Dress length",
//       type: "checkbox-list",
//       defaultOpen: true,
//       options: mockFilters.lengths,
//       defaultValue: urlParams.length || [],
//     },
//     {
//       id: "color",
//       title: "Color",
//       type: "color-grid",
//       defaultOpen: true,
//       options: mockFilters.colors,
//       defaultValue: urlParams.color || [],
//     },
//     {
//       id: "price",
//       title: "Price",
//       type: "price-range",
//       defaultOpen: true,
//       options: mockFilters.priceRange,
//       defaultValue: urlParams.price || null,
//     },
//   ];

//   const filtersBar = new FiltersBar(".products__aside", filterConfig, {
//     showSelectedFilters: true,
//   });

//   Dropdown(".products__sort", {
//     options: [
//       { value: "new", label: "Newest" },
//       { value: "price_asc", label: "Price (Low to High)" },
//       { value: "price_desc", label: "Price (High to Low)" },
//     ],
//     defaultValue: queryState.sort,
//     onChange: (value) => applyNewParams({ ...urlParams, sort: value }),
//   });

//   Dropdown(".products__limit", {
//     options: [
//       { value: "48", label: "48" },
//       { value: "24", label: "24" },
//       { value: "8", label: "8" },
//     ],
//     defaultValue: String(queryState.limit),
//     onChange: (value) => applyNewParams({ ...urlParams, limit: Number(value) }),
//   });

//   filtersBar.onApply((filters) => {
//     applyNewParams(filters);
//   });

//   const updateUrlPage = (page) => {
//     const newState = { ...urlParams, page };
//     const cleanedState = removeDefaultParams(newState, DEFAULT_QUERY);
//     const query = stringifyUrlParams(cleanedState);
//     const newUrl = query ? `?${query}` : window.location.pathname;

//     window.history.pushState({ path: newUrl }, "", newUrl);
//   };

//   let currentPage = queryState.page;

//   const loadProducts = async () => {
//     const { data, count } = await productsApi.getAllProducts({
//       ...urlParams,
//       page: currentPage,
//       limit: queryState.limit,
//       sort: queryState.sort,
//     });
//     console.log("data", data);

//     productList.appendProducts(data);

//     if (currentPage !== queryState.page || currentPage > 0) {
//       updateUrlPage(currentPage);
//     }

//     if ((currentPage + 1) * queryState.limit >= count) {
//       productList.hideLoadMore();
//     } else {
//       productList.showLoadMore();
//     }

//     currentPage++;
//   };

//   const productList = new ProductList(".products__list", [], loadProducts);

//   await loadProducts();
// };

// const stringifyOptions = {
//   arrayFormat: "comma",
//   skipEmptyString: true,
//   skipNull: true,
// };

// export const stringifyUrlParams = (params) => {
//   const flatParams = { ...params };

//   if (params.price) {
//     flatParams.minPrice = params.price.min;
//     flatParams.maxPrice = params.price.max;
//     delete flatParams.price;
//   }

//   return queryString.stringify(flatParams, stringifyOptions);
// };

// export const parseUrlParams = (query) => {
//   const parsed = queryString.parse(query, {
//     arrayFormat: "comma",
//     parseNumbers: true,
//     parseBooleans: true,
//   });

//   const result = { ...parsed };

//   if (result.minPrice !== undefined || result.maxPrice !== undefined) {
//     result.price = {
//       min: Number(result.minPrice) || 0,
//       max: Number(result.maxPrice) || 0,
//     };
//     delete result.minPrice;
//     delete result.maxPrice;
//   }

//   const arrayFields = ["brand", "size", "length", "color"];
//   arrayFields.forEach((field) => {
//     if (result[field] && !Array.isArray(result[field])) {
//       result[field] = [result[field]];
//     }
//   });

//   return result;
// };

// export const removeDefaultParams = (params, defaults) => {
//   const cleaned = { ...params };

//   Object.keys(defaults).forEach((key) => {
//     if (cleaned[key] === defaults[key]) {
//       delete cleaned[key];
//     }
//   });

//   return cleaned;
// };
