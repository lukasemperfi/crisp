export async function getCartViewItems(cartItems) {
  if (!cartItems.length) return [];

  const productIds = [...new Set(cartItems.map((item) => item.productId))];

  const products = await productApi.getProductsByIds(productIds);
  const productMap = new Map(products.map((p) => [p.id, p]));

  return cartItems.flatMap((cartItem) => {
    const product = productMap.get(cartItem.productId);

    if (!product) {
      console.error(`Product ${cartItem.productId} missing in API response`);
      return [];
    }

    return [
      {
        ...product,
        cartItemId: cartItem.cartItemId,
        variantId: cartItem.variantId,
        quantity: cartItem.quantity,
      },
    ];
  });
}
