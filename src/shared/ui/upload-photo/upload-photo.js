export function initUploadPhoto() {
  const block = document.querySelector("[data-upload-photo]");
  if (!block) {
    return;
  }

  const input = block.querySelector("[data-upload-input]");
  const preview = block.querySelector("[data-upload-preview]");
  const text = block.querySelector("[data-upload-text]");
  const removeBtn = block.querySelector("[data-upload-remove]");

  const placeholder = block.dataset.placeholder;

  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (ev) => {
      preview.src = ev.target.result;
      block.classList.add("upload-photo_has-image");
      text.textContent = "Изменить фото";
    };

    reader.readAsDataURL(file);
  });

  removeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    input.value = "";

    preview.src = placeholder;
    text.textContent = "Загрузить фото";

    block.classList.remove("upload-photo_has-image");
  });
}
