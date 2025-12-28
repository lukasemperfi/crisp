import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer";
import { initHeroSection } from "./sections/hero-section/hero-section";
import { initProducts } from "./sections/products-section/products-section";
import { initFeaturedProductsSection } from "./sections/featured-products-section/featured-products-section";
import { initBlogSection } from "./sections/blog-section/blog-section";
import { productsApi } from "@/entities/product/api/products";
import { productFiltersApi } from "@/entities/product/api/filters";

// const filters = {
//   brands: [1, 3],
//   sizes: [4, 7],
//   colors: [1,6],
//   lengths: [2],
//   priceRange: {
//     min: 50,
//     max: 100
//   },
//   sort: "asc",
//   limit: 10
// };

document.addEventListener("DOMContentLoaded", async () => {
  const filters = await productFiltersApi.getFilters();

  console.log(filters);

  // const tags = await productFiltersApi.getTags();
  // console.log(tags);

  const products = await productsApi.getAllProducts({ lengths: [2] });

  console.log("products", products);

  const product = await productsApi.getProductById(
    "7f6b929a-c835-47db-9687-a412d76eba2d"
  );
  console.log(product);

  initHeader();
  initHeroSection();
  initProducts();
  initFeaturedProductsSection();
  initBlogSection();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
