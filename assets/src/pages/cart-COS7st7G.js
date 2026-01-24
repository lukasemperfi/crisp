import{c as u,C as g,g as y,i as f,a as C,l as S}from"../../footer-mnrRef1t.js";import{a as T}from"../../accordion-Bjh1x9Ki.js";import{D as b}from"../../dropdown-ChFo0K6_.js";function k(a){return u(a,{tag:"div",render(e,i,n,{runOnce:s}){const{items:t=[]}=i;s&&(e.className="cart-table",e.innerHTML=`
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
          `,e._els={list:e.querySelector(".cart-table__list")}),w(e._els.list,t)}})}function w(a,e){a.innerHTML="",!(!e||!Array.isArray(e))&&e.forEach(i=>{const n=g({product:i});a.appendChild(n)})}const x={cart:"Shopping Cart"},$=(a,e="")=>{const i=document.querySelector(a);if(!i)return;const s=window.location.pathname.split("/").filter(Boolean);let t="/crisp/";const o=t.endsWith("/")?t:t+"/";s.length>0&&s[0]===o.replace(/\//g,"")&&s.shift();const l='<span class= "breadcrumbs__separator">/</span>';let c="";const d=(r,p)=>{c+=r+"/";const v=o+c,m=x[r]||decodeURIComponent(r.replace(/-/g," "));return p?`<li class="breadcrumbs__item"> ${l} <span class="breadcrumbs__link breadcrumbs__link_current">${m}</span></li>`:`<li class="breadcrumbs__item"> ${l} <a class="breadcrumbs__link" href="${v}" name="${m}" aria-label="${m}">${m}</a></li>`},_=`
        <ul class="breadcrumbs ${e}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${t}" name="breadcrumb-link" aria-label="Home">Home</a></li>
          ${s.map((r,p)=>d(r,p===s.length-1)).join("")}
        </ul>
      `;i.innerHTML=_};function h(a){return u(a,{tag:"div",render(e,i,n,{runOnce:s}){const{messageText:t="",buttonText:o="",withButton:l=!1,inputProps:c={}}=i;if(s){e.className=["form-field",l&&"form-field_with-button"].filter(Boolean).join(" "),e.innerHTML=`
          <label class="form-field__label"></label>

          <div class="form-field__control">
            <input class="form-field__input" />
            ${l?`<button type="button" class="form-field__action">
                     ${o}
                   </button>`:""}
          </div>

          <div class="form-field__message">
            <span class="form-field__message-text"></span>
            <span class="form-field__message-icon">X</span>
          </div>
        `;const d=e.querySelector(".form-field__input");Object.entries(c).forEach(([_,r])=>{r===!1||r==null||(r===!0?d.setAttribute(_,""):d.setAttribute(_,String(r)))}),e._els={input:d,messageText:e.querySelector(".form-field__message-text")}}t!==void 0&&(e._els.messageText.textContent=t)}})}function A(a){return u(a,{tag:"div",render(e,i,n,{runOnce:s}){if(s){e.className="order-summary",e.innerHTML=`
          <div class="order-summary__section order-summary__section_top">
            <div class="order-summary__block order-summary__block_discount">
              <h3 class="order-summary__title">Apply Discount Code</h3>
              <div class="order-summary__discount">
                ${h({inputProps:{placeholder:"Enter discount code"},withButton:!0,buttonText:'<span class="order-summary__discount-button mobile">Apply</span><span class="order-summary__discount-button desktop">Apply Discount</span>',messageText:"Some error"}).toHTML()}
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
        
              <div class="order-summary__row order-summary__subtitle  order-summary__row_muted">
                <span>Tax</span>
                <span>0.00 EUR</span>
              </div>
        
              <div class="order-summary__row order-summary__row--total order-summary__title">
                <span>Order Total</span>
                <span>120.00 EUR</span>
              </div>
            </div>

            <div class="order-summary__divider"></div>
        

            <div class="order-summary__actions">
                <button class="button order-summary__link order-summary__link_muted">
                  Check Out with Multiple Addresses
                </button>
            
                <button class="order-summary__cta button button_solid button_black">
                  Proceed to checkout
                </button>           
          </div>
          


        `,e._els={shippingContainer:e.querySelector(".order-summary__block_shipping-estimate")},e._els.shippingAccordion=T({items:[{title:"Estimate Shipping and Tax",content:E(),isActive:!0}],isSingleOpen:!0}),e._els.shippingContainer.append(e._els.shippingAccordion);const t=e.querySelector(".shipping-estimate__control_country"),o=e.querySelector(".shipping-estimate__control_state");t&&t.append(b({name:"country",placeholder:"Select country",options:[{value:"us",label:"United States"},{value:"ca",label:"Canada"}]})),o&&o.append(b({name:"state",placeholder:"Select state",options:[{value:"al",label:"Alaska"},{value:"ny",label:"New York"}]}))}}})}const E=()=>`
        <div class="order-summary__shipping-estimate-content shipping-estimate">
          <p class="shipping-estimate__description">
            Enter your destination to get a shipping estimate.
          </p>

          <div class="shipping-estimate__methods shipping-methods">
            <div class="shipping-estimate__fields">
              <div class="shipping-estimate__field">
                <div class="shipping-estimate__label">
                  Country <span class="shipping-estimate__required">*</span>
                </div>
                <div class="shipping-estimate__control_country"></div>
              </div>

              <div class="shipping-estimate__field">
                <div class="shipping-estimate__label">
                  State/Province <span class="shipping-estimate__required">*</span>
                </div>
                <div class="shipping-estimate__control_state"></div>
              </div>

              <div class="shipping-estimate__field">
                <div class="shipping-estimate__label">
                  Zip/Postal Code
                </div>
                <div class="shipping-estimate__control_postal-code">
                  ${h().toHTML()}
                </div>
              </div>
            </div>

            <div class="shipping-methods__item shipping-methods__item_flat-rate">
              <div class="shipping-methods__title order-summary__subtitle">
                Flat Rate
              </div>

              <div class="shipping-methods__radio radio">
                <input
                  type="radio"
                  id="shipping-flat"
                  name="shipping"
                  checked
                />
                <label for="shipping-flat" class="radio__label">
                  Fixed 5.00 EUR
                </label>
              </div>
            </div>

            <div class="shipping-methods__item shipping-methods__item_best-way">
              <div class="shipping-methods__title order-summary__subtitle">
                Best Way
              </div>

              <div class="shipping-methods__radio radio">
                <input
                  type="radio"
                  id="shipping-best"
                  name="shipping"
                />
                <label for="shipping-best" class="radio__label">
                  Table Rate 10.00 EUR
                </label>
              </div>
            </div>
          </div>
        </div>

  `,P=async()=>{$(".cart-section__breadcrumbs");const a=document.querySelector(".cart-section__col-1"),e=document.querySelector(".cart-section__col-2"),i=k({items:[]}),n=A();a.append(i),e.append(n),y.subscribe("cart",async s=>{const t=s.viewItems;console.log("cartpage: cartViewsItems",t),i.update({items:t})})};document.addEventListener("DOMContentLoaded",async()=>{f(),P(),C(),S(".lazy",{rootMargin:"200px 0px"})});
