<template>
  <div class="relative z-10 w-full pb-32">
    <div>
      <div class="mb-4">
        <p class="mb-1 text-white">目前密碼</p>
        <input
          v-model="old_password"
          type="password"
          name="password"
          placeholder="請輸入目前使用中的密碼"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
        />
        <p v-if="GetError('old_password')" class="text-xs text-red-600">
          請輸入目前使用中的密碼
        </p>
      </div>
      <div class="mb-4">
        <p class="mb-1 text-white">
          新密碼<span class="block text-xs md:inline-block md:ml-2 text-primary"
            >*請輸入6個字元以上的英文字母及數字，不可使用特殊符號</span
          >
        </p>
        <input
          v-model="new_password"
          type="password"
          name="new_password"
          placeholder="請輸入新的密碼"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
        />
        <p v-if="GetError('new_password')" class="text-xs text-red-600">
          請輸入6個字元以上的英文字母及數字密碼
        </p>
      </div>
      <div class="mb-4">
        <p class="mb-1 text-white">再次輸入新密碼</p>
        <input
          v-model="re_password"
          type="password"
          name="re_password"
          placeholder="請再次輸入新密碼"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
        />
        <p v-if="GetError('re_password')" class="text-xs text-red-600">
          兩次密碼輸入不一致
        </p>
      </div>

      <div class="flex justify-end">
        <button
          @click="ValidateForm"
          class="px-16 py-3 font-bold text-white transition-colors duration-200 border rounded-md bg-primary border-primary hover:bg-transparent hover:text-primary"
        >
          更新資料
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { updateAccountPassword } from '@/api/member';
import { delLocalStorage } from '@/common/cookie';
import { validPassword } from '@/common/validate';
export default {
  name: 'PasswordEditView',
  data() {
    return {
      old_password: '',
      new_password: '',
      re_password: '',
      errors: [],
    };
  },
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    ValidateForm() {
      this.errors = [];
      this.old_password == '' ? this.errors.push('old_password') : '';
      !validPassword(this.new_password) ? this.errors.push('new_password') : '';
      this.re_password == '' || this.re_password != this.new_password
        ? this.errors.push('re_password')
        : '';
      if (this.errors.length <= 0) {
        this.UpdateData();
      }
    },
    UpdateData() {
      const password_data = {
        Password: this.old_password,
        NewPassword: this.new_password,
      };
      updateAccountPassword(password_data).then((res) => {
        if (res.code == 302) {
          // token過期
          delLocalStorage('account_token');
          this.$router.push('/account/login');
        } else {
          delLocalStorage('account_token');
          this.$router.push('/account/login');
          this.$store.commit('SetDialog', {
            status: true,
            content: '會員密碼已更新，請重新登入',
          });
        }
      });
    },
  },
};
</script>
