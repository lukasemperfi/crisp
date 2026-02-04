import { createComponent } from "@/shared/lib/core/core.js";
import { FormField } from "@/shared/ui/form-field/form-field.js";
import JustValidate from "just-validate";
import { Checkbox } from "@/shared/ui/checkbox/checkbox";
import { Dropdown } from "@/shared/ui/dropdown/dropdown";
import { countries, regionsByCountry } from "@/shared/lib/location";

export function AddressForm(props) {
  return createComponent(props, {
    tag: "form",

    render(el, props, emit, { runOnce }) {
      const { onSubmit, userProfileData = {} } = props;
      const {
        first_name = "",
        last_name = "",
        company = "",
        phone_number = "",
        fax = "",
        street_address = "",
        country = "",
        state = "",
        postal_code = "",
      } = userProfileData;

      if (runOnce) {
        el.className = "address-form";

        el.innerHTML = `
          <div class="address-form__section address-form__section_personal">
            <div class="address-form__fields-container" data-group="personal"></div>
          </div>

            <div class="shipping-methods">
              <h3 class="shipping-methods__title">Shipping Methods</h3>
              <div class="shipping-methods__grid">
                <div class="shipping-methods__item">
                  <div class="radio">
                    <input type="radio" id="shipping-flat" name="shipping" checked/>
                    <label for="shipping-flat" class="radio__label">5.00 EUR</label>
                  </div>
                  
                  <div class="shipping-methods__type">Fixed</div> 
                  <div class="shipping-methods__name">Flat Rate</div>
                </div>

                <div class="shipping-methods__item">
                  <div class="radio">
                    <input type="radio" id="shipping-best" name="shipping" />
                    <label for="shipping-best" class="radio__label">10.00 EUR</label>
                  </div>  
                  
                  <div class="shipping-methods__type">Table Rate</div>
                  <div class="shipping-methods__name">Best Way</div>
                </div>              
              </div>

            </div>

          <div class="address-form__actions">
            <button type="submit" class="address-form__btn-submit button button_solid button_black">
              Next
            </button>
            <button type="button" class="address-form__btn-back button">
              Back
          </button>
          </div>
        `;

        let currentCountry = country;
        let currentRegion = state;

        const countryDropdown = Dropdown({
          name: "country",
          placeholder: "Please select your country",
          options: countries,
          defaultValue: country,
        });

        const initialRegions = regionsByCountry[country] || [];
        const stateDropdown = Dropdown({
          name: "state",
          placeholder: "Please select a state",
          options: initialRegions,
          disabled: initialRegions.length === 0,
          defaultValue: state,
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

          validator.revalidate();
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
              value: first_name,
            },
          }),
          last_name: FormField({
            label: `Last Name <span class="highlight-required">*</span>`,
            inputProps: {
              name: "last_name",
              id: "reg-ln",
              value: last_name,
            },
          }),
          company: FormField({
            label: `Company`,
            inputProps: {
              name: "company",
              id: "reg-company",
              value: company,
            },
          }),
          phone_number: FormField({
            label: `Phone Number <span class="highlight-required">*</span>`,
            inputProps: {
              name: "phone_number",
              id: "reg-pn",
              value: phone_number,
            },
          }),
          fax: FormField({
            label: `Fax`,
            inputProps: {
              name: "fax",
              id: "reg-f",
              value: fax,
            },
          }),
          street_address: FormField({
            label: `Street Address <span class="highlight-required">*</span>`,
            inputProps: {
              name: "street_address",
              id: "reg-sa",
              value: street_address,
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
              value: postal_code,
            },
          }),
        };

        el.querySelector('[data-group="personal"]').append(
          fields.first_name,
          fields.last_name,
          fields.company,
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
