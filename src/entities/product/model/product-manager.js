import queryString from "query-string";

const stringifyOptions = {
  arrayFormat: "comma",
  skipEmptyString: true,
  skipNull: true,
};

// --- URL HELPERS ---

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

  const arrayFields = ["brand", "size", "length", "color", "tag"];
  arrayFields.forEach((field) => {
    if (result[field] && !Array.isArray(result[field])) {
      result[field] = [result[field]];
    }
  });

  return result;
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

export const removeDefaultParams = (params, defaults) => {
  const cleaned = { ...params };
  Object.keys(defaults).forEach((key) => {
    // Используем JSON.stringify для корректного сравнения массивов и объектов
    if (JSON.stringify(cleaned[key]) === JSON.stringify(defaults[key])) {
      delete cleaned[key];
    }
  });
  return cleaned;
};

// --- CORE LOGIC ---

export const applyNewParams = ({
  queryState, // База: { limit, sort }
  newFilters, // Новые фильтры из FiltersBar или текущие urlParams при смене сортировки
  defaults, // DEFAULT_QUERY
}) => {
  // Твоя логика: фильтры из newFilters полностью заменяют старые,
  // но системные параметры (limit, sort) берутся из queryState
  const newState = {
    limit: queryState.limit,
    sort: queryState.sort,
    ...newFilters,
    page: 0,
  };

  const cleanedState = removeDefaultParams(newState, defaults);
  const query = stringifyUrlParams(cleanedState);

  if (query) {
    window.location.search = query;
  } else {
    window.location.href = window.location.pathname;
  }
};

export const createProductLoader = ({
  fetchFn,
  initialParams = {},
  defaultParams = {},
  onUpdateUrl = null,
}) => {
  // Состояние страницы в замыкании для переиспользования
  let currentPage = initialParams.page ?? defaultParams.page ?? 0;

  return async (productListInstance) => {
    const params = {
      ...initialParams,
      limit: initialParams.limit ?? defaultParams.limit,
      sort: initialParams.sort ?? defaultParams.sort,
      page: currentPage,
    };

    try {
      const { data, count } = await fetchFn(params);
      productListInstance.appendProducts(data);

      if (onUpdateUrl && currentPage > 0) {
        onUpdateUrl(currentPage);
      }

      const totalLoaded = (currentPage + 1) * params.limit;
      if (totalLoaded >= count) {
        productListInstance.hideLoadMore();
      } else {
        productListInstance.showLoadMore();
      }

      currentPage++;
    } catch (error) {
      console.error("Load Error:", error);
    }
  };
};
