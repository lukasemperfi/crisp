import { store } from "@/app/store";
import { createComponent } from "@/shared/lib/core/core";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";

import { loginUser } from "@/entities/auth/model/auth-slice";
import {
  selectCartCount,
  selectCartTotalSum,
} from "@/features/cart/model/cart-slice";

import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { LoginForm } from "./ui/login-form";
import { AddressForm } from "./ui/address-form/address-form";
import { CartOrderSummary } from "./ui/cart-order-summary/cart-order-summary";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { countries, regionsByCountry } from "../../../../shared/lib/location";
import { IconEdit } from "@/shared/ui/icons/icons";
import { FormField } from "@/shared/ui/form-field/form-field";
import { delay } from "../../../../shared/helpers/delay";
import { baseUrl } from "../../../../shared/helpers/base-url";

export const initCheckoutContent = async () => {
  let orderSummaryState = {
    items: [],
    cartCount: 0,
    shippingCost: 5,
    shippingLabel: "Flat Rate - Fixed",
    subtotal: 0,
    total: 0,
  };

  let addressState = {
    first_name: "",
    last_name: "",
    company: "",
    street_address: "",
    country: "",
    state: "",
    postal_code: "",
    shipping: "",
  };

  initBreadcrumbs(".checkout-section__breadcrumbs");

  const headerContainer = document.querySelector(".checkout-section__header");
  const stepsComponent = Steps({ step: 1 });
  headerContainer.append(stepsComponent);

  const paymentMethod2 = PaymentMethod({
    userData: addressState,
    className: "payment-method_2",
  });
  const paymentMethod3 = PaymentMethod({
    userData: addressState,
    className: "payment-method_3",
    title: "Shipping Method:",
  });

  const col1Container = document.querySelector(".checkout-section__col-1");

  col1Container.append(
    ShippingInfo({
      addressState,
      stepsComponent,
      paymentMethod2,
      paymentMethod3,
      orderSummaryState,
    }),
  );

  const checkoutOrderContainer = document.querySelector(
    ".checkout-section__col-2",
  );
  const cartOrderSummary = CartOrderSummary(orderSummaryState);

  checkoutOrderContainer.append(
    cartOrderSummary,
    paymentMethod2,
    paymentMethod3,
  );

  const radios = document.querySelectorAll('input[name="shipping"]');
  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      const label = e.target.dataset.label;
      const price = parseFloat(e.target.dataset.price);

      orderSummaryState = {
        ...orderSummaryState,
        shippingCost: price,
        shippingLabel: label,
      };

      cartOrderSummary.update({
        shippingCost: price,
        shippingLabel: label,
        total: calculateOrderTotal(price, orderSummaryState.subtotal),
      });
    });
  });

  store.subscribe("cart", async (newState) => {
    const cartViewItems = newState.viewItems;
    const cartCount = selectCartCount(newState);
    const cartTotalSum = selectCartTotalSum(newState);

    orderSummaryState = {
      ...orderSummaryState,
      subtotal: cartTotalSum,
      total: calculateOrderTotal(orderSummaryState.shippingCost, cartTotalSum),
    };

    cartOrderSummary.update({
      items: cartViewItems,
      cartCount,
      subtotal: cartTotalSum,
      total: calculateOrderTotal(orderSummaryState.shippingCost, cartTotalSum),
    });
  });

  function calculateOrderTotal(shippingCost, subtotal) {
    return subtotal + shippingCost;
  }
};

function ShippingInfo({
  addressState = {},
  stepsComponent,
  paymentMethod2,
  paymentMethod3,
  orderSummaryState,
}) {
  const el = document.createElement("div");
  el.className = "shipping-info";
  el.innerHTML = `<h2 class="shipping-info__title">Shipping Address</h2>`;

  const authSpinner = createOverlaySpinner({
    successText: "Вход выполнен успешно!",
  });

  const paymentMethod = PaymentMethod({
    userData: addressState,
    title: "Shipping Address",
  });
  const discountCode = DiscountCode();

  const loginForm = LoginForm({
    onSubmit: async (data) => {
      try {
        authSpinner.show();
        await loginUser(data.email, data.password);
        authSpinner.success();
      } catch (error) {
        console.error("Ошибка входа:", error);
      } finally {
        authSpinner.hide();
      }
    },
  });

  const addressForm = AddressForm({
    onSubmit: async (data) => {
      const { shipping, ...restData } = data;
      addressState = { ...data };
      const step = Number(stepsComponent.dataset.step);

      if (step === 1) {
        hideStepOne({ el, loginForm });
        paymentMethod.update({ userData: restData });
        paymentMethod2.update({ userData: restData });
        paymentMethod3.update({
          userData: { shipping: orderSummaryState.shippingLabel },
        });
        showStepTwo();
      }

      if (step === 2) {
        console.log("Данные адреса и доставки:", data);
        try {
          authSpinner.show();
          await delay();
          authSpinner.success("Order placed successfully!");
          location.href = `${baseUrl}`;
        } catch (error) {
          console.error("Ошибка входа:", error);
        }
      }
    },
    userProfileData: addressState,
  });

  function hideStepTwo() {
    paymentMethod.style.display = "none";
    discountCode.style.display = "none";
    paymentMethod2.style.display = "none";
    paymentMethod3.style.display = "none";
  }

  function showStepTwo() {
    paymentMethod.style.display = "block";
    discountCode.style.display = "block";
    paymentMethod2.style.display = "block";
    paymentMethod3.style.display = "block";
  }

  function hideStepOne({ el, loginForm }) {
    const addressSection = el.querySelector(".address-form__section_personal");
    const shippingSection = el.querySelector(".shipping-methods");
    const infoTitle = document.querySelector(".shipping-info__title");
    const submitBtn = el.querySelector(".address-form__btn-submit");

    stepsComponent.update({ step: 2 });
    addressSection.style.display = "none";
    shippingSection.style.display = "none";
    infoTitle.style.display = "none";
    submitBtn.textContent = "Place Order";
    if (loginForm) loginForm.style.display = "none";
  }

  function showStepOne({ el, loginForm }) {
    const addressSection = el.querySelector(".address-form__section_personal");
    const shippingSection = el.querySelector(".shipping-methods");
    const infoTitle = document.querySelector(".shipping-info__title");
    const submitBtn = el.querySelector(".address-form__btn-submit");

    addressSection.style.display = "block";
    shippingSection.style.display = "block";
    infoTitle.style.display = "block";
    submitBtn.textContent = "Next";
    if (loginForm) loginForm.style.display = "block";
  }

  const title = el.querySelector(".shipping-info__title");
  const backBtn = addressForm.querySelector(".address-form__btn-back");
  const editButton = paymentMethod.querySelector(
    ".payment-method__button-icon",
  );

  editButton.addEventListener("click", () => {
    const step = Number(stepsComponent.dataset.step);
    if (step === 2) {
      stepsComponent.update({ step: 1 });
      showStepOne({ el, loginForm });
      hideStepTwo();
    }
  });

  backBtn.addEventListener("click", () => {
    const step = Number(stepsComponent.dataset.step);
    if (step === 2) {
      stepsComponent.update({ step: 1 });
      showStepOne({ el, loginForm });
      hideStepTwo();
    }
  });

  store.subscribe("auth", async (newState) => {
    if (!newState.isAuth) {
      if (!el.contains(loginForm)) title.after(loginForm);
    } else {
      if (el.contains(loginForm)) loginForm.remove();
    }
  });

  el.append(addressForm);

  const actions = el.querySelector(".address-form__actions");

  hideStepTwo();
  actions.before(paymentMethod);

  addressForm.after(discountCode);

  return el;
}

function Steps(props) {
  return createComponent(props, {
    tag: "div",
    render(el, props, emit, { runOnce }) {
      const { step = 1 } = props;

      if (runOnce) {
        el.className = "steps";
        el.innerHTML = `
          <div class="steps__item steps__item_1">
            <div class="steps__item-wrapper">
              <div class="steps__circle"><div class="steps__circle-inner"><span class="steps__content">1</span></div></div>
            </div>
            <div class="steps__label">Shipping</div>
          </div>
          <div class="steps__item steps__item_2">
            <div class="steps__item-wrapper">
              <div class="steps__circle"><div class="steps__circle-inner"><span class="steps__content">2</span></div></div>
            </div>
            <div class="steps__label">Review & Payments</div>
          </div>
        `;

        el._els = {
          item1: el.querySelector(".steps__item_1"),
          item2: el.querySelector(".steps__item_2"),
          content1: el.querySelector(".steps__item_1 .steps__content"),
          content2: el.querySelector(".steps__item_2 .steps__content"),
        };
      }

      el.dataset.step = step;
      const { item1, item2, content1 } = el._els;

      item1.classList.remove("steps__item_active");
      item2.classList.remove("steps__item_active");

      if (step === 1) item1.classList.add("steps__item_active");
      if (step === 2) item2.classList.add("steps__item_active");

      content1.innerHTML = step === 2 ? MarkIcon() : "1";
    },
  });
}

function MarkIcon() {
  return `
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2.12132" y1="5.50427" x2="5" y2="8.38295" stroke="black" stroke-width="3" stroke-linecap="square"/>
    <line x1="1.5" y1="-1.5" x2="11.4985" y2="-1.5" transform="matrix(-0.707106 0.707107 -0.707106 -0.707107 12.877 0)" stroke="black" stroke-width="3" stroke-linecap="square"/>
  </svg>`;
}

function PaymentMethod(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const {
        isAddressSame = true,
        userData = {},
        title = "Payment Method:",
        className = "",
      } = props;

      const {
        first_name = "",
        last_name = "",
        company = "",
        street_address = "",
        country = "",
        state = "",
        postal_code = "",
        shipping = "",
      } = userData;

      const countryMap = new Map(countries.map((c) => [c.value, c.label]));
      const regionsMap = new Map(
        Object.values(regionsByCountry)
          .flat()
          .map((region) => [region.value, region.label]),
      );

      const renderInfoItem = (value) => {
        return value && value.toString().trim()
          ? `<div class="payment-method__info-item">${value}</div>`
          : "";
      };

      if (runOnce) {
        el.className = "payment-method " + className;

        el.innerHTML = `
          <div class="payment-method__header">
            <div class="payment-method__title"></div>
            <button type="button" class="payment-method__button-icon">${IconEdit()}</button>          
          </div>
          <div class="payment-method__subtitle">Check / Money order</div>
          <div class="payment-method__grid">
              ${Checkbox({
                label: "My billing and shipping address are the same",
                inputProps: {
                  name: "isAddressConf",
                  id: "address_conf",
                  checked: isAddressSame,
                },
              }).toHTML()}

            <div class="payment-method__info"></div>
          </div>
        `;

        el._els = {
          title: el.querySelector(".payment-method__title"),
          checkbox: el.querySelector('input[name="isAddressConf"]'),
          infoContainer: el.querySelector(".payment-method__info"),
        };

        el._els.checkbox.addEventListener("change", (e) => {
          const checked = e.target.checked;
          emit("addressSyncChange", { checked });
          el.update({ isAddressSame: checked });
        });
      }

      const { checkbox, infoContainer, title: titleEl } = el._els;

      if (titleEl) {
        titleEl.textContent = title;
      }

      if (checkbox) {
        checkbox.checked = isAddressSame;
      }

      if (infoContainer) {
        const name = `${first_name} ${last_name}`.trim();
        const location =
          `${regionsMap.get(state) || state || ""} ${postal_code}`.trim();
        const countryLabel = countryMap.get(country) || country;

        infoContainer.innerHTML = `
          ${renderInfoItem(name)}
          ${renderInfoItem(street_address)}
          ${renderInfoItem(location)}
          ${renderInfoItem(countryLabel)}
          ${renderInfoItem(shipping)}
        `;
      }
    },
  });
}

function DiscountCode(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      const {
        title = "Apply Discount Code",
        placeholder = "Enter discount code",
      } = props;

      if (runOnce) {
        el.className = "discount-code";

        el.innerHTML = `
          <h3 class="discount-code__title">${title}</h3>
          <div class="discount-code__form-wrapper">
            ${FormField({
              inputProps: {
                placeholder,
                name: "discount",
              },
              withButton: true,
              buttonText: `
                <span class="discount-code__button-text discount-code__button-text_mobile">Apply</span>
                <span class="discount-code__button-text discount-code__button-text_desktop">Apply Discount</span>
              `,
            }).toHTML()}
          </div>
        `;

        el._els = {
          input: el.querySelector('input[name="discount"]'),
          button: el.querySelector("button"),
        };

        el._els.button?.addEventListener("click", () => {
          const code = el._els.input.value.trim();
          if (code) {
            emit("apply", { code });
          }
        });
      }
    },
  });
}
