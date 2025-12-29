import { authSlice } from "@/entities/auth/model/auth-slice";
import { cartSlice } from "@/features/cart/model/cart-slice";

class Store {
  constructor() {
    this.state = {};
    this.reducers = {};
    this.listeners = new Map();
    this.persistConfig = {};

    this.storageKey = "app_store";
  }

  registerSlice(slice, config = { persist: false, fields: null }) {
    const persistedStore = this.loadFullStoreFromStorage();
    const savedSliceState = persistedStore[slice.name];

    const mergedState = savedSliceState
      ? {
          ...slice.initialState,
          ...savedSliceState,
        }
      : slice.initialState;

    this.state[slice.name] = mergedState;
    this.reducers[slice.name] = slice.reducers;
    this.persistConfig[slice.name] = config;
  }

  getState() {
    return this.state;
  }

  dispatch(action) {
    const [sliceName, reducerName] = action.type.split("/");

    if (!sliceName || !reducerName) {
      console.error(
        `Некорректный action.type: ${action.type}. Ожидается 'slice/reducer'.`
      );
      return;
    }
    const sliceReducers = this.reducers[sliceName];
    if (!sliceReducers || !sliceReducers[reducerName]) {
      console.warn(`Не найден редьюсер ${reducerName} в слайсе ${sliceName}.`);
      return;
    }

    const reducer = sliceReducers[reducerName];
    const prevState = this.state[sliceName];
    const newState = reducer(prevState, action);

    this.state[sliceName] = newState;

    this.saveSliceToFullStorage(sliceName, newState);

    this.notify(sliceName, newState);
  }

  subscribe(sliceName, listener) {
    if (!this.listeners.has(sliceName)) {
      this.listeners.set(sliceName, new Set());
    }

    this.listeners.get(sliceName).add(listener);

    const currentState = this.state[sliceName];
    if (currentState !== undefined) {
      listener(currentState);
    }
  }

  unsubscribe(sliceName, listener) {
    if (!this.listeners.has(sliceName)) {
      return;
    }

    this.listeners.get(sliceName).delete(listener);

    if (this.listeners.get(sliceName).size === 0) {
      this.listeners.delete(sliceName);
    }
  }

  notify(sliceName, data) {
    if (!this.listeners.has(sliceName)) {
      return;
    }

    this.listeners.get(sliceName).forEach((listener) => {
      listener(data);
    });
  }

  loadFullStoreFromStorage() {
    const raw = localStorage.getItem(this.storageKey);
    if (!raw) return {};

    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  saveSliceToFullStorage(sliceName, sliceState) {
    const config = this.persistConfig[sliceName];
    if (!config?.persist) return;

    const fullStore = this.loadFullStoreFromStorage();

    let dataToSave = sliceState;

    if (Array.isArray(config.fields)) {
      dataToSave = {};
      config.fields.forEach((key) => {
        if (sliceState.hasOwnProperty(key)) {
          dataToSave[key] = sliceState[key];
        }
      });
    }

    fullStore[sliceName] = dataToSave;

    localStorage.setItem(this.storageKey, JSON.stringify(fullStore));
  }
}

export const store = new Store();

store.registerSlice(authSlice);
store.registerSlice(cartSlice, { persist: true, fields: ["items"] });
