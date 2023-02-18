<template>
  <div
    ref="MainContent"
    class="fixed top-0 bottom-0 z-20 w-full overflow-hidden left-full"
  >
    <nav
      data-menu
      class="absolute top-0 left-0 z-10 w-full h-screen max-h-screen p-10 overflow-y-auto opacity-0 bg-basic_gray"
    >
      <button @click="Close" class="absolute top-7 right-7">
        <CloseIcon class="w-5 text-black" />
      </button>

      <div class="flex flex-col w-full h-full">
        <div class="flex flex-col justify-center flex-1">
          <div class="flex items-end justify-between w-full mb-20">
            <router-link to="/" class="w-1/3">
              <img src="/img/logo.svg" class="block w-full" />
            </router-link>
          </div>
          <ol class="flex flex-wrap items-stretch justify-start w-full">
            <li
              v-for="(item, item_index) in menu_list"
              :key="`menu_item_${item_index}`"
              class="w-1/2"
            >
              <router-link
                :to="item.link"
                class="relative block px-6 py-3 mb-10"
              >
                <span
                  class="absolute top-0 left-0 z-0 transform icon-triangle -scale-100"
                ></span>
                <h4 class="text-2xl font-bold font-anybody">
                  {{ item.title }}
                </h4>
                <p class="font-bold">{{ item.sub_title }}</p>
              </router-link>
            </li>
          </ol>
        </div>
      </div>

      <div class="absolute top-0 left-0 z-0 block w-full h-full p-10 md:hidden">
        <img src="/img/menu_bg.webp" class="block w-full h-full" />
      </div>
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
import CloseIcon from '@/components/svg/CloseIcon.vue';
import { menu_gsap_animation } from '@/gsap/main_menu';
export default {
  name: 'MainMenu',
  components: {
    CloseIcon,
  },
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
      this.$store.commit('SetBodyLock', 1);
    },
    Close() {
      this.menu_gsap_animation.close();
      this.$store.commit('SetBodyLock', -1);
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
