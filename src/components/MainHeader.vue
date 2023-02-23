<template>
  <header class="fixed top-0 left-0 right-0 z-30">
    <div class="relative z-20 flex items-center w-full md:h-20 h-14">
      <div
        class="relative z-10 flex items-center justify-end w-full h-full px-2 mx-auto sm:px-5 lg:px-14"
      >
        <div
          class="absolute top-0 left-0 flex items-center h-full lg:pl-14 sm:pl-10 px-8 pr-[80px] sm:pr-[90px] lg:pr-[120px] bg-basic_white bg-opacity-80 logo_box"
        >
          <router-link
            to="/"
            @click.native="CloseMenu"
            class="relative block transform"
          >
            <img
              :alt="$GetCloumn('company_name')"
              src="/img/logo.svg"
              class="relative block md:w-[180px] sm:w-[140px] w-[120px]"
            />
          </router-link>
        </div>
        <div class="flex items-center lg:hidden">
          <button
            @click="$router.push('/account/login')"
            class="hidden px-2 focus:outline-none md:block"
          >
            <span class="text-2xl text-white icon-user"></span>
          </button>
          <button
            @click="OpenSearchDialog"
            class="hidden px-2 focus:outline-none md:block"
          >
            <span class="text-2xl text-white icon-search"></span>
          </button>
          <button
            @click="OpenShopcart"
            class="relative hidden px-2 lg:hidden focus:outline-none md:block"
          >
            <span
              class="absolute top-0 right-0 flex items-center justify-center w-4 h-4 transform -translate-x-[2px] rounded-full -translate-y-0 bg-primary"
            >
              <p class="text-xs font-bold text-white transform scale-75">
                {{ shopcart_count }}
              </p>
            </span>
            <span class="text-2xl text-white icon-cart"></span>
          </button>

          <button @click="OpenMenu" class="px-2 lg:hidden">
            <span class="text-2xl text-white icon-menu"></span>
          </button>
        </div>
        <div class="items-center hidden lg:flex">
          <ol class="flex items-center">
            <li
              class=""
              v-for="(item, item_index) in menu_list"
              :key="`header_menu_${item_index}`"
            >
              <router-link
                :to="item.link"
                @click.native="CloseMenu"
                :class="
                  $route.name == item.sub_title ? 'text-primary' : 'text-white'
                "
                class="px-3 text-sm font-bold transition-colors duration-300 cursor-pointer font-anybody lg:px-4 lg:text-base hover:text-primary"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ol>
          <button
            class="pl-4 pr-3 transition-colors duration-300 hover:text-secondary"
          >
            <span class="text-2xl text-white icon-user"></span>
          </button>
          <button
            @click="OpenSearchDialog"
            class="pl-4 pr-3 transition-colors duration-300 hover:text-secondary"
          >
            <span class="text-2xl text-white icon-search"></span>
          </button>
          <button
            @click="OpenShopcart"
            class="relative pl-3 transition-colors duration-300 hover:text-secondary"
          >
            <span
              class="absolute top-0 right-0 flex items-center justify-center w-5 h-5 transform translate-x-2 -translate-y-2 rounded-full bg-primary"
            >
              <p class="text-xs font-bold text-white transform scale-75">
                {{ shopcart_count }}
              </p>
            </span>
            <span class="text-2xl text-white icon-cart"></span>
          </button>
        </div>
      </div>
      <div
        class="absolute top-0 left-0 right-0 z-0 opacity-50 bottom-3 bg-gradient-to-b from-basic_black to-transparent"
      ></div>
    </div>

    <MainMenu ref="MainMenu" :menu_list="menu_list" />
  </header>
</template>

<script>
import MainMenu from '@/components/MainMenu.vue';
export default {
  name: 'MainHeader',
  components: {
    MainMenu,
  },
  data() {
    return {
      menu_list: [
        {
          title: 'About',
          sub_title: '關於我們',
          link: '/about',
        },
        {
          title: 'Products',
          sub_title: '商品列表',
          link: '/collections',
        },
        {
          title: 'News',
          sub_title: '最新消息',
          link: '/news',
        },
        {
          title: 'Dealer',
          sub_title: '經銷列表',
          link: '/dealer',
        },
        {
          title: 'Contact',
          sub_title: '聯絡我們',
          link: '/contact',
        },
        // {
        //   title: 'Member',
        //   link: '/account/login',
        // },
      ],
    };
  },
  methods: {
    OpenMenu() {
      this.$refs.MainMenu.Open();
    },
    CloseMenu() {
      this.$refs.MainMenu.Close();
    },
    OpenShopcart() {
      this.$store.commit('SetShopcartDrawer', true);
    },
    OpenSearchDialog() {
      this.$store.commit('SetSearchDialog', true);
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart_module.shopcart;
    },
    shopcart_count() {
      let count = 0;
      this.shopcart.forEach((item) => {
        count += parseInt(item.amount);
      });

      return count;
    },
  },
};
</script>

// logo_box

<style scoped>
.logo_box {
  -webkit-clip-path: polygon(
    100% 0,
    calc(100% - 80px) 100%,

    calc(100% - 80px) 100%,
    0 100%,

    0 100%,
    0 0%
  );
  clip-path: polygon(
    100% 0,
    calc(100% - 80px) 100%,

    calc(100% - 80px) 100%,
    0 100%,

    0 100%,
    0 0%
  );
}

@media (max-width: 1024px) {
  .logo_box {
    -webkit-clip-path: polygon(
      100% 0,
      calc(100% - 54px) 100%,

      calc(100% - 54px) 100%,
      0 100%,

      0 100%,
      0 0%
    );
    clip-path: polygon(
      100% 0,
      calc(100% - 54px) 100%,

      calc(100% - 54px) 100%,
      0 100%,

      0 100%,
      0 0%
    );
  }
}
</style>
