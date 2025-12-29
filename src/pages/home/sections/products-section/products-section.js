import { renderProductList } from "@/entities/product/ui/product-list/product-list";
import { mockProducts } from "@/shared/helpers/mock-products";
import { productsApi } from "@/entities/product/api/products";
import { productFiltersApi } from "@/entities/product/api/filters";
import {
  initProductListContainer,
  appendProducts,
} from "@/entities/product/ui/product-list/product-list";
import { ProductManager } from "@/entities/product/model/product-manager";

export const initProducts = async () => {
  const productsManager = new ProductManager({
    containerSelector: ".products__main",
    fetchFn: productsApi.getAllProducts,
    limit: 8,
    initialFilters: { sort: "asc" },
  });

  await productsManager.init(initProductListContainer, appendProducts);

  // Если на странице есть фильтры, просто вызывайте:
  // productsManager.updateFilters({ brands: [1, 2] });
};
