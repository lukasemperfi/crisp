// import { createComponent } from "@/shared/lib/core/core";
// import { formatPrice } from "../../../../shared/helpers/format-price";
// import { Quantity } from "../../../../shared/ui/quantity/quantity";

// export function CartProductCard(props) {
//   return createComponent(props, {
//     tag: "div",
//     render(el, props, emit) {
//       const {} = props;
//       const { id, images, name, final_price, variant, quantity } = {
//         ...mockProduct,
//       };
//       const mainImage = images.filter(
//         (imageObj) => imageObj.is_main === true
//       )[0];
//       const totalPrice = formatPrice(quantity * final_price);

//       el.className = "cart-product-card";
//       el.innerHTML = `
//         <div class="cart-product-card__product product">
//           <div class="product__image">
//               <img src="${
//                 mainImage.image_path_webp
//               }" alt="cart product card image">
//           </div>
//           <div class="product__details">${name}</div>
//         </div>
//         <div class="cart-product-card__price">${formatPrice(
//           final_price
//         )} EUR</div>
//         <div class="cart-product-card__size">${variant.size.name}</div>
//         <div class="cart-product-card__quantity"></div>
//         <div class="cart-product-card__total-price">${totalPrice} EUR</div>
//         <div class="cart-product-card__actions">actions</div>
//       `;

//       const quantityContainer = el.querySelector(
//         ".cart-product-card__quantity"
//       );
//       const quantityComponent = Quantity({
//         itemId: id,
//         initialValue: quantity,
//       });

//       quantityContainer.append(quantityComponent);

//       quantityComponent.addEventListener("onChange", (e) => {});
//     },
//   });
// }

import { createComponent } from "@/shared/lib/core/core";
import { formatPrice } from "@/shared/helpers/format-price";
import { Quantity } from "@/shared/ui/quantity/quantity";

export function CartProductCard(initialProps) {
  return createComponent(
    {
      ...mockProduct,
      ...initialProps,
      quantity: initialProps?.quantity ?? mockProduct.quantity,
    },
    {
      tag: "div",

      render(el, props, emit) {
        const { id, images, name, final_price, variant, quantity } = props;

        /* -------------------- mount (run once) -------------------- */
        if (!el._mounted) {
          el.className = "cart-product-card";

          el.innerHTML = `
            <div class="cart-product-card__product product">
              <div class="product__image">
                <img />
              </div>
              <div class="product__details"></div>      
            </div>
            <div class="cart-product-card__price"></div>
            <div class="cart-product-card__size"></div>
            <div class="cart-product-card__quantity"></div>
            <div class="cart-product-card__total-price"></div>
            <div class="cart-product-card__actions">actions</div>
          `;

          el._els = {
            image: el.querySelector(".product__image img"),
            name: el.querySelector(".product__details"),
            price: el.querySelector(".cart-product-card__price"),
            size: el.querySelector(".cart-product-card__size"),
            quantity: el.querySelector(".cart-product-card__quantity"),
            total: el.querySelector(".cart-product-card__total-price"),
          };

          const quantityComponent = Quantity({
            itemId: id,
            initialValue: quantity,
          });

          quantityComponent.addEventListener("onChange", (e) => {
            el.update({ quantity: e.detail.value });
            emit("onQuantityChange", {
              id,
              quantity: e.detail.value,
            });
          });

          el._els.quantity.append(quantityComponent);

          el._mounted = true;
        }

        /* -------------------- update data -------------------- */

        const mainImage = images.find((img) => img.is_main);
        const totalPrice = formatPrice(quantity * final_price);

        el._els.image.src = mainImage?.image_path_webp || "";
        el._els.name.textContent = name;
        el._els.price.textContent = `${formatPrice(final_price)} EUR`;
        el._els.size.textContent = variant.size.name;
        el._els.total.textContent = `${totalPrice} EUR`;
      },
    }
  );
}

const mockProduct = {
  id: "12d7e202-e133-403d-8560-129bc987ed98",
  brand_id: 15,
  name: "Women Black Checked Fit and Flare Dress",
  description: "High-quality fabric and modern design for your perfect look.",
  base_price: 238.69,
  discount_percent: 20,
  created_at: "2025-12-28T13:49:23.703911+00:00",
  length_id: 1,
  final_price: 190.95,
  is_featured: false,
  is_popular: false,
  brand: {
    id: 15,
    name: "Fendi",
    created_at: "2025-12-28T13:49:23.703911+00:00",
  },
  images: [
    {
      id: 302,
      is_main: true,
      created_at: "2025-12-28T13:49:23.703911+00:00",
      product_id: "12d7e202-e133-403d-8560-129bc987ed98",
      sort_order: 1,
      image_path_jpg:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.jpg",
      image_path_webp:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-1.webp",
    },
    {
      id: 303,
      is_main: false,
      created_at: "2025-12-28T13:49:23.703911+00:00",
      product_id: "12d7e202-e133-403d-8560-129bc987ed98",
      sort_order: 2,
      image_path_jpg:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.jpg",
      image_path_webp:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-2.webp",
    },
    {
      id: 320,
      is_main: false,
      created_at: "2026-01-04T23:08:21.851541+00:00",
      product_id: "12d7e202-e133-403d-8560-129bc987ed98",
      sort_order: 3,
      image_path_jpg:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.jpg",
      image_path_webp:
        "https://opznamhtgnrgslzzqhmt.supabase.co/storage/v1/object/public/product-images/img-details-3.webp",
    },
  ],
  length: {
    id: 1,
    name: "short",
    created_at: "2025-12-28T14:05:37.264663+00:00",
    sort_order: 1,
  },
  variant: {
    id: 671,
    size: {
      id: 34,
      name: "w34",
      created_at: "2025-12-28T13:49:23.703911+00:00",
      sort_order: 80,
    },
  },

  quantity: 3,
  tags: [
    {
      tag: {
        id: 15,
        name: "Top Women",
        sort_order: 3,
      },
    },
    {
      tag: {
        id: 16,
        name: "Collection: Summer",
        sort_order: 4,
      },
    },
  ],
};
