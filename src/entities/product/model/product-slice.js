import { store } from "@/app/store/index.js";
import { productsApi } from "../api/products.js";

export const PRODUCT_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  item: null,
  status: PRODUCT_STATUS.IDLE,
  error: null,
  lastFetched: null,
  currentId: null,
};

export const productSlice = {
  name: "product",
  initialState,
  reducers: {
    setLoading: (state) => ({
      ...state,
      status: PRODUCT_STATUS.LOADING,
      error: null,
    }),
    setProduct: (state, action) => ({
      ...state,
      item: action.payload,
      status: PRODUCT_STATUS.SUCCEEDED,
      error: null,
      lastFetched: new Date().toISOString(),
      currentId: action.payload?.id || null,
    }),
    setError: (state, action) => ({
      ...state,
      status: PRODUCT_STATUS.FAILED,
      error: action.payload,
      item: null,
    }),
    clearError: (state) => ({
      ...state,
      error: null,
    }),
    reset: () => initialState,
  },
};

export async function fetchProductById(id) {
  const currentState = store.getState().product;

  if (
    currentState.status === PRODUCT_STATUS.LOADING &&
    currentState.currentId === id
  ) {
    return;
  }

  if (
    currentState.status === PRODUCT_STATUS.SUCCEEDED &&
    currentState.currentId === id &&
    currentState.item
  ) {
    return currentState.item;
  }

  store.dispatch({ type: "product/setLoading" });

  try {
    const product = await productsApi.getProductById(id);

    if (!product) {
      store.dispatch({
        type: "product/setError",
        payload: "Продукт не найден",
      });
      return null;
    }

    store.dispatch({
      type: "product/setProduct",
      payload: product,
    });

    return product;
  } catch (err) {
    const errorMessage = err.message || "Не удалось загрузить продукт";
    store.dispatch({
      type: "product/setError",
      payload: errorMessage,
    });
    throw err;
  }
}
