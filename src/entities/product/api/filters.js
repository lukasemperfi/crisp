import { supabase } from "@/shared/api/supabase/client.js";

class ProductFilters {
  getTags = async () => {
    const { data, error } = await supabase
      .from("product_tags")
      .select("id, name")
      .order("name", { ascending: true });

    if (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }

    return data;
  };
  getFilters = async () => {
    const [brands, variants, tags, products] = await Promise.all([
      supabase.from("brands").select("id, name").order("name"),
      supabase.from("product_variants").select("color, size"),
      this.getTags(),
      supabase.from("products").select("base_price, dress_length"),
    ]);

    const prices = products.data?.map((p) => Number(p.base_price)) || [];

    return {
      brands: brands.data || [],
      tags: tags || [],
      colors: [...new Set(variants.data?.map((v) => v.color))].sort(),
      sizes: [...new Set(variants.data?.map((v) => v.size))].sort(),
      dressLengths: [
        ...new Set(products.data?.map((p) => p.dress_length).filter(Boolean)),
      ].sort(),
      priceRange: {
        min: prices.length ? Math.min(...prices) : 0,
        max: prices.length ? Math.max(...prices) : 0,
      },
    };
  };
}

export const productFiltersApi = new ProductFilters();
