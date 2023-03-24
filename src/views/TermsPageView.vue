<template>
  <main
    id="TermsPage"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 flex items-center justify-center w-full min-h-screen pt-40 pb-20"
  >
    <div
      v-if="data_load_finish"
      class="w-full max-w-screen-xl px-5 pb-40 mx-auto xl:px-0 sm:px-10"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <header
        class="relative z-10 flex flex-col-reverse items-start w-full mb-20"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_white"
            >{{ title }}</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <h3 class="mb-4 overflow-hidden">
          <span
            data-section-title
            data-text="News"
            class="block text-5xl font-black sm:text-7xl text-basic_white text-opacity-20 font-anybody"
          >
            {{ sub_title }}
          </span>
        </h3>
      </header>
      <div
        data-section-content
        class="flex items-center justify-between pb-2 mb-10 border-b border-zinc-300"
      >
        <div class="flex items-center">
          <p class="mr-2 text-sm font-semibold text-basic_gray sm:text-base">
            最後更新日期：
            {{ content.UpTime.slice(0, 10) }}
          </p>
        </div>
      </div>
      <div
        data-section-content
        id="NewsContent"
        class="w-full mb-20 text-white"
        v-html="content.Content"
      ></div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
import { section_animation } from '@/gsap/section';
import { mapGetters, mapState } from 'vuex';
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
      section_animation: null,
    };
  },
  methods: {
    SetGsap() {
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
    PageInit() {
      this.bread_crumb_path[1].title = this.title;
      this.bread_crumb_path[1].link = '/terms/' + this.$route.params.type;
      this.meta_data = GetMetaData(this.title, '', '');

      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
        this.$emit('load-image', 'home');
      });
    },
  },
  watch: {
    data_load_finish() {
      this.data_load_finish ? this.PageInit() : '';
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
  },
  computed: {
    ...mapGetters(['data_load_finish']),
    ...mapState(['image_loaded', 'common_column_data']),
    title() {
      return this.$route.params.type == 'site_privacy'
        ? '會員責任規範及個資聲明'
        : '商店服務條款';
    },
    sub_title() {
      return this.$route.params.type == 'site_privacy'
        ? 'Privacy Policy'
        : 'Terms Of Member';
    },
    content() {
      return this.common_column_data.filter(
        (column) => column.Title == this.$route.params.type
      )[0];
    },
  },
  mounted() {
    this.$emit('page-mounted');
  },
  created() {
    this.image_loaded ? this.SetGsap() : '';
    this.data_load_finish ? this.PageInit() : '';
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
