<template>
  <main class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 pb-32 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div class="w-full max-w-screen-sm p-10 mx-auto bg-zinc-50 rounded-2xl">
        <h4 class="mb-8 text-2xl font-bold text-center">會員註冊</h4>
        <div class="w-full pt-10 border-t border-zinc-200 md:px-20">
          <div class="mb-4">
            <p class="text-sm">姓名</p>
            <input
              v-model="name"
              type="text"
              name="name"
              placeholder="請輸入中文姓名"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('name')" class="text-xs text-red-600">
              請輸入正確的中文姓名
            </p>
          </div>
          <div class="mb-4">
            <p class="text-sm">電子郵件</p>
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
            <p class="text-sm">手機號碼</p>
            <input
              v-model="phone"
              type="tel"
              name="phone"
              placeholder="請輸入手機號碼"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('phone')" class="text-xs text-red-600">
              請輸入正確的手機號碼
            </p>
          </div>
          <div class="mb-4">
            <p class="text-sm">
              出生日期<span class="ml-2 text-xs text-primary"
                >註冊後無法修改</span
              >
            </p>
            <input
              v-model="birthday"
              type="date"
              name="birthday"
              placeholder="請輸入出生日期"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('birthday')" class="text-xs text-red-600">
              請輸入正確的出生日期
            </p>
          </div>
          <div class="mb-4">
            <p class="text-sm">性別</p>
            <div class="relative">
              <SelectArrowIcon
                class="absolute z-10 w-5 text-black transform -translate-y-1/2 pointer-events-none top-1/2 right-2"
              />
              <select
                v-model="sex"
                class="relative z-0 w-full px-2 py-3 border rounded-md appearance-none border-zinc-300 focus:outline-primary"
              >
                <option value="M">男</option>
                <option value="F">女</option>
              </select>
            </div>
            <p v-if="GetError('sex')" class="text-xs text-red-600">
              請選擇性別
            </p>
          </div>
          <div class="mb-4">
            <p class="text-sm">密碼</p>
            <input
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
          <div class="mb-4">
            <p class="text-sm">再次輸入密碼</p>
            <input
              v-model="re_password"
              type="password"
              name="re_password"
              placeholder="請再次輸入密碼"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('re_password')" class="text-xs text-red-600">
              兩次密碼輸入不一致
            </p>
          </div>
          <div class="mb-10">
            <button
              @click="ValidateForm"
              class="block w-full py-3 text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-75"
            >
              會員註冊
            </button>
          </div>
          <div class="flex items-center justify-center">
            <p>
              註冊表示同意
              <router-link
                class="text-sm underline transition-colors duration-200 text-secondary hover:text-opacity-50"
                to="/terms/terms_of_member"
                >商店服務條款</router-link
              >
              與
              <router-link
                class="text-sm underline transition-colors duration-200 text-secondary hover:text-opacity-50"
                to="/terms/site_privacy"
                >網站隱私政策</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { validEmail, validName, validPhone } from '@/common/validate';
import { SendSignUpData } from '@/api/member';
import { getLocalStorage } from '@/common/cookie';
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'SignupView',
  components: {
    BreadCrumb,
    SelectArrowIcon,
  },
  data() {
    return {
      account: '',
      password: '',
      re_password: '',
      name: '',
      phone: '',
      birthday: '',
      sex: 'M',
      errors: [],
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '會員註冊',
          link: '/account/signup',
        },
      ],
    };
  },
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    ValidateForm() {
      this.errors = [];
      !validName(this.name) ? this.errors.push('name') : '';
      !validEmail(this.account) ? this.errors.push('account') : '';
      !validPhone(this.phone) ? this.errors.push('phone') : '';
      this.birthday == '' ? this.errors.push('birthday') : '';
      this.sex == '' ? this.errors.push('sex') : '';
      this.password == '' ? this.errors.push('password') : '';
      this.re_password != this.password ? this.errors.push('re_password') : '';
      if (this.errors.length <= 0) {
        this.Signup();
      }
    },
    Signup() {
      const signup_data = {
        Account: this.account,
        Password: this.password,
        Name: this.name,
        Phone: this.phone,
        Birthday: this.birthday,
        Sex: this.sex,
      };
      SendSignUpData(signup_data).then(async (res) => {
        if (res.code == 200) {
          window.dataLayer.push({
            event: 'signup',
          });

          this.$store.commit('SetDialog', {
            status: true,
            content: '註冊成功，請由登入頁面進行登入',
          });
          this.$router.push('/account/login');
        } else {
          this.$store.commit('SetDialog', {
            status: true,
            content: res.msg,
          });
        }
      });
    },
  },
  created() {
    if (getLocalStorage('account_token')) {
      this.$router.push('/account/account_edit');
    }
    this.meta_data = GetMetaData('會員註冊', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
