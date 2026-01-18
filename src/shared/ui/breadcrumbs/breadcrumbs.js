export function Breadcrumbs(container) {
  if (!container) {
    console.error("Breadcrumbs Error: container not found.");
    return;
  }

  const template = `
      <nav aria-label="Breadcrumb" class="breadcrumbs">
        <div class="breadcrumbs__content">
          Home / Womens Dress / Angels malu
        </div>
      </nav>
    `;

  container.innerHTML = template;
}
