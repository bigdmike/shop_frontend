<template>
  <div ref="MainContent" class="fixed top-0 left-full w-full bottom-0 z-20">
    <nav
      data-menu
      class="absolute top-0 left-full w-96 bg-white h-screen max-h-screen overflow-y-auto z-10 pt-32"
    >
      <button @click="Close" class="absolute top-7 right-7">
        <CloseIcon class="w-5 text-black" />
      </button>

      <div class="relative border-b border-zinc-300 mb-10">
        <SearchIcon
          class="absolute top-1/2 left-5 transform -translate-y-1/2 w-6"
        />
        <input
          type="text"
          name="search"
          v-model="key_word"
          @keyup.enter="Search"
          class="w-full pl-14 py-3 focus:outline-none"
          placeholder="搜尋商品關鍵字"
        />
      </div>
      <ol>
        <template v-for="item in menu_list">
          <li
            class="border-b border-zinc-200"
            :key="item.title"
            v-if="item.type == 'link'"
          >
            <router-link
              @click.native="Close"
              class="p-5 block font-bold link_color"
              :to="item.link"
              >{{ item.title }}</router-link
            >
          </li>

          <li
            class="border-b border-zinc-200"
            :key="item.title"
            v-if="item.type == 'collapse'"
          >
            <MenuCollapse
              :title="item.title"
              :list="item.list"
              @close-action="Close"
            />
          </li>
        </template>

        <li class="border-b border-zinc-200 mt-10">
          <MenuCollapse
            title="會員專區"
            :list="member_menu_list"
            @close-action="Close"
          />
        </li>
      </ol>
    </nav>
    <div
      data-menu-bg
      class="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-50 z-0 opacity-0"
    ></div>
  </div>
</template>

<script>
import CloseIcon from '@/components/svg/CloseIcon.vue';
import SearchIcon from '@/components/svg/SearchIcon.vue';
import MenuCollapse from '@/components/main_menu/collapse.vue';
import { menu_gsap_animation } from '@/gsap/main_menu';
export default {
  name: 'MainMenu',
  components: {
    CloseIcon,
    SearchIcon,
    MenuCollapse,
  },
  data() {
    return {
      menu_list: [
        {
          title: '首頁',
          link: '/',
          type: 'link',
        },
        {
          title: '新品上架',
          link: '/',
          type: 'link',
        },
        {
          title: '所有商品',
          type: 'collapse',
          list: [],
        },
        {
          title: '關於我們',
          link: '/',
          type: 'link',
        },
        {
          title: '最新消息',
          link: '/',
          type: 'link',
        },
      ],
      member_not_login: [
        {
          title: '登入',
          link: '/Login',
        },
        {
          title: '註冊帳號',
          link: '/Signup',
        },
      ],
      member_is_login: [
        {
          title: '會員中心',
          link: '/MemberCenter',
        },
        {
          title: '登出',
          link: '/Logout',
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
      this.$router.push(`/Search?key_word=${this.key_word}`);
    },
    SetProductCategoryMenu() {
      let tmp_list = [];
      this.category_data.forEach((item) => {
        tmp_list.push({
          title: item.Title,
          link: `/collections/${item.MenuID}`,
        });
      });
      this.menu_list.forEach((item, item_index) => {
        if (item.title == '所有商品') {
          this.menu_list[item_index].list = tmp_list;
        }
      });
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
    this.SetProductCategoryMenu();
    this.menu_gsap_animation = new menu_gsap_animation(this.$refs.MainContent);
  },
};
</script>
