<template>
  <div id="app" class="relative sm:pt-32 pt-28 overflow-x-hidden">
    <EventAnnouncement text="全館消費滿NT$1500 台灣本島免運優惠" />
    <MainHeader v-if="data_load_finish" />
    <MainLoading />
    <router-view v-if="data_load_finish" />
    <MainFooter />
  </div>
</template>

<style src="@/assets/css/app.css"></style>

<script>
// import MainHeader from '@/components/NewMainHeader';
// import MainFooter from '@/components/MainFooter';
// import MainDialog from '@/components/MainDialog';
// import AddCartMessage from '@/components/AddCartMessage';
import EventAnnouncement from '@/components/EventAnnouncement.vue';
import MainHeader from '@/components/MainHeader.vue';
import MainLoading from '@/components/MainLoading';
import MainFooter from '@/components/MainFooter.vue';

export default {
  name: 'App',
  components: {
    // MainHeader,
    // MainFooter,
    // MainDialog,
    // AddCartMessage,
    EventAnnouncement,
    MainHeader,
    MainFooter,
    MainLoading,
  },
  methods: {
    CheckPageData() {
      this.common_column_data == null
        ? this.$store.dispatch('getColumnData')
        : '';
      this.carousel_data == null ? this.$store.dispatch('getCarouselData') : '';
      this.kol_data == null ? this.$store.dispatch('getKolData') : '';
      this.news_data == null ? this.$store.dispatch('getNewsData') : '';
      this.news_category_data == null
        ? this.$store.dispatch('getNewsCategoryData')
        : '';
      this.promote_data == null ? this.$store.dispatch('getPromoteData') : '';
      this.parent_category_data == null
        ? this.$store.dispatch('getParentCategoryData')
        : '';
      this.category_data == null ? this.$store.dispatch('getCategoryData') : '';
      this.product_data == null ? this.$store.dispatch('getProductData') : '';
      this.question_category_data == null
        ? this.$store.dispatch('getQuestionCategoryData')
        : '';
      this.question_data == null ? this.$store.dispatch('getQuestionData') : '';
      this.zipcode_data == null ? this.$store.dispatch('getZipCode') : '';
      this.mascot_data == null ? this.$store.dispatch('getMascotData') : '';
    },
  },
  computed: {
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    carousel_data() {
      return this.$store.state.carousel_data;
    },
    kol_data() {
      return this.$store.state.kol_data;
    },
    news_data() {
      return this.$store.state.news_data;
    },
    news_category_data() {
      return this.$store.state.news_category_data;
    },
    promote_data() {
      return this.$store.state.promote_data;
    },
    parent_category_data() {
      return this.$store.state.parent_category_data;
    },
    category_data() {
      return this.$store.state.category_data;
    },
    product_data() {
      return this.$store.state.product_data;
    },
    question_category_data() {
      return this.$store.state.question_category_data;
    },
    question_data() {
      return this.$store.state.question_data;
    },
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
    mascot_data() {
      return this.$store.state.mascot_data;
    },
    data_load_finish() {
      if (
        this.common_column_data != null &&
        this.carousel_data != null &&
        this.kol_data != null &&
        this.news_data != null &&
        this.news_category_data != null &&
        this.promote_data != null &&
        this.parent_category_data != null &&
        this.category_data != null &&
        this.product_data != null &&
        this.question_category_data != null &&
        this.question_data != null &&
        this.zipcode_data != null &&
        this.mascot_data != null
      ) {
        return true;
      } else {
        return false;
      }
    },
  },
  created() {
    this.CheckPageData();
  },
};
</script>
