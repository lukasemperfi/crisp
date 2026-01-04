import { renderSlider } from "@/shared/ui/slider/slider";
import { createProductCard } from "@/entities/product/ui/product-card/product-card";
import { Navigation } from "swiper/modules";
import { ProductList } from "@/entities/product/ui/product-list/product-list";
import { productsApi } from "@/entities/product/api/products";
import { createPaginationController } from "@/entities/product/model/pagination-controller";

const BREAKPOINT = 470;
const TOTAL_LIMIT = 16;
const PAGE_SIZE_MOBILE = 4;

const productsStore = {
  featured: [],
  popular: [],
  loaded: false,
};

export const initFeaturedProductsSection = async () => {
  if (!productsStore.loaded) {
    const [featuredResp, popularResp] = await Promise.all([
      productsApi.getFeaturedProducts({ limit: TOTAL_LIMIT }),
      productsApi.getPopularProducts({ limit: TOTAL_LIMIT }),
    ]);
    productsStore.featured = featuredResp.data;
    productsStore.popular = popularResp.data;
    productsStore.loaded = true;
  }

  const commonSwiperOptions = {
    loop: true,
    modules: [Navigation],
    breakpoints: {
      471: { slidesPerView: 3, spaceBetween: 16 },
      1024: { slidesPerView: 4, spaceBetween: 20 },
      1920: { slidesPerView: 5, spaceBetween: 27 },
    },
  };

  let swipers = { featured: null, popular: null };
  let mobileLists = { featured: null, popular: null };
  let mobilePagination = { featured: null, popular: null };

  const destroyDesktop = () => {
    Object.values(swipers).forEach((swiper) => swiper?.destroy(true, true));
    swipers = { featured: null, popular: null };
  };

  const destroyMobile = () => {
    Object.values(mobileLists).forEach((list) => list?.clear());
    mobileLists = { featured: null, popular: null };
    mobilePagination = { featured: null, popular: null };
  };

  const initDesktop = () => {
    swipers.featured = renderSlider({
      container: ".featured-slider__slider-container",
      items: productsStore.featured,
      renderItem: createProductCard,
      swiperOptions: {
        ...commonSwiperOptions,
        navigation: {
          prevEl: ".featured-slider__left-nav",
          nextEl: ".featured-slider__right-nav",
        },
      },
    });

    swipers.popular = renderSlider({
      container: ".popular-slider__slider-container",
      items: productsStore.popular,
      renderItem: createProductCard,
      swiperOptions: {
        ...commonSwiperOptions,
        navigation: {
          prevEl: ".popular-slider__left-nav",
          nextEl: ".popular-slider__right-nav",
        },
      },
    });
  };

  const initMobile = () => {
    mobileLists.featured = new ProductList(
      ".featured-slider__slider-container"
    );
    mobileLists.popular = new ProductList(".popular-slider__slider-container");

    const createListPagination = (list, data) =>
      createPaginationController({
        initialPage: 0,
        limit: PAGE_SIZE_MOBILE,
        getData: ({ page, limit }) => {
          const start = page * limit;
          const end = start + limit;
          return Promise.resolve({
            data: data.slice(start, end),
            count: data.length,
          });
        },
        onData: (data) => {
          list.appendProducts(data);
          list.showLoadMore();
        },
        onEnd: () => list.hideLoadMore(),
      });

    mobilePagination.featured = createListPagination(
      mobileLists.featured,
      productsStore.featured
    );
    mobilePagination.popular = createListPagination(
      mobileLists.popular,
      productsStore.popular
    );

    mobileLists.featured.setLoadMoreHandler(mobilePagination.featured.loadNext);
    mobileLists.popular.setLoadMoreHandler(mobilePagination.popular.loadNext);

    mobilePagination.featured.loadNext();
    mobilePagination.popular.loadNext();
  };

  let currentMode = null;

  const updateView = () => {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const nextMode = isMobile ? "mobile" : "desktop";

    if (currentMode === nextMode) return;

    if (currentMode === "mobile") destroyMobile();
    if (currentMode === "desktop") destroyDesktop();

    currentMode = nextMode;

    if (isMobile) {
      initMobile();
    } else {
      initDesktop();
    }
  };

  updateView();
  window.addEventListener("resize", updateView);
};

// import { renderSlider } from "@/shared/ui/slider/slider";
// import { mockProducts } from "@/shared/helpers/mock-products";
// import { createProductCard } from "@/entities/product/ui/product-card/product-card";
// import { Navigation } from "swiper/modules";
// import { ProductList } from "@/entities/product/ui/product-list/product-list";
// import { productsApi } from "../../../../entities/product/api/products";
// import { createPaginationController } from "@/entities/product/model/pagination-controller";

// export const initFeaturedProductsSection = async () => {
//   const { data: featuredProducts, count: featuredCount } =
//     await productsApi.getFeaturedProducts({
//       limit: 8,
//     });
//   const { data: popularProducts, count: popularCount } =
//     await productsApi.getPopularProducts({
//       limit: 8,
//     });

//   const BREAKPOINT = 470;
//   let swipers = {
//     featured: null,
//     popular: null,
//   };

//   const commonSwiperOptions = {
//     loop: true,
//     modules: [Navigation],
//     breakpoints: {
//       471: {
//         slidesPerView: 3,
//         spaceBetween: 16,
//       },
//       1024: {
//         slidesPerView: 4,
//         spaceBetween: 20,
//       },
//       1920: {
//         slidesPerView: 5,
//         spaceBetween: 27,
//       },
//     },
//   };

//   const updateView = () => {
//     const isMobile = window.innerWidth <= BREAKPOINT;

//     if (isMobile) {
//       Object.keys(swipers).forEach((key) => {
//         if (swipers[key]) {
//           swipers[key].destroy(true, true);
//           swipers[key] = null;
//         }
//       });

//       // ===== FEATURED =====
//       const featuredList = new ProductList(
//         ".featured-slider__slider-container",
//         []
//       );

//       const featuredPagination = createPaginationController({
//         initialPage: 0,
//         limit: 8,

//         getData: ({ page, limit }) =>
//           productsApi.getFeaturedProducts({ page, limit }),

//         onData: (data) => {
//           featuredList.appendProducts(data);
//           featuredList.showLoadMore();
//         },

//         onEnd: () => {
//           featuredList.hideLoadMore();
//         },
//       });

//       featuredList.setLoadMoreHandler(featuredPagination.loadNext);
//       featuredPagination.loadNext();

//       // ===== POPULAR =====
//       const popularList = new ProductList(
//         ".popular-slider__slider-container",
//         []
//       );

//       const popularPagination = createPaginationController({
//         initialPage: 0,
//         limit: 8,

//         getData: ({ page, limit }) =>
//           productsApi.getPopularProducts({ page, limit }),

//         onData: (data) => {
//           popularList.appendProducts(data);
//           popularList.showLoadMore();
//         },

//         onEnd: () => {
//           popularList.hideLoadMore();
//         },
//       });

//       popularList.setLoadMoreHandler(popularPagination.loadNext);
//       popularPagination.loadNext();
//     } else {
//       // desktop swiper — без изменений
//       swipers.featured = renderSlider({
//         container: ".featured-slider__slider-container",
//         items: featuredProducts,
//         renderItem: (product) => createProductCard(product),
//         swiperOptions: {
//           ...commonSwiperOptions,
//           navigation: {
//             prevEl: ".featured-slider__left-nav",
//             nextEl: ".featured-slider__right-nav",
//           },
//         },
//       });

//       swipers.popular = renderSlider({
//         container: ".popular-slider__slider-container",
//         items: popularProducts,
//         renderItem: (product) => createProductCard(product),
//         swiperOptions: {
//           ...commonSwiperOptions,
//           navigation: {
//             prevEl: ".popular-slider__left-nav",
//             nextEl: ".popular-slider__right-nav",
//           },
//         },
//       });
//     }
//   };

//   updateView();

//   window.addEventListener("resize", () => {
//     const isMobile = window.innerWidth <= BREAKPOINT;
//     const currentlyMobile = !swipers.featured;

//     if (isMobile !== currentlyMobile) {
//       updateView();
//     }
//   });
// };
