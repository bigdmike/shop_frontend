<template>
  <header class="fixed z-30 top-8 left-0 right-0">
    <div class="w-full relative z-20 sm:h-24 h-20 bg-white flex items-center">
      <div
        class="w-full relative max-w-screen-xl xl:px-0 px-5 mx-auto flex items-center justify-between"
      >
        <div
          class="flex items-center justify-between md:w-auto w-full relative"
        >
          <button @click="OpenMenu" class="md:hidden">
            <MenuIcon class="sm:w-8 w-6" />
          </button>
          <router-link
            to="/"
            @click.native="CloseMenu"
            class="md:relative block absolute md:top-0 md:left-0 top-1/2 left-1/2 transform md:translate-x-0 md:translate-y-0 -translate-x-1/2 -translate-y-1/2"
          >
            <img src="/img/logo.png" class="lg:w-44 sm:w-36 w-32" />
          </router-link>
          <div class="flex items-center md:hidden">
            <button
              @click="TriggerSearhBar"
              class="sm:pr-3 pr-2 focus:outline-none"
            >
              <SearchIcon class="sm:w-8 w-6" />
            </button>
            <button
              @click="OpenShopcart"
              class="relative sm:pl-3 pl-2 md:hidden focus:outline-none"
            >
              <span
                class="w-4 h-4 flex items-center justify-center absolute top-0 right-0 bg-primary rounded-full transform translate-x-2 -translate-y-2"
              >
                <p class="text-xs text-white transform scale-75 font-bold">
                  {{ shopcart_count }}
                </p>
              </span>
              <ShopCartIcon class="lg:w-7 w-6" />
            </button>
          </div>
        </div>
        <div class="items-center md:flex hidden">
          <ol class="flex items-center">
            <li
              class=""
              v-for="(item, item_index) in menu_list"
              :key="`header_menu_${item_index}`"
            >
              <router-link
                :to="item.link"
                @click.native="CloseMenu"
                class="lg:px-4 px-3 lg:text-base text-sm font-bold"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ol>
          <button @click="TriggerSearhBar" class="pl-4 pr-3">
            <SearchIcon class="lg:w-7 w-6" />
          </button>
          <button @click="OpenShopcart" class="pl-3 relative">
            <span
              class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 bg-primary rounded-full transform translate-x-2 -translate-y-2"
            >
              <p class="text-xs text-white transform scale-75 font-bold">
                {{ shopcart_count }}
              </p>
            </span>
            <ShopCartIcon class="lg:w-7 w-6" />
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
          title: '新品上架',
          link: '',
        },
        {
          title: '所有商品',
          link: '/collections/all',
        },
        {
          title: '關於我們',
          link: '/about',
        },
        {
          title: '最新消息',
          link: '/news/all',
        },
        {
          title: '會員專區',
          link: '',
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
      return this.$store.state.shopcart;
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
