<template>
  <main
    id="About"
    data-scroll-section
    class="relative z-10 w-full py-40 bg-basic_gray sm:py-60"
  >
    <div
      id="AboutContainer"
      class="relative z-10 w-full"
      v-if="data_load_finish"
    >
      <div
        class="relative z-10 w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10"
      >
        <BreadCrumb class="mb-20" :path="bread_crumb_path" />
        <MainContent ref="MainContent" />
        <CompanyInfo ref="CompanyInfo" />
      </div>

      <!-- background sticky image -->
      <div
        data-scroll
        data-scroll-sticky
        data-scroll-target="#AboutContainer"
        class="absolute w-1/2 sm:w-[300px] md:w-[432px] md:max-w-[45%] z-0 top-28"
      >
        <div class="overflow-hidden section_corner">
          <img
            src="/img/about/about_bg_1.webp"
            class="block w-full md:opacity-20 opacity-10"
          />
        </div>
      </div>

      <div
        data-scroll
        data-scroll-sticky
        data-scroll-target="#AboutContainer"
        class="absolute w-1/2 sm:w-[300px] md:w-[432px] md:max-w-[45%] z-0 top-28 right-0"
      >
        <div
          class="overflow-hidden transform translate-y-[150%] sm:translate-y-full section_corner_tl md:translate-y-0"
        >
          <img
            src="/img/about/about_bg_2.webp"
            class="block w-full md:opacity-20 opacity-10"
          />
        </div>
      </div>
      <!-- background sticky image -->
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import MainContent from '@/components/about/MainContent.vue';
import CompanyInfo from '@/components/about/CompanyInfo.vue';
import { GetMetaData } from '@/common/meta';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'AboutView',
  components: {
    BreadCrumb,
    MainContent,
    CompanyInfo,
  },
  data() {
    return {
      meta_data: null,
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
  methods: {
    SetGsap() {
      this.$emit('page-mounted');
      this.$refs.MainContent.SetGsap();
      this.$refs.CompanyInfo.SetGsap();
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
    PageInit() {
      this.meta_data = GetMetaData('about', '', '');
      this.$nextTick(() => {
        this.$emit('load-image');
      });
    },
  },
  computed: {
    ...mapState(['carousel_data', 'news_data', 'image_loaded']),
    ...mapGetters(['data_load_finish']),
  },
  created() {
    this.$LoadDataMixin(this);
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% calc(100% - 60px),
    calc(100% - 60px) 100%,
    0 100%,

    0% 0%,
    0% 0%
  );
  clip-path: polygon(
    100% 0,
    100% calc(100% - 60px),
    calc(100% - 60px) 100%,
    0 100%,

    0% 0%,
    0% 0%
  );
}

.section_corner_tl {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0% 60px,
    60px 0%
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0% 60px,
    60px 0%
  );
}

@media (max-width: 768px) {
  .section_corner {
    -webkit-clip-path: polygon(
      100% 0,
      100% calc(100% - 40px),
      calc(100% - 40px) 100%,
      0 100%,

      0% 0%,
      0% 0%
    );
    clip-path: polygon(
      100% 0,
      100% calc(100% - 40px),
      calc(100% - 40px) 100%,
      0 100%,

      0% 0%,
      0% 0%
    );
  }

  .section_corner_tl {
    -webkit-clip-path: polygon(
      100% 0,
      100% 100%,

      100% 100%,
      0 100%,

      0% 40px,
      40px 0%
    );
    clip-path: polygon(
      100% 0,
      100% 100%,

      100% 100%,
      0 100%,

      0% 40px,
      40px 0%
    );
  }
}
</style>
