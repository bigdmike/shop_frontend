<template>
  <section class="w-full max-w-screen-xl mx-auto relative">
    <button
      @click="SlideSwiper(1)"
      class="absolute z-10 top-1/2 right-0 transform -translate-y-1/2 sm:pr-3 pr-2 sm:pl-8 pl-5 sm:py-9 py-6 bg-white bg-opacity-50 rounded-tl-full rounded-bl-full transition-colors duration-200 hover:md:bg-secondary hover:md:bg-opacity-100 hover:md:text-white text-basic_black"
    >
      <NextIcon class="sm:w-4 w-2" />
    </button>
    <button
      @click="SlideSwiper(-1)"
      class="absolute z-10 top-1/2 left-0 transform -translate-y-1/2 sm:pl-3 pl-2 sm:pr-8 pr-5 sm:py-9 py-6 bg-white bg-opacity-50 rounded-tr-full rounded-br-full transition-colors duration-200 hover:md:bg-secondary hover:md:bg-opacity-100 hover:md:text-white text-basic_black"
    >
      <PrevIcon class="sm:w-4 w-2" />
    </button>
    <div ref="swiper" class="flex-shrink-0 w-full swiper">
      <ol class="relative z-0 flex items-stretch swiper-wrapper">
        <li
          class="flex-shrink-0 w-full swiper-slide"
          v-for="(item, item_index) in carousel_data"
          :key="`carousel_${item_index}`"
        >
          <img class="hidden w-full md:block" :src="$ImageUrl(item.Image1)" />
          <img class="block w-full md:hidden" :src="$ImageUrl(item.Image2)" />
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import { Autoplay } from 'swiper';
import Swiper from 'swiper';
Swiper.use([Autoplay]);
import '@/assets/css/swiper.min.css';
import NextIcon from '@/components/svg/Carousel/NextIcon.vue';
import PrevIcon from '@/components/svg/Carousel/PrevIcon.vue';
export default {
  name: 'CarouselSection',
  props: {
    carousel_data: {
      require: true,
      type: Array,
    },
  },
  components: {
    NextIcon,
    PrevIcon,
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
        slidesPerView: 1,
        spaceBetween: 0,
        autoplay: {
          delay: 5000,
        },
        loop: true,
        breakpoints: {},
      });
    },
    SlideSwiper(val) {
      if (val == -1) {
        this.swiper.slidePrev();
      } else {
        this.swiper.slideNext();
      }
    },
  },
  mounted() {
    this.InitSwiper();
  },
};
</script>
