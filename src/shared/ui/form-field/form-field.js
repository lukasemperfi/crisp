export const FormField = ({
  placeholder = "",
  messageText = "",
  buttonText = "",
  withButton = false,
}) => {
  const buttonHTML = withButton
    ? `<button type="button" class="form-field__action">${buttonText}</button>`
    : "";

  const formClass = withButton
    ? "form-field form-field_with-button"
    : "form-field";

  return `
    <div class="${formClass}">
      <label class="form-field__label"></label>

      <div class="form-field__control">
        <input
          class="form-field__input"
          placeholder="${placeholder}"
        />
        ${buttonHTML}
      </div>

      <div class="form-field__message">
        <span class="form-field__message-text">${messageText}</span>
        <span class="form-field__message-icon">X</span>
      </div>
    </div>
  `;
};
