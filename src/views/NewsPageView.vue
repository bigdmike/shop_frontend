<template>
  <main
    id="NewsPage"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full pt-40 pb-20 bg-basic_black"
  >
    <div
      v-if="news_data != null && news_data != 'error'"
      class="w-full max-w-screen-xl px-5 pt-5 mx-auto xl:px-0 sm:px-10"
    >
      <BreadCrumb class="mb-2" :path="bread_crumb_path" />
      <router-link
        to="/news"
        data-section-subtitle
        class="inline-flex items-center mb-8 font-semibold text-primary"
        ><span class="mr-3 icon-chevron_left"></span>回到列表</router-link
      >
      <div class="overflow-hidden">
        <h1
          data-section-title
          itemprop="headline"
          class="mb-5 text-2xl font-semibold text-white sm:text-4xl font-anybody"
        >
          {{ news_data.Title }}
        </h1>
      </div>
      <span
        class="hidden"
        itemprop="author"
        itemscope
        itemtype="https://schema.org/Person"
      >
        <span itemprop="name">{{ $GetCloumn('company_name') }}</span>
      </span>
      <div
        data-section-content
        class="flex items-center justify-between pb-2 mb-10 border-b border-zinc-300"
      >
        <div class="flex items-center">
          <p
            itemprop="datePublished"
            :content="news_data.created_at"
            class="mr-2 text-sm font-semibold font-anybody text-basic_gray sm:text-base"
          >
            {{ news_data.created_at.slice(0, 10) }}
          </p>
          <span
            itemprop="dateModified"
            :content="news_data.updated_at"
            class="hidden"
          >
            {{ news_data.updated_at }}
          </span>
          <span
            class="text-xs inline-block px-2 py-[2px] bg-primary text-white font-medium rounded-sm"
            >{{ news_data.CategoryTitle }}</span
          >
        </div>
        <div class="flex items-center">
          <input
            class="hidden"
            v-on:focus="$event.target.select()"
            ref="clone"
            readonly
          />
          <button
            @click="CopyLink"
            class="flex items-center justify-center w-8 h-8 mr-1 transition-colors duration-200 bg-white rounded-md text-basic_black hover:text-white sm:mr-2 hover:bg-primary"
          >
            <span class="text-xl icon-link"></span>
          </button>
          <button
            @click="ShareToFB"
            class="flex items-center justify-center w-8 h-8 mr-1 transition-colors duration-200 bg-white rounded-md text-basic_black hover:text-white sm:mr-2 hover:bg-primary"
          >
            <span class="text-xl icon-facebook"></span>
          </button>
          <button
            @click="ShareToLine"
            class="flex items-center justify-center w-8 h-8 mr-1 transition-colors duration-200 bg-white rounded-md text-basic_black hover:text-white sm:mr-2 hover:bg-primary"
          >
            <span class="text-xl icon-line"></span>
          </button>
        </div>
      </div>
      <div data-section-content class="mb-10">
        <img
          width="1280"
          height="1280"
          :alt="news_data.Title"
          itemprop="image"
          src="/img/news/1.webp"
          class="block w-full"
        />
        <!--   :src="$ImageUrl(news_data.Image1)" -->
      </div>
      <div
        data-section-content
        id="NewsContent"
        class="w-full mb-20 text-white"
        v-html="news_data.Content"
      ></div>
      <RelatedList ref="RelatedList" />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import RelatedList from '@/components/news_page/RelatedSection.vue';
import { GetMetaData } from '@/common/meta';
import { section_animation } from '@/gsap/section';
export default {
  name: 'NewsPageView',
  components: {
    BreadCrumb,
    RelatedList,
  },
  data() {
    return {
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
      news_data: {
        NewsID: '10',
        NewsCategoryID: '1',
        Title: '耀聞水果世界　Ｘ　Ｐａｒｔｙ',
        Content:
          '<p>每年的3-4月是浪漫的櫻花季</p><p>隨處也都可見到眾多攤販聚集的園遊會</p><p><br></p><p>我們推出過蛋糕、馬卡龍、鰻魚、草莓塔等多款增添生活樂趣的手做商品</p><p><br></p><p>今年我們也如同園遊會一樣與來自台灣各地商家配合&nbsp;</p><p><br></p><p>3-4月期間預計每周將會推出一款『聯名商品』</p><p><br></p><p>讓各位好朋友們除了品嚐到新鮮的水果商品以外，也可在耀聞水果世界一站購足蹦出浪漫火花的手做溫度商品????</p><p><br></p><p>商品可以使用黑貓冷藏宅配、台中市區１５公里內滿額親送或門市自取呦????</p><p><br></p><p>????每批限量發售、售完為止不做追加????</p><p><br></p><p>⚠️統一提供連結訂購刷卡付款⚠️</p><p><br></p><p><br></p><p>因商品都是新鮮現做、</p><p>下單後依照預定順序於（７日內）出貨完畢，充滿手作溫度的優質商品值得您耐心等候❤️</p><p><br></p><p>後續商品、敬請拭目以待????</p><p>有合作意願的老闆們也可以私訊洽談呦????</p>',
        Image1: '/image/news/1677044304_3e19e7a9aee2be3f8b41.jpg',
        Seq: '1',
        updated_at: '2023-02-22 13:38:26',
        created_at: '2023-02-22 13:38:23',
        CategoryTitle: '活動消息',
      },
      news_category_data: [
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
    CopyLink() {
      this.$refs.clone.focus();
      document.execCommand('copy');
      alert('已複製到剪貼簿');
    },
    ShareToFB() {
      window
        .open(
          `https://www.facebook.com/sharer.php?u=${window.location.href}`,
          '_blank'
        )
        .focus();
    },
    ShareToLine() {
      window.open(`line://msg/text/${window.location.href}`, '_blank').focus();
    },
    SetGsap() {
      this.$refs.RelatedList.SetGsap();
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('load-image', 'home');
    });
  },
  created() {
    if (this.news_data != 'error') {
      this.bread_crumb_path[1].title = this.active_caregory.Title;
      this.bread_crumb_path[1].link = `/news?category=${this.active_caregory.NewsCategoryID}`;

      let description = this.news_data.Content.replaceAll(/<[^>]+>/g, '');
      this.meta_data = GetMetaData(
        this.news_data.Title,
        description.slice(0, 150),
        this.news_data.Image1
      );

      this.$nextTick(() => {
        this.$refs.clone.value = window.location.href;
        this.$PageReady(this.meta_data.title);
      });
    } else {
      this.$RedirectError();
    }
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    news_data() {
      this.news_data == 'error' ? this.$RedirectError() : '';
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
  },
  computed: {
    image_loaded() {
      return this.$store.state.image_loaded;
    },
    // news_category_data() {
    //   return this.$store.state.news_category_data;
    // },
    active_caregory() {
      const active_caregory = this.news_category_data.filter(
        (item) => item.NewsCategoryID == this.news_data.NewsCategoryID
      );
      return active_caregory.length > 0 ? active_caregory[0] : 'error';
    },
    // news_list() {
    //   return this.$store.state.news_data;
    // },
    // news_data() {
    //   const news_data = this.news_list.filter(
    //     (item) => item.NewsID == this.$route.params.id
    //   );
    //   return news_data.length > 0 ? news_data[0] : 'error';
    // },
    next_news_data() {
      if (this.news_data == 'error') {
        return 'error';
      } else {
        let index = -1;
        this.news_list.forEach((item, item_index) => {
          item.NewsID == this.news_data.NewsID ? (index = item_index) : '';
        });
        index == this.news_list.length - 1 ? (index = 0) : (index += 1);
        return this.news_list[index];
      }
    },
  },
};
</script>

<style>
#NewsContent img {
  display: inline-block;
}
</style>
