import queryString from "query-string";

const stringifyOptions = {
  arrayFormat: "comma",
  skipEmptyString: true,
  skipNull: true,
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
    if (JSON.stringify(cleaned[key]) === JSON.stringify(defaults[key])) {
      delete cleaned[key];
    }
  });
  return cleaned;
};

export const applyNewParams = ({ queryState, newFilters, defaults }) => {
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
