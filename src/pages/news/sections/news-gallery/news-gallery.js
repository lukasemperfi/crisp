import { initPlay } from "@/shared/ui/video-card/video-card.js";
export const initNewsGallerySection = () => {
  initPlay(".news-video-card");
  enableVideoControls();
};

function enableVideoControls() {
  const cards = document.querySelectorAll(".news-video-card");

  cards.forEach((card) => {
    const videos = card.querySelectorAll(".video-card__video");
    videos.forEach((video) => {
      video.controls = true;
      video.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });
    });
  });
}
