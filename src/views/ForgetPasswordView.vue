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
        <h4 class="mb-8 text-2xl font-bold text-center text-white">忘記密碼</h4>
        <div class="w-full md:px-20">
          <div class="mb-4">
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
          <div class="mb-10">
            <button
              @click="VarDateForm"
              class="block w-full py-3 font-bold text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-75"
            >
              申請密碼重置
            </button>
          </div>
          <div class="flex items-center justify-between">
            <router-link
              class="text-sm underline transition-colors duration-200 text-primary hover:text-opacity-50"
              to="/account/login"
              >會員登入</router-link
            >
            <router-link
              class="text-sm underline transition-colors duration-200 text-primary hover:text-opacity-50"
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
import { resetPwdData } from '@/api/member';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'LoginView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      account: '',
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
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    VarDateForm() {
      this.errors = [];
      !validEmail(this.account) ? this.errors.push('account') : '';
      if (this.errors.length <= 0) {
        this.ResetPwd();
      }
    },
    ResetPwd() {
      const login_data = {
        Account: this.account,
      };
      resetPwdData(login_data).then(() => {
        this.$store.commit('SetDialog', {
          status: true,
          content: '已將臨時密碼寄送至您的email，請查收後使用臨時密碼登入。',
        });
      });
    },
    PageInit() {
      this.meta_data = GetMetaData('忘記密碼', '', '');
      this.$nextTick(() => {
        this.$emit('page-mounted');
        this.$PageReady(this.meta_data.title);
      });
    },
  },
  created() {
    this.$LoadDataMixin(this);
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
