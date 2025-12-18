import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import {
  LEGAL_ADDRESS_FORM_SELECTORS,
  initLegalAddressFormValidation,
} from "./validation";
import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import { countries, regionsByCountry } from "@/shared/lib/location";
import { userProfileApi } from "@/entities/profile/api/profile";

export const initLegalAddressForm = () => {
  initLegalAddressFormValidation().onSuccess(async (event) => {
    event.preventDefault();

    const form = document.querySelector(LEGAL_ADDRESS_FORM_SELECTORS.FORM);
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const payloadWithPersonType = { ...payload, person_type: "legal" };
    const finalPayload = groupRegistrationData(payloadWithPersonType);

    const overlay = createOverlaySpinner({
      successText: "Данные изменены успешно!",
    });

    try {
      await userProfileApi.updateProfile(finalPayload);

      overlay.success();

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      overlay.hide();
    }
  });

  const regionDropdown = initDropdown({
    selector: ".legal-address-form__region-dropdown",
    disabled: true,
  });

  const countryDropdown = initDropdown({
    selector: ".legal-address-form__country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(value, regionDropdown, regionsByCountry);
    },
  });

  const legalEntityRegionDropdown = initDropdown({
    selector: ".legal-address-form__legal-entity-region-dropdown",
    disabled: true,
  });

  initDropdown({
    selector: ".legal-address-form__legal-entity-country-dropdown",
    items: countries,
    onChange: (type, value) => {
      updateDependentDropdown(
        value,
        legalEntityRegionDropdown,
        regionsByCountry,
        LEGAL_ADDRESS_FORM_SELECTORS.LEGAL_REGION
      );
    },
  });
};

function updateDependentDropdown(value, targetDropdown, dataMap) {
  const options = dataMap[value] || [];

  targetDropdown.updateOptions(options);

  if (options.length > 0) {
    targetDropdown.setDisabled(false);
  } else {
    targetDropdown.setDisabled(true);
  }
}

const groupFieldsByPrefix = (payload, prefix, groupKey) => {
  const groupData = {};
  const keysToDelete = [];

  for (const key in payload) {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, "");

      groupData[newKey] = payload[key];

      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => delete payload[key]);

  payload[groupKey] = groupData;

  return groupData;
};

export const groupRegistrationData = (payload) => {
  const type = payload["person_type"];

  if (type === "fop") {
    groupFieldsByPrefix(payload, "fop_", "fop");
  }

  if (type === "legal") {
    groupFieldsByPrefix(payload, "legal_entity_", "legal_entity");
  }

  return payload;
};
