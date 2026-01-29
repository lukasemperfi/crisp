const p={cart:"Shopping Cart",registration:"Create New Customer Account"},h=(o,m="")=>{const c=document.querySelector(o);if(!c)return;const e=window.location.pathname.split("/").filter(Boolean);let r="/crisp/";const n=r.endsWith("/")?r:r+"/";e.length>0&&e[0]===n.replace(/\//g,"")&&e.shift();const l='<span class= "breadcrumbs__separator">/</span>';let i="";const b=(a,t)=>{i+=a+"/";const d=n+i,s=p[a]||decodeURIComponent(a.replace(/-/g," "));return t?`<li class="breadcrumbs__item"> ${l} <span class="breadcrumbs__link breadcrumbs__link_current">${s}</span></li>`:`<li class="breadcrumbs__item"> ${l} <a class="breadcrumbs__link" href="${d}" name="${s}" aria-label="${s}">${s}</a></li>`},u=`
        <ul class="breadcrumbs ${m}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${r}" name="breadcrumb-link" aria-label="Home">Home</a></li>
          ${e.map((a,t)=>b(a,t===e.length-1)).join("")}
        </ul>
      `;c.innerHTML=u};export{h as i};
