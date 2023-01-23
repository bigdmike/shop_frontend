<template>
  <main class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 pb-32 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div class="w-full max-w-screen-sm p-10 mx-auto bg-zinc-50 rounded-2xl">
        <h4 class="mb-8 text-2xl font-bold text-center">會員登入</h4>
        <div class="w-full pt-10 border-t border-zinc-200 md:px-20">
          <div class="mb-4">
            <input
              v-model="account"
              type="email"
              name="account"
              placeholder="請輸入電子郵件"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('account')" class="text-xs text-red-600">
              請輸入正確的電子郵件
            </p>
          </div>
          <div class="mb-4">
            <input
              @keypress.enter="VarDateForm"
              v-model="password"
              type="password"
              name="password"
              placeholder="請輸入密碼"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('password')" class="text-xs text-red-600">
              請輸入密碼
            </p>
          </div>
          <div class="mb-10">
            <button
              @click="VarDateForm"
              class="block w-full py-3 text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-75"
            >
              會員登入
            </button>
          </div>
          <div class="flex items-center justify-between">
            <router-link
              class="text-sm underline transition-colors duration-200 text-secondary hover:text-opacity-50"
              to="/account/forget_pwd"
              >忘記密碼</router-link
            >
            <router-link
              class="text-sm underline transition-colors duration-200 text-secondary hover:text-opacity-50"
              to="/account/signup"
              >註冊新會員</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { validEmail } from '@/common/validate';
import { sendLoginData } from '@/api/member';
import { setLocalStorage, getLocalStorage } from '@/common/cookie';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'LoginView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      account: '',
      password: '',
      errors: [],
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '會員登入',
          link: '/account/login',
        },
      ],
    };
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart_module.shopcart;
    },
  },
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    VarDateForm() {
      this.errors = [];
      !validEmail(this.account) ? this.errors.push('account') : '';
      this.password == '' ? this.errors.push('password') : '';
      if (this.errors.length <= 0) {
        this.Login();
      }
    },
    Login() {
      const login_data = {
        Account: this.account,
        Password: this.password,
      };
      sendLoginData(login_data).then(async (res) => {
        if (res.code == 301 && res.msg == '登入失敗') {
          this.$store.commit('SetDialog', {
            status: true,
            content: '登入失敗，請確認您的帳號密碼是否正確',
          });
        } else {
          // 將會員token存入cookie
          setLocalStorage('account_token', res.data.Token);
          // 將本地購物車新增至會員線上購物車
          await this.SaveMemberShopcart();
          // 5.頁面轉跳進入會員中心
          this.$router.push('/account/account_edit');
        }
      });
    },
    async SaveMemberShopcart() {
      // 1.先讀取本地shopcart
      this.$store.dispatch('shopcart_module/GetLocalShopCart');
      // 2.將本地shopcart拷貝一份
      const local_shopcart = JSON.parse(JSON.stringify(this.shopcart));
      // 3.依序將shopcart中的商品新增至會員線上購物車
      for (const item of local_shopcart) {
        const shopcart_item = {
          product: item.product_data,
          options: item.active_option,
          amount: item.amount,
        };
        await this.$store.dispatch(
          'shopcart_module/AddShopCart',
          shopcart_item
        );
      }
      // 4.重新取得會員線上購物車
      this.$store.dispatch('shopcart_module/GetShopCart');
    },
  },
  created() {
    if (getLocalStorage('account_token')) {
      this.$router.push('/account/account_edit');
    }
    this.meta_data = GetMetaData('會員登入', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
