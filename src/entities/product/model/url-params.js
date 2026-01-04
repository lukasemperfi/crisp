import queryString from "query-string";

export const stringifyUrlParams = (params) => {
  const flatParams = { ...params };

  if (params.price) {
    flatParams.minPrice = params.price.min;
    flatParams.maxPrice = params.price.max;
    delete flatParams.price;
  }

  return queryString.stringify(flatParams, {
    arrayFormat: "comma",
    skipEmptyString: true,
    skipNull: true,
  });
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

export const removeDefaultParams = (params, defaults) => {
  const cleaned = { ...params };

  Object.keys(defaults).forEach((key) => {
    if (cleaned[key] === defaults[key]) {
      delete cleaned[key];
    }
  });

  return cleaned;
};
