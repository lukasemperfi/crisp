class w{#e;#t;#a;#s;#r;#i;#n;constructor(t,i,e=1,a=99){this.#r=i,this.#i=e,this.#n=a,this.#e=f(t),this.#t=this.#e.querySelector(".quantity__input"),this.#a=this.#e.querySelector(".quantity__increase"),this.#s=this.#e.querySelector(".quantity__decrease"),this.#o()}#o(){this.#s.addEventListener("click",()=>this.#l(-1)),this.#a.addEventListener("click",()=>this.#l(1)),this.#t.addEventListener("keydown",this.#d.bind(this)),this.#t.addEventListener("paste",this.#h.bind(this)),this.#t.addEventListener("change",t=>this.#u(t.target.value))}#h(t){t.preventDefault();const i=this.#t.value,a=(t.clipboardData||window.clipboardData).getData("Text");if(!/^[0-9]+$/.test(a)){this.#t.value=i;return}const r=Number(a);if(r<this.#i||r>this.#n){this.#t.value=i;return}document.execCommand("insertText",!1,a),this.#u(this.#t.value)}#d(t){[8,9,27,13,46].includes(t.keyCode)||t.keyCode===65&&(t.ctrlKey===!0||t.metaKey===!0)||t.keyCode===67&&(t.ctrlKey===!0||t.metaKey===!0)||t.keyCode===86&&(t.ctrlKey===!0||t.metaKey===!0)||t.keyCode===88&&(t.ctrlKey===!0||t.metaKey===!0)||t.keyCode>=37&&t.keyCode<=40||(t.keyCode<48||t.keyCode>57)&&(t.keyCode<96||t.keyCode>105)&&t.preventDefault()}#l(t){let i=Number(this.#t.value),e=i+t;e=Math.max(this.#i,e),e=Math.min(this.#n,e),e!==i&&(this.#t.value=e,this.#c(e))}#u(t){let i=String(t).replace(/[^0-9]/g,""),e=Math.floor(Number(i));e=Math.max(this.#i,e),e=Math.min(this.#n,e),this.#t.value=e,this.#c(e)}#c(t){this.#e.dispatchEvent(new CustomEvent("quantityChange",{bubbles:!0,detail:{itemId:this.#r,newQuantity:t}}))}get element(){return this.#e}}function g(){return`
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15004_11)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M2.56815 4.99357L6.4 1.22265L5.05478 0L0 4.99357L5.05478 10L6.4 8.77735L2.56815 4.99357Z"
                    fill="#8A8A8A" />
            </g>
            <defs>
                <clipPath id="clip0_15004_11">
                    <rect width="10" height="8" fill="white" transform="matrix(0 1 1 0 0 0)" />
                </clipPath>
            </defs>
        </svg>`}function v(){return`
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15004_7)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.43185 4.99357L1.6 1.22265L2.94522 0L8 4.99357L2.94522 10L1.6 8.77735L5.43185 4.99357Z"
                    fill="#8A8A8A" />
            </g>
            <defs>
                <clipPath id="clip0_15004_7">
                    <rect width="10" height="8" fill="white" transform="matrix(0 1 -1 0 8 0)" />
                </clipPath>
            </defs>
        </svg>`}function f(s){const t=`
        <button class="quantity__decrease" type="button">${g()}</button>
        <input type="text" class="quantity__input" value="${s}" aria-label="Количество" name="quantity-input">
        <button class="quantity__increase" type="button">${v()}</button>
    `,i=document.createElement("div");return i.classList.add("quantity"),i.innerHTML=t,i}function _(s,t){if(!Array.isArray(s))return console.error("mapProductsToTableRows ожидает массив продуктов."),[];const i=new Map;t.forEach(n=>{i.set(Number(n.productId),n.quantity)});const e=i||new Map,a=1;return s.map(n=>{const r=n.id,l=e.get(r)||a,o=n.title,u=n.discount_price||n.price,h=l*u,d=n.price_unit||"грн",c=n.product_images.find(m=>m.is_main),p=c?c.image_path_png:null,y=n.sku;return{id:r,productName:o,quantity:l,price:u,total:h,priceUnit:d,imageUrl:p,sku:y}})}export{w as Q,_ as m};
