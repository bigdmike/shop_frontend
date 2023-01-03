<template>
  <header class="fixed left-0 right-0 z-30 sm:top-8 top-7">
    <div class="relative z-20 flex items-center w-full h-20 bg-white sm:h-24">
      <div
        class="relative flex items-center justify-between w-full max-w-screen-xl px-5 mx-auto xl:px-0"
      >
        <div
          class="relative flex items-center justify-between w-full md:w-auto"
        >
          <button @click="OpenMenu" class="md:hidden">
            <MenuIcon class="w-6 sm:w-8" />
          </button>
          <router-link
            to="/"
            @click.native="CloseMenu"
            class="absolute block transform -translate-x-1/2 -translate-y-1/2 md:relative md:top-0 md:left-0 top-1/2 left-1/2 md:translate-x-0 md:translate-y-0"
          >
            <img
              :alt="$GetCloumn('company_name')"
              :src="$ImageUrl($GetCloumn('logo_image'))"
              class="w-32 lg:w-44 sm:w-36"
            />
          </router-link>
          <div class="flex items-center md:hidden">
            <button
              @click="TriggerSearhBar"
              class="pr-2 sm:pr-3 focus:outline-none"
            >
              <SearchIcon class="w-6 sm:w-8" />
            </button>
            <button
              @click="OpenShopcart"
              class="relative pl-2 sm:pl-3 md:hidden focus:outline-none"
            >
              <span
                class="absolute top-0 right-0 flex items-center justify-center w-4 h-4 transform translate-x-2 -translate-y-2 rounded-full bg-primary"
              >
                <p class="text-xs font-bold text-white transform scale-75">
                  {{ shopcart_count }}
                </p>
              </span>
              <ShopCartIcon class="w-6 lg:w-7" />
            </button>
          </div>
        </div>
        <div class="items-center hidden md:flex">
          <ol class="flex items-center">
            <li
              class=""
              v-for="(item, item_index) in menu_list"
              :key="`header_menu_${item_index}`"
            >
              <router-link
                :to="item.link"
                @click.native="CloseMenu"
                class="px-3 text-sm font-bold transition-colors duration-300 cursor-pointer lg:px-4 lg:text-base hover:text-primary"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ol>
          <button
            @click="TriggerSearhBar"
            class="pl-4 pr-3 transition-colors duration-300 hover:text-secondary"
          >
            <SearchIcon class="w-6 lg:w-7" />
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
            <ShopCartIcon class="w-6 lg:w-7" />
          </button>
        </div>
      </div>
    </div>

    <MainMenu ref="MainMenu" />
    <SearchBar ref="SearchBar" />
  </header>
</template>

<script>
import SearchIcon from '@/components/svg/SearchIcon';
import ShopCartIcon from '@/components/svg/ShopCartIcon.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
import MainMenu from '@/components/MainMenu.vue';
import SearchBar from '@/components/main_menu/search_bar.vue';
export default {
  name: 'MainHeader',
  components: {
    SearchIcon,
    ShopCartIcon,
    MenuIcon,
    MainMenu,
    SearchBar,
  },
  data() {
    return {
      menu_list: [
        {
          title: '最新商品',
          link: '/collections?category=4',
        },
        {
          title: '所有商品',
          link: '/collections?category=all',
        },
        {
          title: '關於我們',
          link: '/about',
        },
        {
          title: '最新消息',
          link: '/news?category=all',
        },
        {
          title: '會員專區',
          link: '/account/login',
        },
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
    TriggerSearhBar() {
      this.$refs.SearchBar.TriggerStatus();
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
