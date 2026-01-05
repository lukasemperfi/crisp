import { productsApi } from "@/entities/product/api/products";
import { ProductDetailsCard } from "@/entities/product/ui/product-details-card/product-details-card";

export const initProductContent = async () => {
  // const product = await productsApi.getProductById(
  //   "12d7e202-e133-403d-8560-129bc987ed98"
  // );

  ProductDetailsCard({
    container: ".product-content__card",
    product: mockProduct,
  });
};

const mockProduct = {
  id: "12d7e202-e133-403d-8560-129bc987ed98",
  brand_id: 15,
  name: "Women Black Checked Fit and Flare Dress",
  description: "High-quality fabric and modern design for your perfect look.",
  base_price: 238.69,
  discount_percent: 20,
  created_at: "2025-12-28T13:49:23.703911+00:00",
  length_id: 1,
  final_price: 190.95,
  is_featured: false,
  is_popular: false,
  brand: {
    id: 15,
    name: "Fendi",
    created_at: "2025-12-28T13:49:23.703911+00:00",
  },
  images: [
    {
      id: 302,
      is_main: true,
      created_at: "2025-12-28T13:49:23.703911+00:00",
      product_id: "12d7e202-e133-403d-8560-129bc987ed98",
      sort_order: 1,
      image_path_jpg:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.jpg",
      image_path_webp:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.webp",
    },
    {
      id: 303,
      is_main: false,
      created_at: "2025-12-28T13:49:23.703911+00:00",
      product_id: "12d7e202-e133-403d-8560-129bc987ed98",
      sort_order: 2,
      image_path_jpg:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.jpg",
      image_path_webp:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.webp",
    },
    {
      id: 320,
      is_main: false,
      created_at: "2026-01-04T23:08:21.851541+00:00",
      product_id: "12d7e202-e133-403d-8560-129bc987ed98",
      sort_order: 3,
      image_path_jpg:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.jpg",
      image_path_webp:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.webp",
    },
  ],
  length: {
    id: 1,
    name: "short",
    created_at: "2025-12-28T14:05:37.264663+00:00",
    sort_order: 1,
  },
  variants: [
    {
      id: 671,
      size: {
        id: 34,
        name: "w32",
        created_at: "2025-12-28T13:49:23.703911+00:00",
        sort_order: 80,
      },
      color: {
        id: 19,
        name: "Red",
        hex_code: "#FF0000",
        created_at: "2025-12-28T13:49:23.703911+00:00",
      },
      stock: 21,
    },
    {
      id: 672,
      size: {
        id: 46,
        name: "w52",
        created_at: "2025-12-28T13:49:23.703911+00:00",
        sort_order: 200,
      },
      color: {
        id: 19,
        name: "Red",
        hex_code: "#FF0000",
        created_at: "2025-12-28T13:49:23.703911+00:00",
      },
      stock: 7,
    },
    {
      id: 673,
      size: {
        id: 35,
        name: "w33",
        created_at: "2025-12-28T13:49:23.703911+00:00",
        sort_order: 90,
      },
      color: {
        id: 16,
        name: "Black",
        hex_code: "#000000",
        created_at: "2025-12-28T13:49:23.703911+00:00",
      },
      stock: 12,
    },
    {
      id: 674,
      size: {
        id: 28,
        name: "w26",
        created_at: "2025-12-28T13:49:23.703911+00:00",
        sort_order: 20,
      },
      color: {
        id: 16,
        name: "Black",
        hex_code: "#000000",
        created_at: "2025-12-28T13:49:23.703911+00:00",
      },
      stock: 14,
    },
  ],
  tags: [
    {
      tag: {
        id: 15,
        name: "Top Women",
        sort_order: 3,
      },
    },
    {
      tag: {
        id: 16,
        name: "Collection: Summer",
        sort_order: 4,
      },
    },
  ],
};
