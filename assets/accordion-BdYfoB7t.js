import{c as l}from"./footer-DnGZcwvZ.js";const u=(t,n,a={})=>{const i=document.querySelector(t);if(!i){console.error(`Accordion: Container '${t}' not found`);return}const{isSingleOpen:e=!0}=a,o=document.createElement("div");o.className="accordion",o.innerHTML=n.map(c=>`
    <div class="accordion__item ${c.isActive?"is-active":""}">
      <button class="accordion__button" type="button">
        <span class="accordion__title">${c.title}</span> 
        <span class="accordion__icon"></span>
      </button>
      <div class="accordion__content">
        <div class="accordion__inner">
          ${c.content}
        </div>
      </div>
    </div>
  `).join(""),i.innerHTML="",i.appendChild(o);const s=o.querySelectorAll(".accordion__item");s.forEach(c=>{c.querySelector(".accordion__button").addEventListener("click",()=>{const r=c.classList.contains("is-active");e&&!r&&s.forEach(d=>d.classList.remove("is-active")),c.classList.toggle("is-active")})})};function p(t){return l(t,{tag:"div",render(n,a,i,{runOnce:e}){const{items:o=[],isSingleOpen:s=!0}=a;e&&(n.className="accordion",n.innerHTML=o.map(c=>`
              <div class="accordion__item ${c.isActive?"is-active":""}">
                <button class="accordion__button" type="button">
                  <span class="accordion__title">${c.title}</span>
                  <span class="accordion__icon"></span>
                </button>

                <div class="accordion__content">
                  <div class="accordion__inner">
                    ${c.content}
                  </div>
                </div>
              </div>
            `).join(""),n._items=Array.from(n.querySelectorAll(".accordion__item")),n._items.forEach(c=>{c.querySelector(".accordion__button").addEventListener("click",()=>{const r=c.classList.contains("is-active");s&&!r&&n._items.forEach(d=>d.classList.remove("is-active")),c.classList.toggle("is-active")})}))}})}export{u as A,p as a};
