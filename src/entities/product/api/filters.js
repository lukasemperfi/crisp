import { supabase } from "@/shared/api/supabase/client.js";

class ProductFilters {
  getTags = async () => {
    const { data, error } = await supabase
      .from("product_tags")
      .select("id, name, sort_order")
      .order("sort_order", { ascending: true });

    if (error) {
      console.error("Error fetching tags:", error);
      throw error;
    }

    return data;
  };
  getFilters = async () => {
    try {
      const [brands, colors, sizes, lengths, tags, priceRange] =
        await Promise.all([
          supabase.from("brands").select("*").order("name"),
          supabase.from("product_colors").select("*").order("name"),
          supabase.from("product_sizes").select("*").order("sort_order"),
          supabase.from("product_lengths").select("*").order("sort_order"),
          this.getTags(),
          supabase.rpc("get_price_range"),
        ]);

      return {
        brands: brands.data,
        colors: colors.data,
        sizes: sizes.data,
        tags: tags,
        lengths: lengths.data,
        priceRange: priceRange.data,
      };
    } catch (error) {
      console.error(error);
    }
  };
}

export const productFiltersApi = new ProductFilters();
