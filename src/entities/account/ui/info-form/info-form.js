import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";

export function InfoForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit, userProfileData = {} } = props;
      const { first_name = "", last_name = "" } = userProfileData;

      if (runOnce) {
        el.className = "info-form";

        el.innerHTML = `
          <div class="info-form__section info-form__section_personal">
            <h2 class="info-form__title profile-section__section-title">Contact Information</h2>
            <div class="info-form__fields-container" data-group="personal"></div>
          </div>
          
          <div class="info-form__section">
            <div class="info-form__fields-container" data-group="is_change"></div>
          </div>

          <div class="info-form__section">
            <div class="info-form__fields-container" data-group="auth"></div>
          </div>

          <div class="info-form__actions">
            <button type="submit" class="info-form__btn-submit button button_solid button_black">
              Save
            </button>
          </div>
        `;

        const fields = {
          first_name: FormField({
            label: `First name <span class="highlight-required">*</span>`,
            inputProps: {
              name: "first_name",
              id: "reg-fn",
              placeholder: "Enter your first name",
              value: first_name,
            },
          }),
          last_name: FormField({
            label: `Last Name <span class="highlight-required">*</span>`,
            inputProps: {
              name: "last_name",
              id: "reg-ln",
              placeholder: "Enter your last name",
              value: last_name,
            },
          }),
          is_change_email: Checkbox({
            label: "Change Email",
            inputProps: { name: "is_change_email", id: "reg-is_change_email" },
          }),
          is_change_password: Checkbox({
            label: "Change Password",
            inputProps: {
              name: "is_change_password",
              id: "reg-is_change_password",
            },
          }),
          email: FormField({
            label: `Email <span class="highlight-required">*</span>`,
            inputProps: {
              name: "email",
              type: "email",
              id: "reg-email",
              placeholder: "example@mail.com",
            },
          }),
          password: FormField({
            label: `Password <span class="highlight-required">*</span>`,
            inputProps: {
              name: "password",
              type: "password",
              id: "reg-pass",
              placeholder: "********",
            },
          }),
          confirm_password: FormField({
            label: `Confirm Password <span class="highlight-required">*</span>`,
            inputProps: {
              name: "confirm_password",
              type: "password",
              id: "reg-confirm",
              placeholder: "********",
            },
          }),
        };

        el.querySelector('[data-group="personal"]').append(
          fields.first_name,
          fields.last_name,
        );
        el.querySelector('[data-group="is_change"]').append(
          fields.is_change_email,
          fields.is_change_password,
        );
        el.querySelector('[data-group="auth"]').append(
          fields.email,
          fields.password,
          fields.confirm_password,
        );

        const validator = new JustValidate(el, {
          errorLabelStyle: undefined,
          errorsContainer: ".form-field__message-text",
          validateBeforeSubmitting: true,
        });

        const addValidatedField = (fieldComponent, id, rules) => {
          if (validator.fields[id]) return;
          validator.addField(id, rules, {
            errorsContainer: fieldComponent.querySelector(
              ".form-field__message-text",
            ),
          });
        };

        const removeValidatedField = (id, fieldComponent) => {
          if (validator.fields[id]) {
            validator.removeField(id);
            fieldComponent.classList.remove("form-field_message-default");
          }
        };

        addValidatedField(fields.first_name, "#reg-fn", [
          { rule: "required", errorMessage: "First name is required" },
        ]);
        addValidatedField(fields.last_name, "#reg-ln", [
          { rule: "required", errorMessage: "Last name is required" },
        ]);

        const toggleEmailFields = () => {
          const isActive =
            fields.is_change_email.querySelector("input").checked;
          fields.email.style.display = isActive ? "" : "none";

          if (isActive) {
            addValidatedField(fields.email, "#reg-email", [
              { rule: "required", errorMessage: "Email is required" },
              { rule: "email", errorMessage: "Email is invalid" },
            ]);
          } else {
            removeValidatedField("#reg-email", fields.email);
          }
        };

        const togglePasswordFields = () => {
          const isActive =
            fields.is_change_password.querySelector("input").checked;
          const displayStyle = isActive ? "" : "none";
          fields.password.style.display = displayStyle;
          fields.confirm_password.style.display = displayStyle;

          if (isActive) {
            addValidatedField(fields.password, "#reg-pass", [
              { rule: "required", errorMessage: "Password is required" },
              { rule: "minLength", value: 8 },
            ]);
            addValidatedField(fields.confirm_password, "#reg-confirm", [
              {
                rule: "required",
                errorMessage: "Please confirm your password",
              },
              {
                validator: (value, fields) =>
                  value === fields["#reg-pass"].elem.value,
                errorMessage: "Passwords should match",
              },
            ]);
          } else {
            removeValidatedField("#reg-pass", fields.password);
            removeValidatedField("#reg-confirm", fields.confirm_password);
          }
        };

        fields.is_change_email.addEventListener("change", toggleEmailFields);
        fields.is_change_password.addEventListener(
          "change",
          togglePasswordFields,
        );

        toggleEmailFields();
        togglePasswordFields();

        validator.onValidate(({ fields }) => {
          Object.values(fields).forEach((field) => {
            const formField = field.elem?.closest(".form-field");
            if (!formField) return;

            if (!field.isValid) {
              formField.classList.add("form-field_message-default");
            } else {
              formField.classList.remove("form-field_message-default");
            }
          });
        });

        validator.onSuccess(() => {
          const fullData = Object.fromEntries(new FormData(el));
          const resultData = {
            first_name: fullData.first_name,
            last_name: fullData.last_name,
          };

          if (fields.is_change_email.querySelector("input").checked) {
            resultData.email = fullData.email;
          }
          if (fields.is_change_password.querySelector("input").checked) {
            resultData.password = fullData.password;
            resultData.confirm_password = fullData.confirm_password;
          }

          onSubmit?.(resultData);
        });

        el._els = { validator };
      }
    },
  });
}
