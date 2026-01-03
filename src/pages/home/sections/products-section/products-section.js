import { mockProducts } from "@/shared/helpers/mock-products";
import { productsApi } from "@/entities/product/api/products";
import { productFiltersApi } from "@/entities/product/api/filters";
import { ProductList } from "@/entities/product/ui/product-list/product-list";
import { FiltersBar } from "@/features/product-filters/ui/filter-bar";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import queryString from "query-string";

const mockFilters = {
  brands: [
    {
      id: 17,
      name: "Alfani",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 16,
      name: "Bardot",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 18,
      name: "Cece",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 15,
      name: "Cooper",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 19,
      name: "Donna Ricco",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    // {
    //   id: 14,
    //   name: "State",
    //   created_at: "2025-12-28T13:49:23.703911+00:00",
    // },
  ],
  colors: [
    {
      id: 20,
      name: "Beige",
      hex_code: "#F5F5DC",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 16,
      name: "Black",
      hex_code: "#000000",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 25,
      name: "Burgundy",
      hex_code: "#800020",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 21,
      name: "Emerald",
      hex_code: "#50C878",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 24,
      name: "Grey",
      hex_code: "#808080",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 18,
      name: "Navy",
      hex_code: "#000080",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 27,
      name: "Olive",
      hex_code: "#808000",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 23,
      name: "Pink",
      hex_code: "#FFC0CB",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 19,
      name: "Red",
      hex_code: "#FF0000",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 22,
      name: "Royal Blue",
      hex_code: "#4169E1",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 17,
      name: "White",
      hex_code: "#FFFFFF",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 26,
      name: "Yellow",
      hex_code: "#FFFF00",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
  ],
  sizes: [
    {
      id: 27,
      name: "osfa",
      sort_order: 10,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 28,
      name: "w26",
      sort_order: 20,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 29,
      name: "w27",
      sort_order: 30,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 30,
      name: "w28",
      sort_order: 40,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 31,
      name: "w29",
      sort_order: 50,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 32,
      name: "w30",
      sort_order: 60,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 33,
      name: "w31",
      sort_order: 70,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 34,
      name: "w32",
      sort_order: 80,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 35,
      name: "w33",
      sort_order: 90,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 36,
      name: "w34",
      sort_order: 100,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 37,
      name: "w35",
      sort_order: 110,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 38,
      name: "w36",
      sort_order: 120,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 39,
      name: "w38",
      sort_order: 130,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 40,
      name: "w40",
      sort_order: 140,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 41,
      name: "w42",
      sort_order: 150,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 42,
      name: "w44",
      sort_order: 160,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 43,
      name: "w46",
      sort_order: 170,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 44,
      name: "w48",
      sort_order: 180,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 45,
      name: "w50",
      sort_order: 190,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    {
      id: 46,
      name: "w52",
      sort_order: 200,
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
  ],
  tags: [
    {
      id: 13,
      name: "Best Sellers",
    },
    {
      id: 17,
      name: "Collection: Spring",
    },
    {
      id: 16,
      name: "Collection: Summer",
    },
    {
      id: 14,
      name: "New Arivals",
    },
    {
      id: 15,
      name: "Top Women",
    },
    {
      id: 18,
      name: "Trending",
    },
  ],
  lengths: [
    {
      id: 1,
      name: "short",
      sort_order: 1,
      created_at: "2025-12-28T14:05:37.264663+00:00",
    },
    {
      id: 2,
      name: "knee length",
      sort_order: 2,
      created_at: "2025-12-28T14:05:37.264663+00:00",
    },
    {
      id: 3,
      name: "hight low",
      sort_order: 3,
      created_at: "2025-12-28T14:05:37.264663+00:00",
    },
    {
      id: 4,
      name: "long",
      sort_order: 4,
      created_at: "2025-12-28T14:05:37.264663+00:00",
    },
    {
      id: 5,
      name: "midi",
      sort_order: 5,
      created_at: "2025-12-28T14:05:37.264663+00:00",
    },
  ],
  priceRange: [
    {
      min: 42.43,
      max: 246.52,
    },
  ],
};

export const initProducts = async () => {
  const urlParams = parseUrlParams(window.location.search);
  const DEFAULT_QUERY = {
    page: 0,
    limit: 8,
    sort: "new",
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

  const filterConfig = [
    {
      id: "brand",
      title: "Brand",
      type: "checkbox-list",
      defaultOpen: true,
      options: mockFilters.brands,
      defaultValue: urlParams.brand || [],
    },
    {
      id: "size",
      title: "Size (Inches)",
      type: "size-grid",
      defaultOpen: true,
      options: mockFilters.sizes,
      defaultValue: urlParams.size || [],
    },
    {
      id: "length",
      title: "Dress length",
      type: "checkbox-list",
      defaultOpen: true,
      options: mockFilters.lengths,
      defaultValue: urlParams.length || [],
    },
    {
      id: "color",
      title: "Color",
      type: "color-grid",
      defaultOpen: true,
      options: mockFilters.colors,
      defaultValue: urlParams.color || [],
    },
    {
      id: "price",
      title: "Price",
      type: "price-range",
      defaultOpen: true,
      options: mockFilters.priceRange,
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

  const loadProducts = async () => {
    const { data, count } = await productsApi.getAllProducts({
      ...urlParams,
      page: currentPage,
      limit: queryState.limit,
      sort: queryState.sort,
    });
    console.log("data", data);

    productList.appendProducts(data);

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
