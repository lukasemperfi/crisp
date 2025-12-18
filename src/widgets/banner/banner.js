export const initBanner = (bannerSelector) => {
  const banner = document.querySelector(bannerSelector);
  const playButton = banner.querySelector(".banner__button");
  const video = banner.querySelector(".banner__video");

  playButton.addEventListener("click", () => {
    if (!video.src) {
      video.src = video.dataset.src;
    }

    banner.classList.add("banner_playing");
    video.play();
  });
};
