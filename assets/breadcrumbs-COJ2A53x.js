const h={catalog:"Магазин",product:"Карточка товара",production:"О производстве","payment-delivery":"Оплата и доставка",gallery:"Галерея","corporate-customers":"Оптовым и корпоративным клиентам",news:"Новости и статьи",contacts:"Контакты","one-news":"Новости и статьи",login:"Вход","forgot-password":"Восстановление пароля",registration:"Регистрация",checkout:"Оформление заказа",profile:"Личный кабинет",orders:"История заказов",order:"Заказ"},_=(i,m="")=>{const c=document.querySelector(i);if(!c)return;const e=window.location.pathname.split("/").filter(Boolean);let a="/crisp/";const n=a.endsWith("/")?a:a+"/";e.length>0&&e[0]===n.replace(/\//g,"")&&e.shift();const l=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `;let o="";const d=(r,t)=>{o+=r+"/";const b=n+o,s=h[r]||decodeURIComponent(r.replace(/-/g," "));return t?`<li class="breadcrumbs__item">${l}<span class="breadcrumbs__link breadcrumbs__link_current">${s}</span></li>`:`<li class="breadcrumbs__item">${l}<a class="breadcrumbs__link" href="${b}" name="${s}" aria-label="${s}">${s}</a></li>`},u=`
        <ul class="breadcrumbs ${m}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${a}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${e.map((r,t)=>d(r,t===e.length-1)).join("")}
        </ul>
      `;c.innerHTML=u};export{_ as i};
