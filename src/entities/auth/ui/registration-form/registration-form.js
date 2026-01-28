import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "../../../../shared/ui/checkbox/checkbox";

export function RegistrationForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit, onBack } = props;

      if (runOnce) {
        el.className = "registration-form";

        el.innerHTML = `
          <div class="registration-form__section registration-form__section_personal">
            <h2 class="registration-form__title">Personal Information</h2>
            <div class="registration-form__fields-container" data-group="personal"></div>
          </div>

          <div class="registration-form__section">
            <h2 class="registration-form__title">Sign In Information</h2>
            <div class="registration-form__fields-container" data-group="auth"></div>
          </div>

          <div class="registration-form__actions">
            <button type="submit" class="registration-form__btn-submit button button_solid button_black">
              Create an Account
            </button>
            <button type="button" class="registration-form__btn-back button">
              Back
            </button>
          </div>
        `;

        const fields = {
          firstName: FormField({
            label: `First name <span class="highlight-required">*</span>`,
            inputProps: {
              name: "firstName",
              id: "reg-fn",
              placeholder: "Enter your first name",
            },
          }),
          lastName: FormField({
            label: `Last Name <span class="highlight-required">*</span>`,
            inputProps: {
              name: "lastName",
              id: "reg-ln",
              placeholder: "Enter your last name",
            },
          }),
          newsletter: Checkbox({
            label: "Sign Up for Newsletter",
            inputProps: {
              name: "isSubscribed",
              id: "reg-newsletter",
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
          confirmPassword: FormField({
            label: `Confirm Password <span class="highlight-required">*</span>`,
            inputProps: {
              name: "confirmPassword",
              type: "password",
              id: "reg-confirm",
              placeholder: "********",
            },
          }),
        };

        el.querySelector('[data-group="personal"]').append(
          fields.firstName,
          fields.lastName,
          fields.newsletter,
        );

        el.querySelector('[data-group="auth"]').append(
          fields.email,
          fields.password,
          fields.confirmPassword,
        );

        const validator = new JustValidate(el, {
          errorLabelStyle: undefined,
          errorsContainer: ".form-field__message-text",
          validateBeforeSubmitting: true,
        });

        const addValidatedField = (fieldComponent, id, rules) => {
          validator.addField(id, rules, {
            errorsContainer: fieldComponent.querySelector(
              ".form-field__message-text",
            ),
          });
        };

        addValidatedField(fields.firstName, "#reg-fn", [
          { rule: "required", errorMessage: "First name is required" },
        ]);
        addValidatedField(fields.lastName, "#reg-ln", [
          { rule: "required", errorMessage: "Last name is required" },
        ]);

        addValidatedField(fields.email, "#reg-email", [
          { rule: "required", errorMessage: "Email is required" },
          { rule: "email", errorMessage: "Email is invalid" },
        ]);
        addValidatedField(fields.password, "#reg-pass", [
          { rule: "required", errorMessage: "Password is required" },
          { rule: "minLength", value: 8 },
        ]);
        addValidatedField(fields.confirmPassword, "#reg-confirm", [
          { rule: "required", errorMessage: "Please confirm your password" },
          {
            validator: (value, fields) =>
              value === fields["#reg-pass"].elem.value,
            errorMessage: "Passwords should match",
          },
        ]);

        validator.onValidate(({ fields }) => {
          Object.values(fields).forEach((field) => {
            const formField = field.elem?.closest(".form-field");
            const isValidField = field.isValid;

            if (!formField) {
              return;
            }

            if (!isValidField) {
              formField.classList.add("form-field_message-default");
            } else {
              formField.classList.remove("form-field_message-default");
            }
          });
        });

        validator.onSuccess(() => {
          const formData = Object.fromEntries(new FormData(el));
          onSubmit?.(formData);
        });

        el.querySelector(".registration-form__btn-back").addEventListener(
          "click",
          () => onBack?.(),
        );

        el._els = { validator };
      }
    },
  });
}
