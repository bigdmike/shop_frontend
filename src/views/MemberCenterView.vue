<template>
  <main
    data-scroll-section
    class="relative z-10 flex items-center justify-center w-full min-h-screen py-24 md:py-60 bg-bg_black"
  >
    <div
      v-if="data_load_finish"
      class="w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />

      <div class="flex items-center justify-between">
        <h2 class="mb-5 text-4xl font-bold text-white">{{ $route.name }}</h2>
        <button
          @click="Logout"
          class="px-6 py-2 text-sm text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-70"
        >
          登出
        </button>
      </div>
      <div class="flex flex-wrap items-start pt-5">
        <div class="w-full pr-10 mb-10 md:w-1/4 md:mb-0">
          <ol class="flex flex-row flex-wrap md:flex-col">
            <li v-for="item in menu_list" :key="item.title">
              <router-link
                :to="item.link"
                :class="
                  item.title == $route.name
                    ? 'bg-primary  text-white rounded-md'
                    : 'bg-basic_black'
                "
                class="block px-5 py-3 mb-2 mr-2 text-sm text-white transition-all duration-500 rounded-md md:mr-0 hover:bg-white hover:text-primary md:text-base"
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
import { mapGetters } from 'vuex';
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
      this.SetBreadCrumb();
    },
    data_load_finish() {
      this.data_load_finish ? this.PageInit() : '';
    },
  },
  computed: {
    ...mapGetters(['data_load_finish']),
  },
  created() {
    this.data_load_finish ? this.PageInit() : '';
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
    SetBreadCrumb() {
      this.bread_crumb_path[2].title = this.$route.name;
      this.bread_crumb_path[2].link = this.$route.path;
    },
    PageInit() {
      this.SetBreadCrumb();
      this.meta_data = GetMetaData('會員中心', '', '');
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
  },
};
</script>
