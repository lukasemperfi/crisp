// universal-product-slider.js
import { renderSlider } from "@/shared/ui/slider/slider";
import { createProductCard } from "@/entities/product/ui/product-card/product-card";
import { Navigation } from "swiper/modules";
import { ProductList } from "@/entities/product/ui/product-list/product-list";
import { createPaginationController } from "@/entities/product/model/pagination-controller";

const BREAKPOINT = 470; // точка переключения mobile/desktop

export const initProductSlider = async ({
  containerSelector,
  fetchProducts, // async функция, возвращает { data: [], count: number }
  totalLimit = 16,
  pageSizeMobile = 4,
  swiperOptions = {},
  navSelectors = {}, // { prevEl, nextEl }
}) => {
  // Получаем данные
  const { data: products } = await fetchProducts({ limit: totalLimit });

  let swiper = null;
  let mobileList = null;
  let pagination = null;
  let currentMode = null;

  const destroyDesktop = () => swiper?.destroy(true, true);
  const destroyMobile = () => mobileList?.clear();

  const initDesktop = () => {
    swiper = renderSlider({
      container: containerSelector,
      items: products,
      renderItem: createProductCard,
      swiperOptions: {
        loop: true,
        modules: [Navigation],
        ...swiperOptions,
        navigation: navSelectors,
      },
    });
  };

  const initMobile = () => {
    mobileList = new ProductList(containerSelector);

    pagination = createPaginationController({
      initialPage: 0,
      limit: pageSizeMobile,
      getData: ({ page, limit }) => {
        const start = page * limit;
        const end = start + limit;
        return Promise.resolve({
          data: products.slice(start, end),
          count: products.length,
        });
      },
      onData: (data) => {
        mobileList.appendProducts(data);
        mobileList.showLoadMore();
      },
      onEnd: () => mobileList.hideLoadMore(),
    });

    mobileList.setLoadMoreHandler(pagination.loadNext);
    pagination.loadNext();
  };

  const updateView = () => {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const nextMode = isMobile ? "mobile" : "desktop";

    if (currentMode === nextMode) return;

    if (currentMode === "mobile") destroyMobile();
    if (currentMode === "desktop") destroyDesktop();

    currentMode = nextMode;

    if (isMobile) initMobile();
    else initDesktop();
  };

  updateView();
  window.addEventListener("resize", updateView);

  return {
    refresh: updateView, // можно вручную обновить при изменении данных
    getProducts: () => products,
  };
};
