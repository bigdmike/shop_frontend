<template>
  <main class="relative w-full z-10">
    <div class="w-full max-w-screen-xl mx-auto xl:px-0 sm:px-10 px-5">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div class="flex flex-wrap items-center justify-between">
        <div
          class="md:w-1/2 w-full rounded-2xl overflow-hidden md:pr-10 md:mb-0 mb-10"
        >
          <img :src="$ImageUrl(about_image)" />
        </div>
        <div class="md:w-1/2 w-full md:pl-10">
          <p class="sm:text-2xl font-yeseva sm:mb-4 mb-2 text-primary">01.-</p>
          <h3 class="sm:text-5xl text-3xl font-bold mb-3 text-primary">
            日匠職人精神
          </h3>
          <p class="sm:text-2xl font-yeseva sm:mb-10 mb-5">About Us</p>
          <div v-html="about_content"></div>
        </div>
      </div>
      <CompanyInfoSection :image="about_image" />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import CompanyInfoSection from '@/components/home/CompantInfoSection.vue';
export default {
  name: 'AboutView',
  components: {
    BreadCrumb,
    CompanyInfoSection,
  },
  data() {
    return {
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '關於我們',
          link: '/about',
        },
      ],
    };
  },
  computed: {
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    about_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'AboutCover'
      )[0].Content;
      return tmp_data;
    },
    about_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'AboutContent'
      )[0].Content;
      return tmp_data;
    },
  },
};
</script>
