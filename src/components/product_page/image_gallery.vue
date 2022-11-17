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

      <div class="swiper-wrapper">
        <div
          class="overflow-hidden swiper-slide rounded-xl"
          v-for="(item, item_index) in images"
          :key="`big_carousel_${item_index}`"
        >
          <img :src="$ImageUrl(item.Image)" class="w-full" />
        </div>
      </div>
    </div>
    <div thumbsSlider="" ref="SmallSwiper" class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, item_index) in images"
          :key="`big_carousel_${item_index}`"
        >
          <div
            class="overflow-hidden transition-all duration-300 border-2 border-transparent rounded-md hover:border-primary"
          >
            <img :src="$ImageUrl(item.Image)" class="w-full" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NextIcon from '@/components/svg/Carousel/NextIcon';
import PrevIcon from '@/components/svg/Carousel/PrevIcon';
import { Autoplay, Thumbs, FreeMode } from 'swiper';
import Swiper from 'swiper';
Swiper.use([Autoplay, Thumbs, FreeMode]);
import '@/assets/css/swiper.min.css';
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
  },
  data() {
    return {
      // images: [
      //   {
      //     GoodsPictureID: '124',
      //     GoodsID: '40',
      //     ColorID: '0',
      //     SizeID: '0',
      //     Image: '/image/picture/1642754818_936d7e7e3fb7bdbe5722.jpg',
      //     Seq: '1',
      //     created_at: '2022-01-21 16:46:59',
      //     updated_at: '2022-01-21 16:46:59',
      //   },
      //   {
      //     GoodsPictureID: '125',
      //     GoodsID: '40',
      //     ColorID: '0',
      //     SizeID: '0',
      //     Image: '/image/picture/1642754822_4ca5c213872a97d4ca79.jpg',
      //     Seq: '1',
      //     created_at: '2022-01-21 16:47:02',
      //     updated_at: '2022-01-21 16:47:02',
      //   },
      //   {
      //     GoodsPictureID: '126',
      //     GoodsID: '40',
      //     ColorID: '0',
      //     SizeID: '0',
      //     Image: '/image/picture/1642754826_39ebbba0e3d7cd3bfb2f.jpg',
      //     Seq: '1',
      //     created_at: '2022-01-21 16:47:06',
      //     updated_at: '2022-01-21 16:47:06',
      //   },
      // ],
      big_swiper: null,
      small_swiper: null,
    };
  },
  methods: {
    InitSwiper() {
      this.big_swiper = null;
      this.small_swiper = null;

      this.small_swiper = new Swiper(this.$refs.SmallSwiper, {
        spaceBetween: 20,
        slidesPerView: 6,
        freeMode: true,
        watchSlidesProgress: true,
        // loop: true,
      });

      this.big_swiper = new Swiper(this.$refs.BigSwiper, {
        spaceBetween: 10,
        loop: true,
        thumbs: {
          swiper: this.small_swiper,
        },
      });
    },
    SlideSwiper(val) {
      if (val == -1) {
        this.big_swiper.slidePrev();
      } else {
        this.big_swiper.slideNext();
      }
    },
  },
  mounted() {
    this.InitSwiper();
  },
};
</script>
