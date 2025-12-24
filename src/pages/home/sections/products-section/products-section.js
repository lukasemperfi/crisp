import { productList } from "@/entities/product/ui/product-list/product-list";
import { renderProductList } from "@/entities/product/ui/product-list/product-list";
export const initProducts = () => {
  // productList(".products__catalog");
  // renderProductList(productItems, ".products__catalog");
};

const productItems = [
  {
    id: 2,
    title: "Кешью Отборный Жареный",
    sku: "0002",
    description: "Хрустящий кешью, слегка обжаренный без масла.",
    composition: "Кешью 100%",
    energy_value: 574,
    energy_unit: "ккал",
    shelf_life_days: 240,
    storage_conditions: "Хранить в герметичной упаковке",
    weight: 500,
    weight_unit: "г",
    price: 990,
    discount_price: 890,
    packaging_type_id: 2,
    status_id: 2,
    created_at: "2025-10-25T15:45:39.894215+00:00",
    updated_at: "2025-10-25T15:45:39.894215+00:00",
    price_unit: "грн",
    product_images: [
      {
        id: 26,
        is_main: true,
        product_id: 2,
        sort_order: 0,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
      },
      {
        id: 25,
        is_main: false,
        product_id: 2,
        sort_order: 1,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
      },
      {
        id: 27,
        is_main: false,
        product_id: 2,
        sort_order: 2,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
      },
      {
        id: 28,
        is_main: false,
        product_id: 2,
        sort_order: 3,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
      },
      {
        id: 29,
        is_main: false,
        product_id: 2,
        sort_order: 4,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
      },
      {
        id: 30,
        is_main: false,
        product_id: 2,
        sort_order: 5,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
      },
    ],
    product_flavors: [
      {
        flavors: {
          id: 2,
          name: "Жареный",
          value: "fried",
        },
        flavor_id: 2,
      },
      {
        flavors: {
          id: 6,
          name: "Без добавок",
          value: "without-additives",
        },
        flavor_id: 6,
      },
    ],
    packaging_types: {
      id: 2,
      name: "вакуумная",
    },
    product_statuses: {
      id: 2,
      name: "sale",
    },
  },
  {
    id: 3,
    title: "Грецкий Орех Аляска",
    sku: "0003",
    description: "Крупный грецкий орех в скорлупе, новый урожай.",
    composition: "Грецкий орех 100%",
    energy_value: 654,
    energy_unit: "ккал",
    shelf_life_days: 450,
    storage_conditions: "Хранить в скорлупе при t от 0 до 25°C",
    weight: 1000,
    weight_unit: "г",
    price: 750,
    discount_price: null,
    packaging_type_id: 3,
    status_id: 3,
    created_at: "2025-10-25T15:45:39.894215+00:00",
    updated_at: "2025-10-25T15:45:39.894215+00:00",
    price_unit: "грн",
    product_images: [
      {
        id: 31,
        is_main: false,
        product_id: 3,
        sort_order: 0,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
      },
      {
        id: 32,
        is_main: false,
        product_id: 3,
        sort_order: 1,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
      },
      {
        id: 33,
        is_main: true,
        product_id: 3,
        sort_order: 2,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
      },
      {
        id: 34,
        is_main: false,
        product_id: 3,
        sort_order: 3,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
      },
      {
        id: 35,
        is_main: false,
        product_id: 3,
        sort_order: 4,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
      },
      {
        id: 36,
        is_main: false,
        product_id: 3,
        sort_order: 5,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
      },
    ],
    product_flavors: [
      {
        flavors: {
          id: 1,
          name: "Сырой",
          value: "raw",
        },
        flavor_id: 1,
      },
      {
        flavors: {
          id: 5,
          name: "В скорлупе",
          value: "shell",
        },
        flavor_id: 5,
      },
    ],
    packaging_types: {
      id: 3,
      name: "мешочек",
    },
    product_statuses: {
      id: 3,
      name: "new",
    },
  },
  {
    id: 4,
    title: "Арахис Жареный Соленый",
    sku: "0004",
    description: "Классический пивной арахис, обжаренный с морской солью.",
    composition: "Арахис, соль морская",
    energy_value: 567,
    energy_unit: "ккал",
    shelf_life_days: 180,
    storage_conditions: "Хранить вдали от прямых солнечных лучей",
    weight: 200,
    weight_unit: "г",
    price: 180,
    discount_price: null,
    packaging_type_id: 4,
    status_id: 1,
    created_at: "2025-10-25T15:45:39.894215+00:00",
    updated_at: "2025-10-25T15:45:39.894215+00:00",
    price_unit: "грн",
    product_images: [
      {
        id: 40,
        is_main: true,
        product_id: 4,
        sort_order: 0,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
      },
      {
        id: 38,
        is_main: false,
        product_id: 4,
        sort_order: 1,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
      },
      {
        id: 39,
        is_main: false,
        product_id: 4,
        sort_order: 2,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
      },
      {
        id: 37,
        is_main: false,
        product_id: 4,
        sort_order: 3,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
      },
      {
        id: 41,
        is_main: false,
        product_id: 4,
        sort_order: 4,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
      },
      {
        id: 42,
        is_main: false,
        product_id: 4,
        sort_order: 5,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
      },
    ],
    product_flavors: [
      {
        flavors: {
          id: 2,
          name: "Жареный",
          value: "fried",
        },
        flavor_id: 2,
      },
      {
        flavors: {
          id: 3,
          name: "Соленый",
          value: "salted",
        },
        flavor_id: 3,
      },
    ],
    packaging_types: {
      id: 4,
      name: "контейнер",
    },
    product_statuses: {
      id: 1,
      name: "regular",
    },
  },
  {
    id: 20,
    title: "Пекан Сырой Отборный",
    sku: "0020",
    description: "Крупные ядра, натуральный вкус.",
    composition: "Пекан 100%",
    energy_value: 690,
    energy_unit: "ккал",
    shelf_life_days: 300,
    storage_conditions: "Хранить вдали от влаги",
    weight: 250,
    weight_unit: "г",
    price: 600,
    discount_price: null,
    packaging_type_id: 1,
    status_id: 1,
    created_at: "2025-10-25T15:45:39.894215+00:00",
    updated_at: "2025-10-25T15:45:39.894215+00:00",
    price_unit: "грн",
    product_images: [
      {
        id: 133,
        is_main: true,
        product_id: 20,
        sort_order: 0,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
      },
      {
        id: 134,
        is_main: false,
        product_id: 20,
        sort_order: 1,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
      },
      {
        id: 135,
        is_main: false,
        product_id: 20,
        sort_order: 2,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
      },
      {
        id: 136,
        is_main: false,
        product_id: 20,
        sort_order: 3,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
      },
      {
        id: 137,
        is_main: false,
        product_id: 20,
        sort_order: 4,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
      },
      {
        id: 138,
        is_main: false,
        product_id: 20,
        sort_order: 5,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
      },
    ],
    product_flavors: [
      {
        flavors: {
          id: 1,
          name: "Сырой",
          value: "raw",
        },
        flavor_id: 1,
      },
    ],
    packaging_types: {
      id: 1,
      name: "пакет",
    },
    product_statuses: {
      id: 1,
      name: "regular",
    },
  },
  {
    id: 5,
    title: "Фундук Сырой Чищенный",
    sku: "0005",
    description: "Натуральный фундук, отличный источник витамина Е.",
    composition: "Фундук 100%",
    energy_value: 628,
    energy_unit: "ккал",
    shelf_life_days: 300,
    storage_conditions: "Хранить при низкой влажности",
    weight: 250,
    weight_unit: "г",
    price: 520,
    discount_price: null,
    packaging_type_id: 1,
    status_id: 1,
    created_at: "2025-10-25T15:45:39.894215+00:00",
    updated_at: "2025-10-25T15:45:39.894215+00:00",
    price_unit: "грн",
    product_images: [
      {
        id: 47,
        is_main: true,
        product_id: 5,
        sort_order: 0,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
      },
      {
        id: 44,
        is_main: false,
        product_id: 5,
        sort_order: 1,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
      },
      {
        id: 45,
        is_main: false,
        product_id: 5,
        sort_order: 2,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
      },
      {
        id: 46,
        is_main: false,
        product_id: 5,
        sort_order: 3,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
      },
      {
        id: 43,
        is_main: false,
        product_id: 5,
        sort_order: 4,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
      },
      {
        id: 48,
        is_main: false,
        product_id: 5,
        sort_order: 5,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
      },
    ],
    product_flavors: [
      {
        flavors: {
          id: 1,
          name: "Сырой",
          value: "raw",
        },
        flavor_id: 1,
      },
      {
        flavors: {
          id: 6,
          name: "Без добавок",
          value: "without-additives",
        },
        flavor_id: 6,
      },
    ],
    packaging_types: {
      id: 1,
      name: "пакет",
    },
    product_statuses: {
      id: 1,
      name: "regular",
    },
  },
  {
    id: 7,
    title: "Кедровый Орех Отборный",
    sku: "0007",
    description: "Мелкий, ароматный, для салатов и соусов.",
    composition: "Кедровый орех 100%",
    energy_value: 673,
    energy_unit: "ккал",
    shelf_life_days: 180,
    storage_conditions: "Хранить в холодильнике после открытия",
    weight: 200,
    weight_unit: "г",
    price: 850,
    discount_price: null,
    packaging_type_id: 4,
    status_id: 3,
    created_at: "2025-10-25T15:45:39.894215+00:00",
    updated_at: "2025-10-25T15:45:39.894215+00:00",
    price_unit: "грн",
    product_images: [
      {
        id: 55,
        is_main: true,
        product_id: 7,
        sort_order: 0,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
      },
      {
        id: 56,
        is_main: false,
        product_id: 7,
        sort_order: 1,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
      },
      {
        id: 57,
        is_main: false,
        product_id: 7,
        sort_order: 2,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
      },
      {
        id: 58,
        is_main: false,
        product_id: 7,
        sort_order: 3,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
      },
      {
        id: 59,
        is_main: false,
        product_id: 7,
        sort_order: 4,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
      },
      {
        id: 60,
        is_main: false,
        product_id: 7,
        sort_order: 5,
        image_path_png:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
        image_path_webp:
          "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
      },
    ],
    product_flavors: [
      {
        flavors: {
          id: 1,
          name: "Сырой",
          value: "raw",
        },
        flavor_id: 1,
      },
      {
        flavors: {
          id: 6,
          name: "Без добавок",
          value: "without-additives",
        },
        flavor_id: 6,
      },
    ],
    packaging_types: {
      id: 4,
      name: "контейнер",
    },
    product_statuses: {
      id: 3,
      name: "new",
    },
  },
];
