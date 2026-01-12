export function createComponent(initialProps, { tag = "div", create, render }) {
  let props = { ...initialProps };
  const el = create ? create() : document.createElement(tag);

  function emit(event, detail) {
    el.dispatchEvent(new CustomEvent(event, { detail }));
  }

  el.update = (nextProps = {}) => {
    props = { ...props, ...nextProps };
    render(el, props, emit);
  };

  el.getState = () => ({ ...props });

  el.destroy = () => {
    el.remove();
  };

  render(el, props, emit);

  return el;
}

export function createSlot({ content, className = "" }) {
  const el = document.createElement("div");
  if (className) el.className = className;

  if (content instanceof HTMLElement) {
    el.append(content);
  } else if (Array.isArray(content)) {
    content.forEach((c) => {
      if (c instanceof HTMLElement) {
        el.append(c);
      } else {
        el.insertAdjacentHTML("beforeend", c);
      }
    });
  } else {
    el.innerHTML = content || "";
  }

  return el;
}
