import{c as b}from"./core-BLSz-6hf.js";function q(o={}){return b(o,{tag:"div",render(n,m,h){const{initialValue:p=1,itemId:C,min:r=1,max:c=99}=m;if(!n){console.error("Quantity Error: container not found.");return}n.className="quantity",n.innerHTML=`
        <button class="quantity__decrease" type="button">${k()}</button>
        <input class="quantity__input" type="text" value="${p}" name="quantity-input"/>
        <button class="quantity__increase" type="button">${x()}</button>
      `;const a=n.querySelector(".quantity__input"),g=n.querySelector(".quantity__increase"),f=n.querySelector(".quantity__decrease"),s=t=>{h("onChange",{itemId:C,value:t})},u=t=>(t=Math.max(r,t),t=Math.min(c,t),t),l=t=>{const i=Number(a.value);let e=u(i+t);e!==i&&(a.value=e,s(e))},d=t=>{let i=String(t).replace(/[^0-9]/g,""),e=Math.floor(Number(i));e=u(e),a.value=e,s(e)},w=t=>{[8,9,27,13,46].includes(t.keyCode)||t.keyCode===65&&(t.ctrlKey||t.metaKey)||t.keyCode===67&&(t.ctrlKey||t.metaKey)||t.keyCode===86&&(t.ctrlKey||t.metaKey)||t.keyCode===88&&(t.ctrlKey||t.metaKey)||t.keyCode>=37&&t.keyCode<=40||(t.keyCode<48||t.keyCode>57)&&(t.keyCode<96||t.keyCode>105)&&t.preventDefault()},v=t=>{t.preventDefault();const e=(t.clipboardData||window.clipboardData).getData("Text");if(!/^[0-9]+$/.test(e))return;const y=Number(e);y>=r&&y<=c&&(document.execCommand("insertText",!1,e),d(a.value))};f.addEventListener("click",()=>l(-1)),g.addEventListener("click",()=>l(1)),a.addEventListener("keydown",w),a.addEventListener("paste",v),a.addEventListener("change",t=>d(t.target.value))}})}const k=()=>`
      <svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="10" height="2" fill="#C4C4C4"/>
      </svg>
  `,x=()=>`
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect y="5" width="12" height="2" fill="#C4C4C4"/>
      <rect x="7" width="12" height="2" transform="rotate(90 7 0)" fill="#C4C4C4"/>
    </svg>
  `,D=(o,n="ru-RU")=>new Intl.NumberFormat(n,{minimumFractionDigits:2,maximumFractionDigits:2}).format(o);export{q as Q,D as f};
