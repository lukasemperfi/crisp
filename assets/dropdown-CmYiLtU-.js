import{c as E}from"./footer-0H0OF5BI.js";function C(a){return E(a,{tag:"div",render(t,n,b,{runOnce:q}){const{options:p=[],defaultValue:r="",name:_="",placeholder:g="Не выбрано",disabled:d=!1}=n;t.className=`dropdown ${d?"dropdown_is-disabled":""}`,t.innerHTML=`
          <select 
            class="dropdown__native" 
            ${_?`name="${_}"`:""} 
            ${d?"disabled":""}
          >
            <option value="">${g}</option>
            ${p.map(e=>`<option value="${e.value}" ${e.disabled?"disabled":""}>
                    ${e.label}
                  </option>`).join("")}
          </select>

          <button 
            type="button" 
            class="dropdown__trigger" 
            ${d?"disabled":""}
          >
            <span class="dropdown__value"></span>
            ${S("dropdown__icon")}
          </button>

          <div class="dropdown__menu">
            ${p.map(e=>` 
              <button
                type="button"
                class="dropdown__option ${e.disabled?"dropdown__option_is-disabled":""} 
                ${e.value===r?"dropdown__option_selected":""}"
                data-value="${e.value}"
                ${e.disabled||d?"disabled":""}
              >
                ${e.label}
              </button>`).join("")}
          </div>
      `;const s=t.querySelector(".dropdown__native"),i=t.querySelector(".dropdown__trigger"),w=t.querySelector(".dropdown__value"),v=t.querySelector(".dropdown__menu"),$=v.querySelectorAll(".dropdown__option");let l=!1;const f=()=>{d||(l=!0,t.classList.add("dropdown_is-open"))},c=()=>{l=!1,t.classList.remove("dropdown_is-open")},m=()=>l?c():f(),h=e=>(n.options||[]).find(y=>y.value==e)?.label??n.placeholder??"Не выбрано",L=e=>{$.forEach(o=>{o.classList.toggle("dropdown__option_selected",o.dataset.value===e)})},u=(e,o=!0)=>{n.value===e&&s.value===e||(n.value=e,s.value=e,w.textContent=h(e),i.classList.toggle("dropdown__trigger_is-empty",!e),L(e),s.dispatchEvent(new Event("change",{bubbles:!0})),o&&b("onChange",e))};r?u(r,!1):(w.textContent=g,i.classList.add("dropdown__trigger_is-empty")),i.addEventListener("click",m),v.addEventListener("click",e=>{const o=e.target.closest(".dropdown__option");!o||o.disabled||(u(o.dataset.value),c())}),s.addEventListener("change",e=>{u(e.target.value)}),document.addEventListener("click",e=>{t.contains(e.target)||c()})}})}function S(a=""){return`
  <svg class="${a}" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L5.35352 5.35352L10.3535 0.353516" stroke="currentColor" />
  </svg>
  `}export{C as D};
