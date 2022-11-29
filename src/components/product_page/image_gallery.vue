<template>
  <div>
    <div ref="BigSwiper" class="relative mb-5 swiper">
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
        ref="big_swiper"
        :asNavFor="$refs.small_swiper"
        v-bind="big_slick_option"
      >
        <div
          class="overflow-hidden rounded-xl"
          v-for="(item, item_index) in images"
          :key="`big_carousel_${item_index}`"
        >
          <img :src="$ImageUrl(item.Image)" class="w-full" />
        </div>
      </VueSlickCarousel>
    </div>
    <VueSlickCarousel
      ref="small_swiper"
      :asNavFor="$refs.big_swiper"
      v-bind="small_slick_option"
    >
      <div
        v-for="(item, item_index) in images"
        :key="`big_carousel_${item_index}`"
      >
        <div
          @click="SlideToIndex(item_index)"
          class="overflow-hidden transition-all duration-300 border-2 border-transparent rounded-md hover:border-primary"
        >
          <img :src="$ImageUrl(item.Image)" class="w-full" />
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel';
import 'vue-slick-carousel/dist/vue-slick-carousel.css';
import NextIcon from '@/components/svg/Carousel/NextIcon';
import PrevIcon from '@/components/svg/Carousel/PrevIcon';
export default {
  name: 'ProductImageGallery',
  props: {
    images: {
      require: true,
      type: Array,
    },
  },
  components: {
    NextIcon,
    PrevIcon,
    VueSlickCarousel,
  },
  data() {
    return {
      big_slick_option: {
        ifinite: true,
        speed: 500,
        draggable: true,
        arrows: false,
      },
      small_slick_option: {
        ifinite: true,
        slidesPerRow: 5,
        slidesToShow: 1,
        speed: 500,
        draggable: true,
        arrows: false,
        focusOnSelect: true,
      },
      big_swiper: null,
      small_swiper: null,
    };
  },
  methods: {
    SlideSwiper(val) {
      if (val == -1) {
        this.$refs.big_swiper.prev();
      } else {
        this.$refs.big_swiper.next();
      }
    },
    SlideToIndex(val) {
      this.$refs.big_swiper.goTo(val);
    },
  },
  mounted() {},
};
</script>
