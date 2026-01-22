import { productsApi } from "../../../entities/product/api/products";

export async function getCartViewItems(cartItems) {
  if (!cartItems.length) {
    return [];
  }

  const productIds = [...new Set(cartItems.map((item) => item.productId))];
  const products = await productsApi.getProductsByIds(productIds);
  const productMap = new Map(products.map((p) => [p.id, p]));

  return cartItems.flatMap((cartItem) => {
    const product = productMap.get(cartItem.productId);

    if (!product) {
      console.error(`Product ${cartItem.productId} missing in API response`);
      return [];
    }

    const selectedVariant = product.variants?.find(
      (v) => v.id === cartItem.variantId
    );
    if (!selectedVariant) {
      console.error(
        `Variant ${cartItem.variantId} not found for product ${product.id}`
      );
      return [];
    }

    return [
      {
        ...product,
        selectedVariant,
        cartItemId: cartItem.cartItemId,
        variantId: cartItem.variantId,
        quantity: cartItem.quantity,
      },
    ];
  });
}
