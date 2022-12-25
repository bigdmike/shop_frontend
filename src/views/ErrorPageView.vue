<template>
  <main class="relative z-10 w-full">
    <div
      class="flex flex-wrap items-center justify-center w-full max-w-screen-xl px-10 mx-auto py-60 xl:px-0"
    >
      <div
        class="flex flex-col items-center w-full mb-10 md:mr-14 md:flex-row md:w-auto md:mb-0"
      >
        <h3 class="text-[80px] font-yeseva mr-5">404</h3>
        <div class="text-center md:text-left">
          <h4 class="text-2xl font-yeseva">Page Not Found</h4>
          <p class="text-basic_gray">找不到頁面，您可以嘗試以下動作：</p>
        </div>
      </div>
      <div class="flex items-center md:flex-row flex-col md:w-auto w-[350px]">
        <a
          class="block w-full py-2 mb-5 text-center transition-colors duration-200 border rounded-full cursor-pointer px-14 md:w-auto border-primary text-primary md:mr-2 md:mb-0 hover:bg-primary hover:text-white"
          @click="$router.back(-1)"
        >
          回上一頁</a
        >
        <router-link
          class="block w-full py-2 text-center transition-colors duration-200 border rounded-full px-14 md:w-auto border-primary text-primary hover:bg-primary hover:text-white"
          to="/"
        >
          回到首頁</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
import { GetMetaData } from '@/common/meta';
export default {
  name: 'ErrorPageView',
  data() {
    return {
      meta_data: null,
    };
  },
  created() {
    this.meta_data = GetMetaData('找不到頁面', '', '');
    this.meta_data.meta.push({
      property: 'prerender-status-code',
      content: '404',
      vmid: 'prerender-status-code',
    });
    var meta = document.createElement('meta');
    meta.setAttribute('property', 'prerender-status-code');
    meta.content = '404';
    document.getElementsByTagName('head')[0].appendChild(meta);
    this.$nextTick(() => {
      window.prerenderReady = true;
      window.dataLayer.push({
        event: 'page_view',
        page_title: this.meta_data.title,
      });
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
