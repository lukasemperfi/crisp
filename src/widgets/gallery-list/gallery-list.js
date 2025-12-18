export const initGalleryVideo = (containerSelector) => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }
  const buttons = container.querySelectorAll(
    ".gallery-video-card__play-button"
  );

  const loadAndPlay = (video, card) => {
    if (!video.src) {
      const src = video.dataset.src;
      if (src) {
        video.src = src;
      }
    }
    card.classList.add("gallery-video-card_playing");
    video.play();
  };

  const stopVideo = (video, card) => {
    card.classList.remove("gallery-video-card_playing");
    video.pause();
    video.currentTime = 0;
  };

  const handleClick = (button, e) => {
    const card = button.closest(".gallery-video-card");
    const video = card.querySelector(".gallery-video-card__video");

    const allCards = container.querySelectorAll(".gallery-video-card");

    allCards.forEach((c) => {
      const v = c.querySelector(".gallery-video-card__video");

      if (c !== card) {
        stopVideo(v, c);
      }
    });

    loadAndPlay(video, card);
  };

  const init = () =>
    buttons.forEach((btn) =>
      btn.addEventListener("click", (e) => handleClick(btn, e))
    );

  init();
};
