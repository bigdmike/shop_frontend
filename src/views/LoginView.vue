<template>
  <main class="relative w-full z-10">
    <div class="w-full max-w-screen-xl mx-auto xl:px-0 sm:px-10 px-5 pb-32">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div class="w-full max-w-screen-sm mx-auto bg-zinc-50 rounded-2xl p-10">
        <h4 class="text-center text-2xl font-bold mb-8">會員登入</h4>
        <div class="w-full border-t border-zinc-200 pt-10 px-20">
          <div class="mb-4">
            <input
              v-model="account"
              type="email"
              name="account"
              placeholder="請輸入電子郵件"
              class="w-full border border-zinc-200 rounded-md px-3 py-2"
            />
            <p v-if="GetError('account')" class="text-red-600 text-xs">
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
              class="w-full border border-zinc-200 rounded-md px-3 py-2"
            />
            <p v-if="GetError('password')" class="text-red-600 text-xs">
              請輸入密碼
            </p>
          </div>
          <div class="mb-10">
            <button
              @click="VarDateForm"
              class="bg-primary py-3 block w-full rounded-md text-white transition-colors duration-200 hover:bg-opacity-75"
            >
              會員登入
            </button>
          </div>
          <div class="flex items-center justify-between">
            <router-link
              class="text-secondary text-sm underline transition-colors duration-200 hover:text-opacity-50"
              to="/account/password/new"
              >忘記密碼</router-link
            >
            <router-link
              class="text-secondary text-sm underline transition-colors duration-200 hover:text-opacity-50"
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
import { sendLoginData, addShopcart, getShopcart } from '@/api/member';
import { setLocalStorage } from '@/common/cookie';
import { SaveOnlineShopCart } from '@/common/shopcart';
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
      return this.$store.state.shopcart;
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
    async Login() {
      const login_data = {
        Account: this.account,
        Password: this.password,
      };
      sendLoginData(login_data).then(async (res) => {
        console.log(res);
        if (res.code == 301 && res.msg == '登入失敗') {
          this.$store.commit('SetDialog', {
            status: true,
            content: '登入失敗，請確認您的帳號密碼是否正確',
          });
        } else {
          // 1.將會員token存入cookie
          setLocalStorage('account_token', res.data.Token);
          // 2.將cookie購物車整合至會員購物車並刪除cookie購物車
          await addShopcart(this.shopcart).then((res) => {
            console.log(res);
          });
          // 3.撈取會員購物車整合至store
          getShopcart().then((res) => {
            console.log(res);
            const shop_cart = SaveOnlineShopCart(res.data);
            this.$store.commit('SetShopCart', shop_cart);
            this.$router.push('/account/account_edit');
          });
        }
      });
    },
  },
};
</script>
