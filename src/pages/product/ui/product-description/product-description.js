export const renderProductDescription = (containerSelector, description) => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }

  const baseUrl =
    import.meta.env.MODE === "development"
      ? "/"
      : import.meta.env.VITE_PROD_URL || "";

  container.innerHTML = `
    <div class="product-description">
    <div class="product-description__col-1">
        <div class="product-description__image-wrapper">
            <picture>
                <source type="image/webp" srcset="${baseUrl}images/product-details/description.webp">
                <img class="product-description__image" src="${baseUrl}images/product-details/description.jpg" loading="eager" alt="Product Description Image" fetchpriority="high">
            </picture>
        </div>
    </div>
    <div class="product-description__col-2">
       ${description}
    </div>
</div>
    `;
};
