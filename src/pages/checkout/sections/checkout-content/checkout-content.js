import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { createComponent } from "@/shared/lib/core/core";
import { LoginForm } from "./ui/login-form";
import { AddressForm } from "./ui/address-form/address-form";
import { CartOrderSummary } from "./ui/cart-order-summary/cart-order-summary";
import { store } from "@/app/store";
import {
  selectCartCount,
  selectCartTotalSum,
} from "@/features/cart/model/cart-slice";

export const initCheckoutContent = async () => {
  let orderSummaryState = {
    items: [],
    cartCount: 0,
    shippingCost: 5,
    shippingLabel: "Flat Rate - Fixed",
    subtotal: 0,
    total: 0,
  };

  initBreadcrumbs(".checkout-section__breadcrumbs");

  const headerContainer = document.querySelector(".checkout-section__header");
  const stepsComponent = Steps({ step: 1 });

  headerContainer.append(stepsComponent);

  const col1Container = document.querySelector(".checkout-section__col-1");

  col1Container.append(ShippingInfo());

  const checkoutOrderContainer = document.querySelector(
    ".checkout-section__col-2",
  );
  const cartOrderSummary = CartOrderSummary(orderSummaryState);

  checkoutOrderContainer.append(cartOrderSummary);

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

function ShippingInfo() {
  const el = document.createElement("div");
  el.className = "shipping-info";

  el.innerHTML = `
      <h2 class="shipping-info__title">Shipping Address</h2>
  `;

  const loginForm = LoginForm({
    onSubmit: (data) => console.log("Login Attempt:", data),
  });
  const addressForm = AddressForm({
    onSubmit: (data) => console.log("Login Attempt:", data),
  });

  el.append(loginForm, addressForm);

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
              <div class="steps__circle">
                <div class="steps__circle-inner">
                  <span class="steps__content">1</span>
                </div>
              </div>
            </div>
            <div class="steps__label">Shipping</div>
          </div>

        <div class="steps__item steps__item_2">
          <div class="steps__item-wrapper">
            <div class="steps__circle">
              <div class="steps__circle-inner">
                <span class="steps__content">2</span>
              </div>
            </div>
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

      const { item1, item2, content1 } = el._els;

      item1.classList.remove("steps__item_active");
      item2.classList.remove("steps__item_active");

      if (step === 1) {
        item1.classList.add("steps__item_active");
      }

      if (step === 2) {
        item2.classList.add("steps__item_active");
      }

      if (step === 2) {
        content1.innerHTML = MarkIcon();
      } else {
        content1.textContent = "1";
      }
    },
  });
}

function MarkIcon() {
  return `
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2.12132" y1="5.50427" x2="5" y2="8.38295" stroke="black" stroke-width="3" stroke-linecap="square"/>
    <line x1="1.5" y1="-1.5" x2="11.4985" y2="-1.5" transform="matrix(-0.707106 0.707107 -0.707106 -0.707107 12.877 0)" stroke="black" stroke-width="3" stroke-linecap="square"/>
  </svg>
  
  `;
}
