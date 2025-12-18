import { initProductFilters } from "@/features/product-filters/ui/product-filters-bar";
import { filteredProductList } from "@/entities/product/ui/product-list/product-list";

export const initProductsSection = () => {
  initProductFilters();
  filteredProductList(".products__catalog");
};
