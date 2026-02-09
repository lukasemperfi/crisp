import{i as a,a as r,s as c,p as i,t as d,n as u}from"../../../footer-0H0OF5BI.js";import{i as l}from"../../../breadcrumbs-BpSfuU0S.js";import{i as b}from"../../../profile-section-VGzRY7UQ.js";import{a as m,c as _}from"../../../product-list-CtDaYCr3.js";import"../../../dropdown-CmYiLtU-.js";document.addEventListener("DOMContentLoaded",async()=>{a(),l(".wishlist-page__breadcrumbs"),b(),r();const e=(await c.auth.getUser())?.data?.user?.id||null,t=await i.getWishlistProducts(e);document.querySelector(".profile-section__content").append(p(t,e))});function p(s,e){const t=document.createElement("div");t.className="wishlist",t.innerHTML=`
    <div class="wishlist__actions">
      <button class="button button_elevated button_gray">share wish list</button>
      <button class="button button_elevated button_gray">update wish list</button>
      <button class="button button_elevated button_gray">Add all to cart</button>
    </div>  
  `;const n=new m({initialProducts:s,renderItem:o=>v(o,e)});return t.prepend(n.getElement()),t}function v(s,e){const t=document.createElement("div");t.className="wishlist-card",t.innerHTML=`
    <div class="wishlist-card__actions actions">
      <button class="actions__btn actions__btn_remove">
        ${d()}  
      </button>
      <button class="actions__btn actions__btn_edit">
        ${u()}
      </button>
    </div>  
  `;const n=_(s);return t.prepend(n),t.querySelector(".actions__btn_remove").addEventListener("click",async h=>{await i.removeFromWishlist(e,s.id),location.reload()}),t}
