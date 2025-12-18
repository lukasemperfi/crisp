import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (filters = {}) => {
    const { flavor = [], weight = [], sort = null } = filters;

    let query = supabase
      .from("products")
      .select(
        `
        *,
        product_images (*),
        product_flavors!inner (
          flavor_id,
          flavors!inner (*)
        ),
        packaging_types (*),
        product_statuses (*)
      `
      )
      .limit(6);

    if (flavor.length > 0) {
      query = query.in("product_flavors.flavors.value", flavor);
    }

    if (weight.length > 0) {
      query = query.in("weight", weight);
    }

    if (sort === "asc" || sort === "desc") {
      query = query.order("price", { ascending: sort === "asc" });
    }

    const { data: products, error } = await query;

    if (error) {
      console.error("Ошибка при получении продуктов:", error.message);
      return [];
    }

    return products;
  };

  getProductById = async (id) => {
    if (!id || isNaN(id)) {
      return null;
    }

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        product_images (
          id,
          image_path_png,
          image_path_webp,
          is_main,
          sort_order
        ),
        product_flavors (
          flavor_id,
          flavors (
            id,
            name,
            value
          )
        ),
        packaging_types (
          id,
          name
        ),
        product_statuses (
          id,
          name
        )
      `
      )
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null;
      console.error("Ошибка при получении продукта:", error);
      return null;
    }

    return data;
  };

  getProductsByIds = async (ids = []) => {
    if (!Array.isArray(ids) || ids.length === 0) {
      return [];
    }

    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
        *,
        product_images (*),
        product_flavors!inner (
          flavor_id,
          flavors!inner (*)
        ),
        packaging_types (*),
        product_statuses (*)
      `
      )
      .in("id", ids);

    if (error) {
      console.error("Ошибка при получении продуктов по ID:", error.message);
      return [];
    }

    return products;
  };
}

export const productsApi = new Products();
