import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

//解決重複路由報錯
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "Home" */ '../views/HomeView.vue'),
  },
  {
    path: '/collections/:id/',
    name: 'ProductList',
    component: () =>
      import(
        /* webpackChunkName: "product_list" */ '../views/ProductListView.vue'
      ),
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () =>
      import(
        /* webpackChunkName: "product_page" */ '../views/ProductPageView.vue'
      ),
  },
  {
    path: '/shopcart',
    name: '購物車結帳',
    component: () =>
      import(/* webpackChunkName: "shopcart" */ '../views/ShopCartView.vue'),
  },
  {
    path: '/order_create/:id',
    name: '付款完成頁',
    component: () =>
      import(
        /* webpackChunkName: "order_create" */ '../views/TradeFinishView.vue'
      ),
  },
  {
    path: '/error_page',
    name: '錯誤頁面',
    component: () =>
      import(/* webpackChunkName: "error_page" */ '../views/ErrorPageView.vue'),
  },
  {
    path: '/news/:category/',
    name: '最新消息列表',
    component: () =>
      import(/* webpackChunkName: "news_list" */ '../views/NewsListView.vue'),
  },
  {
    path: '/news/:category/:type/:id',
    name: '最新消息',
    component: () =>
      import(/* webpackChunkName: "news_page" */ '../views/NewsPageView.vue'),
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
  // {
  //   path: '/kol',
  //   name: 'KolList',
  //   component: () => import(/* webpackChunkName: "kol" */ '../views/Kol.vue'),
  // },
  // {
  //   path: '/collections/:category/',
  //   name: 'ProductList',
  //   component: () =>
  //     import(/* webpackChunkName: "product_list" */ '../views/ProductList.vue'),
  // },

  // {
  //   path: '/search/:key_word',
  //   name: 'SearchPage',
  //   component: () =>
  //     import(/* webpackChunkName: "search_page" */ '../views/SearchPage.vue'),
  // },
  // {
  //   path: '/question',
  //   name: 'Question',
  //   component: () =>
  //     import(/* webpackChunkName: "question" */ '../views/Question.vue'),
  // },
  // {
  //   path: '/contact',
  //   name: 'Contact',
  //   component: () =>
  //     import(/* webpackChunkName: "contact" */ '../views/Contact.vue'),
  // },
  // {
  //   path: '/account/login',
  //   name: 'Login',
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  // },
  // {
  //   path: '/account/signup',
  //   name: '註冊會員',
  //   component: () =>
  //     import(/* webpackChunkName: "sign_up" */ '../views/SignUp.vue'),
  // },
  // {
  //   path: '/account/password/new',
  //   name: '忘記密碼',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "forget_password" */ '../views/ForgetPassword.vue'
  //     ),
  // },
  // {
  //   path: '/account/',
  //   name: '會員中心',
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "member_center" */ '../views/MemberCenter.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'account_edit',
  //       name: '更新個人資料',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "member_center" */ '../views/MemberCenter/AccountEdit.vue'
  //         ),
  //     },
  //     {
  //       path: 'modify_password',
  //       name: '更改密碼',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "modify_password" */ '../views/MemberCenter/ModifyPassword.vue'
  //         ),
  //     },
  //     {
  //       path: 'orders',
  //       name: '訂單查詢',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "orders" */ '../views/MemberCenter/OrderList.vue'
  //         ),
  //     },
  //     {
  //       path: 'orders/:id',
  //       name: '訂單詳細',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "order_page" */ '../views/MemberCenter/OrderPage.vue'
  //         ),
  //     },
  //     {
  //       path: 'addresses',
  //       name: '收件地址管理',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "addresses" */ '../views/MemberCenter/Addresses.vue'
  //         ),
  //     },
  //     {
  //       path: 'tracking_items',
  //       name: '收藏清單',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "tracking_items" */ '../views/MemberCenter/TrackingList.vue'
  //         ),
  //     },
  //   ],
  // },

  // {
  //   path: '/order_search',
  //   name: '訂單查詢頁面',
  //   component: () =>
  //     import(/* webpackChunkName: "order_search" */ '../views/OrderSearch.vue'),
  // },
  // {
  //   path: '*',
  //   redirect: '/error_page',
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      console.log(to.hash);
      return {
        selector: to.hash,
        offset: { x: 0, y: 100 },
      };
    }
    return { x: 0, y: 0 };
  },
});

export default router;
