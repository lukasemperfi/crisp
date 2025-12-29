import { renderProductList } from "@/entities/product/ui/product-list/product-list";
import { mockProducts } from "@/shared/helpers/mock-products";
import { productsApi } from "@/entities/product/api/products";
import { productFiltersApi } from "@/entities/product/api/filters";
import {
  createProductListStructure,
  appendProducts,
} from "@/entities/product/ui/product-list/product-list";
import { ProductManager } from "@/entities/product/model/product-manager";
import { renderFilterPanel } from "@/features/product-filters/ui/product-filters";

export const initProducts = async () => {
  const filterConfig = [
    {
      id: "brand",
      title: "Brand",
      type: "checkbox-list",
      defaultOpen: true,
      options: [
        { id: 1, label: "STATE" },
        { id: 2, label: "COOPER" },
      ],
    },
    {
      id: "size",
      title: "Size (Inches)",
      type: "size-grid",
      defaultOpen: true,
      options: ["W26", "W27", "W28", "W30"],
    },
    {
      id: "length",
      title: "Dress length",
      type: "checkbox-list",
      defaultOpen: false,
      options: [
        { id: "short", label: "SHORT" },
        { id: "midi", label: "MIDI" },
      ],
    },
  ];

  renderFilterPanel(".products__aside", filterConfig);

  const productsManager = new ProductManager({
    containerSelector: ".products__main",
    fetchFn: productsApi.getAllProducts,
    limit: 8,
    initialFilters: { sort: "asc" },
  });

  await productsManager.init(createProductListStructure, appendProducts);

  // productsManager.updateFilters({ brands: [1, 2] });
};
