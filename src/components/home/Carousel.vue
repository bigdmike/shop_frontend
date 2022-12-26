<template>
  <section class="relative w-full max-w-screen-xl mx-auto">
    <button
      @click="SlideSwiper(1)"
      class="absolute right-0 z-10 py-6 pl-5 pr-2 transition-colors duration-200 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-tl-full rounded-bl-full top-1/2 sm:pr-3 sm:pl-8 sm:py-9 hover:md:bg-secondary hover:md:bg-opacity-100 hover:md:text-white text-basic_black"
    >
      <NextIcon class="w-2 sm:w-4" />
    </button>
    <button
      @click="SlideSwiper(-1)"
      class="absolute left-0 z-10 py-6 pl-2 pr-5 transition-colors duration-200 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-tr-full rounded-br-full top-1/2 sm:pl-3 sm:pr-8 sm:py-9 hover:md:bg-secondary hover:md:bg-opacity-100 hover:md:text-white text-basic_black"
    >
      <PrevIcon class="w-2 sm:w-4" />
    </button>

    <VueSlickCarousel
      ref="swiper"
      v-bind="slick_option"
      @swipe="setCarouselSwiping(true)"
      @mouseup.native="setCarouselSwiping(false)"
      @touchend.native="setCarouselSwiping(false)"
      :class="{ '--swiping': swiping === true }"
    >
      <div
        class="w-full"
        v-for="(item, item_index) in carousel_data"
        :key="`carousel_${item_index}`"
      >
        <img
          class="hidden w-full select-none pc_image"
          :src="$ImageUrl(item.Image1)"
          :alt="$GetCloumn('company_name')"
        />
        <img
          class="block w-full select-none mb_image"
          :src="$ImageUrl(item.Image2)"
          :alt="$GetCloumn('company_name')"
        />
      </div>
    </VueSlickCarousel>
  </section>
</template>

<script>
import '@/assets/css/vue-slick-carousel.css';
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
      swiping: false,
      slick_option: {
        ifinite: true,
        slidesToShow: 1,
        fade: true,
        speed: 500,
        autoplaySpeed: 5000,
        draggable: true,
        arrows: false,
        autoplay: true,
      },
    };
  },
  methods: {
    setCarouselSwiping(state) {
      this.swiping = state;
    },
    SlideSwiper(val) {
      if (val == -1) {
        this.$refs.swiper.prev();
      } else {
        this.$refs.swiper.next();
      }
    },
  },
  mounted() {},
};
</script>

<style scoped>
.slick-slide img.pc_image {
  display: block;
}

.slick-slide img.mb_image {
  display: none;
}
@media (max-width: 768px) {
  .slick-slide img.pc_image {
    display: none;
  }

  .slick-slide img.mb_image {
    display: block;
  }
}

slick-slider .slick-track,
.slick-slider .slick-list {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  transition-delay: 10ms;
}
</style>
