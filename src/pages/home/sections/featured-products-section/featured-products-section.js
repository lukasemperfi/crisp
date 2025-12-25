import { renderSlider } from "@/shared/ui/slider/slider";
import { mockProducts } from "@/shared/helpers/mock-products";
import { createProductCard } from "../../../../entities/product/ui/product-card/product-card";

export const initFeaturedProductsSection = () => {
  renderSlider({
    container: ".featured-products__slider",
    items: mockProducts,
    renderItem: (product) => {
      const card = createProductCard(product);

      return card;
    },
    swiperOptions: {
      slidesPerView: "5",
      spaceBetween: 27,
      loop: true,
    },
  });
};
