import { store } from "@/app/store/index.js";
import { productsApi } from "../../../entities/product/api/products";

export const CART_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  items: [],
  status: CART_STATUS.IDLE,
  error: null,

  products: [],
  isProductsLoading: false,
  productsError: null,
};

export const cartSlice = {
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const productId = String(action.payload.productId);
      const existing = state.items.find((item) => item.productId === productId);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { productId, quantity: 1 }],
      };
    },

    removeItem: (state, action) => {
      const productId = String(action.payload.productId);

      return {
        ...state,
        items: state.items.filter((i) => i.productId !== productId),

        products: state.products.filter((p) => String(p.id) !== productId),
      };
    },

    incrementQuantity: (state, action) => {
      const productId = action.payload.productId;
      const existing = state.items.find((i) => i.productId === productId);

      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { productId, quantity: 1 }],
      };
    },

    decrementQuantity: (state, action) => {
      const productId = action.payload.productId;
      const existing = state.items.find((i) => i.productId === productId);

      if (!existing) {
        return state;
      }

      if (existing.quantity <= 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.productId !== productId),
        };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    },

    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.productId !== productId),
        };
      }

      const existing = state.items.find((i) => i.productId === productId);

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.productId === productId ? { ...item, quantity } : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { productId, quantity }],
      };
    },

    clearCart: () => initialState,

    setCartProductsLoading: (state) => ({
      ...state,
      isProductsLoading: true,
      productsError: null,
    }),
    setCartProducts: (state, action) => ({
      ...state,
      products: action.payload,
      isProductsLoading: false,
      productsError: null,
    }),
    setCartProductsError: (state, action) => ({
      ...state,
      isProductsLoading: false,
      productsError: action.payload,
    }),
  },
};

export async function fetchCartProducts() {
  const state = store.getState().cart;
  const productIds = state.items.map((p) => p.productId);

  store.dispatch({ type: "cart/setCartProductsLoading" });

  try {
    const products = await productsApi.getProductsByIds(productIds);

    store.dispatch({
      type: "cart/setCartProducts",
      payload: products,
    });

    return products;
  } catch (err) {
    const errorMessage = err.message || "Unknown error";
    store.dispatch({
      type: "cart/setCartProductsError",
      payload: errorMessage,
    });
    throw err;
  }
}

export const cartThunks = {
  addItem: (productId) => {
    const stateBefore = store.getState().cart;
    const existsBefore = stateBefore.items.find(
      (item) => item.productId === productId
    );

    store.dispatch({
      type: "cart/addItem",
      payload: { productId },
    });

    if (!existsBefore) {
      fetchCartProducts();
    }
  },

  removeItem: (productId) => {
    store.dispatch({
      type: "cart/removeItem",
      payload: { productId },
    });

    // fetchCartProducts();
  },

  setQuantity: ({ productId, quantity }) => {
    const stateBefore = store.getState().cart;
    const existsBefore = stateBefore.items.some(
      (item) => item.productId === productId
    );

    store.dispatch({
      type: "cart/setQuantity",
      payload: { productId, quantity },
    });

    const isRemoved = quantity <= 0 && existsBefore;
    const isAdded = quantity > 0 && !existsBefore;

    if (isRemoved || isAdded) {
      fetchCartProducts();
    }
  },
};

export const selectCartProductIds = (state) =>
  state.items.map((i) => i.productId);

export const selectCartCount = (state) =>
  state.items.reduce((totalCount, item) => totalCount + item.quantity, 0);
