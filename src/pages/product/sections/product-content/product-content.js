import { ProductDetailsCard } from "@/entities/product/ui/product-details-card/product-details-card";
import { Accordion } from "@/shared/ui/accordion/accordion";

export const initProductContent = async (product) => {
  ProductDetailsCard({
    container: ".product-content__card",
    product: product,
  });

  const footerContent = [
    {
      title: "Details",
      content: createAccordionContent(),
      isActive: true,
    },
    {
      title: "Other information",
      content: createAccordionContent(),
    },
    {
      title: "Another tab",
      content: createAccordionContent(),
    },
  ];

  Accordion(".description__col-2", footerContent);
};

const createAccordionContent = () => {
  return `
    <div class="accordion-content">
      <div class="accordion-content__item accordion-content__item_about-product">
        <div class="accordion-content__title">ABOUT PRODUCT</div>
        <div class="accordion-content__content">
          Cool off this summer in the Mini Ruffle Smocked Tank Top from our very own LA Hearts. This tank features a smocked body, adjustable straps, scoop neckline, ruffled hems, and a cropped fit.
        </div>
      </div>
      <div class="accordion-content__item accordion-content__item_shipping">
        <div class="accordion-content__title">SHIPPING</div>
        <div class="accordion-content__content">
          <p>We offer Free Standard Shipping for all orders over $75 to the 50 states and the District of Columbia. The minimum order value must be $75 before taxes, shipping and handling. Shipping fees are non-refundable.</p>
          <p>Please allow up to 2 business days (excluding weekends, holidays, and sale days) to process your order.</p> 
          <p>Processing Time + Shipping Time = Delivery Time</p> 
        </div>
      </div>      
      <div class="accordion-content__item accordion-content__item_advantages">
        <div class="accordion-content__title">ADVANTAGES</div>
        <div class="accordion-content__content">
          <ul class="accordion-content__list">
            <li class="accordion-content__list-item">Smocked body</li>
            <li class="accordion-content__list-item">Adjustable straps</li>
            <li class="accordion-content__list-item">Scoop neckline</li>
            <li class="accordion-content__list-item">Ruffled hems</li>
            <li class="accordion-content__list-item">Cropped length</li>
            <li class="accordion-content__list-item">Model is wearing a small</li>
            <li class="accordion-content__list-item">100% rayon</li>
            <li class="accordion-content__list-item">Machine washable</li>
          </ul>
        </div>
      </div>
      <div class="accordion-content__item accordion-content__item_advantages-2">
        <div class="accordion-content__title">ADVANTAGES</div>
        <div class="accordion-content__content">
          <ul class="accordion-content__list">
            <li class="accordion-content__list-item">Smocked body</li>
            <li class="accordion-content__list-item">Adjustable straps</li>
            <li class="accordion-content__list-item">Scoop neckline</li>
          </ul>
        </div>
      </div>
    </div>
  `;
};
