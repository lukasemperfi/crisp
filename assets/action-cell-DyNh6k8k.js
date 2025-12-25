import{b as c}from"./footer-CUK9rPsn.js";class r{#t;#i;#e;constructor(e,t="copy-button",i="Скопировать строку"){this.#i=e,this.#t=this.#n(i),this.#t.classList.add(t),this.#e=`
        <svg width="16" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_15004_96)">
        <path d="M0 0C0.00513809 0.0974598 0.0102762 0.189791 0.0102762 0.287251C0.0102762 6.25794 0.0102762 12.2235 0.0102762 18.1942C0.0102762 18.2865 0.0102762 18.384 0.0102762 18.502C0.827232 18.502 1.63391 18.502 2.46114 18.502C2.46114 19.3432 2.46114 20.169 2.46114 21C6.9878 21 11.4888 21 16 21C16 14.8447 16 8.6893 16 2.51344C15.1985 2.51344 14.3969 2.51344 13.5645 2.51344C13.5645 1.66195 13.5645 0.830973 13.5645 0C9.04303 0 4.52152 0 0 0ZM1.25883 17.2709C1.25883 11.9157 1.25883 6.58109 1.25883 1.24646C4.95311 1.24646 8.63712 1.24646 12.316 1.24646C12.316 6.59648 12.316 11.926 12.316 17.2709C8.62685 17.2709 4.94798 17.2709 1.25883 17.2709ZM14.772 3.73937C14.772 9.09966 14.772 14.4343 14.772 19.7741C11.0777 19.7741 7.40398 19.7741 3.71997 19.7741C3.71997 19.3534 3.71997 18.938 3.71997 18.502C7.00321 18.502 10.2762 18.502 13.5697 18.502C13.5697 13.5674 13.5697 8.6534 13.5697 3.73937C13.9807 3.73937 14.3712 3.73937 14.772 3.73937Z" fill="#8A8A8A"/>
        </g>
        <defs>
        <clipPath id="clip0_15004_96">
        <rect width="16" height="21" fill="white" transform="matrix(1 0 0 -1 0 21)"/>
        </clipPath>
        </defs>
        </svg>
`,this.#o(),this.#t.addEventListener("click",this.#c)}#n(e){const t=document.createElement("button");return t.type="button",t.classList.add("copy-button"),t.setAttribute("aria-label",e),t}#o(){this.#t.innerHTML=this.#e}#c=async()=>{const e=this.#r(this.#i);try{await navigator.clipboard.writeText(e),this.#s(!0)}catch(t){console.error("Ошибка при копировании:",t),this.#s(!1)}};#r(e){const{id:t,...i}=e;return Object.entries(i).map(([n,o])=>`${n}: ${o}`).join(", ")}#s(e){e?(this.#t.innerHTML="✓",this.#t.classList.add("copy-success")):(this.#t.innerHTML="✖",this.#t.classList.add("copy-fail")),setTimeout(()=>{this.#t.innerHTML=this.#e,this.#t.classList.remove("copy-success","copy-fail")},1500)}get element(){return this.#t}}function h(s){const e=document.createElement("div");e.classList.add("table-action-cell");const t=a(s),i=new r(s).element;return e.appendChild(t),e.appendChild(i),e}function a(s){const e=s.id,t=`${c}profile/order/?orderId=${e}`;return l(t,`
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.8475 12.4669C23.6331 12.7602 18.5245 19.6484 11.9999 19.6484C5.47529 19.6484 0.36647 12.7602 0.152297 12.4672C-0.0507657 12.1889 -0.0507657 11.8115 0.152297 11.5333C0.36647 11.24 5.47529 4.35174 11.9999 4.35174C18.5245 4.35174 23.6331 11.24 23.8475 11.533C24.0508 11.8113 24.0508 12.1889 23.8475 12.4669ZM11.9999 5.93415C7.19383 5.93415 3.03127 10.506 1.79907 12.0006C3.02968 13.4966 7.18352 18.066 11.9999 18.066C16.8057 18.066 20.968 13.495 22.2007 11.9995C20.9701 10.5037 16.8163 5.93415 11.9999 5.93415Z"
            fill="#8A8A8A"
          />
          <path
            d="M11.9992 16.748C9.38163 16.748 7.25195 14.6184 7.25195 12.0008C7.25195 9.38317 9.38163 7.25349 11.9992 7.25349C14.6168 7.25349 16.7465 9.38317 16.7465 12.0008C16.7465 14.6184 14.6168 16.748 11.9992 16.748ZM11.9992 8.83595C10.2541 8.83595 8.83441 10.2557 8.83441 12.0008C8.83441 13.7459 10.2541 15.1656 11.9992 15.1656C13.7443 15.1656 15.164 13.7459 15.164 12.0008C15.164 10.2557 13.7444 8.83595 11.9992 8.83595Z"
            fill="#8A8A8A"
          />
        </svg>
      `)}function l(s,e){const t=document.createElement("a");t.href=s,t.classList.add("view-link"),t.setAttribute("aria-label",`Перейти к деталям заказа №${s.split("/").pop()}`),t.innerHTML=e;const i=document.createElement("div");return i.classList.add("view-link__popup"),i.innerHTML="Просмотреть заказ",t.appendChild(i),t}export{h as c,a as r};
