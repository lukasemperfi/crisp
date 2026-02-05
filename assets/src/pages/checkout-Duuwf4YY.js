import{c as C,F as h,J as M,h as A,f as w,O as T,j,k as V,l as $,i as D,a as N}from"../../footer-BQVaf_UP.js";import{l as B}from"../../lazy-loading-Cecxv2lM.js";import{i as H}from"../../breadcrumbs-BpSfuU0S.js";import{D as E}from"../../dropdown-Cjm1SIqw.js";import{c as I,r as P}from"../../index-B-aVQfpU.js";import{a as U}from"../../accordion-FqG3kPc4.js";function z(s){return C(s,{tag:"form",render(e,o,m,{runOnce:_}){const{onSubmit:l,fieldsConfig:r={},texts:d={title:"login your account",submitBtn:"sign in",regBtn:"Create an Account"}}=o;if(_){e.className="checkout-login-form",e.innerHTML=`
          <div class="checkout-login-form__section">
            <div class="checkout-login-form__fields-container" data-group="auth"></div>
          </div>

          <p>You already have an account with us. Sign in or continue as guest.</p>

          <div class="checkout-login-form__actions">
            <button type="submit" class="button button_solid button_black checkout-login-form__btn-login">
              Login
            </button>
            <a href="#" name="forgot password" class="checkout-login-form__forgot-password">Forgot Your Password?</a>
          </div>
        `;const t={email:h({label:r.email?.label||'Email Address <span class="highlight-required">*</span>',inputProps:{name:"email",type:"email",id:"reg-email",placeholder:"example@mail.com",...r.email?.inputProps}}),password:h({label:r.password?.label||'Password <span class="highlight-required">*</span>',inputProps:{name:"password",type:"password",id:"reg-pass",placeholder:"********",...r.password?.inputProps}})};e.querySelector('[data-group="auth"]').append(t.email,t.password);const i=new M(e,{errorLabelStyle:void 0,errorsContainer:".form-field__message-text",validateBeforeSubmitting:!0}),c=(a,v,g)=>{i.addField(v,g,{errorsContainer:a.querySelector(".form-field__message-text")})};c(t.email,"#reg-email",r.email?.rules||[{rule:"required",errorMessage:"Email is required"},{rule:"email",errorMessage:"Email is invalid"}]),c(t.password,"#reg-pass",r.password?.rules||[{rule:"required",errorMessage:"Password is required"},{rule:"minLength",value:8}]),i.onValidate(({fields:a})=>{Object.values(a).forEach(v=>{const g=v.elem?.closest(".form-field"),S=v.isValid;g&&(S?g.classList.remove("form-field_message-default"):g.classList.add("form-field_message-default"))})}),i.onSuccess(()=>{const a=Object.fromEntries(new FormData(e));l?.(a)}),e._els={validator:i}}}})}function J(s){return C(s,{tag:"form",render(e,o,m,{runOnce:_}){const{onSubmit:l,userProfileData:r={}}=o,{first_name:d="",last_name:t="",company:i="",phone_number:c="",fax:a="",street_address:v="",country:g="",state:S="",postal_code:R=""}=r;if(_){let k=function(p,f){const u=document.createElement("div");return u.className="form-field",u.innerHTML=`
            <label class="form-field__label">${p}</label>
            <div class="form-field__control">       
            <div class="form-field__message">
              <span class="form-field__message-text"></span>
              <span class="form-field__message-icon">X</span>
            </div>
          </div>
          `,u.querySelector(".form-field__control").prepend(f),u};e.className="address-form",e.innerHTML=`
          <div class="address-form__section address-form__section_personal">
            <div class="address-form__fields-container" data-group="personal"></div>
          </div>

            <div class="shipping-methods">
              <h3 class="shipping-methods__title">Shipping Methods</h3>
              <div class="shipping-methods__grid">
                <div class="shipping-methods__item">
                  <div class="radio">
                    <input type="radio" id="shipping-flat" value="fixed" name="shipping" checked  data-type="fixed" data-label="Flat Rate - Fixed" data-price="5"/>
                    <label for="shipping-flat" class="radio__label">5.00 EUR</label>
                  </div>
                  
                  <div class="shipping-methods__type">Fixed</div> 
                  <div class="shipping-methods__name">Flat Rate</div>
                </div>

                <div class="shipping-methods__item">
                  <div class="radio">
                    <input type="radio" id="shipping-best" value="table_rate" name="shipping" data-type="table" data-label="Table Rate - Best Way" data-price="10"/>
                    <label for="shipping-best" class="radio__label">10.00 EUR</label>
                  </div>  
                  
                  <div class="shipping-methods__type">Table Rate</div>
                  <div class="shipping-methods__name">Best Way</div>
                </div>              
              </div>

            </div>

          <div class="address-form__actions">
            <button type="submit" class="address-form__btn-submit button button_solid button_black">
              Next
            </button>
            <button type="button" class="address-form__btn-back button">
              Back
          </button>
          </div>
        `;let L=g;const x=E({name:"country",placeholder:"Please select your country",options:I,defaultValue:g}),F=P[g]||[],q=E({name:"state",placeholder:"Please select a state",options:F,disabled:F.length===0,defaultValue:S});x.addEventListener("onChange",p=>{L=p.detail;const f=P[L]||[];q.update({options:f,disabled:f.length===0,defaultValue:""}),y.removeField('select[name="state"]'),b(n.state_field,'select[name="state"]',[{rule:"required",errorMessage:"State/Region is required"}]),y.revalidate()}),q.addEventListener("onChange",p=>{p.detail});const n={first_name:h({label:'First name <span class="highlight-required">*</span>',inputProps:{name:"first_name",id:"reg-fn",value:d}}),last_name:h({label:'Last Name <span class="highlight-required">*</span>',inputProps:{name:"last_name",id:"reg-ln",value:t}}),company:h({label:"Company",inputProps:{name:"company",id:"reg-company",value:i}}),phone_number:h({label:'Phone Number <span class="highlight-required">*</span>',inputProps:{name:"phone_number",id:"reg-pn",value:c}}),fax:h({label:"Fax",inputProps:{name:"fax",id:"reg-f",value:a}}),street_address:h({label:'Street Address <span class="highlight-required">*</span>',inputProps:{name:"street_address",id:"reg-sa",value:v}}),state_field:k('State/Region <span class="highlight-required">*</span>',q),country_field:k('Country <span class="highlight-required">*</span>',x),postal_code:h({label:'Zip/Postal Code <span class="highlight-required">*</span>',inputProps:{name:"postal_code",id:"reg-pc",value:R}})};e.querySelector('[data-group="personal"]').append(n.first_name,n.last_name,n.company,n.street_address,n.country_field,n.state_field,n.postal_code);const y=new M(e,{errorLabelStyle:void 0,errorsContainer:".form-field__message-text",validateBeforeSubmitting:!0}),b=(p,f,u)=>{y.addField(f,u,{errorsContainer:p.querySelector(".form-field__message-text")})};b(n.first_name,"#reg-fn",[{rule:"required",errorMessage:"First name is required"}]),b(n.last_name,"#reg-ln",[{rule:"required",errorMessage:"Last name is required"}]),b(n.street_address,"#reg-sa",[{rule:"required",errorMessage:"Street address is required"}]),b(n.country_field,'select[name="country"]',[{rule:"required",errorMessage:"Country is required"}]),b(n.state_field,'select[name="state"]',[{rule:"required",errorMessage:"State/Region is required"}]),b(n.postal_code,"#reg-pc",[{rule:"required",errorMessage:"Zip/Postal Code is required"},{rule:"minLength",value:5,errorMessage:"Postal code must be at least 5 characters"},{rule:"customRegexp",value:/^[0-9]+$/,errorMessage:"Postal code must contain only numbers"}]),y.onValidate(({fields:p})=>{Object.values(p).forEach(f=>{const u=f.elem?.closest(".form-field"),O=f.isValid;u&&(O?u.classList.remove("form-field_message-default"):u.classList.add("form-field_message-default"))})}),y.onSuccess(()=>{const p=Object.fromEntries(new FormData(e));l?.(p)}),e._els={validator:y}}}})}function W(s){return C(s,{tag:"div",render(e,o,m,{runOnce:_}){const{items:l=[],cartCount:r=0,shippingCost:d=0,shippingLabel:t="",subtotal:i=0,total:c=0}=o;if(_){e.className="order-summary",e.innerHTML=`
          <div class="order-summary__section">
            <h3 class="order-summary__title">Order Summary</h3>
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Cart Subtotal</span>
                <span class="js-subtotal-value">${i} EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Shipping</span>
                <span class="js-tax-value">${d} EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span class="js-shipping-label">${t}</span>
              </div>
              <hr class="order-summary__divider" />
              <div class="order-summary__row order-summary__row_total">
                <span>Order Total</span>
                <span class="js-total-value">${c} EUR</span>
              </div>
            </div>
            <div class="order-summary__cart-items"></div>   
          </div>

        `,e._els={accordion:U({items:[{title:`${r} Item${r>1?"s":""} in Cart`,content:"",isActive:!0}],isSingleOpen:!0}),itemsList:e.querySelector(".order-summary__cart-items"),total:e.querySelector(".js-total-value"),subtotal:e.querySelector(".js-subtotal-value"),shippingCost:e.querySelector(".js-tax-value"),shippingLabel:e.querySelector(".js-shipping-label")};const a=e.querySelector(".order-summary__cart-items"),v=e._els.accordion.querySelector(".accordion__icon");v.innerHTML=A(),a.append(e._els.accordion)}e._els.accordion.update({items:[{title:`${r} Item${r>1?"s":""} in Cart`,content:Y(l),isActive:!0}],isSingleOpen:!0}),e._els.total.textContent=`${w(c)} EUR`,e._els.subtotal.textContent=`${w(i)} EUR`,e._els.shippingCost.textContent=`${w(d)} EUR`,e._els.shippingLabel.textContent=t}})}function Y(s){if(!s||!Array.isArray(s))return;const e=document.createElement("div");return e.className="items-list",s.forEach(o=>{const m=Z(o);e.appendChild(m)}),e}function Z(s){const e=document.createElement("div");e.className="checkout-card";const o=T({product:s});return e.append(o),e}const X=async()=>{let s={items:[],cartCount:0,shippingCost:5,shippingLabel:"Flat Rate - Fixed",subtotal:0,total:0};H(".checkout-section__breadcrumbs");const e=document.querySelector(".checkout-section__header"),o=K({step:1});e.append(o),document.querySelector(".checkout-section__col-1").append(G());const _=document.querySelector(".checkout-section__col-2"),l=W(s);_.append(l),document.querySelectorAll('input[name="shipping"]').forEach(t=>{t.addEventListener("change",i=>{const c=i.target.dataset.label,a=parseFloat(i.target.dataset.price);s={...s,shippingCost:a,shippingLabel:c},l.update({shippingCost:a,shippingLabel:c,total:d(a,s.subtotal)})})}),j.subscribe("cart",async t=>{const i=t.viewItems,c=V(t),a=$(t);s={...s,subtotal:a,total:d(s.shippingCost,a)},l.update({items:i,cartCount:c,subtotal:a,total:d(s.shippingCost,a)})});function d(t,i){return i+t}};function G(){const s=document.createElement("div");s.className="shipping-info",s.innerHTML=`
      <h2 class="shipping-info__title">Shipping Address</h2>
  `;const e=z({onSubmit:m=>console.log("Login Attempt:",m)}),o=J({onSubmit:m=>console.log("Login Attempt:",m)});return s.append(e,o),s}function K(s){return C(s,{tag:"div",render(e,o,m,{runOnce:_}){const{step:l=1}=o;_&&(e.className="steps",e.innerHTML=`
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

        `,e._els={item1:e.querySelector(".steps__item_1"),item2:e.querySelector(".steps__item_2"),content1:e.querySelector(".steps__item_1 .steps__content"),content2:e.querySelector(".steps__item_2 .steps__content")});const{item1:r,item2:d,content1:t}=e._els;r.classList.remove("steps__item_active"),d.classList.remove("steps__item_active"),l===1&&r.classList.add("steps__item_active"),l===2&&d.classList.add("steps__item_active"),l===2?t.innerHTML=Q():t.textContent="1"}})}function Q(){return`
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2.12132" y1="5.50427" x2="5" y2="8.38295" stroke="black" stroke-width="3" stroke-linecap="square"/>
    <line x1="1.5" y1="-1.5" x2="11.4985" y2="-1.5" transform="matrix(-0.707106 0.707107 -0.707106 -0.707107 12.877 0)" stroke="black" stroke-width="3" stroke-linecap="square"/>
  </svg>
  
  `}document.addEventListener("DOMContentLoaded",async()=>{D(),X(),N(),B(".lazy",{rootMargin:"200px 0px"})});
