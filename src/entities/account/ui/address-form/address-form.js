import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Dropdown } from "../../../../shared/ui/dropdown/dropdown";
import { countries, regionsByCountry } from "../../../../shared/lib/location";

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

        let currentCountry = "";
        let currentRegion = "";

        const countryDropdown = Dropdown({
          name: "country",
          placeholder: "Please select your country",
          options: countries,
        });

        const stateDropdown = Dropdown({
          name: "state",
          placeholder: "Please select a region, state or province.",
          options: [],
          disabled: true,
        });

        countryDropdown.addEventListener("onChange", (event) => {
          currentCountry = event.detail;
          currentRegion = "";

          const regions = regionsByCountry[currentCountry] || [];

          stateDropdown.update({
            options: regions,
            disabled: regions.length === 0,
            defaultValue: "",
          });

          validator.removeField('select[name="state"]');

          addValidatedField(fields.state_field, 'select[name="state"]', [
            { rule: "required", errorMessage: "State/Region is required" },
          ]);
        });

        stateDropdown.addEventListener("onChange", (event) => {
          currentRegion = event.detail;
        });

        function createDropdownField(labelText, dropdownComponent) {
          const wrapper = document.createElement("div");
          wrapper.className = "form-field";

          wrapper.innerHTML = `
            <label class="form-field__label">${labelText}</label>
            <div class="form-field__control">       
            <div class="form-field__message">
              <span class="form-field__message-text"></span>
              <span class="form-field__message-icon">X</span>
            </div>
          </div>
          `;

          wrapper
            .querySelector(".form-field__control")
            .prepend(dropdownComponent);

          return wrapper;
        }

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
          state_field: createDropdownField(
            `State/Region <span class="highlight-required">*</span>`,
            stateDropdown,
          ),
          country_field: createDropdownField(
            `Country <span class="highlight-required">*</span>`,
            countryDropdown,
          ),
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
          fields.fax,
        );

        el.querySelector('[data-group="auth"]').append(
          fields.street_address,
          fields.country_field,
          fields.state_field,
          fields.postal_code,
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

        addValidatedField(fields.first_name, "#reg-fn", [
          { rule: "required", errorMessage: "First name is required" },
        ]);
        addValidatedField(fields.last_name, "#reg-ln", [
          { rule: "required", errorMessage: "Last name is required" },
        ]);

        addValidatedField(fields.phone_number, "#reg-pn", [
          { rule: "required", errorMessage: "Phone number is required" },
          {
            rule: "customRegexp",
            value: /^(?:\+380\d{9}|0\d{9})$/,
            errorMessage:
              "Enter the correct number (+380501234567, 0501234567)",
          },
        ]);
        addValidatedField(fields.street_address, "#reg-sa", [
          { rule: "required", errorMessage: "Street address is required" },
        ]);

        addValidatedField(fields.country_field, 'select[name="country"]', [
          { rule: "required", errorMessage: "Country is required" },
        ]);

        addValidatedField(fields.state_field, 'select[name="state"]', [
          { rule: "required", errorMessage: "State/Region is required" },
        ]);

        addValidatedField(fields.postal_code, "#reg-pc", [
          {
            rule: "required",
            errorMessage: "Zip/Postal Code is required",
          },
          {
            rule: "minLength",
            value: 5,
            errorMessage: "Postal code must be at least 5 characters",
          },
          {
            rule: "customRegexp",
            value: /^[0-9]+$/,
            errorMessage: "Postal code must contain only numbers",
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

        el._els = { validator };
      }
    },
  });
}
