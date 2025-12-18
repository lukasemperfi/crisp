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
