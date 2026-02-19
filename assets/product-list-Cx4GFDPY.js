import{c as L,b as E}from"./footer-D3eUB4_-.js";function w(a){return L(a,{tag:"div",render(e,t,i){const{colors:s=[],title:d="Color",showTitle:l=!0,maxVisibleColors:n=null,selectionMode:c="multiple",selectedId:h=null}=t;if(!Array.isArray(s)){console.error("ColorFilter Error: colors array not found.");return}const _=typeof n=="number"&&n>0,p=_?s.slice(0,n):s,y=_?s.slice(n):[],g=p.map(r=>M(r,!1,h)).join(""),b=y.map(r=>M(r,!0,h)).join(""),u=_&&y.length?'<button class="color-filter__more-btn" type="button">…</button>':"";if(e.className="color-filter",e.innerHTML=`
        ${l?`<div class="color-filter__title">${d}</div>`:""}
        <div class="color-filter__grid">
          ${g}
          ${u}
          ${b}
        </div>
      `,_&&y.length){const r=e.querySelector(".color-filter__more-btn"),m=e.querySelectorAll(".color-filter__item_is-hidden");r&&r.addEventListener("click",()=>{m.forEach(f=>{f.classList.remove("color-filter__item_is-hidden")}),r.remove()})}const o=e.querySelectorAll(".color-filter__input");c==="single"&&h!=null&&o.forEach(r=>{r.checked=Number(r.value)===Number(h)}),c==="single"?o.forEach(r=>{r.addEventListener("change",()=>{r.checked&&(o.forEach(m=>{m!==r&&(m.checked=!1)}),i("onChange",{selected:Number(r.value)}))})}):o.forEach(r=>{r.addEventListener("change",()=>{const m=Array.from(o).filter(f=>f.checked).map(f=>Number(f.value));i("onChange",{selected:m})})})}})}function M(a,e=!1,t=null){const i=(a.hex_code||"").toLowerCase(),d=i==="#ffffff"||i==="#fff"||i==="white"?"color-filter__box_is-white":"",l=e?"color-filter__item_is-hidden":"",n=Number(a.id)===Number(t);return`
    <label
      class="color-filter__item ${l}"
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
        class="color-filter__box ${d}"
        style="background-color: ${a.hex_code};"
      ></span>
    </label>
  `}function C(a){const{id:e,name:t,brand:i,base_price:s,discount_percent:d,images:l=[],variants:n,tags:c}=a,h=c&&c.length>0?c[0].tag.name:"Uncategorized",_=l.find(o=>o.is_main)||l[0],p=d>0,y=p?s*(1-d/100):s,g=p?s:null,b=d,u=document.createElement("div");return u.className="product-card",u.innerHTML=`
    ${p?`<div class="product-card__badge">-${b}%</div>`:""}


    <div class="product-card__image">
        <img
          class="product-card__image"
          src="${_?.image_path_jpg||""}"
          loading="eager"
          alt="${t}"
          fetchpriority="high"
        >
    </div>

    <div class="product-card__category">${h}</div>
    <a href="${E}product/?id=${e}" class="product-card__name">${t}</a>
    <div class="product-card__price price">
      <div class="price__current">
        ${v(y)}
      </div>
      ${p?`<div class="price__old">${v(g)}</div>`:""}
    </div>
    <div class="product-card__color"></div
  `,[...new Map(n.map(o=>[o.color.id,{...o.color,available:!0}])).values()],w(u.querySelector(".product-card__color")),u}function v(a,e="EUR",t="de-DE"){return new Intl.NumberFormat(t,{style:"currency",currency:e,minimumFractionDigits:2,maximumFractionDigits:2}).format(a)}class ${constructor(e,t=[],i,s=!1){if(this._container=typeof e=="string"?document.querySelector(e):e,!this._container)throw new Error("ProductList: container not found");this._onLoadMore=i,this._products=[],this._showEmptyMessageOnInit=s,this._initialized=!1,t.length>0?(this._renderStructure(),this.appendProducts(t)):this._showEmptyMessageOnInit&&(this._renderStructure(),this._renderEmptyMessage())}_renderStructure(){if(this._initialized)return;this._container.innerHTML="",this._wrapper=document.createElement("div"),this._wrapper.className="catalog",this._wrapper.innerHTML=`
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
    `,document.head.appendChild(e),this._btn.addEventListener("click",()=>{typeof this._onLoadMore=="function"&&(this.showLoader(),this._onLoadMore().finally(()=>{this.hideLoader()}))}),this._container.appendChild(this._wrapper),this._initialized=!0}appendProducts(e){if(!e||e.length===0){this._renderStructure(),this._renderEmptyMessage();return}this._initialized||this._renderStructure(),this._hideEmptyMessage(),this.showLoadMore();const t=document.createDocumentFragment();e.forEach(i=>{const s=C(i);t.appendChild(s),this._products.push(i)}),this._list.appendChild(t)}clear(){this._list&&(this._list.innerHTML=""),this._products=[],this._hideEmptyMessage()}hideLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display="none"),this._btn&&(this._btn.style.display="none")}showLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display=""),this._btn&&(this._btn.style.display="")}getProducts(){return[...this._products]}_renderEmptyMessage(){this._emptyMessage||(this._emptyMessage=document.createElement("div"),this._emptyMessage.className="catalog__empty",this._emptyMessage.textContent="No products found",this._wrapper.appendChild(this._emptyMessage)),this.hideLoadMore(),this._emptyMessage.style.display=""}_hideEmptyMessage(){this._emptyMessage&&(this._emptyMessage.style.display="none")}showLoader(){this._loader&&(this._loader.style.display="",this._btn.style.display="none")}hideLoader(){this._loader&&(this._loader.style.display="none",this._btn.style.display="")}setLoadMoreHandler(e){this._onLoadMore=e}}class N{constructor({initialProducts:e=[],onLoadMore:t,showEmptyMessageOnInit:i=!1,renderItem:s}={}){this._onLoadMore=t,this._renderItem=s,this._products=[],this._showEmptyMessageOnInit=i,this._initialized=!1,this._renderStructure(),e.length>0?this.appendProducts(e):this._showEmptyMessageOnInit&&this._renderEmptyMessage()}getElement(){return this._wrapper}_renderStructure(){if(this._initialized)return;this._wrapper=document.createElement("div"),this._wrapper.className="catalog",this._wrapper.innerHTML=`
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
    `,document.head.appendChild(e),this._btn.addEventListener("click",()=>{typeof this._onLoadMore=="function"&&(this.showLoader(),this._onLoadMore().finally(()=>{this.hideLoader()}))}),this._initialized=!0}appendProducts(e){if(!e||e.length===0){this._renderEmptyMessage();return}this._hideEmptyMessage(),this.showLoadMore();const t=document.createDocumentFragment();e.forEach(i=>{const s=this._renderItem?this._renderItem(i):null;s&&t.appendChild(s),this._products.push(i)}),this._list.appendChild(t)}clear(){this._list&&(this._list.innerHTML=""),this._products=[],this._hideEmptyMessage()}hideLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display="none"),this._btn&&(this._btn.style.display="none")}showLoadMore(){this._btnWrapper&&(this._btnWrapper.style.display=""),this._btn&&(this._btn.style.display="")}getProducts(){return[...this._products]}_renderEmptyMessage(){this._emptyMessage||(this._emptyMessage=document.createElement("div"),this._emptyMessage.className="catalog__empty",this._emptyMessage.textContent="No products found",this._wrapper.appendChild(this._emptyMessage)),this.hideLoadMore(),this._emptyMessage.style.display=""}_hideEmptyMessage(){this._emptyMessage&&(this._emptyMessage.style.display="none")}showLoader(){this._loader&&(this._loader.style.display="",this._btn.style.display="none")}hideLoader(){this._loader&&(this._loader.style.display="none",this._btn.style.display="")}setLoadMoreHandler(e){this._onLoadMore=e}}export{w as C,$ as P,N as a,C as c};
