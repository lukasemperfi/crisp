import{c as y}from"./core-BLSz-6hf.js";function E(n){return y(n,{tag:"div",render(t,u,b){const{options:d=[],defaultValue:s="",name:_="",placeholder:r="Не выбрано"}=u;t.className="dropdown-wrapper",t.innerHTML=`
        <div class="dropdown">
          <select class="dropdown__native" ${_?`name="${_}"`:""}>
            <option value="">${r}</option>
            ${d.map(e=>`<option value="${e.value}" ${e.disabled?"disabled":""}>${e.label}</option>`).join("")}
          </select>

          <button type="button" class="dropdown__trigger">
            <span class="dropdown__value"></span>
            ${S("dropdown__icon")}
          </button>

          <div class="dropdown__menu">
            ${d.map(e=>` 
              <button
                type="button"
                class="dropdown__option ${e.disabled?"dropdown__option_is-disabled":""} ${e.value===s?"dropdown__option_selected":""}"
                data-value="${e.value}"
                ${e.disabled?"disabled":""}
              >
                ${e.label}
              </button>`).join("")}
          </div>
        </div>
      `;const a=t.querySelector(".dropdown"),w=t.querySelector(".dropdown__native"),i=t.querySelector(".dropdown__trigger"),g=t.querySelector(".dropdown__value"),v=t.querySelector(".dropdown__menu"),m=v.querySelectorAll(".dropdown__option");let l=!1;const $=()=>{l=!0,a.classList.add("dropdown_is-open")},c=()=>{l=!1,a.classList.remove("dropdown_is-open")},f=()=>l?c():$(),L=e=>d.find(o=>o.value==e)?.label??r,h=e=>{m.forEach(o=>{o.classList.toggle("dropdown__option_selected",o.dataset.value===e)})},p=(e,o=!0)=>{u.value=e,w.value=e,g.textContent=L(e),i.classList.toggle("dropdown__trigger_is-empty",!e),h(e),o&&b("onChange",e)};s?p(s,!1):(g.textContent=r,i.classList.add("dropdown__trigger_is-empty")),i.addEventListener("click",f),v.addEventListener("click",e=>{const o=e.target.closest(".dropdown__option");!o||o.disabled||(p(o.dataset.value),c())}),w.addEventListener("change",e=>{p(e.target.value)}),document.addEventListener("click",e=>{a.contains(e.target)||c()})}})}function S(n=""){return`
  <svg class="${n}" width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0.353516 0.353516L5.35352 5.35352L10.3535 0.353516" stroke="currentColor" />
  </svg>
  `}export{E as D};
