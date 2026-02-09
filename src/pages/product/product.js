import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initProductContent } from "./sections/product-content/product-content.js";
import { initRecomendationSection } from "./sections/recomendation-section/recomendation-section.js";
import { productsApi } from "@/entities/product/api/products";
import { supabase } from "../../shared/api/supabase/client.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const user = await supabase.auth.getUser();
  const userId = user?.data?.user?.id || null;
  const product = await productsApi.getProductById(id, userId);

  initHeader();
  initProductContent(product, userId);
  initRecomendationSection();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
