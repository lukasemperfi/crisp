import { productList } from "@/entities/product/ui/product-list/product-list";
import { renderProductList } from "@/entities/product/ui/product-list/product-list";
import { mockProducts } from "@/shared/helpers/mock-products";
export const initProducts = () => {
  // productList(".products__catalog");
  renderProductList(mockProducts, ".products__main");
};
