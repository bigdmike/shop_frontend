<template>
  <main class="w-full relative z-10">
    <div class="w-full max-w-screen-xl mx-auto xl:px-0 sm:px-10 px-5">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />

      <div class="flex items-center justify-between">
        <h2 class="text-4xl font-bold text-primary mb-5">{{ $route.name }}</h2>
        <button
          @click="Logout"
          class="px-6 py-2 rounded-full bg-secondary text-white text-sm transition-colors duration-200 hover:bg-opacity-70"
        >
          登出
        </button>
      </div>
      <div class="flex flex-wrap items-start border-t border-zinc-300 pt-5">
        <div class="md:w-1/4 w-full md:mb-0 mb-10">
          <ol class="md:flex-col flex-row flex flex-wrap">
            <li v-for="item in menu_list" :key="item.title">
              <router-link
                :to="item.link"
                :class="
                  item.title == $route.name
                    ? 'md:text-secondary md:bg-transparent bg-secondary text-white rounded-xl'
                    : ''
                "
                class="block p-3 link_color md:text-base text-sm"
              >
                {{ item.title }}
              </router-link>
            </li>
          </ol>
        </div>
        <div class="md:w-3/4 w-full"><router-view></router-view></div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { delLocalStorage } from '@/common/cookie';
export default {
  name: 'MemberCenterView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
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
  },
  methods: {
    Logout() {
      delLocalStorage('account_token');
      this.$store.commit('SetShopCart', []);
      this.$router.push('/account/login');
    },
  },
};
</script>
