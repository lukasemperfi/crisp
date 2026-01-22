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

export const cartSlice = {
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { productId, variantId, quantity = 1 } = action.payload;
      const cartItemId = `${productId}_${variantId}`;

      const existing = state.items.find(
        (item) => item.cartItemId === cartItemId
      );

      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.cartItemId === cartItemId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          ),
        };
      }

      return {
        ...state,
        items: [...state.items, { cartItemId, productId, variantId, quantity }],
      };
    },

    removeItem: (state, action) => {
      const { cartItemId } = action.payload;

      return {
        ...state,
        items: state.items.filter((i) => i.cartItemId !== cartItemId),
      };
    },

    incrementQuantity: (state, action) => {
      const { cartItemId } = action.payload;

      return {
        ...state,
        items: state.items.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    },

    decrementQuantity: (state, action) => {
      const { cartItemId } = action.payload;
      const existing = state.items.find((i) => i.cartItemId === cartItemId);

      if (!existing) return state;

      if (existing.quantity <= 1) {
        return {
          ...state,
          items: state.items.filter((i) => i.cartItemId !== cartItemId),
        };
      }

      return {
        ...state,
        items: state.items.map((i) =>
          i.cartItemId === cartItemId ? { ...i, quantity: i.quantity - 1 } : i
        ),
      };
    },

    setQuantity: (state, action) => {
      const { cartItemId, quantity } = action.payload;

      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.cartItemId !== cartItemId),
        };
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.cartItemId === cartItemId ? { ...item, quantity } : item
        ),
      };
    },

    setViewLoading: (state) => {
      return {
        ...state,
        isViewItemsLoading: true,
        viewItemsError: null,
      };
    },

    setViewItems: (state, action) => {
      const { items, totalSum } = action.payload;
      return {
        ...state,
        viewItems: items,
        totalSum: totalSum,
        isViewItemsLoading: false,
        status: CART_STATUS.SUCCEEDED,
      };
    },

    setViewError: (state, action) => {
      return {
        ...state,
        isViewItemsLoading: false,
        viewItemsError: action.payload,
        status: CART_STATUS.FAILED,
      };
    },

    clearCart: () => initialState,
  },
};

async function getCartViewItems(cartItems) {
  if (!cartItems || !cartItems.length) {
    return { items: [], totalSum: 0 };
  }

  const productIds = [...new Set(cartItems.map((item) => item.productId))];
  const products = await productsApi.getProductsByIds(productIds);
  const productMap = new Map(products.map((p) => [p.id, p]));

  let totalSum = 0;

  const items = cartItems.flatMap((cartItem) => {
    const product = productMap.get(cartItem.productId);

    if (!product) {
      console.error(`Product ${cartItem.productId} missing in API response`);
      return [];
    }

    const selectedVariant = product.variants?.find(
      (v) => v.id === cartItem.variantId
    );

    if (!selectedVariant) {
      console.error(
        `Variant ${cartItem.variantId} not found for product ${product.id}`
      );
      return [];
    }

    totalSum += (product.final_price || 0) * cartItem.quantity;

    return [
      {
        ...product,
        selectedVariant,
        cartItemId: cartItem.cartItemId,
        variantId: cartItem.variantId,
        quantity: cartItem.quantity,
      },
    ];
  });

  return { items, totalSum };
}

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
    const result = await getCartViewItems(state.items);

    store.dispatch({
      type: "cart/setViewItems",
      payload: result,
    });

    return result;
  } catch (err) {
    const errorMessage = err.message || "Unknown error";
    store.dispatch({
      type: "cart/setViewError",
      payload: errorMessage,
    });
    throw err;
  }
}

export const cartThunks = {
  addItem: ({ productId, variantId, quantity = 1 }) => {
    const cartItemId = `${productId}_${variantId}`;
    const stateBefore = store.getState().cart;

    const existsBefore = stateBefore.items.find(
      (item) => item.cartItemId === cartItemId
    );

    store.dispatch({
      type: "cart/addItem",
      payload: { productId, variantId, quantity },
    });

    if (!existsBefore) {
      fetchCartProducts();
    }
  },

  removeItem: (cartItemId) => {
    store.dispatch({
      type: "cart/removeItem",
      payload: { cartItemId },
    });

    fetchCartProducts();
  },

  incrementQuantity: (cartItemId) => {
    store.dispatch({ type: "cart/incrementQuantity", payload: { cartItemId } });
    fetchCartProducts();
  },

  decrementQuantity: (cartItemId) => {
    store.dispatch({ type: "cart/decrementQuantity", payload: { cartItemId } });
    fetchCartProducts();
  },
};

export const selectCartProductIds = (state) => [
  ...new Set(state.items.map((i) => i.productId)),
];
export const selectCartCount = (state) =>
  state.items.reduce((totalCount, item) => totalCount + item.quantity, 0);

export const selectCartTotalSum = (state) => state.totalSum;
