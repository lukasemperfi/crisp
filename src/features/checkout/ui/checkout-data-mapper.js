export const mapCheckoutPayload = (payload, products) => {
  const deliveryMethod = payload["delivery_method"];

  if (deliveryMethod === "nova_poshta") {
    const novaPoshtaData = {
      country: payload.country,
      region: payload.region,
      city: payload.city,
    };

    delete payload.country;
    delete payload.region;
    delete payload.city;

    payload["nova_poshta"] = novaPoshtaData;
  } else if (deliveryMethod === "courier") {
    const courierData = {
      address: payload.address,
    };

    delete payload.address;

    payload.courier = courierData;
  }

  delete payload.dalivery_method;

  if (!payload.delivery_method && deliveryMethod) {
    payload.delivery_method = deliveryMethod;
  }

  return { ...payload, products };
};
