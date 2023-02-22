<template>
  <main
    id="NewsList"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full py-40 bg-basic_black md:py-60"
  >
    <div
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div
        class="flex flex-wrap items-end justify-between w-full mb-10 md:flex-nowrap md:mb-36"
      >
        <header
          class="relative z-10 flex flex-col-reverse items-start w-full mb-20 md:mb-0"
        >
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
              class="block text-5xl font-black md:text-8xl sm:text-7xl text-basic_white text-opacity-20 font-anybody"
            >
              News
            </span>
          </h3>
        </header>

        <div data-section-content class="relative w-full md:w-80">
          <span
            class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
          ></span>
          <select
            v-model="active_category"
            class="relative z-0 w-full px-5 py-3 font-bold text-white rounded-md appearance-none bg-bg_black focus:outline-none"
          >
            <option class="text-white bg-basic_black" value="">全部文章</option>
            <option
              v-for="(item, item_index) in news_category"
              :value="item.NewsCategoryID"
              :key="`category_${item_index}`"
              class="text-white bg-basic_black"
            >
              {{ item.Title }}
            </option>
          </select>
        </div>
      </div>

      <div data-section-content class="w-full">
        <ol class="w-full mb-20">
          <li
            @mouseenter="hover_index = item_index"
            @mouseleave="hover_index = -1"
            class="flex flex-wrap items-stretch mb-20 sm:-mx-5 lg:-mx-10"
            v-for="(item, item_index) in page_news_data"
            :key="`card_${item_index}`"
          >
            <div
              class="relative w-full mb-5 sm:w-1/2 sm:px-5 lg:px-10 lg:w-1/3 sm:mb-0"
            >
              <div class="relative w-full overflow-hidden">
                <span
                  :class="
                    hover_index == item_index
                      ? 'translate-x-[8px] translate-y-[6px]'
                      : 'translate-x-[60px] translate-y-[60px]'
                  "
                  class="absolute bottom-0 right-0 z-10 text-5xl transition-all duration-500 transform icon-triangle text-basic_black"
                ></span>
                <img
                  :src="item.Image1"
                  :class="hover_index == item_index ? 'scale-110' : 'scale-100'"
                  class="relative z-0 block w-full transition-all duration-700 transform"
                />
              </div>
            </div>
            <div class="w-full sm:w-1/2 sm:px-5 lg:px-10 lg:w-2/3">
              <p class="mb-2 text-basic_white text-opacity-60 font-anybody">
                {{ item.created_at.slice(0, 10) }}
              </p>
              <router-link :to="`/news/page/${item.NewsID}`">
                <h3
                  :class="
                    hover_index == item_index ? 'text-primary' : 'text-white'
                  "
                  class="mb-2 text-2xl font-bold truncate transition-colors duration-500 sm:mb-4 lg:text-3xl font-anybody"
                >
                  {{ item.Title }}
                </h3>
              </router-link>
              <p
                class="mb-5 text-sm font-medium text-white sm:text-base lg:mb-10 font-anybody"
              >
                <span>
                  {{ GetContent(item.Content).slice(0, 30)
                  }}<i class="hidden sm:inline lg:hidden">...</i>
                </span>
                <span class="inline sm:hidden lg:inline">
                  {{ GetContent(item.Content).slice(30, 50)
                  }}<i class="inline lg:hidden">...</i>
                </span>
                <span class="hidden lg:inline">
                  {{ GetContent(item.Content).slice(50, 100)
                  }}<i class="hidden lg:inline">...</i>
                </span>
              </p>
              <MoreLinkButton :link="`/news/page/${item.NewsID}`" />
            </div>
          </li>
        </ol>
        <div class="flex items-center justify-center w-full">
          <Pagination
            :currentPage="page"
            :pagination="pagination_option"
            @pagechanged="ChangePage"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
import Pagination from '@/components/Pagination.vue';
import { section_animation } from '@/gsap/section.js';
export default {
  name: 'NewsListView',
  components: {
    BreadCrumb,
    MoreLinkButton,
    Pagination,
  },
  data() {
    return {
      active_category: '',
      page: 1,
      pagination_option: {
        per_page: 5,
        total: 0,
        total_pages: 0,
      },
      hover_index: -1,
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '最新消息',
          link: '/news?category=all',
        },
      ],
      news_list: [
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
        {
          NewsID: 1,
          NewsCategoryID: 2,
          Title: '水冷車必改 Krace JET SL 水箱護罩',
          Content:
            '<p>JET SL 車身線條刻劃的非常流線，搭配上Krace水箱護罩，那迷人的線條感，真的是會讓人垂涎三尺，全CNC製成設計，玩車人絕對必備的改裝品，切削的凹凸紋路，在光影下呈現最佳對比，滿足自己玩車的夢就從KRACE開始。</p>',
          Image1: '/img/news/1.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '重要公告',
        },
        {
          NewsID: 2,
          NewsCategoryID: 3,
          Title: '地表戰鬥機 讓KRACE實現你的戰鬥慾望',
          Content:
            '<p>KRACE水冷BWS戰鬥分離式把手，最銳利的線條設計，搭配上自由選擇的色澤，讓你猶如地表噴射機般的耀眼以及視覺張力，那全CNC製成銑痕，是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。是車界緊繃的必備條件絕對帶給你全新的視覺饗宴以及騎乘體驗。</p>',
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '最新消息',
        },
        {
          NewsID: 3,
          NewsCategoryID: 3,
          Title: 'SYM Maxsym TL Krace CNC 後牌架',
          Content:
            '<p>將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。將所有的技術融合於此，也計算過搭配Krace SYM TL後土除，絕無碰撞干涉問題 #打造更完美的視覺張力，獨家的凱銳斯美學就由你來享受。</p>',
          Image1: '/img/news/3.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
      ],
      news_category: [
        {
          NewsCategoryID: 1,
          Title: '最新消息',
        },
        {
          NewsCategoryID: 2,
          Title: '活動消息',
        },
        {
          NewsCategoryID: 2,
          Title: '重要公告',
        },
      ],
      section_animation: null,
    };
  },
  methods: {
    SetActiveCategory() {
      this.active_category = this.$route.query.category
        ? this.$route.query.category
        : 'all';
      if (this.active_category == 'all') {
        this.bread_crumb_path[1].title = '最新消息';
        this.bread_crumb_path[1].link = '/news?category=all';
        this.$nextTick(() => {
          this.meta_data = GetMetaData('newslist', '', '');
          this.$PageReady(this.meta_data.title);
        });
      } else {
        let category = this.category_data.filter(
          (item) => item.NewsCategoryID == this.active_category
        );

        if (category.length > 0) {
          category = category[0];
          this.bread_crumb_path[1].title = category.Title;
          this.bread_crumb_path[1].link = `/news?category=${category.NewsCategoryID}`;
          this.$nextTick(() => {
            this.meta_data = GetMetaData('newslist', '', '');
            this.$PageReady(this.meta_data.title);
          });
        } else {
          this.$RedirectError();
        }
      }
    },
    GetPrice(item) {
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
    GetContent(val) {
      const text = val.replace(/(<([^>]+)>)/gi, '');
      return text.length > 100 ? text.slice(0, 100) : text;
    },
    SetGsap() {
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
    ChangePage(val) {
      this.page = val;

      this.$nextTick(() => {
        this.$emit('update-scroll');
        setTimeout(() => {
          this.$emit('scroll-top');
        }, 0);
      });
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('load-image', 'home');
    });
  },
  created() {
    // this.SetActiveCategory();
    this.pagination_option.total = this.filter_news_data.length;
    this.pagination_option.total_pages = Math.ceil(
      this.filter_news_data.length / this.pagination_option.per_page
    );
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    $route() {
      // this.SetActiveCategory();
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
    filter_news_data() {
      this.page = 1;
      this.$set(this.pagination_option, 'total', this.filter_news_data.length);
      this.$set(
        this.pagination_option,
        'total_pages',
        Math.ceil(
          this.filter_news_data.length / this.pagination_option.per_page
        )
      );
    },
  },
  computed: {
    image_loaded() {
      return this.$store.state.image_loaded;
    },
    filter_news_data() {
      return this.active_category == ''
        ? this.news_list
        : this.news_list.filter(
            (item) => item.NewsCategoryID == this.active_category
          );
    },
    page_news_data() {
      return this.filter_news_data.slice(
        this.page * this.pagination_option.per_page -
          this.pagination_option.per_page,
        this.page * this.pagination_option.per_page
      );
    },
  },
  filters: {
    content(val) {
      const text = val.replace(/(<([^>]+)>)/gi, '');
      return text.length > 100 ? text.slice(0, 100) : text;
    },
  },
};
</script>
