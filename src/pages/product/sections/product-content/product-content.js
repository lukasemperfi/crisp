import { productsApi } from "@/entities/product/api/products";
import { ProductDetailsCard } from "@/entities/product/ui/product-details-card/product-details-card";
import { Accordion } from "../../../../shared/ui/accordion/accordion";

export const initProductContent = async () => {
  // const product = await productsApi.getProductById(
  //   "12d7e202-e133-403d-8560-129bc987ed98"
  // );

  ProductDetailsCard({
    container: ".product-content__card",
    product: mockProduct,
  });

  const footerContent = [
    {
      title: "Details",
      content: createAccordionContent(),
      isActive: true,
    },
    {
      title: "Other information",
      content: createAccordionContent(),
    },
    {
      title: "Another tab",
      content: createAccordionContent(),
    },
  ];

  Accordion(".description__col-2", footerContent);
};

const createAccordionContent = () => {
  return `
    <div class="accordion-content">
      <div class="accordion-content__item accordion-content__item_about-product">
        <div class="accordion-content__title">ABOUT PRODUCT</div>
        <div class="accordion-content__content">
          Cool off this summer in the Mini Ruffle Smocked Tank Top from our very own LA Hearts. This tank features a smocked body, adjustable straps, scoop neckline, ruffled hems, and a cropped fit.
        </div>
      </div>
      <div class="accordion-content__item accordion-content__item_shipping">
        <div class="accordion-content__title">SHIPPING</div>
        <div class="accordion-content__content">
          <p>We offer Free Standard Shipping for all orders over $75 to the 50 states and the District of Columbia. The minimum order value must be $75 before taxes, shipping and handling. Shipping fees are non-refundable.</p>
          <p>Please allow up to 2 business days (excluding weekends, holidays, and sale days) to process your order.</p> 
          <p>Processing Time + Shipping Time = Delivery Time</p> 
        </div>
      </div>      
      <div class="accordion-content__item accordion-content__item_advantages">
        <div class="accordion-content__title">ADVANTAGES</div>
        <div class="accordion-content__content">
          <ul class="accordion-content__list">
            <li class="accordion-content__list-item">Smocked body</li>
            <li class="accordion-content__list-item">Adjustable straps</li>
            <li class="accordion-content__list-item">Scoop neckline</li>
            <li class="accordion-content__list-item">Ruffled hems</li>
            <li class="accordion-content__list-item">Cropped length</li>
            <li class="accordion-content__list-item">Model is wearing a small</li>
            <li class="accordion-content__list-item">100% rayon</li>
            <li class="accordion-content__list-item">Machine washable</li>
          </ul>
        </div>
      </div>
      <div class="accordion-content__item accordion-content__item_advantages-2">
        <div class="accordion-content__title">ADVANTAGES</div>
        <div class="accordion-content__content">
          <ul class="accordion-content__list">
            <li class="accordion-content__list-item">Smocked body</li>
            <li class="accordion-content__list-item">Adjustable straps</li>
            <li class="accordion-content__list-item">Scoop neckline</li>
          </ul>
        </div>
      </div>
    </div>
  `;
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
        name: "w34",
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
