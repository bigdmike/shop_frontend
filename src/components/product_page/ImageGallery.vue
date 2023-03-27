<template>
  <div>
    <div ref="BigSwiper" class="relative mb-5 swiper">
      <VueSlickCarousel
        ref="big_swiper"
        :asNavFor="$refs.small_swiper"
        v-bind="big_slick_option"
        @beforeChange="SetSlideIndex"
      >
        <div
          class="relative w-full overflow-hidden bg-gradient-to-b from-basic_black to-transparent section_corner aspect-square"
          v-for="(item, item_index) in images"
          :key="`big_carousel_${item_index}`"
        >
          <img
            :alt="title"
            width="640"
            height="640"
            :src="$ImageUrl(item.Image)"
            class="relative z-10 object-cover w-full h-full"
          />
          <img
            width="550"
            height="122"
            src="/img/logo_white.svg"
            :alt="$GetColumn('brand_name')"
            class="absolute z-0 w-11/12 transform -translate-x-1/2 -translate-y-1/2 opacity-20 top-1/2 left-1/2 mix-blend-overlay"
          />
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
          :class="
            sliderPageIndex == item_index
              ? 'border-opacity-100'
              : 'border-opacity-20'
          "
          class="mx-2 overflow-hidden transition-all duration-300 border-2 rounded-md border-primary hover:border-opacity-100 aspect-square"
        >
          <img
            :alt="title"
            width="128"
            height="128"
            :src="$ImageUrl(item.Image)"
            class="object-cover w-full h-full"
          />
        </div>
      </div>
    </VueSlickCarousel>
  </div>
</template>

<script>
import '@/assets/css/vue-slick-carousel.css';
export default {
  name: 'ProductImageGallery',
  props: {
    images: {
      require: true,
      type: Array,
    },
    title: {
      require: true,
      type: String,
    },
  },
  components: {},
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
        slidesPerRow: 6,
        slidesToShow: 1,
        speed: 500,
        draggable: true,
        arrows: false,
        focusOnSelect: true,
      },
      big_swiper: null,
      small_swiper: null,
      sliderPageIndex: 0,
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
    SetSlideIndex(old_val, new_val) {
      this.sliderPageIndex = new_val;
    },
  },
  mounted() {},
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
    0 50px,

    50px 0
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,
    0 100%,
    0 50px,
    50px 0
  );
}
</style>
