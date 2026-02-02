import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Dropdown } from "../../../../shared/ui/dropdown/dropdown";
import { countries, regionsByCountry } from "../../../../shared/lib/location";

export function InfoForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit, userProfileData } = props;
      const { first_name = "", last_name = "" } = userProfileData;

      if (runOnce) {
        el.className = "info-form";

        el.innerHTML = `
          <div class="info-form__section info-form__section_personal">
            <h2 class="info-form__title profile-section__section-title">Contact Information</h2>
            <div class="info-form__fields-container" data-group="personal"></div>
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
        };

        el.querySelector('[data-group="personal"]').append(
          fields.first_name,
          fields.last_name
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

          onSubmit?.(formData);
        });

        el._els = { validator };
      }
    },
  });
}
