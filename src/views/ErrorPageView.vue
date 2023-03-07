<template>
  <main
    data-scroll-section
    class="relative z-10 w-full min-h-screen bg-basic_black"
  >
    <div
      v-if="data_load_finish"
      class="relative z-10 flex items-center md:w-1/2 sm:w-[70%] w-[80%] h-screen ml-auto sm:pr-10 pr-5 xl:pr-0"
    >
      <div>
        <h2 class="relative inline-block px-8 mb-4">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none text-white sm:text-xl md:text-2xl md:leading-none"
            >找不到頁面</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <p class="mb-10 text-sm text-white sm:text-base">
          非常抱歉，您所搜尋的頁面似乎不存在、或暫時無法使用，若有任何疑問歡迎與我們聯絡。
        </p>
        <router-link
          to="/"
          class="px-6 py-2 font-bold text-white rounded-md bg-primary"
          >回到首頁</router-link
        >
      </div>
    </div>
    <img
      src="/img/error_page/error_background@lg.webp"
      class="absolute top-0 left-0 z-0 hidden object-cover w-full h-full md:block"
    />
    <img
      src="/img/error_page/error_background@md.webp"
      class="absolute top-0 left-0 z-0 hidden object-cover w-full h-full md:hidden sm:block"
    />
    <img
      src="/img/error_page/error_background@sm.webp"
      class="absolute top-0 left-0 z-0 block object-cover w-full h-full sm:hidden"
    />
  </main>
</template>

<script>
import { GetMetaData } from '@/common/meta';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'ErrorPageView',
  data() {
    return {
      meta_data: null,
    };
  },
  methods: {
    PageInit() {
      this.meta_data = GetMetaData('找不到頁面', '', '');
      this.meta_data.meta.push({
        property: 'prerender-status-code',
        name: 'prerender-status-code',
        content: '404',
        vmid: 'prerender-status-code',
      });
      var meta = document.createElement('meta');
      meta.setAttribute('property', 'prerender-status-code');
      meta.setAttribute('name', 'prerender-status-code');
      meta.content = '404';
      document.getElementsByTagName('head')[0].appendChild(meta);
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
  },
  watch: {
    data_load_finish() {
      this.data_load_finish ? this.$emit('load-image') : '';
    },
    image_load() {
      this.image_load ? this.PageInit() : '';
    },
  },
  computed: {
    ...mapGetters(['data_load_finish']),
    ...mapState(['image_load']),
  },
  created() {
    this.image_load ? this.PageInit() : '';
    this.data_load_finish ? this.$emit('load-image') : '';
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
