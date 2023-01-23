<template>
  <main class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />

      <div class="flex items-center justify-between">
        <h2 class="mb-5 text-4xl font-bold text-primary">{{ $route.name }}</h2>
        <button
          @click="Logout"
          class="px-6 py-2 text-sm text-white transition-colors duration-200 rounded-full bg-secondary hover:bg-opacity-70"
        >
          登出
        </button>
      </div>
      <div class="flex flex-wrap items-start pt-5 border-t border-zinc-300">
        <div class="w-full mb-10 md:w-1/4 md:mb-0">
          <ol class="flex flex-row flex-wrap md:flex-col">
            <li v-for="item in menu_list" :key="item.title">
              <router-link
                :to="item.link"
                :class="
                  item.title == $route.name
                    ? 'md:text-secondary md:bg-transparent bg-secondary text-white rounded-xl'
                    : ''
                "
                class="block p-3 text-sm md:link_color md:text-base"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ol>
        </div>
        <div class="w-full md:w-3/4"><router-view></router-view></div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { delLocalStorage } from '@/common/cookie';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'MemberCenterView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '會員中心',
          link: '/account/account_edit',
        },
        {
          title: '編輯會員資料',
          link: '/account/account_edit',
        },
      ],
      menu_list: [
        {
          title: '編輯會員資料',
          link: '/account/account_edit',
        },
        {
          title: '更改密碼',
          link: '/account/modify_password',
        },
        {
          title: '訂單查詢',
          link: '/account/orders',
        },
        {
          title: '收件地址管理',
          link: '/account/addresses',
        },
        // {
        //   title: '收藏清單',
        //   link: '/account/tracking_items',
        // },
      ],
    };
  },
  watch: {
    $route() {
      this.bread_crumb_path[2].title = this.$route.name;
      this.bread_crumb_path[2].link = this.$route.path;
    },
  },
  created() {
    this.bread_crumb_path[2].title = this.$route.name;
    this.bread_crumb_path[2].link = this.$route.path;
    this.meta_data = GetMetaData('會員中心', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
  methods: {
    Logout() {
      delLocalStorage('account_token');
      this.$store.commit('shopcart_module/SetShopCart', []);
      this.$router.push('/account/login');
    },
  },
};
</script>
