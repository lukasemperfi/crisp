import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import { store } from "@/app/store";
import { productFiltersActions } from "../model/product-filters-slice";

export const initProductFilters = () => {
  let filters = {
    weight: [],
    flavor: [],
    sort: null,
  };

  loadFiltersFromURL();

  store.dispatch(productFiltersActions.setFilters(filters));
  store.dispatch(productFiltersActions.setInitialized(true));

  function updateFilter(type, value) {
    if (type === "sort") {
      filters.sort = value;

      return;
    }

    const arr = filters[type];

    if (arr.includes(value)) {
      filters[type] = arr.filter((v) => v !== value);
    } else {
      filters[type].push(value);
    }
  }

  function resetFilters() {
    filters.weight = [];
    filters.flavor = [];
    filters.sort = null;

    resetURL();

    // store.dispatch(productFiltersActions.resetFilters());
  }

  function updateURL() {
    const params = new URLSearchParams();

    filters.weight.forEach((val) => params.append("weight", val));

    filters.flavor.forEach((val) => params.append("flavor", val));

    if (filters.sort) {
      params.set("sort", filters.sort);
    }

    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "");

    window.history.replaceState({}, "", newUrl);
  }

  function resetURL() {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);
  }

  function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);

    filters.weight = params.getAll("weight");
    filters.flavor = params.getAll("flavor");
    filters.sort = params.get("sort") || null;
  }

  const flavorSelect = initDropdown({
    selector: ".product-filters-bar__flavor-select",
    onChange: (type, value) => updateFilter(type, value),
    defaultValues: [...filters.flavor],
  });

  const weightSelect = initDropdown({
    selector: ".product-filters-bar__weight-select",
    onChange: (type, value) => updateFilter(type, value),
    defaultValues: [...filters.weight],
  });

  const desktopPriceButton = initPriceButton({
    selector: ".filter-btn_price-desktop",
    onClick: (type, value) => updateFilter(type, value),
    defaultValue: filters.sort,
  });

  const mobilePriceButton = initPriceButton({
    selector: ".filter-btn_price-mobile",
    onClick: (type, value) => updateFilter(type, value),
    defaultValue: filters.sort,
  });

  initApplyButton({
    selector: ".filter-actions__apply-btn",
    onClick: () => {
      updateURL();
      // store.dispatch(productFiltersActions.setFilters(filters));

      location.reload();
    },
  });

  initResetButton({
    selector: ".filter-actions__reset-btn",
    onClick: () => {
      flavorSelect.reset();
      weightSelect.reset();
      desktopPriceButton.reset();
      mobilePriceButton.reset();
      resetFilters();
      location.reload();
    },
  });
};

export const initPriceButton = ({ selector, defaultValue, onClick }) => {
  const button = document.querySelector(selector);
  if (!button) {
    return;
  }

  const iconAsc = button.querySelector(".filter-btn__icon_arrowUp");
  const iconDesc = button.querySelector(".filter-btn__icon_arrowDown");

  let currentValue = defaultValue || null;

  const updateIcons = () => {
    if (currentValue === "asc") {
      iconAsc.classList.add("filter-btn__icon_active");
      iconDesc.classList.remove("filter-btn__icon_active");
    } else if (currentValue === "desc") {
      iconDesc.classList.add("filter-btn__icon_active");
      iconAsc.classList.remove("filter-btn__icon_active");
    } else {
      iconAsc.classList.remove("filter-btn__icon_active");
      iconDesc.classList.remove("filter-btn__icon_active");
    }
  };

  updateIcons();

  button.addEventListener("click", () => {
    currentValue = currentValue === "asc" ? "desc" : "asc";
    updateIcons();

    if (onClick) {
      const type = button.dataset.name;
      onClick(type, currentValue);
    }
  });

  const reset = () => {
    currentValue = null;
    updateIcons();
  };

  return {
    reset,
  };
};

export const initResetButton = ({ selector, onClick }) => {
  const resetButton = document.querySelector(selector);
  if (!resetButton) {
    return;
  }

  resetButton.addEventListener("click", () => {
    if (onClick) {
      onClick();
    }
  });
};

export const initApplyButton = ({ selector, onClick }) => {
  const applyButton = document.querySelector(selector);
  if (!applyButton) {
    return;
  }

  applyButton.addEventListener("click", () => {
    if (onClick) {
      onClick();
    }
  });
};
