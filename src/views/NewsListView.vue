<template>
  <main
    id="NewsList"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full py-40 bg-basic_black sm:py-60"
  >
    <div
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <header
        class="relative z-10 flex flex-col-reverse items-start w-full md:mb-36 sm:mb-36 mb-28"
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

      <ol class="w-full">
        <li
          class="flex items-stretch mb-10 -mx-5"
          v-for="(item, item_index) in news_list"
          :key="`card_${item_index}`"
        >
          <div class="w-1/3 px-5">
            <img :src="item.Image1" class="block w-full" />
          </div>
          <div class="w-2/3 px-5">
            <p class="mb-2 text-basic_white text-opacity-60 font-anybody">
              {{ item.created_at.slice(0, 10) }}
            </p>
            <h3
              class="mb-4 text-3xl font-bold text-white truncate font-anybody"
            >
              {{ item.Title }}
            </h3>
            <p class="mb-10 font-medium text-white font-anybody">
              {{ item.Content | content }}
            </p>
            <MoreLinkButton :link="`/news/${item.NewsID}`" />
          </div>
        </li>
      </ol>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
export default {
  name: 'NewsListView',
  components: {
    BreadCrumb,
    MoreLinkButton,
  },
  data() {
    return {
      active_category: 'all',
      count_per_page: 9,
      page: 0,
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
          Image1: '/img/news/2.webp',
          Seq: '1',
          updated_at: '2023-02-16 11:36:06',
          created_at: '2023-01-30 15:29:30',
          CategoryTitle: '活動消息',
        },
      ],
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
    SetGsap() {},
  },
  mounted() {
    this.$nextTick(() => {
      this.$emit('load-image', 'home');
    });
  },
  created() {
    // this.SetActiveCategory();
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
  },
  computed: {
    image_loaded() {
      return this.$store.state.image_loaded;
    },
    sort_news_data() {
      let tmp_news_data = JSON.parse(JSON.stringify(this.news_data));
      if (this.sort_type == '時間由舊到新') {
        return tmp_news_data.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
      } else if (this.sort_type == '時間由新到舊') {
        return tmp_news_data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      } else {
        return tmp_news_data;
      }
    },
    page_news_data() {
      return this.sort_news_data.slice(
        0,
        this.page * this.count_per_page + this.count_per_page
      );
    },
  },
  filters: {
    content(val) {
      const text = val.replace(/(<([^>]+)>)/gi, '');
      return text.length > 100 ? text.slice(0, 97) + ' ...' : text;
    },
  },
};
</script>
