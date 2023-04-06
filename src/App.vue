<template>
  <div id="container" class="min-h-screen">
    <!-- 頂部導覽列 -->
    <MainHeader ref="MainHeader" />
    <!-- Loading組件 -->
    <MainLoading />
    <!-- 加入購物車訊息 -->
    <ShopCartDialog />
    <!-- 購物車 -->
    <ShopCartDrawer />
    <!-- 系統訊息 -->
    <MainDialog />
    <!-- 搜尋商品 -->
    <SearchDialog />

    <div id="app" class="min-h-screen">
      <!-- 畫面 -->
      <router-view
        class="min-h-screen"
        ref="RouterView"
        @load-image="LoadImage"
        @scroll-top="ScrollToTop"
        @update-scroll="UpdateScroller"
        @stop-scroll="StopScroller"
        @start-scroll="StartScroller"
        @page-mounted="page_mounted = true"
      />
      <!-- 聯絡我們區塊 -->
      <ContactFooter v-show="page_mounted" />
      <!-- Footer區塊 -->
      <MainFooter v-show="page_mounted" @scroll-top="ScrollToTop" />
    </div>

    <!-- 手機版導覽列 -->
    <MainFooterNav @open-menu="OpenMenu" @open-message="OpenMessenger" />

    <!-- 線上客服按鈕 -->
    <button
      v-if="data_load_finish"
      @click="OpenMessenger"
      @mouseenter="messenger_hvoer = true"
      @mouseleave="messenger_hvoer = false"
      class="fixed z-20 items-center justify-center hidden text-center transition-all duration-300 rounded-full md:flex md:bottom-5 sm:bottom-20 bottom-16 sm:right-7 right-2 sm:w-14 sm:h-14 w-11 h-11 bg-primary hover:bg-opacity-70"
    >
      <div
        :class="messenger_hvoer ? 'opacity-100 -translate-y-1/2' : 'opacity-0'"
        class="md:block hidden absolute pointer-events-none transition-all duration-300 top-1/2 shadow-xl -left-2 transform -translate-x-full bg-white rounded-t-full rounded-bl-full w-[180px] py-2 px-4"
      >
        <p class="block text-primary">歡迎私訊小編喔～</p>
      </div>
      <span class="block pl-1 text-3xl text-white icon-message"></span>
    </button>
  </div>
</template>

<style src="@/assets/css/app.css"></style>

<script>
import MainHeader from '@/components/MainHeader.vue';
import MainLoading from '@/components/MainLoading';
import MainFooter from '@/components/MainFooter.vue';
import ShopCartDialog from '@/components/ShopCartDialog.vue';
import ShopCartDrawer from '@/components/ShopCartDrawer.vue';
import MainDialog from '@/components/MainDialog.vue';
import MainFooterNav from '@/components/MainFooterNav.vue';
import ContactFooter from '@/components/ContactFooter.vue';
import SearchDialog from '@/components/ProductSearchDialog.vue';
import { mapState } from 'vuex';
import { setLocalStorage, delLocalStorage } from '@/common/cookie';
import { marquee } from '@/gsap/marquee';
import { ImageLoader } from '@/gsap/image_loaded';
import { ScrollTrigger } from '@/gsap/gsap_loader';

export default {
  name: 'App',
  components: {
    MainHeader,
    MainFooter,
    MainLoading,
    ShopCartDialog,
    ShopCartDrawer,
    MainDialog,
    MainFooterNav,
    ContactFooter,
    SearchDialog,
  },
  data() {
    return {
      messenger_hvoer: false,
      marquee_animation: null,
      image_loader: null,
      page_mounted: false,
    };
  },
  methods: {
    LoadImage() {
      // 確認頁面圖片讀取狀況
      this.$nextTick(() => {
        this.image_loader.LoadImage();
      });
    },
    UpdateScroller() {
      // 更新頁面滾動
      this.image_loader.locoScroll.update();
    },
    StartScroller() {
      // 啟動頁面滾動
      this.image_loader.locoScroll.start();
    },
    StopScroller() {
      // 暫停頁面滾動
      this.image_loader.locoScroll.stop();
    },
    ScrollToTop() {
      this.image_loader.locoScroll.scrollTo('top', { duration: 100 });
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);
    },
    CheckPageData() {
      // 檢查網站各項資料是否已經存在，如果不存在則Call API讀取資料

      // 通用欄位資料
      this.common_column_data == null
        ? this.$store.dispatch('getColumnData')
        : '';

      // 首頁輪播圖資料
      this.carousel_data == null ? this.$store.dispatch('getCarouselData') : '';

      // 最新消息資料
      this.news_data == null ? this.$store.dispatch('getNewsData') : '';
      this.news_category_data == null
        ? this.$store.dispatch('getNewsCategoryData')
        : '';

      // 商品資料
      this.category_data == null ? this.$store.dispatch('getCategoryData') : '';
      this.product_data == null ? this.$store.dispatch('getProductData') : '';

      // 常見問題資料
      this.question_category_data == null
        ? this.$store.dispatch('getQuestionCategoryData')
        : '';
      this.question_data == null ? this.$store.dispatch('getQuestionData') : '';

      // 付款相關資料
      this.zipcode_data == null ? this.$store.dispatch('getZipCode') : '';
      this.payment_data == null ? this.$store.dispatch('getPaymentData') : '';
      this.shipway_data == null ? this.$store.dispatch('getShipwayData') : '';

      // 經銷據點資料
      this.dealer_data == null ? this.$store.dispatch('getDealerData') : '';
    },
    OpenMenu() {
      this.$refs.MainHeader.OpenMenu();
    },
    OpenMessenger() {
      // 紀錄GTM事件
      window.dataLayer.push({
        event: 'open_messenger',
      });
      // 打開線上客服連結
      window.open(this.$GetColumn('company_messenger'), '_blank');
    },
    GetOrderMemo() {
      // 取得分潤標籤
      if (this.$route.query.order_memo != undefined) {
        setLocalStorage('order_memo', this.$route.query.order_memo);
      } else {
        delLocalStorage('order_memo');
      }
    },
  },
  computed: {
    ...mapState([
      'common_column_data',
      'carousel_data',
      'news_data',
      'news_category_data',
      'promote_data',
      'category_data',
      'product_data',
      'question_category_data',
      'question_data',
      'zipcode_data',
      'payment_data',
      'shipway_data',
      'dealer_data',
    ]),
    data_load_finish() {
      return this.$store.getters.data_load_finish;
    },
  },
  watch: {
    data_load_finish() {
      // 當資料全數載入後，初始化購物車內容
      if (this.data_load_finish) {
        this.$store.dispatch('shopcart_module/GetShopCart');
      }
    },
    $route() {
      // 網址路徑異動時，確認分潤標籤以及將頁面滾動到最上方
      this.GetOrderMemo();
      this.ScrollToTop();
    },
  },

  created() {
    // 第一次進入網站，呼叫檢查網站資料
    this.CheckPageData();
  },
  mounted() {
    // DOM載入後初始化ImageLoader以及跑馬燈的GSAP動畫
    this.image_loader = new ImageLoader();
    this.image_loader.SetScroller();
    this.marquee_animation = new marquee();
  },
};
</script>
