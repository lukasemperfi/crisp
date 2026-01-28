import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "../../../../shared/ui/checkbox/checkbox";
import { baseUrl } from "../../../../shared/helpers/base-url";

export function LoginForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit } = props;

      if (runOnce) {
        el.className = "login-form";

        el.innerHTML = `

          <div class="login-form__section">
            <h2 class="login-form__title">login your account</h2>
            <div class="login-form__fields-container" data-group="auth"></div>
          </div>

          <div class="login-form__actions">
            <button type="submit" class="button button_outlined button_gray login-form__btn-login">
              sign in
            </button>
            <a href="${baseUrl}registration/" class="button button_solid button_black login-form__btn-registration ">
              Create an Account
            </a>
          </div>
        `;

        const fields = {
          email: FormField({
            inputProps: {
              name: "email",
              type: "email",
              id: "reg-email",
              placeholder: "example@mail.com",
            },
          }),
          password: FormField({
            inputProps: {
              name: "password",
              type: "password",
              id: "reg-pass",
              placeholder: "********",
            },
          }),
          newsletter: Checkbox({
            label:
              "By using this form you agree with the storage and handling of your data by this website.",
            inputProps: {
              name: "isSubscribed",
              id: "reg-newsletter",
            },
          }),
        };

        el.querySelector('[data-group="auth"]').append(
          fields.email,
          fields.password,
          fields.newsletter
        );

        const validator = new JustValidate(el, {
          errorLabelStyle: undefined,
          errorsContainer: ".form-field__message-text",
          validateBeforeSubmitting: true,
        });

        const addValidatedField = (fieldComponent, id, rules) => {
          validator.addField(id, rules, {
            errorsContainer: fieldComponent.querySelector(
              ".form-field__message-text"
            ),
          });
        };

        addValidatedField(fields.email, "#reg-email", [
          { rule: "required", errorMessage: "Email is required" },
          { rule: "email", errorMessage: "Email is invalid" },
        ]);
        addValidatedField(fields.password, "#reg-pass", [
          { rule: "required", errorMessage: "Password is required" },
          { rule: "minLength", value: 8 },
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

          formData.isSubscribed = !!formData.isSubscribed;
          onSubmit?.(formData);
        });

        el._els = { validator };
      }
    },
  });
}
