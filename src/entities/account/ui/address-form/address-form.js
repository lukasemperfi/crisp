import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";

export function AddressForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit } = props;

      if (runOnce) {
        el.className = "address-form";

        el.innerHTML = `
          <div class="address-form__section address-form__section_personal">
            <h2 class="address-form__title">Contact Information</h2>
            <div class="address-form__fields-container" data-group="personal"></div>
          </div>

          <div class="address-form__section">
            <h2 class="address-form__title">Address</h2>
            <div class="address-form__fields-container" data-group="auth"></div>
          </div>

          <div class="address-form__actions">
            <button type="submit" class="address-form__btn-submit button button_solid button_black">
              Create an Account
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
            },
          }),
          last_name: FormField({
            label: `Last Name <span class="highlight-required">*</span>`,
            inputProps: {
              name: "last_name",
              id: "reg-ln",
              placeholder: "Enter your last name",
            },
          }),
          company: FormField({
            label: `Company`,
            inputProps: {
              name: "company",
              id: "reg-company",
            },
          }),
          phone_number: FormField({
            label: `Phone Number <span class="highlight-required">*</span>`,
            inputProps: {
              name: "phone_number",
              id: "reg-pn",
            },
          }),
          fax: FormField({
            label: `Fax`,
            inputProps: {
              name: "fax",
              id: "reg-f",
            },
          }),
          street_address: FormField({
            label: `Street Address <span class="highlight-required">*</span>`,
            inputProps: {
              name: "street_address",
              id: "reg-sa",
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
          postal_code: FormField({
            label: `Zip/Postal Code <span class="highlight-required">*</span>`,
            inputProps: {
              name: "postal_code",
              id: "reg-pc",
            },
          }),
        };

        el.querySelector('[data-group="personal"]').append(
          fields.first_name,
          fields.last_name,
          fields.company,
          fields.phone_number,
          fields.fax
        );

        el.querySelector('[data-group="auth"]').append(
          fields.street_address,
          fields.postal_code
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

        addValidatedField(fields.first_name, "#reg-fn", [
          { rule: "required", errorMessage: "First name is required" },
        ]);
        addValidatedField(fields.last_name, "#reg-ln", [
          { rule: "required", errorMessage: "Last name is required" },
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

          formData.is_subscribed_for_newsletter =
            !!formData.is_subscribed_for_newsletter;
          onSubmit?.(formData);
        });

        el._els = { validator };
      }
    },
  });
}
