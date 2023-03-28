<template>
  <main
    data-scroll-section
    class="relative z-10 flex items-center justify-center w-full min-h-screen py-24 md:py-60 bg-bg_black"
  >
    <div class="w-full max-w-screen-xl px-5 pb-32 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div
        class="w-full max-w-screen-sm p-10 mx-auto bg-basic_black section_corner_y"
      >
        <h4 class="mb-8 text-2xl font-bold text-center text-white">會員註冊</h4>
        <div class="w-full md:px-20">
          <div class="mb-4">
            <p class="mb-2 text-sm text-white">姓名</p>
            <input
              v-model="name"
              type="text"
              name="name"
              placeholder="請輸入中文姓名"
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
            />
            <p v-if="GetError('name')" class="text-xs text-red-600">
              請輸入正確的中文姓名
            </p>
          </div>
          <div class="mb-4">
            <p class="mb-2 text-sm text-white">電子郵件</p>
            <input
              v-model="account"
              type="email"
              name="account"
              placeholder="請輸入電子郵件"
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
            />
            <p v-if="GetError('account')" class="text-xs text-red-600">
              請輸入正確的電子郵件
            </p>
          </div>
          <div class="mb-4">
            <p class="mb-2 text-sm text-white">手機號碼</p>
            <input
              v-model="phone"
              type="tel"
              name="phone"
              placeholder="請輸入手機號碼"
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
            />
            <p v-if="GetError('phone')" class="text-xs text-red-600">
              請輸入正確的手機號碼
            </p>
          </div>
          <div class="mb-4">
            <p class="mb-2 text-sm text-white">
              出生日期<span class="ml-2 text-xs text-primary"
                >註冊後無法修改</span
              >
            </p>
            <input
              v-model="birthday"
              type="date"
              name="birthday"
              placeholder="請輸入出生日期"
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
            />
            <p v-if="GetError('birthday')" class="text-xs text-red-600">
              請輸入正確的出生日期
            </p>
          </div>
          <div class="mb-4">
            <p class="mb-2 text-sm text-white">性別</p>
            <div class="relative">
              <span
                class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
              ></span>
              <select
                v-model="sex"
                class="relative z-0 w-full px-4 py-3 pr-10 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
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
            <p class="mb-2 text-sm text-white">密碼</p>
            <input
              v-model="password"
              type="password"
              name="password"
              placeholder="請輸入密碼"
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
            />
            <p v-if="GetError('password')" class="text-xs text-red-600">
              請輸入密碼
            </p>
          </div>
          <div class="mb-4">
            <p class="mb-2 text-sm text-white">再次輸入密碼</p>
            <input
              v-model="re_password"
              type="password"
              name="re_password"
              placeholder="請再次輸入密碼"
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
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
            <p class="text-white">
              註冊表示同意
              <router-link
                class="text-sm underline transition-colors duration-200 text-primary hover:text-opacity-50"
                to="/terms/terms_of_member"
                >商店服務條款</router-link
              >
              與
              <router-link
                class="text-sm underline transition-colors duration-200 text-primary hover:text-opacity-50"
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
import { GetMetaData } from '@/common/meta';
export default {
  name: 'SignupView',
  components: {
    BreadCrumb,
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
    PageInit() {
      this.meta_data = GetMetaData('會員註冊', '', '');
      this.$nextTick(() => {
        this.$emit('page-mounted');
        this.$PageReady(this.meta_data.title);
      });
    },
  },
  created() {
    if (getLocalStorage('account_token')) {
      this.$router.push('/account/account_edit');
    } else {
      this.$LoadDataMixin(this);
    }
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
