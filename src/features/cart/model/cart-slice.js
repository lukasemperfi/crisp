import { store } from "../../../app/store";
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
  viewItems: [],
  totalSum: 0,
  isViewItemsLoading: false,
  viewItemsError: null,
};

const calculateState = (state, newItems) => {
  const newViewItems = state.viewItems
    .filter((vItem) => newItems.some((i) => i.cartItemId === vItem.cartItemId))
    .map((vItem) => {
      const actualItem = newItems.find(
        (i) => i.cartItemId === vItem.cartItemId,
      );
      return { ...vItem, quantity: actualItem.quantity };
    });

  const newTotalSum = newViewItems.reduce((sum, item) => {
    return sum + (item.final_price || 0) * item.quantity;
  }, 0);

  return {
    ...state,
    items: newItems,
    viewItems: newViewItems,
    totalSum: newTotalSum,
  };
};

export const cartSlice = {
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productId, variantId, quantity = 1 } = action.payload;
      const cartItemId = `${productId}_${variantId}`;
      const existing = state.items.find(
        (item) => item.cartItemId === cartItemId,
      );

      let newItems;
      if (existing) {
        newItems = state.items.map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
        return calculateState(state, newItems);
      }

      return {
        ...state,
        items: [...state.items, { cartItemId, productId, variantId, quantity }],
      };
    },

    removeItem: (state, action) => {
      const { cartItemId } = action.payload;
      const newItems = state.items.filter((i) => i.cartItemId !== cartItemId);
      return calculateState(state, newItems);
    },

    incrementQuantity: (state, action) => {
      const { cartItemId } = action.payload;
      const newItems = state.items.map((i) =>
        i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i,
      );
      return calculateState(state, newItems);
    },

    decrementQuantity: (state, action) => {
      const { cartItemId } = action.payload;
      const existing = state.items.find((i) => i.cartItemId === cartItemId);

      if (!existing) return state;

      let newItems;
      if (existing.quantity <= 1) {
        newItems = state.items.filter((i) => i.cartItemId !== cartItemId);
      } else {
        newItems = state.items.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity - 1 } : i,
        );
      }
      return calculateState(state, newItems);
    },

    setQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;
      let newItems;

      console.log("from slice:", cartItemId, quantity);

      if (quantity <= 0) {
        newItems = state.items.filter((item) => item.cartItemId !== cartItemId);
      } else {
        newItems = state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item,
        );
      }
      return calculateState(state, newItems);
    },

    setViewLoading: (state) => ({
      ...state,
      isViewItemsLoading: true,
      viewItemsError: null,
    }),

    setViewItems: (state, action) => ({
      ...state,
      viewItems: action.payload.items,
      totalSum: action.payload.totalSum,
      isViewItemsLoading: false,
      status: CART_STATUS.SUCCEEDED,
    }),

    setViewError: (state, action) => ({
      ...state,
      isViewItemsLoading: false,
      viewItemsError: action.payload,
      status: CART_STATUS.FAILED,
    }),

    clearCart: () => initialState,
  },
};

export async function fetchCartProducts() {
  const state = store.getState().cart;
  if (state.items.length === 0) {
    store.dispatch({
      type: "cart/setViewItems",
      payload: { items: [], totalSum: 0 },
    });
    return;
  }
  store.dispatch({ type: "cart/setViewLoading" });
  try {
    const productIds = [...new Set(state.items.map((item) => item.productId))];
    const products = await productsApi.getProductsByIds(productIds);
    const productMap = new Map(products.map((p) => [p.id, p]));

    let totalSum = 0;
    const items = state.items.flatMap((cartItem) => {
      const product = productMap.get(cartItem.productId);
      if (!product) return [];
      const selectedVariant = product.variants?.find(
        (v) => v.id === cartItem.variantId,
      );
      if (!selectedVariant) return [];

      totalSum += (product.final_price || 0) * cartItem.quantity;
      return [
        {
          ...product,
          selectedVariant,
          cartItemId: cartItem.cartItemId,
          quantity: cartItem.quantity,
        },
      ];
    });

    store.dispatch({ type: "cart/setViewItems", payload: { items, totalSum } });
  } catch (err) {
    store.dispatch({ type: "cart/setViewError", payload: err.message });
  }
}

export const cartThunks = {
  addItem: ({ productId, variantId, quantity = 1 }) => {
    const cartItemId = `${productId}_${variantId}`;
    const state = store.getState().cart;
    const exists = state.items.some((item) => item.cartItemId === cartItemId);

    store.dispatch({
      type: "cart/addItem",
      payload: { productId, variantId, quantity },
    });
    if (!exists) fetchCartProducts();
  },
  removeItem: (cartItemId) => {
    store.dispatch({ type: "cart/removeItem", payload: { cartItemId } });
  },
  incrementQuantity: (cartItemId) => {
    store.dispatch({ type: "cart/incrementQuantity", payload: { cartItemId } });
  },
  decrementQuantity: (cartItemId) => {
    store.dispatch({ type: "cart/decrementQuantity", payload: { cartItemId } });
  },
  setQuantity: ({ cartItemId, quantity }) => {
    store.dispatch({
      type: "cart/setQuantity",
      payload: { cartItemId, quantity },
    });
  },
};

export const selectCartProductIds = (state) => [
  ...new Set(state.items.map((i) => i.productId)),
];
export const selectCartCount = (state) =>
  state.items.reduce((totalCount, item) => totalCount + item.quantity, 0);

export const selectCartTotalSum = (state) => state.totalSum;
