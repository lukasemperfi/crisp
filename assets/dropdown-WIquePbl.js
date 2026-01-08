function S(n,v={}){const{options:s=[],defaultValue:i="",onChange:w=()=>{},name:c=""}=v,t=typeof n=="string"?document.querySelector(n):n;if(!t)throw new Error("Dropdown: container not found");let a=!1;const _=e=>s.find(o=>o.value===e)?.label??"",b=()=>{a=!0,r.classList.add("dropdown_is-open")},d=()=>{a=!1,r.classList.remove("dropdown_is-open")},g=()=>a?d():b(),l=(e,o=!0)=>{u.value=e,$.textContent=_(e),o&&w(e)};t.innerHTML=`
    <div class="dropdown">
      <select
        class="dropdown__native"
        ${c?`name="${c}"`:""}
      >
        ${s.map(e=>`
            <option 
              value="${e.value}" 
              ${e.disabled?"disabled":""}
            >
              ${e.label}
            </option>`).join("")}
      </select>

      <button type="button" class="dropdown__trigger">
        <span class="dropdown__value"></span>
       ${y("dropdown__icon")}
      </button>

      <div class="dropdown__menu">
        ${s.map(e=>`
              <button
                type="button"
                class="dropdown__option ${e.disabled?"dropdown__option_is-disabled":""}"
                data-value="${e.value}"
                ${e.disabled?"disabled":""}
              >
                ${e.label}
              </button>
            `).join("")}
      </div>
    </div>
  `;const r=t.querySelector(".dropdown"),u=t.querySelector(".dropdown__native"),f=t.querySelector(".dropdown__trigger"),$=t.querySelector(".dropdown__value"),m=t.querySelector(".dropdown__menu"),p=s.filter(e=>!e.disabled),h=p.some(e=>e.value===i)?i:p[0]?.value??"";l(h,!1),f.addEventListener("click",g),m.addEventListener("click",e=>{const o=e.target.closest(".dropdown__option");!o||o.hasAttribute("disabled")||(l(o.dataset.value),d())}),u.addEventListener("change",e=>{l(e.target.value)}),document.addEventListener("click",e=>{r.contains(e.target)||d()})}function y(n=""){return`
  <svg class="${n}" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0.353516 0.353516L5.35352 5.35352L10.3535 0.353516" stroke="black" />
</svg>
  `}export{S as D};
