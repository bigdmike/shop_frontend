<template>
  <section
    class="relative w-full py-32 -mt-20 sm:py-40 section_corner bg-bg_black"
  >
    <div class="relative w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10">
      <header class="relative z-10 flex flex-col-reverse w-full mb-36 sm:mb-48">
        <h2 class="relative font-bold sm:text-xl md:text-2xl text-basic_white">
          <span
            class="inline-block mr-[2px] text-lg transform icon-triangle text-primary -scale-100"
          ></span>
          主打商品
          <span
            class="text-lg inline-block ml-[2px] icon-triangle text-primary"
          ></span>
        </h2>
        <h3
          class="text-5xl font-black md:text-8xl sm:text-7xl text-basic_white font-anybody text-opacity-20"
        >
          Products
        </h3>
      </header>

      <ol class="w-full">
        <li class="relative w-full mb-24 sm:mb-32 md:mb-60">
          <ProductCard
            :title="card_list[0].Title"
            :sub_title="card_list[0].SubTitle"
            :brand_title="card_list[0].BrandTitle"
            :image="card_list[0].Image1"
            link="/"
            number="01"
          />
        </li>
        <li class="relative w-full">
          <ProductCard
            :title="card_list[0].Title"
            :sub_title="card_list[0].SubTitle"
            :brand_title="card_list[0].BrandTitle"
            :image="card_list[0].Image1"
            link="/"
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
export default {
  name: 'MainProductSection',
  components: {
    ProductCard,
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
    };
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
