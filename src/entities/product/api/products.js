import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (filters = {}) => {
    return await productsApi._getFilteredProducts(filters);
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

  getFeaturedProducts = async (filters = {}) => {
    return await this._getFilteredProducts(filters, "is_featured");
  };

  getPopularProducts = async (filters = {}) => {
    return await this._getFilteredProducts(filters, "is_popular");
  };

  _getFilteredProducts = async (filters = {}, flagCondition = null) => {
    const {
      brand = [],
      size = [],
      color = [],
      length = [],
      tag = [],
      price = {},
      sort = null,
      page = 0,
      limit = 8,
    } = filters;

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

    if (flagCondition) {
      query = query.eq(flagCondition, true);
    }

    if (brand.length) {
      query = query.in("brand_id", brand);
    }
    if (size.length) {
      query = query.in("variants.size_id", size);
    }
    if (color.length) {
      query = query.in("variants.color_id", color);
    }
    if (length.length) {
      query = query.in("length_id", length);
    }
    if (tag.length) {
      query = query.in("product_tags_mapping.tag_id", tag);
    }

    if (price.min != null) {
      query = query.gte("final_price", price.min);
    }
    if (price.max != null) {
      query = query.lte("final_price", price.max);
    }

    switch (sort) {
      case "price_asc":
        query = query.order("final_price", { ascending: true });
        break;
      case "price_desc":
        query = query.order("final_price", { ascending: false });
        break;
      case "new":
      default:
        query = query.order("created_at", { ascending: false });
        break;
    }

    query = query.order("id", { ascending: true });

    const { data, error, count } = await query;
    if (error) throw error;

    return { data, count };
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
