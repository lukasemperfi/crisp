export function AboutDresses(container, props = {}) {
  const { className = "" } = props;

  const _container =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!_container) {
    throw new Error("AboutDresses: container not found");
  }

  const render = () => {
    _container.innerHTML = `
        <div class="about-dresses ${className}">
          <h3 class="about-dresses__title">About Dresses</h3>
          <p class="about-dresses__text">
            Every day we’re gonna be dropping the latest trends to help you nail every Summer sitch. Whether it’s a
            graduation, your mate's wedding, or just a cute day at the races with the gals, our occasion dresses
            have got you covered. Not looking for something fancy? No stress. We’ve got day dresses for days (aka
            bodycon dresses, t-shirt dresses, oversized shirt dresses).
          </p>
        </div>
      `;
  };

  render();

  return {
    render,
  };
}
