export const productFiltersSlice = {
  name: "productFilters",

  initialState: {
    filters: {
      weight: [],
      flavor: [],
      sort: null,
    },
    isInitialized: false,
  },

  reducers: {
    setFilters: (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        ...action.payload,
      },
    }),

    setInitialized: (state, action) => ({
      ...state,
      isInitialized: action.payload,
    }),

    resetFilters: (state) => ({
      ...state,
      filters: {
        weight: [],
        flavor: [],
        sort: null,
      },
    }),
  },
};

export const productFiltersActions = {
  setFilters: (payload) => ({
    type: "productFilters/setFilters",
    payload,
  }),

  setInitialized: (value) => ({
    type: "productFilters/setInitialized",
    payload: value,
  }),

  resetFilters: () => ({
    type: "productFilters/resetFilters",
  }),
};
