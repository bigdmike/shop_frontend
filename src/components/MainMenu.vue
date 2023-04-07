<template>
  <div
    ref="MainContent"
    class="fixed top-0 bottom-0 z-20 w-full overflow-hidden left-full"
  >
    <nav
      data-menu
      class="absolute top-0 left-0 z-10 w-full h-screen max-h-screen p-10 overflow-y-auto opacity-0 md:p-20 bg-basic_gray"
    >
      <button @click="Close" class="absolute top-7 right-7">
        <span class="text-2xl icon-close"></span>
      </button>

      <div class="flex flex-col w-full h-full">
        <div class="flex flex-col justify-center flex-1">
          <div class="flex flex-col justify-center flex-1">
            <div class="flex items-end justify-between w-full mb-20">
              <router-link to="/" class="w-1/2 sm:w-1/3">
                <img
                  width="180"
                  height="40"
                  :alt="$GetColumn('brand_name')"
                  src="/img/logo.svg"
                  class="block w-full"
                />
              </router-link>
            </div>
            <ol class="flex flex-wrap items-stretch justify-start w-full">
              <li
                v-for="(item, item_index) in menu_list"
                :key="`menu_item_${item_index}`"
                class="w-full sm:w-1/2"
              >
                <router-link
                  :to="item.link"
                  class="relative block px-5 py-2 mb-5 sm:px-6 sm:py-3 sm:mb-10"
                >
                  <span
                    class="absolute top-0 left-0 z-0 transform icon-triangle -scale-100"
                  ></span>
                  <h4 class="font-bold sm:text-2xl font-anybody">
                    {{ item.title }}
                  </h4>
                  <p class="text-sm font-bold sm:text-base">
                    {{ item.sub_title }}
                  </p>
                </router-link>
              </li>
            </ol>
          </div>
          <div>
            <h4 class="mb-3 text-xl font-bold font-anybody">Follow Us</h4>
            <div class="flex items-center">
              <a
                :href="$GetColumn('company_facebook')"
                target="_blank"
                class="p-2 mr-2 text-white transition-all duration-500 border border-transparent rounded-lg cursor-pointer hover:text-primary bg-primary hover:bg-transparent hover:border-primary"
              >
                <span class="block text-xl leading-none icon-facebook"></span>
              </a>
              <a
                :href="$GetColumn('company_instagram')"
                target="_blank"
                class="p-2 text-white transition-all duration-500 border border-transparent rounded-lg cursor-pointer hover:text-primary bg-primary hover:bg-transparent hover:border-primary"
              >
                <span class="block text-xl leading-none icon-instagram"></span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <span
        class="icon-triangle sm:text-[120px] text-[80px] text-primary absolute md:bottom-20 bottom-10 md:right-20 right-10 z-0"
      ></span>
    </nav>
    <div
      data-menu-bg
      class="absolute top-0 left-0 z-0 h-screen bg-basic_gray -translate-x-1/3 -translate-y-1/3 aspect-square triangle_bg"
    ></div>
    <div
      data-menu-bg
      class="absolute bottom-0 right-0 z-0 h-screen transform bg-basic_gray translate-x-1/3 translate-y-1/3 aspect-square -scale-100 triangle_bg"
    ></div>
  </div>
</template>

<script>
import { menu_gsap_animation } from '@/gsap/main_menu';
export default {
  name: 'MainMenu',
  props: {
    menu_list: {
      type: Array,
    },
  },
  data() {
    return {
      member_not_login: [
        {
          title: '登入',
          link: '/account/login',
        },
        {
          title: '註冊帳號',
          link: '/account/signup',
        },
      ],
      member_is_login: [
        {
          title: '會員中心',
          link: '/account/account_edit',
        },
      ],
      menu_gsap_animation: null,
      key_word: '',
    };
  },
  methods: {
    Open() {
      this.key_word = '';
      this.menu_gsap_animation.open();
    },
    Close() {
      this.menu_gsap_animation.close();
      this.key_word = '';
    },
    Search() {
      if (this.key_word != '') {
        this.$router.push(`/search/${this.key_word}`);
        this.Close();
        this.status = false;
        this.key_word = '';
      }
    },
  },
  computed: {
    member_token() {
      return this.$store.state.member_token;
    },
    member_menu_list() {
      return this.member_token == ''
        ? this.member_not_login
        : this.member_is_login;
    },
    category_data() {
      return this.$store.state.category_data;
    },
  },
  mounted() {
    this.menu_gsap_animation = new menu_gsap_animation(this.$refs.MainContent);
    window.addEventListener('resize', () => {
      this.Close();
    });
  },
};
</script>
<style scoped>
.triangle_bg {
  -webkit-clip-path: polygon(
    100% 0,
    0 100%,

    0 100%,
    0 0%
  );
  clip-path: polygon(
    100% 0,
    0 100%,

    0 100%,
    0 0%
  );
}
</style>
