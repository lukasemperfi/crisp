export function createOverlaySpinner({
  successText = "Успех!",
  className = "spinner",
  container,
  blockBody = true,
} = {}) {
  let overlay = null;

  if (container) {
    overlay = container;
  } else {
    overlay = document.createElement("div");
  }

  overlay.classList.add("overlay");

  const spinner = createSpinner();
  const successBox = createSuccessBox(successText);
  // Находим элемент текста один раз при инициализации
  const successTextField = successBox.querySelector(".success-text");

  overlay.appendChild(spinner);
  overlay.appendChild(successBox);
  document.body.appendChild(overlay);

  function show() {
    overlay.classList.add("show");

    if (blockBody) {
      document.body.style.overflow = "hidden";
    }

    spinner.style.display = "flex";
    successBox.style.display = "none";
  }

  function hide() {
    overlay.classList.remove("show");

    if (blockBody) {
      document.body.style.overflow = "";
    }
  }

  function success(customText) {
    if (!overlay.classList.contains("show")) {
      show();
    }

    // Если передан текст, обновляем его в DOM
    if (customText && successTextField) {
      successTextField.textContent = customText;
    }

    spinner.style.display = "none";
    successBox.style.display = "flex";
  }

  return {
    show,
    hide,
    success,
    element: overlay,
  };
}

function createSpinner() {
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  return spinner;
}

function createSuccessBox(successText) {
  const box = document.createElement("div");
  box.className = "overlay-success";
  box.style.display = "none";

  box.innerHTML = `
    <div class="success-icon">✔</div>
    <div class="success-text">${successText}</div>
  `;

  return box;
}
