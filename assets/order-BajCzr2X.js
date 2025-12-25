import{c as a}from"./footer-hohNfXYL.js";class c{async createOrder(r){if(!r||!r.products||r.products.length===0)throw new Error("Объект заказа или список продуктов недействителен.");const{data:{user:t}}=await a.auth.getUser();if(!t)throw new Error("Необходимо авторизоваться для оформления заказа.");const e=t.id,i=r[r.delivery_method];let d=null;try{const o={user_id:e,order_number:this.generateOrderNumber(),full_name:r.full_name,email:r.email,phone:r.phone,delivery_method:r.delivery_method,payment_method:r.payment_method,status:"новый",total_amount:r.total_amount},{data:n,error:s}=await a.from("orders").insert([o]).select("id").single();if(s)throw s;d=n.id}catch(o){throw console.error("Ошибка (A) при вставке в orders:",o),new Error("Не удалось создать основную запись заказа.")}try{const o=r.products.map(s=>({order_id:d,product_id:s.productId,quantity:s.quantity})),{error:n}=await a.from("order_items").insert(o);if(n)throw await this.rollbackOrder(d,"order_items"),n}catch(o){throw console.error("Ошибка (B) при вставке в order_items:",o),new Error("Не удалось добавить продукты в заказ.")}if(i)try{const o={order_id:d,country:i.country||null,region:i.region||null,city:i.city||null,address:i.address||null},{error:n}=await a.from("order_delivery_details").insert([o]);if(n)throw await this.rollbackOrder(d,"order_delivery_details"),n}catch(o){throw console.error("Ошибка (C) при вставке в order_delivery_details:",o),new Error("Не удалось добавить детали доставки.")}return d}async getOrders(){const{data:{user:r}}=await a.auth.getUser();if(!r)throw new Error("Необходимо авторизоваться для просмотра заказов.");const t=r.id;try{const{data:e,error:i}=await a.from("orders").select(`
                    *,
                    order_items (
                        product_id,
                        quantity
                    ),
                    order_delivery_details (
                        country,
                        region,
                        city,
                        address
                    )
                `).eq("user_id",t).order("created_at",{ascending:!1});if(i)throw console.error("Ошибка Supabase при получении заказов:",i),new Error(i.message||"Не удалось получить список заказов.");return e}catch(e){throw console.error("Ошибка в ordersApi.getOrders:",e),e}}async getOrderById(r){if(!r)throw new Error("ID заказа не указан.");try{const{data:t,error:e}=await a.from("order_items").select(`
            product_id,
            quantity
        `).eq("order_id",r);if(e)throw console.error("Ошибка Supabase при получении order_items:",e),new Error(e.message||"Не удалось получить позиции заказа.");if(!t||t.length===0){const{error:s}=await a.from("orders").select("id",{count:"exact"}).eq("id",r).single();if(s&&s.code==="PGRST116")throw new Error(`Заказ с ID ${r} не найден.`);return{items:[],products:[]}}const i=t.map(s=>({productId:String(s.product_id),quantity:s.quantity})),d=Array.from(new Set(t.map(s=>s.product_id))),{data:o,error:n}=await a.from("products").select(`
            *,
            product_images (*),
            product_flavors (flavors (*), flavor_id),
            packaging_types (*),
            product_statuses (*)
        `).in("id",d);if(n)throw console.error("Ошибка Supabase при получении products:",n),new Error(n.message||"Не удалось получить данные о продуктах.");return{items:i,products:o}}catch(t){throw console.error("Ошибка в ordersApi.getOrderById:",t),t}}generateOrderNumber(){return Date.now().toString().slice(-8)+Math.random().toString(36).substring(2,6)}async rollbackOrder(r,t){console.warn(`Попытка отката заказа ${r} после ошибки на шаге: ${t}`);try{const{error:e}=await a.from("orders").delete().eq("id",r);if(e)throw e;console.warn(`Успешно откатили неполный заказ ${r}.`)}catch(e){console.error(`Критическая ошибка при откате заказа ${r}. Требуется ручная чистка!`,e)}}}const w=new c;export{w as o};
