<template>
  <footer
    class="relative z-10 border-t bg-white border-[#cccccc] sm:py-32 py-20"
  >
    <div
      class="flex flex-wrap items-start justify-between w-full max-w-screen-xl px-5 mx-auto xl:px-0 md:mb-12"
    >
      <router-link to="/" class="mb-20">
        <img
          :alt="$GetCloumn('company_name')"
          :src="$ImageUrl($GetCloumn('logo_image'))"
          class="w-60"
        />
      </router-link>
      <div class="flex flex-wrap items-start">
        <div class="mb-20 mr-16">
          <h4 class="mb-5 text-2xl font-bold">聯絡我們</h4>
          <ol class="text-basic_gray">
            <li class="flex flex-wrap items-center mb-4 sm:mb-2 sm:flex-nowrap">
              <p class="flex-shrink-0 w-full mr-3 sm:w-auto">聯絡電話</p>
              <p>{{ $GetCloumn('company_phone') }}</p>
            </li>
            <li class="flex flex-wrap items-center mb-4 sm:mb-2 sm:flex-nowrap">
              <p class="flex-shrink-0 w-full mr-3 sm:w-auto">電子郵件</p>
              <p>{{ $GetCloumn('company_email') }}</p>
            </li>

            <li class="flex flex-wrap items-center sm:flex-nowrap">
              <p class="flex-shrink-0 w-full mr-3 sm:w-auto">營業時間</p>
              <p>{{ $GetCloumn('company_time') }}</p>
            </li>
          </ol>
        </div>
        <div class="mb-20">
          <h4 class="mb-5 text-2xl font-bold">追蹤我們</h4>
          <ol class="flex text-basic_gray">
            <li class="flex items-center mb-2 mr-2">
              <a
                :href="$GetCloumn('company_facebook')"
                target="_blank"
                class="p-2 text-white transition-colors duration-200 rounded-md bg-basic_black hover:bg-secondary"
              >
                <FacebookIcon class="w-5" />
              </a>
            </li>
            <li class="flex items-center mb-2">
              <a
                :href="$GetCloumn('company_instagram')"
                target="_blank"
                class="p-2 text-white transition-colors duration-200 rounded-md bg-basic_black hover:bg-secondary"
              >
                <InstagramIcon class="w-5" />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-screen-xl md:border-t md:border-[#cccccc] mx-auto flex items-center flex-wrap justify-between xl:px-0 px-5 md:pt-5"
    >
      <div class="flex flex-wrap items-center">
        <img
          alt="PChome支付連"
          src="@/assets/img/logoPChomePay_200x40.webp"
          class="w-32 mb-10 mr-5"
        />
        <ol class="flex items-center mb-10 -mx-2 text-sm md:mx-0">
          <li class="border-r border-basic_black">
            <router-link class="px-2 link_color" to="/terms/terms_of_customer"
              >服務條款</router-link
            >
          </li>
          <li class="border-r border-basic_black">
            <router-link class="px-2 link_color" to="/terms/site_privacy"
              >隱私政策</router-link
            >
          </li>
          <li>
            <router-link class="px-2 link_color" to="/order_search/search"
              >訂單查詢</router-link
            >
          </li>
        </ol>
      </div>
      <div class="flex items-center mb-10 text-xs text-basic_gray">
        <p class="mr-3">© 耀聞水果世界 2022</p>
        <p>
          網站設計
          <a
            class="text-secondary"
            target="_blank"
            href="https://www.yongxin-design.com"
            >泳欣事業有限公司</a
          >
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import FacebookIcon from '@/components/svg/FacebookIcon.vue';
import InstagramIcon from '@/components/svg/InstagramIcon.vue';
export default {
  name: 'MainFooter',
  components: {
    FacebookIcon,
    InstagramIcon,
  },
};
</script>
