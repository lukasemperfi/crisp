import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { baseUrl } from "@/shared/helpers/base-url";

export function LoginForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const {
        onSubmit,
        fieldsConfig = {},
        texts = {
          title: "login your account",
          submitBtn: "sign in",
          regBtn: "Create an Account",
        },
      } = props;

      if (runOnce) {
        el.className = "checkout-login-form";

        el.innerHTML = `
          <div class="checkout-login-form__section">
            <div class="checkout-login-form__fields-container" data-group="auth"></div>
          </div>

          <p>You already have an account with us. Sign in or continue as guest.</p>

          <div class="checkout-login-form__actions">
            <button type="submit" class="button button_solid button_black checkout-login-form__btn-login">
              Login
            </button>
            <a href="#" name="forgot password" class="checkout-login-form__forgot-password">Forgot Your Password?</a>
          </div>
        `;

        const fields = {
          email: FormField({
            label:
              fieldsConfig.email?.label ||
              `Email Address <span class="highlight-required">*</span>`,
            inputProps: {
              name: "email",
              type: "email",
              id: "reg-email",
              placeholder: "example@mail.com",
              ...fieldsConfig.email?.inputProps,
            },
          }),
          password: FormField({
            label:
              fieldsConfig.password?.label ||
              `Password <span class="highlight-required">*</span>`,
            inputProps: {
              name: "password",
              type: "password",
              id: "reg-pass",
              placeholder: "********",
              ...fieldsConfig.password?.inputProps,
            },
          }),
        };

        el.querySelector('[data-group="auth"]').append(
          fields.email,
          fields.password,
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

        addValidatedField(
          fields.email,
          "#reg-email",
          fieldsConfig.email?.rules || [
            { rule: "required", errorMessage: "Email is required" },
            { rule: "email", errorMessage: "Email is invalid" },
          ],
        );

        addValidatedField(
          fields.password,
          "#reg-pass",
          fieldsConfig.password?.rules || [
            { rule: "required", errorMessage: "Password is required" },
            { rule: "minLength", value: 8 },
          ],
        );

        validator.onValidate(({ fields }) => {
          Object.values(fields).forEach((field) => {
            const formField = field.elem?.closest(".form-field");
            const isValidField = field.isValid;

            if (!formField) return;

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

        el._els = { validator };
      }
    },
  });
}
