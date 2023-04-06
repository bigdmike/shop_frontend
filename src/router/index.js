import Vue from 'vue';
import VueRouter from 'vue-router';
import { getLocalStorage } from '@/common/cookie';

Vue.use(VueRouter);

//解決重複路由報錯
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: '首頁',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../views/HomeView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/collections',
    name: '商品列表',
    component: () =>
      import(
        /* webpackChunkName: "product_list" */ '../views/ProductListView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/product/:id',
    name: '商品介紹',
    component: () =>
      import(
        /* webpackChunkName: "product_page" */ '../views/ProductPageView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/product/custom/:id',
    name: '客製化商品介紹',
    component: () =>
      import(
        /* webpackChunkName: "product_page" */ '../views/CustomProductPageView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/shopcart',
    name: '購物車結帳',
    component: () =>
      import(/* webpackChunkName: "shopcart" */ '../views/ShopCartView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/order_create/:id',
    name: '付款完成頁',
    component: () =>
      import(
        /* webpackChunkName: "order_create" */ '../views/TradeFinishView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/error_page',
    name: '錯誤頁面',
    component: () =>
      import(/* webpackChunkName: "error_page" */ '../views/ErrorPageView.vue'),
  },
  {
    path: '/news',
    name: '最新消息列表',
    component: () =>
      import(/* webpackChunkName: "news_list" */ '../views/NewsListView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/news/page/:id',
    name: '最新消息',
    component: () =>
      import(/* webpackChunkName: "news_page" */ '../views/NewsPageView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/search/:key_word',
    name: '搜尋商品',
    component: () =>
      import(
        /* webpackChunkName: "search_page" */ '../views/SearchResultView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/about',
    name: '關於我們',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/contact',
    name: '聯絡我們',
    component: () =>
      import(/* webpackChunkName: "contact" */ '../views/ContactView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/account/login',
    name: '會員登入',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/account/forget_pwd',
    name: '忘記密碼',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/ForgetPasswordView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/account/signup',
    name: '會員註冊',
    component: () =>
      import(/* webpackChunkName: "signup" */ '../views/SignupView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/account/',
    name: '會員中心',
    component: () =>
      import(
        /* webpackChunkName: "member_center" */ '../views/MemberCenterView.vue'
      ),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'account_edit',
        name: '編輯會員資料',
        component: () =>
          import(
            /* webpackChunkName: "member_center" */ '../views/MemberCenter/InfoEditView.vue'
          ),
        meta: { requiresAuth: true },
      },
      {
        path: 'modify_password',
        name: '更改密碼',
        component: () =>
          import(
            /* webpackChunkName: "modify_password" */ '../views/MemberCenter/PasswordEditView.vue'
          ),
      },
      {
        path: 'orders',
        name: '訂單查詢',
        component: () =>
          import(
            /* webpackChunkName: "orders" */ '../views/MemberCenter/OrderListView.vue'
          ),
      },
      {
        path: 'order/:id',
        name: '訂單詳細',
        component: () =>
          import(
            /* webpackChunkName: "order_page" */ '../views/MemberCenter/OrderPageView.vue'
          ),
      },
      {
        path: 'addresses',
        name: '收件地址管理',
        component: () =>
          import(
            /* webpackChunkName: "addresses" */ '../views/MemberCenter/AddressListView.vue'
          ),
      },
      // {
      //   path: 'tracking_items',
      //   name: '收藏清單',
      //   component: () =>
      //     import(
      //       /* webpackChunkName: "tracking_items" */ '../views/MemberCenter/TrackingList.vue'
      //     ),
      // },
    ],
  },
  {
    path: '/order_search/search',
    name: '訂單查詢頁面',
    component: () =>
      import(
        /* webpackChunkName: "order_search" */ '../views/OrderSearchView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/order_search/result',
    name: '訂單查詢結果',
    component: () =>
      import(
        /* webpackChunkName: "order_search_result" */ '../views/OrderSearchResultView.vue'
      ),
    meta: { requiresAuth: false },
  },
  {
    path: '/terms/:type',
    name: '網站條款',
    component: () =>
      import(/* webpackChunkName: "terms_page" */ '../views/TermsPageView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/event/:id',
    name: '活動銷售頁',
    component: () =>
      import(/* webpackChunkName: "event_page" */ '../views/EventPageView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/dealer',
    name: '經銷據點',
    component: () =>
      import(/* webpackChunkName: "dealer_page" */ '../views/DealerView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '*',
    redirect: '/error_page',
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const account_token = getLocalStorage('account_token');
  let page_data = {
    fullPath: to.fullPath,
    query: to.query,
  };
  if (to.meta.requiresAuth && account_token == '') {
    // 如果前往的頁面需要會員權限，但目前沒有權限則導回login頁面
    to.path = '/account/login';
    to.query = from.query.order_memo
      ? { order_memo: from.query.order_memo }
      : {};

    page_data.fullPath = '/account/login';
  }
  if (from.query.order_memo && !to.query.order_memo) {
    // 如果前往的頁面路徑不包含order_memo，但目前的頁面路徑包含order_memo
    // 則將路徑補上order_memo
    if (Object.keys(to.query).length <= 0) {
      page_data.fullPath += '?order_memo=' + from.query.order_memo;
    } else {
      page_data.fullPath += '&order_memo=' + from.query.order_memo;
    }
    page_data.query.order_memo = from.query.order_memo;
    next({
      path: page_data.fullPath,
      query: page_data.query,
    });
  }
  // 下一頁
  next({
    query: page_data.query,
  });
});

export default router;
