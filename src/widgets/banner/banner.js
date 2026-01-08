export const Banner = ({
  pictureProps = {},
  textBlockProps = {},
  className = "",
}) => {
  const renderPictureHtml = (props) => {
    const {
      jpgSrc,
      webpSrc,
      mobileJpgSrc,
      mobileWebpSrc,
      alt = "",
      className = "banner__img",
      breakpoint = 650,
      loading = "eager",
      fetchpriority = "auto",
    } = props;

    const isLazy = loading !== "eager";
    const mediaQuery = `(max-width: ${breakpoint}px)`;
    const lazyAttr = isLazy ? "data-" : "";

    return `
          <picture>
            ${
              mobileWebpSrc
                ? `<source media="${mediaQuery}" type="image/webp" ${lazyAttr}srcset="${mobileWebpSrc}">`
                : ""
            }
            ${
              mobileJpgSrc
                ? `<source media="${mediaQuery}" type="image/jpeg" ${lazyAttr}srcset="${mobileJpgSrc}">`
                : ""
            }
            <source type="image/webp" ${lazyAttr}srcset="${webpSrc}">
            <img 
              class="${className} ${isLazy ? "lazy" : ""}" 
              alt="${alt}" 
              ${loading === "eager" ? 'loading="eager"' : ""} 
              fetchpriority="${fetchpriority}" 
              ${isLazy ? `data-src="${jpgSrc}"` : `src="${jpgSrc}"`}
            >
          </picture>
        `;
  };

  const renderTextBlockHtml = (props) => {
    const {
      title = "EXPLORE THE BEST OF YOU.",
      text = "You can choose the best option for you, and it does not matter whether you are in Prague or San Francisco.",
      buttonText = "shop now",
    } = props;

    return `
          <div class="text-block">
            <div class="text-block__title">${title}</div>
            <div class="text-block__text">${text}</div>
            <button class="button button_outlined">${buttonText}</button>
          </div>
        `;
  };

  const bannerElement = document.createElement("div");
  bannerElement.className = `banner ${className}`.trim();

  bannerElement.innerHTML = `
      <div class="banner__wrapper">
        ${renderPictureHtml({ ...pictureProps, className: "banner__img" })}
        ${renderTextBlockHtml(textBlockProps)}
      </div>
    `;

  return bannerElement;
};
