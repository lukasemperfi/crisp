import{c as S}from"./footer-DnGZcwvZ.js";function C(s){return S(s,{tag:"div",render(t,d,b,{runOnce:q}){const{options:p=[],defaultValue:a="",name:u="",placeholder:_="Не выбрано",disabled:n=!1}=d;t.className=`dropdown ${n?"dropdown_is-disabled":""}`,t.innerHTML=`
          <select 
            class="dropdown__native" 
            ${u?`name="${u}"`:""} 
            ${n?"disabled":""}
          >
            <option value="">${_}</option>
            ${p.map(e=>`<option value="${e.value}" ${e.disabled?"disabled":""}>
                    ${e.label}
                  </option>`).join("")}
          </select>

          <button 
            type="button" 
            class="dropdown__trigger" 
            ${n?"disabled":""}
          >
            <span class="dropdown__value"></span>
            ${E("dropdown__icon")}
          </button>

          <div class="dropdown__menu">
            ${p.map(e=>` 
              <button
                type="button"
                class="dropdown__option ${e.disabled?"dropdown__option_is-disabled":""} 
                ${e.value===a?"dropdown__option_selected":""}"
                data-value="${e.value}"
                ${e.disabled||n?"disabled":""}
              >
                ${e.label}
              </button>`).join("")}
          </div>
      `;const g=t.querySelector(".dropdown__native"),r=t.querySelector(".dropdown__trigger"),w=t.querySelector(".dropdown__value"),v=t.querySelector(".dropdown__menu"),$=v.querySelectorAll(".dropdown__option");let i=!1;const f=()=>{n||(i=!0,t.classList.add("dropdown_is-open"))},l=()=>{i=!1,t.classList.remove("dropdown_is-open")},m=()=>i?l():f(),h=e=>(d.options||[]).find(y=>y.value==e)?.label??d.placeholder??"Не выбрано",L=e=>{$.forEach(o=>{o.classList.toggle("dropdown__option_selected",o.dataset.value===e)})},c=(e,o=!0)=>{d.value=e,g.value=e,w.textContent=h(e),r.classList.toggle("dropdown__trigger_is-empty",!e),L(e),o&&b("onChange",e)};a?c(a,!1):(w.textContent=_,r.classList.add("dropdown__trigger_is-empty")),r.addEventListener("click",m),v.addEventListener("click",e=>{const o=e.target.closest(".dropdown__option");!o||o.disabled||(c(o.dataset.value),l())}),g.addEventListener("change",e=>{c(e.target.value)}),document.addEventListener("click",e=>{t.contains(e.target)||l()})}})}function E(s=""){return`
  <svg class="${s}" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L5.35352 5.35352L10.3535 0.353516" stroke="currentColor" />
  </svg>
  `}export{C as D};
