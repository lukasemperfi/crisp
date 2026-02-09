import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (filters = {}) => {
    return await productsApi._getFilteredProducts(filters);
  };

  getProductById = async (productId, userId = null) => {
    if (!productId) {
      throw new Error("Product ID is required");
    }

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        *,
        brand:brands (*),
        images:product_images (*),
        length:product_lengths (*),
        variants:product_variants (
          id, 
          stock, 
          color:product_colors (*), 
          size:product_sizes (*)
        ),
        tags:product_tags_mapping (
          tag:product_tags (*)
        )
      `
      )
      .eq("id", productId)
      .single();

    if (error) {
      console.error("Error fetching product:", error.message);
      throw error;
    }

    let isInWishlist = false;
    if (userId) {
      const { data: wishlistEntry, error: wishlistError } = await supabase
        .from("wishlists")
        .select("id")
        .eq("user_id", userId)
        .eq("product_id", productId)
        .maybeSingle();

      if (!wishlistError && wishlistEntry) {
        isInWishlist = true;
      }
    }

    return {
      ...data,
      isInWishlist,
    };
  };

  getFeaturedProducts = async (filters = {}) => {
    return await this._getFilteredProducts(filters, "is_featured");
  };

  getPopularProducts = async (filters = {}) => {
    return await this._getFilteredProducts(filters, "is_popular");
  };

  getProductsByIds = async (productIds, userId = null) => {
    if (!productIds || productIds.length === 0) {
      return [];
    }

    const { data: products, error } = await supabase
      .from("products")
      .select(
        `
        *,
        brand:brands (*),
        images:product_images (*),
        length:product_lengths (*),
        variants:product_variants (
          id, 
          stock, 
          color:product_colors (*), 
          size:product_sizes (*)
        ),
        tags:product_tags_mapping (
          tag:product_tags (*)
        )
      `
      )
      .in("id", productIds);

    if (error) {
      console.error("Error fetching products by IDs:", error.message);
      throw error;
    }

    let wishlistProductIds = new Set();

    if (userId) {
      const { data: wishlistData, error: wishlistError } = await supabase
        .from("wishlists")
        .select("product_id")
        .eq("user_id", userId)
        .in("product_id", productIds);

      if (!wishlistError && wishlistData) {
        wishlistProductIds = new Set(
          wishlistData.map((item) => item.product_id)
        );
      }
    }

    return products.map((product) => ({
      ...product,
      isInWishlist: wishlistProductIds.has(product.id),
    }));
  };

  getWishlistProducts = async (userId) => {
    if (!userId) {
      throw new Error("User ID is required to get wishlist products");
    }

    const { data, error } = await supabase
      .from("wishlists")
      .select(
        `
      product:products (
        *,
        brand:brands (*),
        images:product_images (*),
        length:product_lengths (*),
        variants:product_variants (
          id, 
          stock, 
          color:product_colors (*), 
          size:product_sizes (*)
        ),
        tags:product_tags_mapping (
          tag:product_tags (*)
        )
      )
    `
      )
      .eq("user_id", userId);

    if (error) {
      console.error("Error fetching wishlist products:", error.message);
      throw error;
    }

    return data.map((item) => ({
      ...item.product,
      isInWishlist: true,
    }));
  };

  removeFromWishlist = async (userId, productId) => {
    if (!userId) throw new Error("User ID is required");
    if (!productId) throw new Error("Product ID is required");

    const { data, error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (error) {
      console.error("Error removing product from wishlist:", error.message);
      throw error;
    }

    return data;
  };

  addToWishlist = async (userId, productId) => {
    if (!userId) throw new Error("User ID is required");
    if (!productId) throw new Error("Product ID is required");

    const { data: existing, error: checkError } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", userId)
      .eq("product_id", productId);

    if (checkError) {
      console.error("Error checking wishlist:", checkError.message);
      throw checkError;
    }

    if (existing && existing.length > 0) {
      return existing[0];
    }

    const { data, error } = await supabase
      .from("wishlists")
      .insert([
        {
          user_id: userId,
          product_id: productId,
        },
      ])
      .select();

    if (error) {
      console.error("Error adding product to wishlist:", error.message);
      throw error;
    }

    return data[0];
  };

  searchProductsByName = async (query) => {
    if (!query) return [];

    const { data, error } = await supabase
      .from("products")
      .select(
        `
        id,
        name,
        final_price,
        base_price,
        discount_percent,
        is_featured,
        is_popular,
  
        brand:brands (
          id,
          name
        ),
  
        images:product_images (
          id,
          image_path_jpg,
          image_path_webp,
          is_main
        )
      `
      )
      .ilike("name", `%${query}%`)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Search error:", error);
      return [];
    }

    return data;
  };

  _getFilteredProducts = async (
    filters = {},
    flagCondition = null,
    userId = null
  ) => {
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
      ),
      wishlists:wishlists (id, user_id)
    `,
        { count: "exact" }
      )
      .range(from, to);

    if (userId) {
      query = query.eq("wishlists.user_id", userId);
    }

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

    const productsWithWishlist = data.map((product) => ({
      ...product,
      isInWishlist: product.wishlists && product.wishlists.length > 0,
    }));

    return { data: productsWithWishlist, count };
  };
}

export const productsApi = new Products();
