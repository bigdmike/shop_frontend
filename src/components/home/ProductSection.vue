<template>
  <section class="w-full relative sm:py-40 py-32">
    <div class="relative z-10 w-full max-w-screen-xl mx-auto xl:px-0 px-5">
      <header class="text-center mb-20">
        <h2
          class="md:text-6xl sm:text-4xl text-3xl font-bold text-secondary sm:mb-4"
        >
          {{ title }}
        </h2>
        <span class="md:text-2xl sm:text-xl font-bold text-secondary">{{
          sub_title
        }}</span>
      </header>

      <div ref="swiper" class="flex-shrink-0 w-full swiper">
        <ol class="relative z-0 flex items-stretch swiper-wrapper">
          <li
            class="flex-shrink-0 w-full swiper-slide"
            v-for="(item, item_index) in product_data"
            :key="`product_${item_index}`"
          >
            <router-link to="/">
              <div class="rounded-2xl overflow-hidden mb-2">
                <img class="w-full" :src="$ImageUrl(item.Image1)" />
              </div>
              <div class="">
                <h4 class="truncate mb-2">{{ item.Title }}</h4>
                <p class="price">
                  <span
                    v-if="GetPrice(item).Price != GetPrice(item).SellPrice"
                    class="line-through mr-1 text-gray-400 text-sm"
                    >NT$ {{ GetPrice(item).Price | currency }}</span
                  >
                  <span class="text-green"
                    >NT$ {{ GetPrice(item).SellPrice | currency }}</span
                  >
                </p>
              </div>
            </router-link>
          </li>
        </ol>
      </div>
    </div>
    <div class="absolute top-0 left-0 right-0 h-2/3 overflow-hidden">
      <img :src="background_image" class="w-full h-full object-cover block" />
    </div>
  </section>
</template>

<script>
import { Autoplay } from 'swiper';
import Swiper from 'swiper';
Swiper.use([Autoplay]);
import 'swiper/css/grid';
import '@/assets/css/swiper.min.css';
export default {
  name: 'ProductSection',
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
    };
  },
  methods: {
    InitSwiper() {
      this.swiper = null;
      this.swiper = new Swiper(this.$refs.swiper, {
        slidesPerView: 2,

        spaceBetween: 14,
        autoplay: {
          delay: 5000,
        },
        loop: true,
        breakpoints: {
          768: {
            //当屏幕宽度大于等于768
            slidesPerView: 4,
          },
        },
      });
    },
    SlideSwiper(val) {
      if (val == -1) {
        this.swiper.slidePrev();
      } else {
        this.swiper.slideNext();
      }
    },
    GetPrice(item) {
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
  },
  mounted() {
    this.InitSwiper();
  },
  filters: {
    currency(price) {
      let val = (price / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>
