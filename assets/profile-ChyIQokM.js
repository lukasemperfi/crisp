import{c}from"./footer-CUK9rPsn.js";class y{async getProfile(){const{data:{user:i},error:l}=await c.auth.getUser();if(l||!i){if(l)throw l;return null}const e=i.id;try{const{data:n,error:f}=await c.from("profiles").select(`
                    *,
                    fop_details (
                        edrpou,
                        country,
                        region,
                        city,
                        address
                    ),
                    legal_entity_details (
                        okpo,
                        country,
                        region,
                        city,
                        address,
                        postal_code
                    )
                `).eq("id",e).maybeSingle();if(f)throw console.error("Ошибка Supabase при получении профиля:",f),f;return n}catch(n){throw console.error("Ошибка в authApi.getProfile:",n),n}}async updateProfile(i){const{data:{user:l}}=await c.auth.getUser();if(!l)throw new Error("Необходимо авторизоваться для обновления профиля.");const e=l.id,n=h(i),f=i.person_type;let a=null;const r=i.upload_file;if(r&&r.name){const o=r.name.split(".").pop(),t=`${e}.${o}`,{error:p}=await c.storage.from("avatars").upload(t,r,{cacheControl:"no-cache",upsert:!0});p&&console.warn("Предупреждение: Ошибка загрузки аватара, продолжение регистрации:",p.message);const{data:d}=c.storage.from("avatars").getPublicUrl(t);a=d.publicUrl}const u={...n,avatar_url:a};if(Object.keys(u).length>0)try{const{error:o}=await c.from("profiles").update(u).eq("id",e);if(o)throw o}catch(o){throw console.error("Ошибка при обновлении таблицы 'profiles':",o),new Error("Не удалось обновить основные данные профиля.")}if(f==="fop"){const o=g(i);if(o)try{const{error:t}=await c.from("fop_details").upsert({...o,profile_id:e},{onConflict:"profile_id"});if(t)throw t}catch(t){throw console.error("Ошибка при upsert 'fop_details':",t),new Error("Не удалось обновить детали ФОП.")}}else if(f==="legal"){const o=i.legal_entity;if(o)try{const{error:t}=await c.from("legal_entity_details").upsert({...o,profile_id:e},{onConflict:"profile_id"});if(t)throw t}catch(t){throw console.error("Ошибка при upsert 'legal_entity_details':",t),new Error("Не удалось обновить детали юр.лица.")}}return!0}}const w=new y,h=s=>{const i=["full_name","phone","country","region","city","address","person_type","avatar_url"];return Object.keys(s).reduce((l,e)=>(i.includes(e)&&s[e]!==void 0&&(l[e]=s[e]),l),{})},g=(s,i)=>{const e=["edrpou","country","region","city","address"],n="edrpou";return Object.keys(s).some(a=>e.includes(a)&&s[a]!==void 0)?Object.keys(s).reduce((a,r)=>(e.includes(r)&&s[r]!==void 0&&(r==="okpo"||r==="edrpou"?a[n]=s[r]:a[r]=s[r]),a),{}):null};export{w as u};
