<template>
  <main class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img :src="$ImageUrl(about_section_1_image)" class="block w-full" />
        </div>
        <div class="w-full md:w-1/2 md:pl-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">01.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ about_section_1_title }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ about_section_1_sub_title }}
          </p>
          <div v-html="about_section_1_content"></div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:flex-row-reverse md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img :src="$ImageUrl(about_section_2_image)" class="block w-full" />
        </div>
        <div class="w-full md:w-1/2 md:pr-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">02.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ about_section_2_title }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ about_section_2_sub_title }}
          </p>
          <div v-html="about_section_2_content"></div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img :src="$ImageUrl(about_section_3_image)" class="block w-full" />
        </div>
        <div class="w-full md:w-1/2 md:pl-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">03.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ about_section_3_title }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ about_section_3_sub_title }}
          </p>
          <div v-html="about_section_3_content"></div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:flex-row-reverse md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img :src="$ImageUrl(about_section_4_image)" class="block w-full" />
        </div>
        <div class="w-full md:w-1/2 md:pr-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">04.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ about_section_4_title }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ about_section_4_sub_title }}
          </p>
          <div v-html="about_section_4_content"></div>
        </div>
      </div>
      <CompanyInfoSection :image="company_image" />
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
    company_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_image'
      )[0].Content;
      return tmp_data;
    },
    about_section_1_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_1_image'
      )[0].Content;
      return tmp_data;
    },
    about_section_1_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_1_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_1_sub_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_1_sub_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_1_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_1_content'
      )[0].Content;
      return tmp_data;
    },
    about_section_2_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_2_image'
      )[0].Content;
      return tmp_data;
    },
    about_section_2_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_2_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_2_sub_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_2_sub_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_2_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_2_content'
      )[0].Content;
      return tmp_data;
    },
    about_section_3_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_3_image'
      )[0].Content;
      return tmp_data;
    },
    about_section_3_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_3_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_3_sub_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_3_sub_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_3_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_3_content'
      )[0].Content;
      return tmp_data;
    },
    about_section_4_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_4_image'
      )[0].Content;
      return tmp_data;
    },
    about_section_4_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_4_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_4_sub_title() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_4_sub_title'
      )[0].Content;
      return tmp_data;
    },
    about_section_4_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_4_content'
      )[0].Content;
      return tmp_data;
    },
  },
};
</script>
