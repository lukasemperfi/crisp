import{c as o,o as t,i,a as r}from"../../../footer-BQVaf_UP.js";import{i as n}from"../../../breadcrumbs-BpSfuU0S.js";import{i as c}from"../../../profile-section-BjNgi_JN.js";import"../../../dropdown-Cjm1SIqw.js";function e(a){return o(a,{tag:"div",render(d,b,h,{runOnce:s}){s&&(d.className="dashboard-info",d.innerHTML=`
            <div class="dashboard-info__section">
                <div class="dashboard-info__header">
                    <h2 class="profile-section__section-title">Account Information</h2>
                </div> 

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
                <div class="dashboard-info__header">
                    <h2 class="profile-section__section-title">Address Book</h2>
                    <button class="dashboard-info__button dashboard-info__button_icon">${t()}</button>
                </div>            
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
        `)}})}document.addEventListener("DOMContentLoaded",async()=>{i(),n(".dashboard-page__breadcrumbs"),c(),_(),r()});function _(){document.querySelector(".profile-section__content").replaceChildren(e())}
