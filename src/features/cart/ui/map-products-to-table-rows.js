export function mapProductsToTableRows(rawProducts, cartItems) {
  if (!Array.isArray(rawProducts)) {
    console.error("mapProductsToTableRows ожидает массив продуктов.");
    return [];
  }

  const quantityMap = new Map();
  cartItems.forEach((item) => {
    quantityMap.set(Number(item.productId), item.quantity);
  });

  const map = quantityMap || new Map();
  const DEFAULT_QUANTITY = 1;

  return rawProducts.map((product) => {
    const id = product.id;
    const quantity = map.get(id) || DEFAULT_QUANTITY;
    const productName = product.title;
    const price = product.discount_price || product.price;
    const total = quantity * price;
    const priceUnit = product.price_unit || "грн";
    const mainImage = product.product_images.find((img) => img.is_main);
    const imageUrl = mainImage ? mainImage.image_path_png : null;
    const sku = product.sku;

    return {
      id,
      productName,
      quantity,
      price,
      total,
      priceUnit,
      imageUrl,
      sku,
    };
  });
}
