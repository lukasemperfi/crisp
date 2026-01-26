import { createComponent } from "@/shared/lib/core/core";
import { formatPrice } from "@/shared/helpers/format-price";
import { Quantity } from "@/shared/ui/quantity/quantity";
import { IconCross, IconEdit, IconHeart } from "@/shared/ui/icons/icons";
import { cartThunks } from "../../model/cart-slice";
import { debounce } from "../../../../shared/helpers/debounce";

export function CartProductCard(props) {
  return createComponent(
    {
      ...props,
      // quantity: props?.quantity ?? props.product.quantity,
    },
    {
      tag: "div",

      render(el, props, emit, { runOnce }) {
        const { product, className = "" } = props;

        const {
          cartItemId,
          images,
          name,
          final_price,
          sku,
          selectedVariant,
          quantity,
        } = product;

        if (runOnce) {
          el.className = `cart-product-card ${className ? className : ""}`;

          el.innerHTML = `
          <div class="cart-product-card__wrapper">
            <div class="cart-product-card__product product">
              <div class="product__image">
                <img />
              </div>
              <div class="product__details">
                <div class="product-details">
                  <div class="product-details__title"></div>
                  <div class="product-details__items">
                    <div class="product-details__item product-details__item_size">
                      <div class="cart-product-card__sub-title">Size:</div>
                      <div class="product-details__value product-details__size-value"></div>
                    </div>
                    <div class="product-details__item product-details__item_sku">
                      <div class="cart-product-card__sub-title">Art.No.:</div>
                      <div class="product-details__value product-details__sku-value"></div>
                    </div>
                    <div class="product-details__item product-details__item_color">
                      <div class="cart-product-card__sub-title">Color:</div>
                      <div class="product-details__value product-details__color-value"></div>
                    </div>   
                    <div class="product-details__item product-details__item_price">
                      <div class="product-details__value product-details__price-value"></div>
                    </div>                 
                  </div>
                </div>
              </div>      
            </div>
            <div class="cart-product-card__price"></div>
            <div class="cart-product-card__size"></div>
            <div class="cart-product-card__quantity-total">
              <div class="cart-product-card__quantity">
                <div class="cart-product-card__sub-title cart-product-card__sub-title_quantity">Quantity</div>
                ${Quantity({
                  itemId: cartItemId,
                  initialValue: quantity,
                }).toHTML()}
              </div>
              <div class="cart-product-card__total-price">
                <div class="cart-product-card__sub-title">Price:</div>   
                <div class="cart-product-card__total-price-value"></div>
              </div>           
            </div>
            <div class="cart-product-card__actions">
              <div class="actions">
                <button class="actions__btn actions__btn_add-to-fav">
                  ${IconHeart()}
                </button>
                <button class="actions__btn actions__btn_edit">
                  ${IconEdit()}
                </button>
                <button class="actions__btn actions__btn_remove">
                  ${IconCross()}
                </button>
              </div>            
            </div>        
          </div>
          `;

          el._els = {
            image: el.querySelector(".product__image img"),
            name: el.querySelector(".product-details__title"),
            sku: el.querySelector(".product-details__sku-value"),
            detailsSize: el.querySelector(".product-details__size-value"),
            color: el.querySelector(".product-details__color-value"),
            price: el.querySelector(".cart-product-card__price"),
            size: el.querySelector(".cart-product-card__size"),
            quantity: el.querySelector(".cart-product-card__quantity"),
            total: el.querySelector(".cart-product-card__total-price-value"),
            totalDetails: el.querySelector(".product-details__price-value"),
            removeBtn: el.querySelector(".actions__btn_remove"),
            incrementBtn: el.querySelector(".quantity__increase"),
            decrementBtn: el.querySelector(".quantity__decrease"),
            quantityInput: el.querySelector(".quantity__input"),
          };

          initQuantity();

          el._els.removeBtn.addEventListener("click", (e) => {
            cartThunks.removeItem(cartItemId);
          });
        }

        const mainImage = images.find((img) => img.is_main);
        const totalPriceValue = quantity * final_price;
        const totalPriceFormatted = formatPrice(totalPriceValue);

        el._els.image.src = mainImage?.image_path_webp || "";
        el._els.name.textContent = name;
        el._els.price.textContent = `${formatPrice(final_price)} EUR`;

        el._els.size.textContent = selectedVariant.size.name;
        el._els.detailsSize.textContent = selectedVariant.size.name;
        el._els.color.innerHTML = createColorItem(selectedVariant.color);

        el._els.sku.textContent = sku;
        el._els.total.innerHTML = `${totalPriceFormatted} EUR`;
        el._els.totalDetails.innerHTML = `${quantity} X ${formatPrice(
          final_price,
        )} EUR`;

        function initQuantity() {
          el._els.incrementBtn.addEventListener("click", (e) => {
            cartThunks.incrementQuantity(cartItemId);
          });
          el._els.decrementBtn.addEventListener("click", (e) => {
            cartThunks.decrementQuantity(cartItemId);
          });
          el._els.quantityInput.addEventListener("change", (e) => {});
        }
      },
    },
  );
}

function createColorItem(colorObj) {
  return `
    <div class="color-filter__item " title="${colorObj.name}">
      <span class="color-filter__box " style="background-color: ${colorObj.hex_code};"></span>
    </div>
  `;
}
