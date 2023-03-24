<template>
  <footer
    data-scroll-section
    class="relative z-20 overflow-hidden pt-14 bg-basic_gray"
  >
    <div
      data-marquee-box
      data-direction="left"
      data-duration="10"
      class="absolute top-0 left-0 right-0 z-20 flex transform -translate-y-1/2"
    >
      <span
        data-marquee-item
        v-for="item in 10"
        :key="`marquee_${item}`"
        class="text-basic_white block text-opacity-10 leading-none mr-4 text-[80px] md:text-[160px] sm:text-[120px] flex-shrink-0 font-anybody font-semibold"
        >Krace</span
      >
    </div>
    <div
      class="w-full max-w-screen-xl px-5 pb-24 mx-auto md:pb-14 xl:px-0 sm:px-10"
    >
      <div class="flex justify-end">
        <button
          @click="ScrollToTop"
          class="relative w-[106px] aspect-square text-basic_black"
        >
          <div class="px-2 py-4">
            <span class="text-4xl sm:text-5xl icon-arrow_up"></span>
            <p class="font-bold font-anybody">Page Top</p>
          </div>
          <span
            class="absolute bottom-0 right-0 text-xs icon-triangle text-primary"
          ></span>
        </button>
      </div>
      <div class="flex flex-wrap justify-between lg:flex-nowrap">
        <router-link to="/" class="block mb-10 mr-32 lg:mb-0">
          <img width="180" height="40" src="/img/logo.svg" class="block w-64" />
        </router-link>
        <div class="w-full">
          <ol class="mb-10 lg:mb-14">
            <li class="mb-2 font-medium font-anybody">
              <span class="mr-4 font-bold">聯絡電話 </span> 04-2271-6109
            </li>
            <li class="mb-2 font-medium font-anybody">
              <span class="mr-4 font-bold">傳真號碼</span> 04-2271-6112
            </li>
          </ol>
          <div
            class="flex flex-wrap items-center justify-between flex-1 pt-4 border-t md:flex-nowrap border-basic_black"
          >
            <ol class="flex flex-wrap items-center mb-4 -mx-2 md:mb-0">
              <li
                v-for="(item, item_index) in menu_list"
                :key="`menu_${item_index}`"
                class="mb-2"
              >
                <router-link
                  :to="item.link"
                  class="px-2 font-bold font-anybody"
                  >{{ item.title }}</router-link
                >
              </li>
            </ol>
            <div class="flex items-center w-full md:w-auto">
              <p
                class="mr-4 font-bold leading-none tracking-wider font-anybody"
              >
                Follow Us
              </p>
              <a
                :href="$GetColumn('company_facebook')"
                target="_blank"
                class="mr-2"
              >
                <span class="text-2xl icon-facebook"></span>
              </a>
              <a :href="$GetColumn('company_instagram')" target="_blank">
                <span class="text-2xl icon-instagram"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full pt-4 pb-32 bg-black md:pb-4">
      <div
        class="flex flex-wrap items-center justify-center w-full max-w-screen-xl px-5 mx-auto md:justify-between xl:px-0 sm:px-10"
      >
        <ol
          class="flex items-center justify-center mb-5 text-sm md:mb-0 md:justify-start"
        >
          <li class="mr-5">
            <router-link
              class="text-white transition-colors duration-500 hover:text-primary"
              to="/terms/privacy"
              >隱私權政策</router-link
            >
          </li>
          <li class="mr-5">
            <router-link
              class="text-white transition-colors duration-500 hover:text-primary"
              to="/terms/terms_of_customer"
              >會員條款</router-link
            >
          </li>
          <li>
            <router-link
              class="text-white transition-colors duration-500 hover:text-primary"
              to="/order_search/search"
              >訂單查詢</router-link
            >
          </li>
        </ol>
        <p
          class="w-full text-xs text-center md:w-auto font-anybody text-basic_gray md:text-right"
        >
          Copyright ©Krace All Rights Reserved.<br class="block md:hidden" />
          網頁設計：<a
            href="https://www.yongxin-design.com"
            target="_blank"
            class="text-primary"
            >泳欣事業有限公司</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'MainFooter',
  data() {
    return {
      menu_list: [
        {
          title: 'About',
          link: '/about',
        },
        {
          title: 'Products',
          link: '/collections',
        },
        {
          title: 'News',
          link: '/news',
        },
        {
          title: 'Dealer',
          link: '/dealer',
        },
        {
          title: 'Contact',
          link: '/contact',
        },
        {
          title: 'Member',
          link: '/account/login',
        },
      ],
    };
  },
  methods: {
    ScrollToTop() {
      this.$emit('scroll-top');
    },
  },
  mounted() {},
};
</script>
