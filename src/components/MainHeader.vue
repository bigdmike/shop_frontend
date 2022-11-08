<template>
  <header
    class="fixed z-20 top-8 left-0 right-0 sm:h-24 h-20 bg-white flex items-center"
  >
    <div
      class="w-full max-w-screen-xl xl:px-0 px-5 mx-auto flex items-center justify-between"
    >
      <div class="flex items-center justify-between md:w-auto w-full relative">
        <button class="md:hidden">
          <MenuIcon class="sm:w-8 w-6" />
        </button>
        <router-link
          to="/"
          class="md:relative block absolute md:top-0 md:left-0 top-1/2 left-1/2 transform md:translate-x-0 md:translate-y-0 -translate-x-1/2 -translate-y-1/2"
        >
          <img src="/img/logo.png" class="lg:w-44 sm:w-36 w-32" />
        </router-link>
        <div class="flex items-center md:hidden">
          <button class="sm:pr-3 pr-2">
            <SearchIcon class="sm:w-8 w-6" />
          </button>
          <button class="sm:pl-3 pl-2 md:hidden">
            <ShopCartIcon class="sm:w-8 w-6" />
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
              class="lg:px-4 px-3 lg:text-base text-sm font-bold"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ol>
        <button class="pl-4 pr-3">
          <SearchIcon class="lg:w-7 w-6" />
        </button>
        <button class="pl-3">
          <ShopCartIcon class="lg:w-7 w-6" />
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import SearchIcon from '@/components/svg/SearchIcon';
import ShopCartIcon from '@/components/svg/ShopCartIcon.vue';
import MenuIcon from '@/components/svg/MenuIcon.vue';
export default {
  name: 'MainHeader',
  components: {
    SearchIcon,
    ShopCartIcon,
    MenuIcon,
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
          link: '',
        },
        {
          title: '關於我們',
          link: '',
        },
        {
          title: '最新消息',
          link: '',
        },
        {
          title: '會員專區',
          link: '',
        },
      ],
    };
  },
};
</script>
