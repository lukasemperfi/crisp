import{c as L,F as w,J as O,j as B,f as P,O as j,k as E,l as H,m as V,n as I,C as U,e as z,b as $,o as J,i as W,a as Y}from"../../footer-D3eUB4_-.js";import{l as Z}from"../../lazy-loading-Cecxv2lM.js";import{i as X}from"../../breadcrumbs-BpSfuU0S.js";import{D}from"../../dropdown-BAe8JTCa.js";import{c as N,r as F}from"../../index-B-aVQfpU.js";import{a as G}from"../../accordion-BbwxX87a.js";function K(t){return L(t,{tag:"form",render(e,n,g,{runOnce:y}){const{onSubmit:s,fieldsConfig:a={},texts:l={title:"login your account",submitBtn:"sign in",regBtn:"Create an Account"}}=n;if(y){e.className="checkout-login-form",e.innerHTML=`
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
        `;const c={email:w({label:a.email?.label||'Email Address <span class="highlight-required">*</span>',inputProps:{name:"email",type:"email",id:"reg-email",placeholder:"example@mail.com",...a.email?.inputProps}}),password:w({label:a.password?.label||'Password <span class="highlight-required">*</span>',inputProps:{name:"password",type:"password",id:"reg-pass",placeholder:"********",...a.password?.inputProps}})};e.querySelector('[data-group="auth"]').append(c.email,c.password);const p=new O(e,{errorLabelStyle:void 0,errorsContainer:".form-field__message-text",validateBeforeSubmitting:!0}),f=(d,m,_)=>{p.addField(m,_,{errorsContainer:d.querySelector(".form-field__message-text")})};f(c.email,"#reg-email",a.email?.rules||[{rule:"required",errorMessage:"Email is required"},{rule:"email",errorMessage:"Email is invalid"}]),f(c.password,"#reg-pass",a.password?.rules||[{rule:"required",errorMessage:"Password is required"},{rule:"minLength",value:8}]),p.onValidate(({fields:d})=>{Object.values(d).forEach(m=>{const _=m.elem?.closest(".form-field"),h=m.isValid;_&&(h?_.classList.remove("form-field_message-default"):_.classList.add("form-field_message-default"))})}),p.onSuccess(()=>{const d=Object.fromEntries(new FormData(e));s?.(d)}),e._els={validator:p}}}})}function Q(t){return L(t,{tag:"form",render(e,n,g,{runOnce:y}){const{onSubmit:s,userProfileData:a={}}=n,{first_name:l="",last_name:c="",company:p="",phone_number:f="",fax:d="",street_address:m="",country:_="",state:h="",postal_code:x=""}=a;if(y){let v=function(u,S){const q=document.createElement("div");return q.className="form-field",q.innerHTML=`
            <label class="form-field__label">${u}</label>
            <div class="form-field__control">       
            <div class="form-field__message">
              <span class="form-field__message-text"></span>
              <span class="form-field__message-icon">X</span>
            </div>
          </div>
          `,q.querySelector(".form-field__control").prepend(S),q};e.className="address-form",e.innerHTML=`
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
        `;let C=_;const M=D({name:"country",placeholder:"Please select your country",options:N,defaultValue:_}),k=F[_]||[],r=D({name:"state",placeholder:"Please select a state",options:k,disabled:k.length===0,defaultValue:h});M.addEventListener("onChange",u=>{C=u.detail;const S=F[C]||[];r.update({options:S,disabled:S.length===0,defaultValue:""}),b.removeField('select[name="state"]'),i(o.state_field,'select[name="state"]',[{rule:"required",errorMessage:"State/Region is required"}]),b.revalidate()}),r.addEventListener("onChange",u=>{u.detail});const o={first_name:w({label:'First name <span class="highlight-required">*</span>',inputProps:{name:"first_name",id:"reg-fn",value:l}}),last_name:w({label:'Last Name <span class="highlight-required">*</span>',inputProps:{name:"last_name",id:"reg-ln",value:c}}),company:w({label:"Company",inputProps:{name:"company",id:"reg-company",value:p}}),phone_number:w({label:'Phone Number <span class="highlight-required">*</span>',inputProps:{name:"phone_number",id:"reg-pn",value:f}}),fax:w({label:"Fax",inputProps:{name:"fax",id:"reg-f",value:d}}),street_address:w({label:'Street Address <span class="highlight-required">*</span>',inputProps:{name:"street_address",id:"reg-sa",value:m}}),state_field:v('State/Region <span class="highlight-required">*</span>',r),country_field:v('Country <span class="highlight-required">*</span>',M),postal_code:w({label:'Zip/Postal Code <span class="highlight-required">*</span>',inputProps:{name:"postal_code",id:"reg-pc",value:x}})};e.querySelector('[data-group="personal"]').append(o.first_name,o.last_name,o.company,o.street_address,o.country_field,o.state_field,o.postal_code);const b=new O(e,{errorLabelStyle:void 0,errorsContainer:".form-field__message-text",validateBeforeSubmitting:!0}),i=(u,S,q)=>{b.addField(S,q,{errorsContainer:u.querySelector(".form-field__message-text")})};i(o.first_name,"#reg-fn",[{rule:"required",errorMessage:"First name is required"}]),i(o.last_name,"#reg-ln",[{rule:"required",errorMessage:"Last name is required"}]),i(o.street_address,"#reg-sa",[{rule:"required",errorMessage:"Street address is required"}]),i(o.country_field,'select[name="country"]',[{rule:"required",errorMessage:"Country is required"}]),i(o.state_field,'select[name="state"]',[{rule:"required",errorMessage:"State/Region is required"}]),i(o.postal_code,"#reg-pc",[{rule:"required",errorMessage:"Zip/Postal Code is required"},{rule:"minLength",value:5,errorMessage:"Postal code must be at least 5 characters"},{rule:"customRegexp",value:/^[0-9]+$/,errorMessage:"Postal code must contain only numbers"}]),b.onValidate(({fields:u})=>{Object.values(u).forEach(S=>{const q=S.elem?.closest(".form-field"),R=S.isValid;q&&(R?q.classList.remove("form-field_message-default"):q.classList.add("form-field_message-default"))})}),b.onSuccess(()=>{const u=Object.fromEntries(new FormData(e));s?.(u)}),e._els={validator:b}}}})}function ee(t){return L(t,{tag:"div",render(e,n,g,{runOnce:y}){const{items:s=[],cartCount:a=0,shippingCost:l=0,shippingLabel:c="",subtotal:p=0,total:f=0}=n;if(y){e.className="order-summary",e.innerHTML=`
          <div class="order-summary__section">
            <h3 class="order-summary__title">Order Summary</h3>
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Cart Subtotal</span>
                <span class="js-subtotal-value">${p} EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Shipping</span>
                <span class="js-tax-value">${l} EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span class="js-shipping-label">${c}</span>
              </div>
              <hr class="order-summary__divider" />
              <div class="order-summary__row order-summary__row_total">
                <span>Order Total</span>
                <span class="js-total-value">${f} EUR</span>
              </div>
            </div>
            <div class="order-summary__cart-items"></div>   
          </div>

        `,e._els={accordion:G({items:[{title:`${a} Item${a>1?"s":""} in Cart`,content:"",isActive:!0}],isSingleOpen:!0}),itemsList:e.querySelector(".order-summary__cart-items"),total:e.querySelector(".js-total-value"),subtotal:e.querySelector(".js-subtotal-value"),shippingCost:e.querySelector(".js-tax-value"),shippingLabel:e.querySelector(".js-shipping-label")};const d=e.querySelector(".order-summary__cart-items"),m=e._els.accordion.querySelector(".accordion__icon");m.innerHTML=B(),d.append(e._els.accordion)}e._els.accordion.update({items:[{title:`${a} Item${a>1?"s":""} in Cart`,content:te(s),isActive:!0}],isSingleOpen:!0}),e._els.total.textContent=`${P(f)} EUR`,e._els.subtotal.textContent=`${P(p)} EUR`,e._els.shippingCost.textContent=`${P(l)} EUR`,e._els.shippingLabel.textContent=c}})}function te(t){if(!t||!Array.isArray(t))return;const e=document.createElement("div");return e.className="items-list",t.forEach(n=>{const g=se(n);e.appendChild(g)}),e}function se(t){const e=document.createElement("div");e.className="checkout-card";const n=j({product:t});return e.append(n),e}const ae=(t=2e3)=>new Promise(e=>setTimeout(e,t)),re=async()=>{let t={items:[],cartCount:0,shippingCost:5,shippingLabel:"Flat Rate - Fixed",subtotal:0,total:0},e={first_name:"",last_name:"",company:"",street_address:"",country:"",state:"",postal_code:"",shipping:""};X(".checkout-section__breadcrumbs");const n=document.querySelector(".checkout-section__header"),g=oe({step:1});n.append(g);const y=T({userData:e,className:"payment-method_2"}),s=T({userData:e,className:"payment-method_3",title:"Shipping Method:"});document.querySelector(".checkout-section__col-1").append(ie({addressState:e,stepsComponent:g,paymentMethod2:y,paymentMethod3:s,orderSummaryState:t}));const l=document.querySelector(".checkout-section__col-2"),c=ee(t);l.append(c,y,s),document.querySelectorAll('input[name="shipping"]').forEach(d=>{d.addEventListener("change",m=>{const _=m.target.dataset.label,h=parseFloat(m.target.dataset.price);t={...t,shippingCost:h,shippingLabel:_},c.update({shippingCost:h,shippingLabel:_,total:f(h,t.subtotal)})})}),E.subscribe("cart",async d=>{const m=d.viewItems,_=H(d),h=V(d);t={...t,subtotal:h,total:f(t.shippingCost,h)},c.update({items:m,cartCount:_,subtotal:h,total:f(t.shippingCost,h)})});function f(d,m){return m+d}};function ie({addressState:t={},stepsComponent:e,paymentMethod2:n,paymentMethod3:g,orderSummaryState:y}){const s=document.createElement("div");s.className="shipping-info",s.innerHTML='<h2 class="shipping-info__title">Shipping Address</h2>';const a=z({successText:"Вход выполнен успешно!"}),l=T({userData:t,title:"Shipping Address"}),c=de(),p=K({onSubmit:async r=>{try{a.show(),await J(r.email,r.password),a.success()}catch(v){console.error("Ошибка входа:",v)}finally{a.hide()}}}),f=Q({onSubmit:async r=>{const{shipping:v,...o}=r;t={...r};const b=Number(e.dataset.step);if(b===1&&(_({el:s,loginForm:p}),l.update({userData:o}),n.update({userData:o}),g.update({userData:{shipping:y.shippingLabel}}),m()),b===2)try{a.show(),await ae(),a.success("Order placed successfully!"),location.href=`${$}`}catch(i){console.error("Ошибка входа:",i)}},userProfileData:t});function d(){l.style.display="none",c.style.display="none",n.style.display="none",g.style.display="none"}function m(){l.style.display="block",c.style.display="block",n.style.display="block",g.style.display="block"}function _({el:r,loginForm:v}){const o=r.querySelector(".address-form__section_personal"),b=r.querySelector(".shipping-methods"),i=document.querySelector(".shipping-info__title"),u=r.querySelector(".address-form__btn-submit");e.update({step:2}),o.style.display="none",b.style.display="none",i.style.display="none",u.textContent="Place Order",v&&(v.style.display="none")}function h({el:r,loginForm:v}){const o=r.querySelector(".address-form__section_personal"),b=r.querySelector(".shipping-methods"),i=document.querySelector(".shipping-info__title"),u=r.querySelector(".address-form__btn-submit");o.style.display="block",b.style.display="block",i.style.display="block",u.textContent="Next",v&&(v.style.display="block")}const x=s.querySelector(".shipping-info__title"),C=f.querySelector(".address-form__btn-back");l.querySelector(".payment-method__button-icon").addEventListener("click",()=>{Number(e.dataset.step)===2&&(e.update({step:1}),h({el:s,loginForm:p}),d())}),C.addEventListener("click",()=>{Number(e.dataset.step)===2&&(e.update({step:1}),h({el:s,loginForm:p}),d())}),E.subscribe("auth",async r=>{r.isAuth?s.contains(p)&&p.remove():s.contains(p)||x.after(p)}),s.append(f);const k=s.querySelector(".address-form__actions");return d(),k.before(l),f.after(c),s}function oe(t){return L(t,{tag:"div",render(e,n,g,{runOnce:y}){const{step:s=1}=n;y&&(e.className="steps",e.innerHTML=`
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
        `,e._els={item1:e.querySelector(".steps__item_1"),item2:e.querySelector(".steps__item_2"),content1:e.querySelector(".steps__item_1 .steps__content"),content2:e.querySelector(".steps__item_2 .steps__content")}),e.dataset.step=s;const{item1:a,item2:l,content1:c}=e._els;a.classList.remove("steps__item_active"),l.classList.remove("steps__item_active"),s===1&&a.classList.add("steps__item_active"),s===2&&l.classList.add("steps__item_active"),c.innerHTML=s===2?ne():"1"}})}function ne(){return`
  <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="2.12132" y1="5.50427" x2="5" y2="8.38295" stroke="black" stroke-width="3" stroke-linecap="square"/>
    <line x1="1.5" y1="-1.5" x2="11.4985" y2="-1.5" transform="matrix(-0.707106 0.707107 -0.707106 -0.707107 12.877 0)" stroke="black" stroke-width="3" stroke-linecap="square"/>
  </svg>`}function T(t){return L(t,{tag:"div",render(e,n,g,{runOnce:y}){const{isAddressSame:s=!0,userData:a={},title:l="Payment Method:",className:c=""}=n,{first_name:p="",last_name:f="",company:d="",street_address:m="",country:_="",state:h="",postal_code:x="",shipping:C=""}=a,M=new Map(N.map(i=>[i.value,i.label])),k=new Map(Object.values(F).flat().map(i=>[i.value,i.label])),r=i=>i&&i.toString().trim()?`<div class="payment-method__info-item">${i}</div>`:"";y&&(e.className="payment-method "+c,e.innerHTML=`
          <div class="payment-method__header">
            <div class="payment-method__title"></div>
            <button type="button" class="payment-method__button-icon">${I()}</button>          
          </div>
          <div class="payment-method__subtitle">Check / Money order</div>
          <div class="payment-method__grid">
              ${U({label:"My billing and shipping address are the same",inputProps:{name:"isAddressConf",id:"address_conf",checked:s}}).toHTML()}

            <div class="payment-method__info"></div>
          </div>
        `,e._els={title:e.querySelector(".payment-method__title"),checkbox:e.querySelector('input[name="isAddressConf"]'),infoContainer:e.querySelector(".payment-method__info")},e._els.checkbox.addEventListener("change",i=>{const u=i.target.checked;g("addressSyncChange",{checked:u}),e.update({isAddressSame:u})}));const{checkbox:v,infoContainer:o,title:b}=e._els;if(b&&(b.textContent=l),v&&(v.checked=s),o){const i=`${p} ${f}`.trim(),u=`${k.get(h)||h||""} ${x}`.trim(),S=M.get(_)||_;o.innerHTML=`
          ${r(i)}
          ${r(m)}
          ${r(u)}
          ${r(S)}
          ${r(C)}
        `}}})}function de(t){return L(t,{tag:"div",render(e,n,g,{runOnce:y}){const{title:s="Apply Discount Code",placeholder:a="Enter discount code"}=n;y&&(e.className="discount-code",e.innerHTML=`
          <h3 class="discount-code__title">${s}</h3>
          <div class="discount-code__form-wrapper">
            ${w({inputProps:{placeholder:a,name:"discount"},withButton:!0,buttonText:`
                <span class="discount-code__button-text discount-code__button-text_mobile">Apply</span>
                <span class="discount-code__button-text discount-code__button-text_desktop">Apply Discount</span>
              `}).toHTML()}
          </div>
        `,e._els={input:e.querySelector('input[name="discount"]'),button:e.querySelector("button")},e._els.button?.addEventListener("click",()=>{const l=e._els.input.value.trim();l&&g("apply",{code:l})}))}})}function A(t,e=0,n=!1){if(typeof t!="string"||!t.trim())throw new Error("URL must be a non-empty string");setTimeout(()=>{n?window.location.replace(t):window.location.href=t},e)}document.addEventListener("DOMContentLoaded",async()=>{if(W(),Y(),E.getState().cart.items.length===0){A(`${$}catalog/`,0,!0);return}re(),Z(".lazy",{rootMargin:"200px 0px"}),E.subscribe("cart",e=>{e.items.length===0&&A(`${$}catalog/`,0,!0)})});
