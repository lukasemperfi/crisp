import{c as y,b as g,g as C,q as x,F as f,s as S,k as E,m as T,i as R,a as k}from"../../footer-D3eUB4_-.js";import{l as q}from"../../lazy-loading-Cecxv2lM.js";import{i as L}from"../../breadcrumbs-DHae3DKD.js";import{a as w}from"../../accordion-BbwxX87a.js";import{D as b}from"../../dropdown-BAe8JTCa.js";import{c as F,s as v,r as U}from"../../index-B-aVQfpU.js";function A(r){return y(r,{tag:"div",render(t,c,d,{runOnce:i}){const{items:n=[],userId:o}=c;i&&(t.className="cart-table",t.innerHTML=`
          <header class="cart-table__header cart-table-header">
             <div class="cart-table-header__title">Product</div> 
             <div class="cart-table-header__title">Price</div> 
             <div class="cart-table-header__title">Size</div> 
             <div class="cart-table-header__title">Quantity</div> 
             <div class="cart-table-header__title">Total</div> 
             <div class="cart-table-header__title"></div>   
          </header>
          <div class="cart-table__list"></div> 
          <footer class="cart-table__footer">
                <button class="button button_elevated button_gray continue-shopping-btn">continue shopping</button>
                <button class="button button_elevated button_gray clear-cart-btn">clear shopping cart</button>
          </footer>
          `,t._els={list:t.querySelector(".cart-table__list"),continueShoppingBtn:t.querySelector(".continue-shopping-btn"),clearCartBtn:t.querySelector(".clear-cart-btn")},t._els.continueShoppingBtn.addEventListener("click",()=>{window.location.href=`${g}catalog/`}),t._els.clearCartBtn.addEventListener("click",()=>{C.clearCart(),h(t._els.list,[],o)})),h(t._els.list,n,o)}})}function h(r,t,c){if(r.innerHTML="",!t||!Array.isArray(t)||t.length===0){r.innerHTML='<div class="cart-table__empty-message">Cart is empty</div>';return}t.forEach(d=>{const i=x({product:d,userId:c});r.appendChild(i)})}function B(r){return y(r,{tag:"div",render(t,c,d,{runOnce:i}){const{subtotal:n=0}=c;if(i){t.className="order-summary",t.innerHTML=`
          <div class="order-summary__section order-summary__section_top">
            <div class="order-summary__block order-summary__block_discount">
              <h3 class="order-summary__title">Apply Discount Code</h3>
              <div class="order-summary__discount">
                ${f({inputProps:{placeholder:"Enter discount code"},withButton:!0,buttonText:'<span class="order-summary__discount-button mobile">Apply</span><span class="order-summary__discount-button desktop">Apply Discount</span>'}).toHTML()}
              </div>
            </div>
            <div class="order-summary__block order-summary__block_shipping-estimate"></div>
          </div>

          <div class="order-summary__section order-summary__section_bottom">
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle">
                <span>Subtotal</span>
                <span class="js-subtotal-value">0.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Tax</span>
                <span class="js-tax-value">0.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__row--total order-summary__title">
                <span>Order Total</span>
                <span class="js-total-value">0.00 EUR</span>
              </div>
            </div>
            <div class="order-summary__divider"></div>
            <div class="order-summary__actions">
                <button class="button order-summary__link js-summary-btn order-summary__link_muted ">Check Out with Multiple Addresses</button>
                <button class="order-summary__cta button button_solid button_black js-summary-btn">Proceed to checkout</button>          
            </div>
          </div>
        `,t._state={currentCountry:"",currentRegion:""},t._els={subtotal:t.querySelector(".js-subtotal-value"),tax:t.querySelector(".js-tax-value"),total:t.querySelector(".js-total-value"),chekoutBtn:t.querySelector(".order-summary__cta")},t._els.chekoutBtn.addEventListener("click",()=>{window.location.href=`${g}checkout/`});const o=t.querySelector(".order-summary__block_shipping-estimate"),_=w({items:[{title:"Estimate Shipping and Tax",content:M(),isActive:!0}],isSingleOpen:!0});o.append(_);const l=b({name:"country",placeholder:"Select country",options:F}),p=b({name:"state",placeholder:"Select state",options:[],disabled:!0});t.querySelector(".shipping-estimate__control_country").append(l),t.querySelector(".shipping-estimate__control_state").append(p),t._validateForm=()=>{const e=t.querySelectorAll(".js-summary-btn"),a=t._state.currentCountry!==""&&t._state.currentRegion!=="";e.forEach(s=>{s.disabled=!a,s.classList.toggle("button_disabled",!a)})},t._calculateTotals=e=>{if(!e){t._els.tax.textContent="0.00 EUR",t._els.total.textContent=`${t._currentSubtotal.toFixed(2)} EUR`;return}const s=t.querySelector('input[name="shipping"]:checked')?.id==="shipping-flat"?e.flatRate:e.bestWay;t._els.tax.textContent=`${s.toFixed(2)} EUR`,t._els.total.textContent=`${(t._currentSubtotal+s).toFixed(2)} EUR`};const m=e=>{const a=t.querySelector('label[for="shipping-flat"]'),s=t.querySelector('label[for="shipping-best"]');e?(a.textContent=`Fixed ${e.flatRate.toFixed(2)} EUR`,s.textContent=`Table Rate ${e.bestWay.toFixed(2)} EUR`):(a.textContent="Fixed 0.00 EUR",s.textContent="Table Rate 0.00 EUR")};t._updateTaxes=(e=!1)=>{const a=t.querySelectorAll('input[name="shipping"]'),s=v[t._state.currentCountry]?.[t._state.currentRegion];t._state.currentCountry&&t._state.currentRegion&&s?(a.forEach(u=>u.disabled=!1),e&&(a[0].checked=!0),m(s),t._calculateTotals(s)):(a.forEach(u=>{u.disabled=!0,u.checked=!1}),m(null),t._calculateTotals(null)),t._validateForm()},l.addEventListener("onChange",e=>{t._state.currentCountry=e.detail,t._state.currentRegion="";const a=U[t._state.currentCountry]||[];p.update({options:a,disabled:a.length===0,defaultValue:""}),t._updateTaxes()}),p.addEventListener("onChange",e=>{t._state.currentRegion=e.detail,t._updateTaxes(!0)}),t.addEventListener("change",e=>{if(e.target.name==="shipping"){const a=v[t._state.currentCountry]?.[t._state.currentRegion];t._calculateTotals(a)}})}t._currentSubtotal=n,t._els.subtotal.textContent=`${n.toFixed(2)} EUR`,t._updateTaxes()}})}function M(){return`
    <div class="shipping-estimate">
      <div class="shipping-estimate__fields">
        <div class="shipping-estimate__field">
          <div class="shipping-estimate__label">Country <span class="highlight-required">*</span></div>
          <div class="shipping-estimate__control_country"></div>
        </div>
        <div class="shipping-estimate__field">
          <div class="shipping-estimate__label">State/Province <span class="highlight-required">*</span></div>
          <div class="shipping-estimate__control_state"></div>
        </div>
        <div class="shipping-estimate__field">
          <div class="shipping-estimate__label">Zip/Postal Code</div>
          <div class="shipping-estimate__control_zip">
            ${f().toHTML()}
          </div>
        </div>
      </div>

      <div class="shipping-methods">
        <div class="shipping-methods__item shipping-methods__item_flat-rate">
          <div class="order-summary__subtitle shipping-methods__title">Flat Rate</div>
          <div class="radio">
            <input type="radio" id="shipping-flat" name="shipping" disabled />
            <label for="shipping-flat" class="radio__label">Fixed 0.00 EUR</label>
          </div>
        </div>
        <div class="shipping-methods__item">
          <div class="order-summary__subtitle shipping-methods__title">Best Way</div>
          <div class="radio">
            <input type="radio" id="shipping-best" name="shipping" disabled />
            <label for="shipping-best" class="radio__label">Table Rate 0.00 EUR</label>
          </div>
        </div>
      </div>
    </div>
  `}const $=async()=>{L(".cart-section__breadcrumbs");const r=document.querySelector(".cart-section__col-1"),t=document.querySelector(".cart-section__col-2"),d=(await S.auth.getUser())?.data?.user?.id||null,i=A({items:[],userId:d}),n=B();r.append(i),t.append(n),E.subscribe("cart",async o=>{const _=o.viewItems,l=T(o);i.update({items:_}),n.update({subtotal:l})})};document.addEventListener("DOMContentLoaded",async()=>{R(),$(),k(),q(".lazy",{rootMargin:"200px 0px"})});
