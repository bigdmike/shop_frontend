<template>
  <main class="relative z-10 w-full">
    <div
      class="w-full max-w-screen-xl mx-auto py-60 flex items-center justify-center xl:px-0 px-10 flex-wrap"
    >
      <div
        class="flex items-center md:mr-14 md:flex-row flex-col md:w-auto w-full md:mb-0 mb-10"
      >
        <h3 class="text-[80px] font-yeseva mr-5">404</h3>
        <div class="md:text-left text-center">
          <h4 class="text-2xl font-yeseva">Page Not Found</h4>
          <p class="text-basic_gray">找不到頁面，您可以嘗試以下動作：</p>
        </div>
      </div>
      <div class="flex items-center md:flex-row flex-col md:w-auto w-[350px]">
        <a
          class="px-14 cursor-pointer py-2 text-center rounded-full md:w-auto w-full block border border-primary text-primary md:mr-2 md:mb-0 mb-5 transition-colors duration-200 hover:bg-primary hover:text-white"
          @click="$router.back(-1)"
        >
          回上一頁</a
        >
        <router-link
          class="px-14 py-2 text-center rounded-full md:w-auto w-full block border border-primary text-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          to="/"
        >
          回到首頁</router-link
        >
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'ErrorPageView',
};
</script>
