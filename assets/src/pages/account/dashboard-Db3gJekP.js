import{c,n as _,i as b,s as l,a as h}from"../../../footer-D3eUB4_-.js";import{i as u}from"../../../breadcrumbs-DHae3DKD.js";import{i as f}from"../../../profile-section-BsnviRcq.js";import{u as v}from"../../../profile-oa3xae70.js";import"../../../dropdown-BAe8JTCa.js";function p(a){return c(a,{tag:"div",render(d,s,g,{runOnce:t}){const{userInfo:o={}}=s,{first_name:r,last_name:i,is_subscribed_for_newsletter:n}=o,e=`${r} ${i}`;t&&(d.className="dashboard-info",d.innerHTML=`
            <div class="dashboard-info__section">
                <div class="dashboard-info__header">
                    <h2 class="profile-section__section-title">Account Information</h2>
                </div> 

                <div class="dashboard-info__grid">
                    <div class="dashboard-info__card dashboard-card">
                        <h3 class="dashboard-card__title">Contact Information</h3>
                        <div class="dashboard-card__content">
                            <p class="dashboard-card__text">${e}</p>
                            <p class="dashboard-card__text">${o.email}</p>
                        </div>
                        <div class="dashboard-card__actions">
                            <button class="dashboard-info__button">Edit</button>
                            <button class="dashboard-info__button dashboard-info__button_secondary">Change Password</button>
                        </div>
                    </div>

                    <div class="dashboard-info__card dashboard-card">
                        <h3 class="dashboard-card__title">Newsletters</h3>
                        <div class="dashboard-card__content">
                            <p class="dashboard-card__text">${n?"You are subscribed to our newsletter ✅":"You don't subscribe to our newsletter."}</p>
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
                    <button class="dashboard-info__button dashboard-info__button_icon">${_()}</button>
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
        `)}})}document.addEventListener("DOMContentLoaded",async()=>{b(),u(".dashboard-page__breadcrumbs"),f();const a=await v.getProfile(),{data:{user:d},error:s}=await l.auth.getUser();m({...a,...d}),h()});function m(a){document.querySelector(".profile-section__content").replaceChildren(p({userInfo:a}))}
