import { initUploadPhoto } from "@/shared/ui/upload-photo/upload-photo.js";
import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import {
  REG_FORM_SELECTORS,
  initRegistrationFormValidation,
} from "@/features/auth/registration/model/validation/registration";
import { groupRegistrationData } from "@/features/auth/registration/lib/registration-data-mapper";
import { registerUser, logoutUser } from "@/entities/auth/model/auth-slice";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { store } from "@/app/store";
import { AUTH_STATUS } from "@/entities/auth/model/auth-slice";
import { redirect } from "@/shared/helpers/redirect";
import { REQUIRED_RULE } from "@/shared/lib/just-validate/rules";
import { countries, regionsByCountry } from "@/shared/lib/location";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;

export const initRegistrationForm = () => {
  const registrationValidator = initRegistrationFormValidation().onSuccess(
    async (event) => {
      event.preventDefault();

      const form = document.querySelector(REG_FORM_SELECTORS.FORM);
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const finalPayload = groupRegistrationData(payload);

      const overlay = createOverlaySpinner({
        successText: "Регистрация прошла успешно!",
      });

      store.subscribe("auth", async (newState) => {
        if (newState.status === AUTH_STATUS.LOADING) {
          overlay.show();
        }
        if (newState.status === AUTH_STATUS.SUCCEEDED) {
          overlay.success();
          redirect(baseUrl, 2000);
        }
      });

      const signUpData = await registerUser(finalPayload);
    }
  );

  initUploadPhoto();

  const regionDropdown = initDropdown({
    selector: ".registration-form__region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".registration-form__country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        regionDropdown,
        regionsByCountry,
        registrationValidator,
        REG_FORM_SELECTORS.REGION
      );
    },
  });

  const fopRegionDropdown = initDropdown({
    selector: ".registration-form__fop-region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".registration-form__fop-country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        fopRegionDropdown,
        regionsByCountry,
        registrationValidator,
        REG_FORM_SELECTORS.FOP_REGION
      );
    },
  });

  const legalEntityRegionDropdown = initDropdown({
    selector: ".registration-form__legal-entity-region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".registration-form__legal-entity-country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        legalEntityRegionDropdown,
        regionsByCountry,
        REG_FORM_SELECTORS.LEGAL_REGION
      );
    },
  });

  initPersonTypeSwitcher(registrationValidator);
};

function initPersonTypeSwitcher(validator) {
  const radios = document.querySelectorAll('input[name="person_type"]');
  const fop = document.querySelector(".fop-entity");
  const legal = document.querySelector(".legal-entity");

  const toggleFieldsDisabled = (container, isDisabled) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      field.disabled = isDisabled;
    });
  };

  const clearCustomDropdownFormFields = (container) => {
    if (!container) {
      return;
    }
    const dropdownFields = container.querySelectorAll(".dropdown_select");

    dropdownFields.forEach((dropdown) => {
      const selected = dropdown.querySelector(".dropdown__selected");
      const selectedOption = dropdown.querySelector(
        '.dropdown__option[aria-selected="true"]'
      );

      selected.innerHTML = selected.dataset.placeholder;

      if (selectedOption) {
        selectedOption.removeAttribute("aria-selected");
      }
    });
  };
  const clearFormFields = (container) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });

    clearCustomDropdownFormFields(container);
  };

  let prevValue = "";

  const updateVisibility = (value) => {
    clearFormFields(fop);
    clearFormFields(legal);

    if (prevValue === "fop") {
      removeFopValidationFields(validator);
    }

    if (prevValue === "legal") {
      removeLegalValidationFields(validator);
    }

    toggleFieldsDisabled(fop, true);
    toggleFieldsDisabled(legal, true);

    fop.classList.add("hidden");
    legal.classList.add("hidden");

    if (value === "fop") {
      fop.classList.remove("hidden");
      toggleFieldsDisabled(fop, false);
      addFopValidationFields(validator);
    }
    if (value === "legal") {
      legal.classList.remove("hidden");
      toggleFieldsDisabled(legal, false);
      addLegalValidationFields(validator);
    }

    prevValue = value;
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => updateVisibility(radio.value));
  });

  const checked = document.querySelector('input[name="person_type"]:checked');
  if (checked) {
    updateVisibility(checked.value);
  }
}

function updateDependentDropdown(
  value,
  targetDropdown,
  dataMap,
  validator,
  validateField
) {
  const options = dataMap[value] || [];

  targetDropdown.updateOptions(options);

  if (options.length > 0) {
    targetDropdown.setDisabled(false);
  } else {
    targetDropdown.setDisabled(true);
  }
}

function addFopValidationFields(validator) {
  const fields = [
    [REG_FORM_SELECTORS.FOP_COUNTRY, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.FOP_REGION, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.FOP_CITY, [REQUIRED_RULE]],
  ];

  fields.forEach((field) => {
    validator.addField(field[0], field[1]);
  });
}

function removeFopValidationFields(validator) {
  const fields = [
    REG_FORM_SELECTORS.FOP_COUNTRY,
    REG_FORM_SELECTORS.FOP_REGION,
    REG_FORM_SELECTORS.FOP_CITY,
  ];

  fields.forEach((field) => {
    validator.removeField(field);
  });
}

function addLegalValidationFields(validator) {
  const fields = [
    [REG_FORM_SELECTORS.LEGAL_COUNTRY, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.LEGAL_REGION, [REQUIRED_RULE]],
    [REG_FORM_SELECTORS.LEGAL_CITY, [REQUIRED_RULE]],
  ];

  fields.forEach((field) => {
    validator.addField(field[0], field[1]);
  });
}

function removeLegalValidationFields(validator) {
  const fields = [
    REG_FORM_SELECTORS.LEGAL_COUNTRY,
    REG_FORM_SELECTORS.LEGAL_REGION,
    REG_FORM_SELECTORS.LEGAL_CITY,
  ];

  fields.forEach((field) => {
    validator.removeField(field);
  });
}
