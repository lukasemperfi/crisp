import{c as v}from"./footer-0H0OF5BI.js";const p=(e,t,s={})=>{const a=document.querySelector(e);if(!a){console.error(`Accordion: Container '${e}' not found`);return}const{isSingleOpen:d=!0}=s,o=document.createElement("div");o.className="accordion",o.innerHTML=t.map(n=>`
    <div class="accordion__item ${n.isActive?"is-active":""}">
      <button class="accordion__button" type="button">
        <span class="accordion__title">${n.title}</span> 
        <span class="accordion__icon"></span>
      </button>
      <div class="accordion__content">
        <div class="accordion__inner">
          ${n.content}
        </div>
      </div>
    </div>
  `).join(""),a.innerHTML="",a.appendChild(o);const r=o.querySelectorAll(".accordion__item");r.forEach(n=>{n.querySelector(".accordion__button").addEventListener("click",()=>{const c=n.classList.contains("is-active");d&&!c&&r.forEach(i=>i.classList.remove("is-active")),n.classList.toggle("is-active")})})};function m(e){return v(e,{tag:"div",render(t,s,a,{runOnce:d}){const{items:o=[],isSingleOpen:r=!0}=s;if(d&&(t.className="accordion",t.innerHTML=o.map(()=>`
              <div class="accordion__item">
                <button class="accordion__button" type="button">
                  <span class="accordion__title"></span>
                  <span class="accordion__icon"></span>
                </button>

                <div class="accordion__content">
                  <div class="accordion__inner"></div>
                </div>
              </div>
            `).join(""),t._items=Array.from(t.querySelectorAll(".accordion__item")),t._items.forEach(n=>{n.querySelector(".accordion__button").addEventListener("click",()=>{const c=n.classList.contains("is-active");r&&!c&&t._items.forEach(i=>i.classList.remove("is-active")),n.classList.toggle("is-active")})})),t._items.length!==o.length){t.update(s);return}t._items.forEach((n,_)=>{const c=o[_],i=n.querySelector(".accordion__title"),l=n.querySelector(".accordion__inner");i.textContent=c.title,n.classList.toggle("is-active",!!c.isActive),c.content instanceof Node?(l.innerHTML="",l.append(c.content)):l.innerHTML=c.content})}})}export{p as A,m as a};
