import{c as L,b as E}from"./footer-D3eUB4_-.js";function w(a){return L(a,{tag:"div",render(e,t,r){const{colors:i=[],title:c="Color",showTitle:h=!0,maxVisibleColors:n=null,selectionMode:_="multiple",selectedId:p=null}=t;if(!Array.isArray(i)){console.error("ColorFilter Error: colors array not found.");return}const u=typeof n=="number"&&n>0,m=u?i.slice(0,n):i,f=u?i.slice(n):[],g=m.map(s=>M(s,!1,p)).join(""),b=f.map(s=>M(s,!0,p)).join(""),y=u&&f.length?'<button class="color-filter__more-btn" type="button">…</button>':"";if(e.className="color-filter",e.innerHTML=`
        ${h?`<div class="color-filter__title">${c}</div>`:""}
        <div class="color-filter__grid">
          ${g}
          ${y}
          ${b}
        </div>
      `,u&&f.length){const s=e.querySelector(".color-filter__more-btn"),d=e.querySelectorAll(".color-filter__item_is-hidden");s&&s.addEventListener("click",()=>{d.forEach(o=>{o.classList.remove("color-filter__item_is-hidden")}),s.remove()})}const l=e.querySelectorAll(".color-filter__input");_==="single"&&p!=null&&l.forEach(s=>{s.checked=Number(s.value)===Number(p)}),_==="single"?l.forEach(s=>{s.addEventListener("change",()=>{s.checked&&(l.forEach(d=>{d!==s&&(d.checked=!1)}),r("onChange",{selected:Number(s.value)}))})}):l.forEach(s=>{s.addEventListener("change",()=>{const d=Array.from(l).filter(o=>o.checked).map(o=>Number(o.value));r("onChange",{selected:d})})})}})}function M(a,e=!1,t=null){const r=(a.hex_code||"").toLowerCase(),c=r==="#ffffff"||r==="#fff"||r==="white"?"color-filter__box_is-white":"",h=e?"color-filter__item_is-hidden":"",n=Number(a.id)===Number(t);return`
    <label
      class="color-filter__item ${h}"
      title="${a.name}"
      style="${a.available?"":"opacity: 0.2; pointer-events: none;"}"
    >
      <input
        type="checkbox"
        class="color-filter__input"
        name="filter-color"
        value="${a.id}"
        ${n?"checked":""}
      />
      <span
        class="color-filter__box ${c}"
        style="background-color: ${a.hex_code};"
      ></span>
    </label>
  `}function C(a){const{id:e,name:t,brand:r,base_price:i,discount_percent:c,images:h=[],variants:n,tags:_}=a,p=_&&_.length>0?_[0].tag.name:"Uncategorized",u=h.find(o=>o.is_main)||h[0],m=c>0,f=m?i*(1-c/100):i,g=m?i:null,b=c,y=document.createElement("div");y.className="product-card",y.innerHTML=`
    ${m?`<div class="product-card__badge">-${b}%</div>`:""}


    <div class="product-card__image">
        <img
          class="product-card__image"
          src="${u?.image_path_jpg||""}"
          loading="eager"
          alt="${t}"
          fetchpriority="high"
        >
    </div>

    <div class="product-card__category">${p}</div>
    <a href="${E}product/?id=${e}" class="product-card__name">${t}</a>
    <div class="product-card__price price">
      <div class="price__current">
        ${v(f)}
      </div>
      ${m?`<div class="price__old">${v(g)}</div>`:""}
    </div>
    <div class="product-card__color"></div
  `;const l=[...new Map(n.map(o=>[o.color.id,{...o.color,available:!0}])).values()],s=y.querySelector(".product-card__color"),d=w({colors:l,showTitle:!1,selectionMode:"single",maxVisibleColors:3,selectedId:l[1]?.id});return s.appendChild(d),y}function v(a,e="EUR",t="de-DE"){return new Intl.NumberFormat(t,{style:"currency",currency:e,minimumFractionDigits:2,maximumFractionDigits:2}).format(a)}class ${constructor(e,t=[],r,i=!1){if(this._container=typeof e=="string"?document.querySelector(e):e,!this._container)throw new Error("ProductList: container not found");this._onLoadMore=r,this._products=[],this._showEmptyMessageOnInit=i,this._initialized=!1,t.length>0?(this._renderStructure(),this.appendProducts(t)):this._showEmptyMessageOnInit&&(this._renderStructure(),this._renderEmptyMessage())}_renderStructure(){if(this._initialized)return;this._container.innerHTML="",this._wrapper=document.createElement("div"),this._wrapper.className="catalog",this._wrapper.innerHTML=`
      <div class="catalog__list"></div>
      <div class="catalog__actions">
        <button type="button" class="button button_outlined button_gray catalog__more-button">
          Load more
        </button>
      </div>
    `,this._list=this._wrapper.querySelector(".catalog__list"),this._btnWrapper=this._wrapper.querySelector(".catalog__actions"),this._btn=this._wrapper.querySelector(".catalog__more-button"),this._loader=document.createElement("div"),this._loader.className="catalog__loader",this._loader.style.display="none",this._loader.innerHTML='<div class="spinner"></div>',this._btnWrapper.appendChild(this._loader);const e=document.createElement("style");e.textContent=`
      .catalog__loader {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
      .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(0,0,0,0.2);
        border-top-color: rgba(0,0,0,0.8);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `,document.head.appendChild(e),this._btn.addEventListener("click",()=>{typeof this._onLoadMore=="function"&&(this.showLoader(),this._onLoadMore().finally(()=>{this.hideLoader()}))}),this._container.appendChild(this._wrapper),this._initialized=!0}appendProducts(e){if(!e||e.length===0){this._renderStructure(),this._renderEmptyMessage();return}this._initialized||this._renderStructure(),this._hideEmptyMessage(),this.showLoadMore();const t=document.createDocumentFragment();e.forEach(r=>{const i=C(r);t.appendChild(i),this._products.push(r)}),this._list.appendChild(t)}clear(){this._list&&(this._list.innerHTML=""),this._products=[],this._hideEmptyMessage()}hideLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display="none"),this._btn&&(this._btn.style.display="none")}showLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display=""),this._btn&&(this._btn.style.display="")}getProducts(){return[...this._products]}_renderEmptyMessage(){this._emptyMessage||(this._emptyMessage=document.createElement("div"),this._emptyMessage.className="catalog__empty",this._emptyMessage.textContent="No products found",this._wrapper.appendChild(this._emptyMessage)),this.hideLoadMore(),this._emptyMessage.style.display=""}_hideEmptyMessage(){this._emptyMessage&&(this._emptyMessage.style.display="none")}showLoader(){this._loader&&(this._loader.style.display="",this._btn.style.display="none")}hideLoader(){this._loader&&(this._loader.style.display="none",this._btn.style.display="")}setLoadMoreHandler(e){this._onLoadMore=e}}class N{constructor({initialProducts:e=[],onLoadMore:t,showEmptyMessageOnInit:r=!1,renderItem:i}={}){this._onLoadMore=t,this._renderItem=i,this._products=[],this._showEmptyMessageOnInit=r,this._initialized=!1,this._renderStructure(),e.length>0?this.appendProducts(e):this._showEmptyMessageOnInit&&this._renderEmptyMessage()}getElement(){return this._wrapper}_renderStructure(){if(this._initialized)return;this._wrapper=document.createElement("div"),this._wrapper.className="catalog",this._wrapper.innerHTML=`
      <div class="catalog__list"></div>
      <div class="catalog__actions">
        <button type="button" class="button button_outlined button_gray catalog__more-button">
          Load more
        </button>
      </div>
    `,this._list=this._wrapper.querySelector(".catalog__list"),this._btnWrapper=this._wrapper.querySelector(".catalog__actions"),this._btn=this._wrapper.querySelector(".catalog__more-button"),this._loader=document.createElement("div"),this._loader.className="catalog__loader",this._loader.style.display="none",this._loader.innerHTML='<div class="spinner"></div>',this._btnWrapper.appendChild(this._loader);const e=document.createElement("style");e.textContent=`
      .catalog__loader {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px 0;
      }
      .spinner {
        width: 20px;
        height: 20px;
        border: 3px solid rgba(0,0,0,0.2);
        border-top-color: rgba(0,0,0,0.8);
        border-radius: 50%;
        animation: spin 0.6s linear infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg);}
        100% { transform: rotate(360deg);}
      }
    `,document.head.appendChild(e),this._btn.addEventListener("click",()=>{typeof this._onLoadMore=="function"&&(this.showLoader(),this._onLoadMore().finally(()=>{this.hideLoader()}))}),this._initialized=!0}appendProducts(e){if(!e||e.length===0){this._renderEmptyMessage();return}this._hideEmptyMessage(),this.showLoadMore();const t=document.createDocumentFragment();e.forEach(r=>{const i=this._renderItem?this._renderItem(r):null;i&&t.appendChild(i),this._products.push(r)}),this._list.appendChild(t)}clear(){this._list&&(this._list.innerHTML=""),this._products=[],this._hideEmptyMessage()}hideLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display="none"),this._btn&&(this._btn.style.display="none")}showLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display=""),this._btn&&(this._btn.style.display="")}getProducts(){return[...this._products]}_renderEmptyMessage(){this._emptyMessage||(this._emptyMessage=document.createElement("div"),this._emptyMessage.className="catalog__empty",this._emptyMessage.textContent="No products found",this._wrapper.appendChild(this._emptyMessage)),this.hideLoadMore(),this._emptyMessage.style.display=""}_hideEmptyMessage(){this._emptyMessage&&(this._emptyMessage.style.display="none")}showLoader(){this._loader&&(this._loader.style.display="",this._btn.style.display="none")}hideLoader(){this._loader&&(this._loader.style.display="none",this._btn.style.display="")}setLoadMoreHandler(e){this._onLoadMore=e}}export{w as C,$ as P,N as a,C as c};
