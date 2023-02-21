<template>
  <section
    ref="MainContent"
    class="relative w-full py-32 overflow-hidden sm:py-40 bg-basic_black"
  >
    <div class="relative w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10">
      <header class="relative z-10 flex items-end justify-between mb-20">
        <div class="flex flex-col-reverse items-start">
          <h2 class="relative inline-block px-8">
            <span
              data-section-subtitle-arrow
              class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
            ></span>
            <span
              data-section-subtitle
              class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_white"
              >最新消息</span
            >
            <span
              data-section-subtitle-arrow
              class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
            ></span>
          </h2>
          <h3 class="overflow-hidden">
            <span
              data-section-title
              data-text="News"
              class="block text-5xl font-black md:text-8xl sm:text-7xl text-basic_white font-anybody text-opacity-20"
            >
              News
            </span>
          </h3>
        </div>
        <router-link
          data-section-subtitle
          class="inline-block text-sm font-bold tracking-wider underline md:text-2xl sm:text-xl font-anybody text-primary"
          to="/news_list"
          >View ALL</router-link
        >
      </header>

      <div data-section-content class="flex items-stretch mb-10 -mx-5 md:mx-0">
        <div
          data-carousel-item
          class="flex flex-wrap items-center justify-between flex-shrink-0 w-full px-5 md:px-0 md:w-11/12"
          v-for="(item, item_index) in news_list"
          :key="`news_list_${item_index}`"
        >
          <router-link to="/" class="relative w-full md:w-1/2 lg:w-2/3">
            <span
              class="absolute bottom-0 right-0 z-20 transition-all duration-700 transform translate-x-0 translate-y-0 image_corner -scale-100"
            ></span>
            <div
              data-carousel-cover
              class="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-r from-basic_black to-transparent"
            ></div>
            <img :src="item.Image1" class="relative z-0 block w-full" />
          </router-link>

          <div
            class="w-full pt-5 md:pl-10 md:pr-0 md:w-1/2 md:pt-0 lg:pl-20 lg:w-1/3"
          >
            <div class="overflow-hidden">
              <p
                data-carousel-date
                class="mb-3 text-sm font-semibold sm:text-base font-anybody text-basic_gray text-opacity-60"
              >
                {{ item.created_at.slice(0, 10) }}
              </p>
            </div>
            <div class="overflow-hidden">
              <h3
                data-carousel-title
                class="mb-5 text-2xl font-black tracking-widest sm:text-3xl font-anybody text-basic_white"
              >
                {{ item.Title }}
              </h3>
            </div>
            <div class="overflow-hidden">
              <p
                data-carousel-content
                class="mb-10 text-sm font-semibold tracking-wider text-white sm:text-base"
                v-html="item.Content"
              ></p>
            </div>
            <div class="overflow-hidden">
              <MoreLinkButton link="/" data-carousel-link />
            </div>
          </div>
        </div>
      </div>

      <div
        data-section-content
        class="flex items-center justify-between w-full"
      >
        <button
          @click="Prev"
          class="flex items-center justify-center font-bold leading-none tracking-widest text-primary font-anybody"
        >
          <span class="mr-4 text-3xl icon-arrow_left"></span>
          Prev
        </button>
        <button
          @click="Next"
          class="flex items-center justify-center font-bold leading-none tracking-widest text-primary font-anybody"
        >
          Next
          <span class="ml-4 text-3xl icon-arrow_right"></span>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import MoreLinkButton from '@/components/ui/MoreLinkButton';
import { news_list_gsap } from '@/gsap/home/news_list';
import { section_animation } from '@/gsap/section.js';
export default {
  name: 'NewsListSection',
  components: {
    MoreLinkButton,
  },
  data() {
    return {
      news_list: [
        {
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。',
          Image1: '/img/news/1.webp',
          created_at: '2022/10/26 10:00:00',
        },
        {
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。',
          Image1: '/img/news/1.webp',
          created_at: '2022/10/26 10:00:00',
        },
        {
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。',
          Image1: '/img/news/1.webp',
          created_at: '2022/10/26 10:00:00',
        },
        {
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。',
          Image1: '/img/news/1.webp',
          created_at: '2022/10/26 10:00:00',
        },
      ],
      active_index: 0,
      timer: null,
      news_list_gsap: null,
      section_animation: null,
    };
  },
  methods: {
    SetGsap() {
      this.news_list_gsap = new news_list_gsap(
        this.$refs.MainContent,
        this.news_list
      );
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
    Next() {
      this.news_list_gsap.next();
    },
    Prev() {
      this.news_list_gsap.prev();
    },
  },
  mounted() {
    console.log('home news mounted');
  },
};
</script>

<style>
.image_corner {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 60px 60px 0 0;
  border-color: rgb(20, 24, 26) transparent transparent transparent;
}
</style>
