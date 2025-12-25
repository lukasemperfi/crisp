import{b as m,c as f}from"./footer-hohNfXYL.js";async function d(){const{data:e}=await f.auth.getSession();return e.session}async function v(e=m){if(!await d()){window.location.href=e;return}document.querySelector("#private-content").removeAttribute("id")}async function $(e=m){if(await d()){window.location.href=e;return}document.querySelector("#private-content").removeAttribute("id")}const w={catalog:"Магазин",product:"Карточка товара",production:"О производстве","payment-delivery":"Оплата и доставка",gallery:"Галерея","corporate-customers":"Оптовым и корпоративным клиентам",news:"Новости и статьи",contacts:"Контакты","one-news":"Новости и статьи",login:"Вход","forgot-password":"Восстановление пароля",registration:"Регистрация",checkout:"Оформление заказа",profile:"Личный кабинет",orders:"История заказов",order:"Заказ"},y=(e,o="")=>{const s=document.querySelector(e);if(!s)return;const t=window.location.pathname.split("/").filter(Boolean);let n="/crisp/";const c=n.endsWith("/")?n:n+"/";t.length>0&&t[0]===c.replace(/\//g,"")&&t.shift();const l=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `;let u="";const b=(r,i)=>{u+=r+"/";const h=c+u,a=w[r]||decodeURIComponent(r.replace(/-/g," "));return i?`<li class="breadcrumbs__item">${l}<span class="breadcrumbs__link breadcrumbs__link_current">${a}</span></li>`:`<li class="breadcrumbs__item">${l}<a class="breadcrumbs__link" href="${h}" name="${a}" aria-label="${a}">${a}</a></li>`},p=`
        <ul class="breadcrumbs ${o}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${n}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${t.map((r,i)=>b(r,i===t.length-1)).join("")}
        </ul>
      `;s.innerHTML=p};export{v as a,d as g,y as i,$ as r};
