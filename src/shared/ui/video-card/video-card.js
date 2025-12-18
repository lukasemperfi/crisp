export const initPlay = (cardSelector) => {
  const cards = document.querySelectorAll(cardSelector);

  const stopVideo = (video, card) => {
    video.pause();
    video.currentTime = 0;
    card.classList.remove("video-card_playing");
  };

  const stopAllVideos = () => {
    cards.forEach((card) => {
      const video = card.querySelector(".video-card__video");
      if (video) {
        stopVideo(video, card);
      }
    });
  };

  const stopOtherVideos = (currentCard) => {
    cards.forEach((card) => {
      if (card !== currentCard) {
        const video = card.querySelector(".video-card__video");
        if (video) {
          stopVideo(video, card);
        }
      }
    });
  };

  cards.forEach((card) => {
    const playButton = card.querySelector(".video-card__button");
    const video = card.querySelector(".video-card__video");

    if (!playButton || !video) {
      return;
    }

    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    playButton.addEventListener("click", () => {
      if (!video.src) {
        video.src = video.dataset.src;
      }

      card.classList.add("video-card_playing");
      video.play();

      stopOtherVideos(card);
    });
  });

  return { stopAllVideos };
};
