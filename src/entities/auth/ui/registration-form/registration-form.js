import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";

export function RegistrationForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit, onBack } = props;

      if (runOnce) {
        el.className = "registration-form";

        el.innerHTML = `
          <div class="form-section">
            <h2 class="form-title">Personal Information</h2>
            <div class="fields-container" data-group="personal"></div>
            
            <label class="checkbox-label">
              <input type="checkbox" name="isSubscribed" />
              Sign Up for Newsletter
            </label>
          </div>

          <div class="form-section">
            <h2 class="form-title">Sign In Information</h2>
            <div class="fields-container" data-group="auth"></div>
          </div>

          <div class="form-actions">
            <button type="submit" class="btn-submit">Create an Account</button>
            <button type="button" class="btn-back">Back</button>
          </div>
        `;

        const fields = {
          firstName: FormField({
            label: "First name *",
            inputProps: {
              name: "firstName",
              id: "reg-fn",
              placeholder: "Enter your first name",
            },
          }),
          lastName: FormField({
            label: "Last Name *",
            inputProps: {
              name: "lastName",
              id: "reg-ln",
              placeholder: "Enter your last name",
            },
          }),
          email: FormField({
            label: "Email *",
            inputProps: {
              name: "email",
              type: "email",
              id: "reg-email",
              placeholder: "example@mail.com",
            },
          }),
          password: FormField({
            label: "Password *",
            inputProps: {
              name: "password",
              type: "password",
              id: "reg-pass",
              placeholder: "********",
            },
          }),
          confirmPassword: FormField({
            label: "Confirm Password *",
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
        );
        el.querySelector('[data-group="auth"]').append(
          fields.email,
          fields.password,
          fields.confirmPassword,
        );

        const validator = new JustValidate(el, {
          errorFieldCssClass: "form-field_message-secondary",
          successFieldCssClass: "form-field_message-success",
          errorLabelStyle: undefined,
        });

        validator
          .addField("#reg-fn", [
            { rule: "required", errorMessage: "First name is required" },
          ])
          .addField("#reg-ln", [
            { rule: "required", errorMessage: "Last name is required" },
          ])
          .addField("#reg-email", [
            { rule: "required", errorMessage: "Email is required" },
            { rule: "email", errorMessage: "Email is invalid" },
          ])
          .addField("#reg-pass", [
            { rule: "required", errorMessage: "Password is required" },
            { rule: "minLength", value: 8 },
          ])
          .addField("#reg-confirm", [
            { rule: "required", errorMessage: "Please confirm your password" },
            {
              validator: (value, fields) => {
                return value === fields["#reg-pass"].elem.value;
              },
              errorMessage: "Passwords should match",
            },
          ]);

        validator.onSuccess(() => {
          const formData = Object.fromEntries(new FormData(el));
          onSubmit?.(formData);
        });

        el.querySelector(".btn-back").addEventListener("click", () =>
          onBack?.(),
        );

        el._els = { validator };
      }
    },
  });
}
