<template>
  <section
    ref="MainContent"
    class="relative w-full pt-32 -mt-20 sm:pt-40 sm:pb-80 pb-60 section_corner bg-bg_black"
  >
    <div class="relative w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10">
      <header
        :class="block_ready ? '' : 'opacity-0'"
        class="relative z-10 flex flex-col-reverse items-start w-full mb-36 sm:mb-48"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_white"
            >主打商品</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <h3 class="overflow-hidden">
          <span
            data-section-title
            data-text="Products"
            class="block text-5xl font-black md:text-8xl sm:text-7xl text-basic_white font-anybody text-opacity-20"
          >
            Products
          </span>
        </h3>
      </header>

      <ol v-if="!block_ready" data-content class="w-full">
        <li class="relative w-full mb-24 sm:mb-32 md:mb-60">
          <SkeletonCard />
        </li>
        <li class="relative w-full">
          <SkeletonCard :reverse="true" />
        </li>
      </ol>

      <ol v-else data-content class="w-full">
        <li class="relative w-full mb-24 sm:mb-32 md:mb-60">
          <ProductCard
            :title="$GetColumn('home_product_1_subtitle')"
            :sub_title="$GetColumn('home_product_1_title')"
            brand_title="Krace"
            :image="$GetColumn('home_product_1_image')"
            :link="$GetColumn('home_product_1_link')"
            number="01"
          />
        </li>
        <li class="relative w-full">
          <ProductCard
            :title="$GetColumn('home_product_2_subtitle')"
            :sub_title="$GetColumn('home_product_2_title')"
            brand_title="Krace"
            :image="$GetColumn('home_product_2_image')"
            :link="$GetColumn('home_product_2_link')"
            :reverse="true"
            number="02"
          />
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import ProductCard from '@/components/home/main_product_section/Card.vue';
import SkeletonCard from '@/components/home/Skeleton/ProductCard.vue';
import { section_animation } from '@/gsap/section.js';
import { product_card_parallax } from '@/gsap/home/main_product';
export default {
  name: 'MainProductSection',
  components: {
    ProductCard,
    SkeletonCard,
  },
  data() {
    return {
      card_list: [
        {
          Title: '把座擴充套件',
          SubTitle: 'MMBCU CNC',
          BrandTitle: 'Krace',
          Image1: '/img/home/main_product/main_product_1.webp',
        },
      ],
      section_animation: null,
      product_card_parallax: null,
      block_ready: false,
    };
  },
  methods: {
    SetGsap() {
      this.block_ready = true;
      this.$nextTick(() => {
        this.section_animation = new section_animation(this.$refs.MainContent);
        this.product_card_parallax = new product_card_parallax(
          this.$refs.MainContent
        );
      });
    },
  },
};
</script>

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0 100%,
    0 80px,

    80px 0
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,
    0 100%,
    0 80px,
    80px 0
  );
}
</style>
