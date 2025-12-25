import { renderSlider } from "@/shared/ui/slider/slider";
import { mockProducts } from "@/shared/helpers/mock-products";
import { createProductCard } from "@/entities/product/ui/product-card/product-card";
import { Navigation } from "swiper/modules";
import { renderProductList } from "@/entities/product/ui/product-list/product-list";

export const initBlogSection = () => {
  const BREAKPOINT = 470;
  let swipers = {
    featured: null,
  };

  const commonSwiperOptions = {
    loop: true,
    modules: [Navigation],
    breakpoints: {
      500: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      900: {
        slidesPerView: 3,
        spaceBetween: 14,
      },
      1400: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    },
  };

  const updateView = () => {
    const isMobile = window.innerWidth <= BREAKPOINT;

    if (isMobile) {
      Object.keys(swipers).forEach((key) => {
        if (swipers[key]) {
          swipers[key].destroy(true, true);
          swipers[key] = null;
        }
      });

      renderBlogList({
        posts: mockPosts,
        container: ".blog-slider__slider-container",
        limit: 4,
      });
    } else {
      swipers.featured = renderSlider({
        container: ".blog-slider__slider-container",
        items: mockPosts,
        renderItem: (post) => createBlogCard(post),
        swiperOptions: {
          ...commonSwiperOptions,
          navigation: {
            prevEl: ".blog-slider__left-nav",
            nextEl: ".blog-slider__right-nav",
          },
        },
      });
    }
  };

  updateView();

  window.addEventListener("resize", () => {
    const isMobile = window.innerWidth <= BREAKPOINT;
    const currentlyMobile = !swipers.featured;

    if (isMobile !== currentlyMobile) {
      updateView();
    }
  });
};

export function createBlogCard({ type, title, text, date, author }) {
  const card = document.createElement("article");
  card.className = `blog-card blog-card_${type}`;

  card.innerHTML = `
    <div class="blog-card__badge">${
      type === "article" ? "Article" : "Tips"
    }</div>
    <div class="blog-card__content">
      <h3 class="blog-card__title">${title}</h3>
      <p class="blog-card__text">${text}</p>
      <div class="blog-card__meta">
        <span class="blog-card__date">${date}</span>
        <span class="blog-card__author">by ${author}</span>
      </div>
    </div>
  `;

  return card;
}

export function renderBlogList({ posts, container, limit }) {
  const targetEl =
    typeof container === "string"
      ? document.querySelector(container)
      : container;

  if (!targetEl) {
    console.error(`renderBlogList: контейнер "${container}" не найден.`);
    return;
  }

  targetEl.innerHTML = "";

  const displayedPosts =
    limit && typeof limit === "number" ? posts.slice(0, limit) : posts;

  const blogGrid = document.createElement("div");
  blogGrid.className = "blog-list";

  displayedPosts.forEach((post) => {
    const card = createBlogCard(post);
    blogGrid.appendChild(card);
  });

  targetEl.appendChild(blogGrid);
}

const mockPosts = [
  {
    id: 1,
    type: "article",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "21 January 2018",
    author: "guido",
  },
  {
    id: 2,
    type: "tips",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "22 January 2018",
    author: "admin",
  },
  {
    id: 3,
    type: "article",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "05 February 2018",
    author: "marcia",
  },
  {
    id: 4,
    type: "tips",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "12 February 2018",
    author: "guido",
  },
  {
    id: 5,
    type: "article",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "01 March 2018",
    author: "elena",
  },
  {
    id: 6,
    type: "tips",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "15 March 2018",
    author: "admin",
  },
  {
    id: 7,
    type: "article",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "10 April 2018",
    author: "guido",
  },
  {
    id: 8,
    type: "tips",
    title: "Exactly What To Wear To Every Type Of Wedding This Summer",
    text: "A large part of the business here is building up the 'experience'. Double-page spreads in magazines. Ads on TV. Product placement and sponsorship in golf tournaments, tennis matches and sailing competitions. All of this builds up your perception of the brand - and additionally, it costs money.",
    date: "25 April 2018",
    author: "marcia",
  },
];
