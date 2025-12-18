export function createSpinner(initialProps = {}) {
  let props = {
    size: 32,
    color: "#93B474",
    className: "",
    visible: true,
    ...initialProps,
  };

  const el = document.createElement("div");

  function render() {
    el.className = `spinner ${props.className}`.trim();

    el.innerHTML = `
      <div class="spinner__circle"></div>
    `;

    const circle = el.querySelector(".spinner__circle");

    circle.style.width = props.size + "px";
    circle.style.height = props.size + "px";
    circle.style.border = `${props.size * 0.1}px solid #e5e5e5`;
    circle.style.borderTopColor = props.color;
    circle.style.borderRadius = "50%";
    circle.style.animation = "spinner-rotate 0.8s linear infinite";

    el.style.display = props.visible ? "inline-block" : "none";
  }

  function mount(parent) {
    parent.appendChild(el);
  }

  function update(newProps = {}) {
    props = { ...props, ...newProps };
    render();
  }

  function destroy() {
    el.remove();
  }

  render();

  return { el, mount, update, destroy };
}
