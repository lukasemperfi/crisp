import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import {
  PROFILE_CONTACTS_FORM_SELECTORS,
  initProfileContactsFormValidation,
} from "./validation";
import { initUploadPhoto } from "@/shared/ui/upload-photo/upload-photo.js";
import { userProfileApi } from "@/entities/profile/api/profile";

export const initPhisicalForm = () => {
  const registrationValidator = initProfileContactsFormValidation().onSuccess(
    async (event) => {
      event.preventDefault();

      const form = document.querySelector(PROFILE_CONTACTS_FORM_SELECTORS.FORM);
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const finalPayload = groupRegistrationData(payload);
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
    }
  );

  initUploadPhoto();
};

///////////////////////////

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
