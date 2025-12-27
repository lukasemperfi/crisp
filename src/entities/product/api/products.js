import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (filters = {}) => {
    const {
      brands = [],
      sizes = [],
      colors = [],
      dressLengths = [],
      priceRange = {},
      sort = null,
      limit = 20,
    } = filters;

    let query = supabase
      .from("products")
      .select(
        `
        *,
        brand:brands (*),
        images:product_images (*),
        variants:product_variants!inner (*)
      `
      )
      .limit(limit);

    // Фильтры
    if (brands.length) {
      query = query.in("brand_id", brands);
    }

    if (sizes.length) {
      query = query.in("variants.size", sizes);
    }

    if (colors.length) {
      query = query.in("variants.color", colors);
    }

    if (dressLengths.length) {
      query = query.in("dress_length", dressLengths);
    }

    if (priceRange.min != null) {
      query = query.gte("base_price", priceRange.min);
    }

    if (priceRange.max != null) {
      query = query.lte("base_price", priceRange.max);
    }

    // Сортировка
    if (sort === "asc" || sort === "desc") {
      query = query.order("base_price", { ascending: sort === "asc" });
    }

    const { data, error } = await query;

    if (error) {
      console.error("getAllProducts error:", error);
      throw error;
    }

    return data;
  };

  getProductById = async (id) => {
    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id,
        name,
        description,
        base_price,
        discount_percent,
        dress_length,
        created_at,

        brand:brands (
          id,
          name,
          created_at
        ),

        images:product_images (
          id,
          product_id,
          image_url,
          is_main,
          created_at
        ),

        variants:product_variants (
          id,
          product_id,
          color,
          size,
          stock,
          created_at
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      console.error("getProductById error:", error);
      throw error;
    }

    return data;
  };
}

export const productsApi = new Products();

// getProductsByIds = async (ids = []) => {
//   if (!Array.isArray(ids) || ids.length === 0) {
//     return [];
//   }

//   const { data: products, error } = await supabase
//     .from("products")
//     .select(
//       `
//       *,
//       product_images (*),
//       product_flavors!inner (
//         flavor_id,
//         flavors!inner (*)
//       ),
//       packaging_types (*),
//       product_statuses (*)
//     `
//     )
//     .in("id", ids);

//   if (error) {
//     console.error("Ошибка при получении продуктов по ID:", error.message);
//     return [];
//   }

//   return products;
// };
