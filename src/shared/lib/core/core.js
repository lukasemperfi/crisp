export function createComponent(initialProps, { tag = "div", create, render }) {
  let props = { ...initialProps };
  const el = create ? create() : document.createElement(tag);

  el._mounted = el._mounted || false;

  function emit(event, detail) {
    el.dispatchEvent(new CustomEvent(event, { detail }));
  }

  el.update = (nextProps = {}) => {
    props = { ...props, ...nextProps };

    if (!el._mounted) {
      render(el, props, emit, { runOnce: true });
      el._mounted = true;
    } else {
      render(el, props, emit, { runOnce: false });
    }
  };

  el.getState = () => ({ ...props });

  el.destroy = () => {
    el.remove();
  };

  el.toHTML = (overrideProps = {}) => {
    const tempEl = create ? create() : document.createElement(tag);
    const tempProps = { ...props, ...overrideProps };

    render(tempEl, tempProps, () => {}, { runOnce: true });

    return tempEl.outerHTML;
  };

  el.update();

  return el;
}
