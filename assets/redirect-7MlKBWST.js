function i(e,t=0,o=!1){if(typeof e!="string"||!e.trim())throw new Error("URL must be a non-empty string");setTimeout(()=>{o?window.location.replace(e):window.location.href=e},t)}export{i as r};
