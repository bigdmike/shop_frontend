<template>
  <footer class="relative z-10 border-t bg-white border-[#cccccc] py-32">
    <div
      class="flex flex-wrap items-start justify-between w-full max-w-screen-xl px-10 mx-auto xl:px-0 md:mb-12"
    >
      <router-link to="/" class="mb-20">
        <img :src="$ImageUrl(logo_image)" class="w-60" />
      </router-link>
      <div class="flex flex-wrap items-start">
        <div class="mb-20 mr-16">
          <h4 class="mb-5 text-2xl font-bold">聯絡我們</h4>
          <ol class="text-basic_gray">
            <li class="flex flex-wrap items-center mb-4 sm:mb-2 sm:flex-nowrap">
              <p class="flex-shrink-0 w-full mr-3 sm:w-auto">聯絡電話</p>
              <p>{{ company_phone }}</p>
            </li>
            <li class="flex flex-wrap items-center mb-4 sm:mb-2 sm:flex-nowrap">
              <p class="flex-shrink-0 w-full mr-3 sm:w-auto">電子郵件</p>
              <p>{{ company_email }}/p></p>
            </li>

            <li class="flex flex-wrap items-center sm:flex-nowrap">
              <p class="flex-shrink-0 w-full mr-3 sm:w-auto">營業時間</p>
              <p>{{ company_time }}</p>
            </li>
          </ol>
        </div>
        <div class="mb-20">
          <h4 class="mb-5 text-2xl font-bold">追蹤我們</h4>
          <ol class="flex text-basic_gray">
            <li class="flex items-center mb-2 mr-2">
              <a
                :href="company_facebook"
                target="_blank"
                class="p-2 text-white transition-colors duration-200 rounded-md bg-basic_black hover:bg-secondary"
              >
                <FacebookIcon class="w-5" />
              </a>
            </li>
            <li class="flex items-center mb-2">
              <a
                :href="company_instagram"
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
      class="w-full max-w-screen-xl md:border-t md:border-[#cccccc] mx-auto flex items-center flex-wrap justify-between xl:px-0 px-10 md:pt-5"
    >
      <div class="flex flex-wrap items-center">
        <img src="@/assets/img/credit_card.svg" class="mb-10 mr-5" />
        <ol class="flex items-center mb-10 -mx-2 text-sm md:mx-0">
          <li class="border-r border-basic_black">
            <router-link class="px-2 link_color" to="/">服務條款</router-link>
          </li>
          <li class="border-r border-basic_black">
            <router-link class="px-2 link_color" to="/">隱私政策</router-link>
          </li>
          <li>
            <router-link class="px-2 link_color" to="/">訂單查詢</router-link>
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
  computed: {
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    company_phone() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_phone'
      )[0].Content;
      return tmp_data;
    },
    company_time() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_time'
      )[0].Content;
      return tmp_data;
    },
    company_email() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_email'
      )[0].Content;
      return tmp_data;
    },
    company_facebook() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_facebook'
      )[0].Content;
      return tmp_data;
    },
    company_instagram() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_instagram'
      )[0].Content;
      return tmp_data;
    },
    logo_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'logo_image'
      )[0].Content;
      return tmp_data;
    },
  },
};
</script>
