export function lazyLoadElements(selector = ".lazy", options = {}) {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.01,
  };

  const observerOptions = { ...defaultOptions, ...options };

  const lazyElements = document.querySelectorAll(selector);

  if ("IntersectionObserver" in window) {
    let observedCount = lazyElements.length;

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const targetElement = entry.target;

          loadElement(targetElement, selector);

          const pictureElement = targetElement.closest("picture");
          if (pictureElement) {
            const sources = pictureElement.querySelectorAll(
              "source[data-srcset]"
            );
            sources.forEach((source) => loadElement(source, selector));
          }

          observer.unobserve(targetElement);
          observedCount--;

          if (observedCount === 0) {
            observer.disconnect();
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    lazyElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    lazyElements.forEach((element) => loadElement(element, selector));
  }
}

function loadElement(element, selector) {
  const isIframe = element.tagName.toLowerCase() === "iframe";
  const base = import.meta.env.BASE_URL;

  if (element.dataset.src) {
    element.src = isIframe
      ? element.dataset.src
      : base + element.dataset.src.replace(/^\/+/, "");
    delete element.dataset.src;
  }

  if (element.dataset.srcset) {
    element.srcset = isIframe
      ? element.dataset.srcset
      : base + element.dataset.srcset.replace(/^\/+/, "");
    delete element.dataset.srcset;
  }

  if (element.classList.contains(selector.replace(".", ""))) {
    element.classList.remove(selector.replace(".", ""));
  }
}

// export function initLazyImages({
//   selector = ".lazy",
//   dataAttr = "data-src",
//   rootMargin = "0px 0px 200px 0px",
//   threshold = 0.1,
// } = {}) {
//   const images = document.querySelectorAll(selector);

//   if (images.length === 0) {
//     return;
//   }

//   const observer = new IntersectionObserver(
//     (entries, observer) => {
//       entries.forEach((entry) => {
//         if (!entry.isIntersecting) {
//           return;
//         }

//         const img = entry.target;
//         const src = img.getAttribute(dataAttr);
//         if (!src) {
//           return;
//         }

//         img.src = src;

//         img.onload = () => {
//           img.classList.remove("lazy");
//           img.removeAttribute(dataAttr);
//         };

//         observer.unobserve(img);
//       });

//       if ([...observer.takeRecords()].length === 0) {
//         observer.disconnect();
//       }
//     },
//     { rootMargin, threshold }
//   );

//   images.forEach((img) => observer.observe(img));
// }
