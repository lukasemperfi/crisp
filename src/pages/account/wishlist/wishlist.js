import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initBreadcrumbs } from "@/widgets/breadcrumbs/breadcrumbs";
import { initProfileSection } from "../sections/profile-section/profile-section";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { userProfileApi } from "../../../entities/account/api/profile";
import { delay } from "../../../shared/helpers/delay";
import {
  ProductList,
  ProductList2,
} from "../../../entities/product/ui/product-list/product-list";
import { mockProducts } from "../../../shared/helpers/mock-products";
import { createProductCard } from "../../../entities/product/ui/product-card/product-card";
import { IconCross, IconEdit, IconHeart } from "@/shared/ui/icons/icons";
import { CartProductCard } from "../../../features/cart/ui/cart-product-card/cart-product-card";

document.addEventListener("DOMContentLoaded", async () => {
  initHeader();
  initBreadcrumbs(".wishlist-page__breadcrumbs");
  initProfileSection();
  initPageFooter();

  let currentPage = 0;

  document.querySelector(".profile-section__content").append(Wihslist());
});

function Wihslist() {
  const el = document.createElement("div");
  el.className = "wishlist";

  el.innerHTML = `
    <div class="wishlist__actions">
      <button class="button button_elevated button_gray">share wish list</button>
      <button class="button button_elevated button_gray">update wish list</button>
      <button class="button button_elevated button_gray">Add all to cart</button>
    </div>  
  `;

  // const loadProducts = async () => {
  //   const { data, count } = await productsApi.getAllProducts({
  //     ...urlParams,
  //     page: currentPage,
  //     limit: queryState.limit,
  //     sort: queryState.sort,
  //   });
  //   console.log("data", data);

  //   productList.appendProducts(data);

  //   initCatalogListBanner(banner);

  //   if (currentPage !== queryState.page || currentPage > 0) {
  //     updateUrlPage(currentPage);
  //   }

  //   if ((currentPage + 1) * queryState.limit >= count) {
  //     productList.hideLoadMore();
  //   } else {
  //     productList.showLoadMore();
  //   }

  //   currentPage++;
  // };
  console.log(viewItems);
  const productList2 = new ProductList2({
    initialProducts: viewItems,
    renderItem: (product) => WihslistCard(product),
  });

  el.prepend(productList2.getElement());

  return el;
}

function WihslistCard(product) {
  const el = document.createElement("div");

  el.className = "wishlist-card";

  el.innerHTML = `
    <div class="wishlist-card__actions actions">
      <button class="actions__btn actions__btn_remove">
        ${IconCross()}  
      </button>
      <button class="actions__btn actions__btn_edit">
        ${IconEdit()}
      </button>
    </div>  
  `;

  // const card = createProductCard(product);
  const card = CartProductCard({ product });

  el.prepend(card);

  return el;
}

const viewItems = [
  {
    id: "656f0bb5-5b65-449b-807a-0190c7ea4c83",
    brand_id: 15,
    name: "Dress Model 31",
    description: "High-quality fabric and modern design for your perfect look.",
    base_price: 244.7,
    discount_percent: 10,
    created_at: "2025-12-28T13:49:23.703911+00:00",
    length_id: 5,
    final_price: 220.23,
    is_featured: false,
    is_popular: true,
    brand: {
      id: 15,
      name: "Burberry",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    images: [
      {
        id: 258,
        is_main: true,
        created_at: "2025-12-28T13:49:23.703911+00:00",
        product_id: "656f0bb5-5b65-449b-807a-0190c7ea4c83",
        sort_order: 1,
        image_path_jpg:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.jpg",
        image_path_webp:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.webp",
      },
      {
        id: 259,
        is_main: false,
        created_at: "2025-12-28T13:49:23.703911+00:00",
        product_id: "656f0bb5-5b65-449b-807a-0190c7ea4c83",
        sort_order: 2,
        image_path_jpg:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.jpg",
        image_path_webp:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.webp",
      },
      {
        id: 338,
        is_main: false,
        created_at: "2026-01-04T23:08:21.851541+00:00",
        product_id: "656f0bb5-5b65-449b-807a-0190c7ea4c83",
        sort_order: 3,
        image_path_jpg:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.jpg",
        image_path_webp:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.webp",
      },
    ],
    length: {
      id: 5,
      name: "midi",
      created_at: "2025-12-28T14:05:37.264663+00:00",
      sort_order: 5,
    },
    variants: [
      {
        id: 602,
        size: {
          id: 41,
          name: "w42",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 150,
        },
        color: {
          id: 23,
          name: "Pink",
          hex_code: "#FFC0CB",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 10,
      },
      {
        id: 603,
        size: {
          id: 40,
          name: "w40",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 140,
        },
        color: {
          id: 23,
          name: "Pink",
          hex_code: "#FFC0CB",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 17,
      },
      {
        id: 849,
        size: {
          id: 33,
          name: "w31",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 70,
        },
        color: {
          id: 21,
          name: "Emerald",
          hex_code: "#50C878",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 30,
      },
      {
        id: 850,
        size: {
          id: 43,
          name: "w46",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 170,
        },
        color: {
          id: 27,
          name: "Olive",
          hex_code: "#808000",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 36,
      },
      {
        id: 851,
        size: {
          id: 38,
          name: "w36",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 120,
        },
        color: {
          id: 27,
          name: "Olive",
          hex_code: "#808000",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 86,
      },
      {
        id: 852,
        size: {
          id: 37,
          name: "w35",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 110,
        },
        color: {
          id: 18,
          name: "Navy",
          hex_code: "#000080",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 38,
      },
      {
        id: 853,
        size: {
          id: 44,
          name: "w48",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 180,
        },
        color: {
          id: 16,
          name: "Black",
          hex_code: "#000000",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 49,
      },
    ],
    tags: [
      {
        tag: {
          id: 13,
          name: "Best Sellers",
          sort_order: 1,
        },
      },
    ],
    selectedVariant: {
      id: 603,
      size: {
        id: 40,
        name: "w40",
        created_at: "2025-12-28T13:49:23.703911+00:00",
        sort_order: 140,
      },
      color: {
        id: 23,
        name: "Pink",
        hex_code: "#FFC0CB",
        created_at: "2025-12-28T13:49:23.703911+00:00",
      },
      stock: 17,
    },
    cartItemId: "656f0bb5-5b65-449b-807a-0190c7ea4c83_603",
    quantity: 8,
  },
  {
    id: "7eca71e8-d7f6-4b9c-a37f-cc0e4d5a56d5",
    brand_id: 18,
    name: "Dress Model 35",
    description: "High-quality fabric and modern design for your perfect look.",
    base_price: 204.34,
    discount_percent: 10,
    created_at: "2025-12-28T13:49:23.703911+00:00",
    length_id: 4,
    final_price: 183.91,
    is_featured: false,
    is_popular: false,
    brand: {
      id: 18,
      name: "Versace",
      created_at: "2025-12-28T13:49:23.703911+00:00",
    },
    images: [
      {
        id: 266,
        is_main: true,
        created_at: "2025-12-28T13:49:23.703911+00:00",
        product_id: "7eca71e8-d7f6-4b9c-a37f-cc0e4d5a56d5",
        sort_order: 1,
        image_path_jpg:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.jpg",
        image_path_webp:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.webp",
      },
      {
        id: 267,
        is_main: false,
        created_at: "2025-12-28T13:49:23.703911+00:00",
        product_id: "7eca71e8-d7f6-4b9c-a37f-cc0e4d5a56d5",
        sort_order: 2,
        image_path_jpg:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.jpg",
        image_path_webp:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.webp",
      },
      {
        id: 347,
        is_main: false,
        created_at: "2026-01-04T23:08:21.851541+00:00",
        product_id: "7eca71e8-d7f6-4b9c-a37f-cc0e4d5a56d5",
        sort_order: 3,
        image_path_jpg:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.jpg",
        image_path_webp:
          "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.webp",
      },
    ],
    length: {
      id: 4,
      name: "long",
      created_at: "2025-12-28T14:05:37.264663+00:00",
      sort_order: 4,
    },
    variants: [
      {
        id: 615,
        size: {
          id: 44,
          name: "w48",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 180,
        },
        color: {
          id: 18,
          name: "Navy",
          hex_code: "#000080",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 13,
      },
      {
        id: 616,
        size: {
          id: 28,
          name: "w26",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 20,
        },
        color: {
          id: 18,
          name: "Navy",
          hex_code: "#000080",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 17,
      },
      {
        id: 617,
        size: {
          id: 35,
          name: "w33",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 90,
        },
        color: {
          id: 23,
          name: "Pink",
          hex_code: "#FFC0CB",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 5,
      },
      {
        id: 618,
        size: {
          id: 35,
          name: "w33",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 90,
        },
        color: {
          id: 19,
          name: "Red",
          hex_code: "#FF0000",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 13,
      },
      {
        id: 919,
        size: {
          id: 41,
          name: "w42",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 150,
        },
        color: {
          id: 24,
          name: "Grey",
          hex_code: "#808080",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 49,
      },
      {
        id: 920,
        size: {
          id: 36,
          name: "w34",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 100,
        },
        color: {
          id: 21,
          name: "Emerald",
          hex_code: "#50C878",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 54,
      },
      {
        id: 921,
        size: {
          id: 44,
          name: "w48",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 180,
        },
        color: {
          id: 19,
          name: "Red",
          hex_code: "#FF0000",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 81,
      },
      {
        id: 922,
        size: {
          id: 28,
          name: "w26",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 20,
        },
        color: {
          id: 24,
          name: "Grey",
          hex_code: "#808080",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 6,
      },
      {
        id: 923,
        size: {
          id: 34,
          name: "w32",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 80,
        },
        color: {
          id: 26,
          name: "Yellow",
          hex_code: "#FFFF00",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 44,
      },
      {
        id: 924,
        size: {
          id: 40,
          name: "w40",
          created_at: "2025-12-28T13:49:23.703911+00:00",
          sort_order: 140,
        },
        color: {
          id: 21,
          name: "Emerald",
          hex_code: "#50C878",
          created_at: "2025-12-28T13:49:23.703911+00:00",
        },
        stock: 17,
      },
    ],
    tags: [
      {
        tag: {
          id: 17,
          name: "Collection: Spring",
          sort_order: 5,
        },
      },
      {
        tag: {
          id: 15,
          name: "Top Women",
          sort_order: 3,
        },
      },
    ],
    selectedVariant: {
      id: 618,
      size: {
        id: 35,
        name: "w33",
        created_at: "2025-12-28T13:49:23.703911+00:00",
        sort_order: 90,
      },
      color: {
        id: 19,
        name: "Red",
        hex_code: "#FF0000",
        created_at: "2025-12-28T13:49:23.703911+00:00",
      },
      stock: 13,
    },
    cartItemId: "7eca71e8-d7f6-4b9c-a37f-cc0e4d5a56d5_618",
    quantity: 4,
  },
];
