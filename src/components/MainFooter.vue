<template>
  <footer class="relative z-10 border-t bg-white border-[#cccccc] py-32">
    <div
      class="w-full max-w-screen-xl mx-auto flex flex-wrap items-start justify-between xl:px-0 px-10 md:mb-12"
    >
      <router-link to="/" class="mb-20">
        <img src="/img/logo.png" class="w-60" />
      </router-link>
      <div class="flex items-start flex-wrap">
        <div class="mr-16 mb-20">
          <h4 class="text-2xl font-bold mb-5">聯絡我們</h4>
          <ol class="text-basic_gray">
            <li class="flex items-center sm:mb-2 mb-4 sm:flex-nowrap flex-wrap">
              <p class="mr-3 flex-shrink-0 sm:w-auto w-full">聯絡電話</p>
              <p>04-2382-1555</p>
            </li>
            <li class="flex items-center sm:mb-2 mb-4 sm:flex-nowrap flex-wrap">
              <p class="mr-3 flex-shrink-0 sm:w-auto w-full">電子郵件</p>
              <p>greatfruit1105@gmail.com</p>
            </li>
            <li class="flex items-center sm:flex-nowrap flex-wrap">
              <p class="mr-3 flex-shrink-0 sm:w-auto w-full">營業時間</p>
              <p>一至六 9:00~21:00 / 日 11:00~19:00</p>
            </li>
          </ol>
        </div>
        <div class="mb-20">
          <h4 class="text-2xl font-bold mb-5">追蹤我們</h4>
          <ol class="text-basic_gray flex">
            <li class="flex items-center mb-2 mr-2">
              <a
                class="bg-basic_black p-2 rounded-md text-white transition-colors duration-200 hover:bg-secondary"
              >
                <FacebookIcon class="w-5" />
              </a>
            </li>
            <li class="flex items-center mb-2">
              <a
                class="bg-basic_black p-2 rounded-md text-white transition-colors duration-200 hover:bg-secondary"
              >
                <InstagramIcon class="w-5" />
              </a>
            </li>
          </ol>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-screen-xl md:border-t md:border-[#cccccc] mx-auto flex items-center flex-wrap justify-between xl:px-0 px-10 md:pt-5"
    >
      <div class="flex items-center flex-wrap">
        <img src="@/assets/img/credit_card.svg" class="mr-5 mb-10" />
        <ol class="flex items-center text-sm mb-10 md:mx-0 -mx-2">
          <li class="border-r border-basic_black">
            <router-link class="px-2 link_color" to="/">服務條款</router-link>
          </li>
          <li class="border-r border-basic_black">
            <router-link class="px-2 link_color" to="/">隱私政策</router-link>
          </li>
          <li>
            <router-link class="px-2 link_color" to="/">退款政策</router-link>
          </li>
        </ol>
      </div>
      <div class="flex items-center text-xs text-basic_gray mb-10">
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
