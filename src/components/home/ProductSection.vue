<template>
  <section class="relative w-full py-32 sm:py-40">
    <div class="relative z-10 w-full max-w-screen-xl px-5 mx-auto xl:px-0">
      <header class="mb-20 text-center">
        <h2
          class="text-3xl font-bold md:text-6xl sm:text-4xl text-secondary sm:mb-4"
        >
          {{ title }}
        </h2>
        <span
          class="font-bold md:text-2xl sm:text-xl text-secondary font-yeseva"
          >{{ sub_title }}</span
        >
      </header>

      <VueSlickCarousel
        v-bind="slick_option"
        @swipe="setCarouselSwiping(true)"
        @mouseup.native="setCarouselSwiping(false)"
        @touchend.native="setCarouselSwiping(false)"
        :class="{ '--swiping': swiping === true }"
      >
        <div
          class="flex-shrink-0 w-full px-2 mb-4 select-none md:px-4 md:mb-0"
          v-for="(item, item_index) in product_data"
          :key="`product_${item_index}`"
          draggable="false"
        >
          <router-link :to="`/product/${item.GoodsID}`" draggable="false">
            <div class="mb-2 overflow-hidden select-none rounded-2xl">
              <img
                class="w-full"
                :src="$ImageUrl(item.Image1)"
                draggable="false"
              />
            </div>
            <div class="">
              <h4 class="mb-2 truncate">{{ item.Title }}</h4>
              <p class="price">
                <span
                  v-if="GetPrice(item).Price != GetPrice(item).SellPrice"
                  class="mr-1 text-sm text-gray-400 line-through"
                  >NT$ {{ GetPrice(item).Price | currency }}</span
                >
                <span class="text-green"
                  >NT$ {{ GetPrice(item).SellPrice | currency }}</span
                >
              </p>
            </div>
          </router-link>
        </div>
      </VueSlickCarousel>
    </div>
    <div class="absolute top-0 left-0 right-0 overflow-hidden h-2/3">
      <img :src="background_image" class="block object-cover w-full h-full" />
    </div>
  </section>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';

export default {
  name: 'ProductSection',
  components: {
    VueSlickCarousel,
  },
  props: {
    product_data: {
      type: Array,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    sub_title: {
      type: String,
      require: true,
    },
    background_image: {
      type: String,
      require: false,
    },
  },
  data() {
    return {
      bg_tl: null,
      swiper: null,
      swiping: false,
      slick_option: {
        ifinite: true,
        slidesToShow: 4,
        speed: 500,
        draggable: true,
        arrows: false,
        autoplay: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              rows: 2,
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 640,
            settings: {
              rows: 2,
              slidesToShow: 1,
            },
          },
        ],
      },
    };
  },
  methods: {
    setCarouselSwiping(state) {
      this.swiping = state;
    },
    GetPrice(item) {
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
  },
  mounted() {},
  filters: {
    currency(price) {
      let val = (price / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>

<style>
.slick-slider.--swiping .slick-list:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
</style>
