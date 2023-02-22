<template>
  <div id="container" class="">
    <!-- v-if="data_load_finish" -->
    <MainHeader ref="MainHeader" />
    <MainLoading />
    <ShopCartDialog />
    <ShopCartDrawer />
    <MainDialog />
    <SearchDialog />

    <div id="app">
      <!--  v-if="data_load_finish" -->
      <router-view
        @load-image="LoadImage"
        @scroll-top="ScrollToTop"
        @update-scroll="UpdateScroller"
      />
      <ContactFooter />
      <!--  v-if="data_load_finish" -->
      <MainFooter @scroll-top="ScrollToTop" />
    </div>
    <MainFooterNav @open-menu="OpenMenu" />
    <button
      v-if="data_load_finish"
      @click="OpenMessenger"
      @mouseenter="messenger_hvoer = true"
      @mouseleave="messenger_hvoer = false"
      class="fixed z-20 flex items-center justify-center transition-all duration-300 rounded-full md:bottom-5 sm:bottom-20 bottom-16 sm:right-7 right-2 sm:w-14 sm:h-14 w-11 h-11 bg-primary hover:bg-opacity-70"
    >
      <div
        :class="messenger_hvoer ? 'opacity-100 -translate-y-1/2' : 'opacity-0'"
        class="md:block hidden absolute pointer-events-none transition-all duration-300 top-1/2 shadow-xl -left-2 transform -translate-x-full bg-white rounded-t-full rounded-bl-full w-[180px] py-2 px-4"
      >
        <p class="block text-primary">歡迎私訊小編喔～</p>
      </div>
      <MessageIcon class="w-6 text-white transform md:w-8 -scale-y-100" />
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
import MessageIcon from '@/components/svg/MessageIcon.vue';
import ContactFooter from '@/components/ContactFooter.vue';
import SearchDialog from '@/components/ProductSearchDialog.vue';
// import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
import { mapState } from 'vuex';
import { setLocalStorage, delLocalStorage } from '@/common/cookie';
import { marquee } from '@/gsap/marquee';
import { ImageLoader } from '@/gsap/image_loaded';

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
    MessageIcon,
    ContactFooter,
    SearchDialog,
    // SelectArrowIcon,
  },
  data() {
    return {
      messenger_hvoer: false,
      first_time_load: true,
      marquee_animation: null,
      image_loader: null,
    };
  },
  methods: {
    LoadImage(from) {
      this.$nextTick(() => {
        console.log('load from ' + from);
        this.image_loader != null
          ? this.image_loader.Destroy()
          : (this.image_loader = new ImageLoader());
        this.image_loader.LoadImage();
      });
    },
    UpdateScroller() {
      this.image_loader.locoScroll.update();
    },
    ScrollToTop() {
      this.image_loader.locoScroll.scrollTo('top');
    },
    CheckPageData() {
      this.common_column_data == null
        ? this.$store.dispatch('getColumnData')
        : '';
      this.carousel_data == null ? this.$store.dispatch('getCarouselData') : '';
      this.news_data == null ? this.$store.dispatch('getNewsData') : '';
      this.news_category_data == null
        ? this.$store.dispatch('getNewsCategoryData')
        : '';
      this.promote_data == null ? this.$store.dispatch('getPromoteData') : '';
      this.category_data == null ? this.$store.dispatch('getCategoryData') : '';
      this.product_data == null ? this.$store.dispatch('getProductData') : '';
      this.question_category_data == null
        ? this.$store.dispatch('getQuestionCategoryData')
        : '';
      this.question_data == null ? this.$store.dispatch('getQuestionData') : '';
      this.zipcode_data == null ? this.$store.dispatch('getZipCode') : '';
      this.payment_data == null ? this.$store.dispatch('getPaymentData') : '';
      this.shipway_data == null ? this.$store.dispatch('getShipwayData') : '';
    },
    OpenMenu() {
      this.$refs.MainHeader.OpenMenu();
    },
    OpenMessenger() {
      window.dataLayer.push({
        event: 'open_messenger',
      });
      window.open(this.$GetCloumn('company_messenger'), '_blank');
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
      'body_lock',
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
    ]),
    data_load_finish() {
      return this.$store.getters.data_load_finish;
    },
  },
  watch: {
    body_lock() {
      // if (this.body_lock != 0) {
      //   document.querySelector('body').style.overflowY = 'hidden';
      // } else {
      //   document.querySelector('body').style.overflowY = 'auto';
      // }
    },
    data_load_finish() {
      // if (this.data_load_finish) {
      //   this.$store.dispatch('shopcart_module/GetShopCart');
      // }
      // if (this.data_load_finish && this.first_time_load) {
      //   this.first_time_load = false;
      // }
    },
    $route() {
      // this.GetOrderMemo();
    },
  },
  created() {
    // this.CheckPageData();
  },
  mounted() {
    // const h_full_el = document.querySelectorAll('.h-screen');
    // h_full_el.forEach((item) => {
    //   item.style.height = `${window.innerHeight}px`;
    // });
    // this.pageLoad();
    console.log('app mounted');
    // this.LoadImage('app');
    this.marquee_animation = new marquee();
  },
};
</script>
