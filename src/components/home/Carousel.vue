<template>
  <section ref="MainContent" class="relative z-0 w-full">
    <div
      v-if="block_ready"
      class="absolute top-0 left-0 right-0 z-10 bottom-20"
    >
      <div
        class="absolute z-10 flex items-center pointer-events-auto md:bottom-14 md:top-auto sm:top-32 top-20 md:right-14 sm:right-10 right-5"
      >
        <button
          @click="SlideSwiper(-1)"
          class="flex items-center justify-center w-6 h-6 mr-3 transition-colors duration-500 border rounded-sm sm:text-xl sm:rounded-md sm:w-8 sm:h-8 md:mr-5 md:w-10 md:h-10 text-basic_white border-basic_white basic_button hover:text-primary"
        >
          <span class="icon-chevron_left"></span>
        </button>
        <button
          @click="SlideSwiper(1)"
          class="flex items-center justify-center w-6 h-6 transition-colors duration-500 border rounded-sm sm:rounded-md sm:text-xl sm:w-8 sm:h-8 md:w-10 md:h-10 text-basic_white border-basic_white basic_button hover:text-primary"
        >
          <span class="icon-chevron_right"></span>
        </button>
      </div>

      <CarouselTimeline ref="CarouselTimeline" :carousel_data="carousel_data" />
    </div>
    <div class="relative top-0 left-0 z-0 w-full">
      <VueSlickCarousel
        v-if="block_ready"
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
            class="w-full select-none pc_image"
            width="1400"
            height="875"
            :src="$ImageUrl(item.Image1)"
            alt="Krace凱鋭斯"
          />
          <img
            class="w-full select-none mb_image"
            width="768"
            height="1662"
            :src="$ImageUrl(item.Image2)"
            alt="Krace凱鋭斯"
          />
        </div>
      </VueSlickCarousel>
      <div
        v-else
        class="block w-full md:aspect-[1400/875] aspect-[768/1662] skeleton"
      ></div>
    </div>
  </section>
</template>

<script>
import '@/assets/css/vue-slick-carousel.css';
import CarouselTimeline from '@/components/home/carousel/Timeline.vue';
import { carousel_pin_scroll } from '@/gsap/home/carousel';
export default {
  name: 'CarouselSection',
  components: {
    CarouselTimeline,
  },
  props: {
    carousel_data: {
      require: true,
      type: Array,
    },
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
        arrows: false,
      },
      active_index: 0,
      timer: null,
      carousel_pin_scroll: null,
      block_ready: false,
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
      this.SetActiveIndex(val);
      this.SetTimer();
    },
    SetActiveIndex(action) {
      const end_index = this.carousel_data.length - 1;
      if (action == -1) {
        this.active_index =
          this.active_index == 0 ? end_index : this.active_index - 1;
      } else {
        this.active_index =
          this.active_index == end_index ? 0 : this.active_index + 1;
      }
    },
    SetTimer() {
      const end_index = this.carousel_data.length - 1;
      let next_index = -1;
      next_index = this.active_index == end_index ? 0 : this.active_index + 1;
      this.timer != null ? clearTimeout(this.timer) : '';
      this.timer = setTimeout(() => {
        this.SlideSwiper(1);
        this.SetTimer();
      }, 5000);
      this.$refs.CarouselTimeline.Next(this.active_index, next_index);
    },
    SetGsap() {
      this.block_ready = true;
      this.$nextTick(() => {
        this.carousel_pin_scroll = new carousel_pin_scroll(
          this.$refs.MainContent
        );
        this.SetTimer();
      });
    },
  },
  beforeDestroy() {
    this.timer != null ? clearTimeout(this.timer) : '';
  },
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

.slick-slider div {
  display: block !important;
}
</style>
