import { createComponent } from "@/shared/lib/core/core.js";

export function DashboardInfo(props) {
  return createComponent(props, {
    tag: "div",

    render(el, props, emit, { runOnce }) {
      if (runOnce) {
        el.className = "dashboard-info";

        el.innerHTML = `
            <div class="dashboard-info__section">
                <h2 class="dashboard-info__section-title">Account Information</h2>

                <div class="dashboard-info__grid">
                    <div class="dashboard-info__card dashboard-card">
                        <h3 class="dashboard-card__title">Contact Information</h3>
                        <div class="dashboard-card__content">
                            <p class="dashboard-card__text">Alex Driver</p>
                            <p class="dashboard-card__text">ExampeAdress@gmail.com</p>
                        </div>
                        <div class="dashboard-card__actions">
                            <button class="dashboard-info__button">Edit</button>
                            <button class="dashboard-info__button dashboard-info__button_secondary">Change Password</button>
                        </div>
                    </div>

                    <div class="dashboard-info__card dashboard-card">
                        <h3 class="dashboard-card__title">Newsletters</h3>
                        <div class="dashboard-card__content">
                            <p class="dashboard-card__text">You don't subscribe to our newsletter.</p>
                        </div>
                        <div class="dashboard-card__actions">
                            <button class="dashboard-info__button">Edit</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-info__section">
                <h2 class="dashboard-info__section-title">Address Book  <button class="dashboard-info__button">Edit</button></h2>

                <div class="dashboard-info__grid">
                    <div class="dashboard-info__card dashboard-card">
                        <h3 class="dashboard-card__title">Default Billing Address</h3>
                        <div class="dashboard-card__content">
                            <p class="dashboard-card__text">You have not set a default billing address.</p>
                        </div>
                        <div class="dashboard-card__actions">
                            <button class="dashboard-info__button">Edit Address</button>
                        </div>
                    </div>

                    <div class="dashboard-info__card dashboard-card">
                        <h3 class="dashboard-card__title">Default Shipping Address</h3>
                        <div class="dashboard-card__content">
                            <p class="dashboard-card__text">You have not set a default shipping address.</p>
                        </div>
                        <div class="dashboard-card__actions">
                            <button class="dashboard-info__button">Edit Address</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
      }
    },
  });
}
