<template>
  <main id="NewsPage" class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 pb-40 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <h2 class="mb-5 text-2xl font-semibold sm:text-4xl">
        {{ title }}
      </h2>
      <div
        class="flex items-center justify-between pb-2 mb-10 border-b border-zinc-300"
      >
        <div class="flex items-center">
          <p class="mr-2 text-sm font-semibold text-basic_gray sm:text-base">
            最後更新日期：{{ content.UpTime.slice(0, 10) }}
          </p>
        </div>
      </div>
      <div
        id="NewsContent"
        class="w-full mb-20 text-basic_black"
        v-html="content.Content"
      ></div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'TermsPageView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '網站條款',
          link: '/',
        },
      ],
      meta_data: null,
    };
  },
  created() {
    this.bread_crumb_path[1].title = this.title;
    this.bread_crumb_path[1].link = '/terms/' + this.$route.params.type;
    this.meta_data = GetMetaData(this.title, '', '');
    this.$nextTick(() => {
      window.prerenderReady = true;
      window.dataLayer.push({
        event: 'page_view',
        page_title: this.meta_data.title,
      });
    });
  },
  computed: {
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    title() {
      return this.$route.params.type == 'site_privacy'
        ? '會員責任規範及個資聲明'
        : '商店服務條款';
    },
    content() {
      return this.$route.params.type == 'site_privacy'
        ? this.site_privacy
        : this.terms_of_customer;
    },
    site_privacy() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'site_privacy'
      )[0];
      return tmp_data;
    },
    terms_of_customer() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'terms_of_customer'
      )[0];
      return tmp_data;
    },
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>

<style>
#NewsContent img {
  display: inline-block;
}
</style>
