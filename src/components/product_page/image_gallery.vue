<template>
  <div>
    <div ref="BigSwiper" class="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </div>
      </div>
    </div>
    <div thumbsSlider="" ref="SmallSwiper" class="swiper mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-2.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-3.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-4.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-5.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-6.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-7.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-8.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-9.jpg" />
        </div>
        <div class="swiper-slide">
          <img src="https://swiperjs.com/demos/images/nature-10.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Autoplay, Thumbs, FreeMode } from 'swiper';
import Swiper from 'swiper';
Swiper.use([Autoplay, Thumbs, FreeMode]);
import '@/assets/css/swiper.min.css';
export default {
  name: 'ProductImageGallery',
  //   props: {
  //     images: {
  //       require: true,
  //       type: Array,
  //     },
  //   },
  data() {
    return {
      images: [
        {
          GoodsPictureID: '124',
          GoodsID: '40',
          ColorID: '0',
          SizeID: '0',
          Image: '/image/picture/1642754818_936d7e7e3fb7bdbe5722.jpg',
          Seq: '1',
          created_at: '2022-01-21 16:46:59',
          updated_at: '2022-01-21 16:46:59',
        },
        {
          GoodsPictureID: '125',
          GoodsID: '40',
          ColorID: '0',
          SizeID: '0',
          Image: '/image/picture/1642754822_4ca5c213872a97d4ca79.jpg',
          Seq: '1',
          created_at: '2022-01-21 16:47:02',
          updated_at: '2022-01-21 16:47:02',
        },
        {
          GoodsPictureID: '126',
          GoodsID: '40',
          ColorID: '0',
          SizeID: '0',
          Image: '/image/picture/1642754826_39ebbba0e3d7cd3bfb2f.jpg',
          Seq: '1',
          created_at: '2022-01-21 16:47:06',
          updated_at: '2022-01-21 16:47:06',
        },
      ],
      big_swiper: null,
      small_swiper: null,
    };
  },
  methods: {
    InitSwiper() {
      this.big_swiper = null;
      this.small_swiper = null;

      this.small_swiper = new Swiper(this.$refs.SmallSwiper, {
        spaceBetween: 10,
        slidesPerView: 4,
        freeMode: true,
        watchSlidesProgress: true,
        loop: true,
      });

      this.big_swiper = new Swiper(this.$refs.BigSwiper, {
        spaceBetween: 10,
        loop: true,
        thumbs: {
          swiper: this.small_swiper,
        },
      });
    },
  },
  mounted() {
    this.InitSwiper();
  },
};
</script>
