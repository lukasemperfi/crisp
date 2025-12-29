import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (
    filters = {},
    pagination = { page: 0, limit: 24 }
  ) => {
    const {
      brands = [],
      sizes = [],
      colors = [],
      lengths = [],
      tags = [],
      priceRange = {},
      sort = null,
    } = filters;

    const { page, limit } = pagination;

    const from = page * limit;
    const to = from + limit - 1;

    let query = supabase
      .from("products")
      .select(
        `
      *,
      brand:brands (*),
      images:product_images (*),
      length:product_lengths (*),
      variants:product_variants!inner (
        id, stock, color:product_colors (*), size:product_sizes (*)
      ),
      tags:product_tags_mapping!inner (
        tag:product_tags (*)
      )
    `,
        { count: "exact" }
      )
      .range(from, to);

    if (brands.length) {
      query = query.in("brand_id", brands);
    }
    if (sizes.length) {
      query = query.in("variants.size_id", sizes);
    }
    if (colors.length) {
      query = query.in("variants.color_id", colors);
    }
    if (lengths.length) {
      query = query.in("length_id", lengths);
    }
    if (tags.length) {
      query = query.in("product_tags_mapping.tag_id", tags);
    }
    if (priceRange.min != null) {
      query = query.gte("base_price", priceRange.min);
    }
    if (priceRange.max != null) {
      query = query.lte("base_price", priceRange.max);
    }

    if (sort === "asc" || sort === "desc") {
      query = query
        .order("final_price", { ascending: sort === "asc" })
        .order("id", { ascending: true });
    } else {
      query = query
        .order("created_at", { ascending: false })
        .order("id", { ascending: true });
    }

    const { data, error, count } = await query;

    if (error) {
      throw error;
    }

    return { data, count };
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
      created_at,
      length:product_lengths (id, name),
      brand:brands (
        id,
        name,
        created_at
      ),

      images:product_images (
        id,
        product_id,
        image_path_jpg,
        image_path_webp,
        is_main,
        sort_order,
        created_at
      ),

      variants:product_variants (
        id,
        product_id,
        stock,
        created_at,
        color:product_colors (
          id,
          name,
          hex_code
        ),
        size:product_sizes (
          id,
          name,
          sort_order
        )
      ),

      tags:product_tags_mapping (
        tag:product_tags (*)
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
