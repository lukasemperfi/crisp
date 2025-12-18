import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import { countries, regionsByCountry } from "@/shared/lib/location";
import {
  CHECKOUT_FORM_SELECTORS,
  initCheckoutFormValidation,
} from "../model/validation";
import { REQUIRED_RULE } from "@/shared/lib/just-validate/rules";
import { mapCheckoutPayload } from "./checkout-data-mapper";
import { store } from "@/app/store";
import { ordersApi } from "@/entities/order/api/order";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { redirect } from "@/shared/helpers/redirect";
import { baseUrl } from "@/shared/helpers/base-url";

export const initCheckoutForm = () => {
  const overlaySpinner = createOverlaySpinner();

  const checkoutValidator = initCheckoutFormValidation().onSuccess(
    async (event) => {
      event.preventDefault();

      const cartItems = store.getState().cart.items;
      const products = store.getState().cart.products;
      const form = document.querySelector(CHECKOUT_FORM_SELECTORS.FORM);
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      const orderData = mapCheckoutPayload(payload, cartItems);

      orderData.total_amount = calculateTotalAmount(cartItems, products);

      overlaySpinner.show();

      try {
        await ordersApi.createOrder(orderData);
        // await mockCreateOrder(orderData);
        store.dispatch({ type: "cart/clearCart" });
        redirect(`${baseUrl}thank-you/`, 0, true);
      } catch (error) {
        console.error("Order error:", error);
      } finally {
        overlaySpinner.hide();
      }
    }
  );

  function calculateTotalAmount(cartItems, products) {
    const quantityMap = new Map();
    cartItems.forEach((item) => {
      quantityMap.set(Number(item.productId), item.quantity);
    });

    const map = quantityMap || new Map();
    const DEFAULT_QUANTITY = 1;

    return products.reduce((sum, product) => {
      const quantity = map.get(product.id) || DEFAULT_QUANTITY;
      return sum + quantity * product.price;
    }, 0);
  }

  function mockCreateOrder(orderData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 1500);
    });
  }

  const regionDropdown = initDropdown({
    selector: ".checkout-form__region-dropdown",
    disabled: true,
  });

  const countryDropdown = initDropdown({
    selector: ".checkout-form__country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(value, regionDropdown, regionsByCountry);
    },
  });

  initDeliveryMethodSwitcher(checkoutValidator, {
    countryDropdown,
    regionDropdown,
  });
};

function initDeliveryMethodSwitcher(validator, dropdowns) {
  const { countryDropdown, regionDropdown } = dropdowns;
  const form = document.getElementById("checkout-form");
  const radios = form.querySelectorAll('input[name="delivery_method"]');
  const novaPoshta = form.querySelector(".nova_poshta__fields");
  const courier = form.querySelector(".courier__fields");

  const toggleFieldsDisabled = (container, isDisabled) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      field.disabled = isDisabled;
    });
  };

  const clearCustomDropdownFormFields = (container) => {
    if (!container) {
      return;
    }
    const dropdownFields = container.querySelectorAll(".dropdown_select");

    dropdownFields.forEach((dropdown) => {
      const selected = dropdown.querySelector(".dropdown__selected");
      const selectedOption = dropdown.querySelector(
        '.dropdown__option[aria-selected="true"]'
      );

      selected.innerHTML = selected.dataset.placeholder;

      if (selectedOption) {
        selectedOption.removeAttribute("aria-selected");
      }
    });
  };
  const clearFormFields = (container) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });

    clearCustomDropdownFormFields(container);
  };

  let prevValue = "";

  const updateVisibility = (value) => {
    countryDropdown.reset();
    regionDropdown.reset();
    regionDropdown.setDisabled(true);

    clearFormFields(novaPoshta);
    clearFormFields(courier);

    if (prevValue === "nova_poshta") {
      removeNovaPoshtaValidationFields(validator);
    }

    if (prevValue === "courier") {
      removeCourierValidationFields(validator);
    }

    toggleFieldsDisabled(novaPoshta, true);
    toggleFieldsDisabled(courier, true);

    novaPoshta.classList.add("hidden");
    courier.classList.add("hidden");

    if (value === "nova_poshta") {
      novaPoshta.classList.remove("hidden");
      toggleFieldsDisabled(novaPoshta, false);
      addNovaPoshtaValidationFields(validator);
    }
    if (value === "courier") {
      courier.classList.remove("hidden");
      toggleFieldsDisabled(courier, false);
      addCourierValidationFields(validator);
    }

    prevValue = value;
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => updateVisibility(radio.value));
  });

  const checked = document.querySelector(
    'input[name="delivery_method"]:checked'
  );

  if (checked) {
    updateVisibility(checked.value);
  }
}

function updateDependentDropdown(value, targetDropdown, dataMap) {
  const options = dataMap[value] || [];

  targetDropdown.updateOptions(options);

  if (options.length > 0) {
    targetDropdown.setDisabled(false);
  } else {
    targetDropdown.setDisabled(true);
  }
}

function addNovaPoshtaValidationFields(validator) {
  const fields = [
    [CHECKOUT_FORM_SELECTORS.COUNTRY, [REQUIRED_RULE]],
    [CHECKOUT_FORM_SELECTORS.REGION, [REQUIRED_RULE]],
    [CHECKOUT_FORM_SELECTORS.CITY, [REQUIRED_RULE]],
  ];

  fields.forEach(([selector, rules]) => {
    validator.addField(selector, rules);
  });
}

function removeNovaPoshtaValidationFields(validator) {
  const fields = [
    CHECKOUT_FORM_SELECTORS.COUNTRY,
    CHECKOUT_FORM_SELECTORS.REGION,
    CHECKOUT_FORM_SELECTORS.CITY,
  ];

  fields.forEach((selector) => {
    validator.removeField(selector);
  });
}

function addCourierValidationFields(validator) {
  validator.addField(CHECKOUT_FORM_SELECTORS.ADDRESS, [REQUIRED_RULE]);
}

function removeCourierValidationFields(validator) {
  validator.removeField(CHECKOUT_FORM_SELECTORS.ADDRESS);
}
