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

    clearCart: () => initialState,
  },
};

export const selectCartProductIds = (state) => [
  ...new Set(state.items.map((i) => i.productId)),
];
export const selectCartCount = (state) =>
  state.items.reduce((totalCount, item) => totalCount + item.quantity, 0);
