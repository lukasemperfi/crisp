import{c as f,q as R,F as C,s as T,k as L,i as q,a as k}from"../../footer-0H0OF5BI.js";import{l as U}from"../../lazy-loading-Cecxv2lM.js";import{i as F}from"../../breadcrumbs-BpSfuU0S.js";import{a as w}from"../../accordion-Dt97W58j.js";import{D as y}from"../../dropdown-CmYiLtU-.js";import{c as A,r as M,s as g}from"../../index-B-aVQfpU.js";function O(o){return f(o,{tag:"div",render(t,d,l,{runOnce:n}){const{items:i=[],userId:r}=d;n&&(t.className="cart-table",t.innerHTML=`
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
                <button class="button button_elevated button_gray">continue shopping</button>
                <button class="button button_elevated button_gray">clear shopping cart</button>
          </footer>
          `,t._els={list:t.querySelector(".cart-table__list")}),P(t._els.list,i,r)}})}function P(o,t,d){o.innerHTML="",!(!t||!Array.isArray(t))&&t.forEach(l=>{const n=R({product:l,userId:d});o.appendChild(n)})}function j(o){return f(o,{tag:"div",render(t,d,l,{runOnce:n}){if(n){t.className="order-summary",t.innerHTML=`
          <div class="order-summary__section order-summary__section_top">
            <div class="order-summary__block order-summary__block_discount">
              <h3 class="order-summary__title">Apply Discount Code</h3>
              <div class="order-summary__discount">
                ${C({inputProps:{placeholder:"Enter discount code"},withButton:!0,buttonText:'<span class="order-summary__discount-button mobile">Apply</span><span class="order-summary__discount-button desktop">Apply Discount</span>'}).toHTML()}
              </div>
            </div>
            <div class="order-summary__block order-summary__block_shipping-estimate"></div>
          </div>

          <div class="order-summary__section order-summary__section_bottom">
            <div class="order-summary__totals">
              <div class="order-summary__row order-summary__subtitle">
                <span>Subtotal</span>
                <span>120.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__subtitle order-summary__row_muted">
                <span>Tax</span>
                <span class="js-tax-value">0.00 EUR</span>
              </div>
              <div class="order-summary__row order-summary__row--total order-summary__title">
                <span>Order Total</span>
                <span class="js-total-value">120.00 EUR</span>
              </div>
            </div>
            <div class="order-summary__divider"></div>
            <div class="order-summary__actions">
                <button class="button order-summary__link js-summary-btn order-summary__link_muted ">Check Out with Multiple Addresses</button>
                <button class="order-summary__cta button button_solid button_black js-summary-btn">Proceed to checkout</button>          
            </div>
          </div>
        `;let i="",r="";const p=120,x=t.querySelector(".order-summary__block_shipping-estimate"),E=w({items:[{title:"Estimate Shipping and Tax",content:D(),isActive:!0}],isSingleOpen:!0});x.append(E);const b=y({name:"country",placeholder:"Select country",options:A}),u=y({name:"state",placeholder:"Select state",options:[],disabled:!0});t.querySelector(".shipping-estimate__control_country").append(b),t.querySelector(".shipping-estimate__control_state").append(u);const S=()=>{const e=t.querySelectorAll(".js-summary-btn"),s=i!==""&&r!=="";e.forEach(a=>{a.disabled=!s,a.classList.toggle("button_disabled",!s)})},_=e=>{const s=t.querySelector(".js-tax-value"),a=t.querySelector(".js-total-value");if(!e){s.textContent="0.00 EUR",a.textContent=`${p.toFixed(2)} EUR`;return}const h=t.querySelector('input[name="shipping"]:checked')?.id==="shipping-flat"?e.flatRate:e.bestWay;s.textContent=`${h.toFixed(2)} EUR`,a.textContent=`${(p+h).toFixed(2)} EUR`},v=e=>{const s=t.querySelector('label[for="shipping-flat"]'),a=t.querySelector('label[for="shipping-best"]');e?(s.textContent=`Fixed ${e.flatRate.toFixed(2)} EUR`,a.textContent=`Table Rate ${e.bestWay.toFixed(2)} EUR`):(s.textContent="Fixed 0.00 EUR",a.textContent="Table Rate 0.00 EUR")},m=(e=!1)=>{const s=t.querySelectorAll('input[name="shipping"]'),a=g[i]?.[r];i&&r&&a?(s.forEach(c=>c.disabled=!1),e&&(s[0].checked=!0),v(a),_(a)):(s.forEach(c=>{c.disabled=!0,c.checked=!1}),v(null),_(null)),S()};b.addEventListener("onChange",e=>{i=e.detail,r="";const s=M[i]||[];u.update({options:s,disabled:s.length===0,defaultValue:""}),m()}),u.addEventListener("onChange",e=>{r=e.detail,m(!0)}),t.addEventListener("change",e=>{if(e.target.name==="shipping"){const s=g[i]?.[r];_(s)}}),m()}}})}function D(){return`
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
            ${C().toHTML()}
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
  `}const I=async()=>{F(".cart-section__breadcrumbs");const o=document.querySelector(".cart-section__col-1"),t=document.querySelector(".cart-section__col-2"),l=(await T.auth.getUser())?.data?.user?.id||null,n=O({items:[],userId:l}),i=j();o.append(n),t.append(i),L.subscribe("cart",async r=>{const p=r.viewItems;n.update({items:p})})};document.addEventListener("DOMContentLoaded",async()=>{q(),I(),k(),U(".lazy",{rootMargin:"200px 0px"})});
