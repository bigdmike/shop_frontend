<template>
  <div class="w-full relative z-10 pb-32">
    <div>
      <div class="mb-4">
        <p class="mb-1">姓名</p>
        <input
          readonly
          v-model="form_data.name"
          type="text"
          name="name"
          placeholder="請輸入中文姓名"
          class="w-full border border-zinc-200 rounded-md px-3 py-2"
        />
        <p v-if="GetError('name')" class="text-red-600 text-xs">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="mb-4">
        <p class="mb-1">手機號碼</p>
        <input
          v-model="form_data.phone"
          type="tel"
          name="phone"
          placeholder="請輸入手機號碼"
          class="w-full border border-zinc-200 rounded-md px-3 py-2"
        />
        <p v-if="GetError('phone')" class="text-red-600 text-xs">
          請輸入正確的手機號碼
        </p>
      </div>
      <div class="mb-4">
        <p class="mb-1">電子郵件</p>
        <input
          v-model="form_data.account"
          type="email"
          name="email"
          readonly
          placeholder="請輸入電子郵件"
          class="w-full border border-zinc-200 rounded-md px-3 py-2"
        />
        <p v-if="GetError('account')" class="text-red-600 text-xs">
          請輸入正確的電子郵件
        </p>
      </div>
      <div class="mb-4">
        <p class="mb-1">出生日期</p>
        <input
          v-model="form_data.birthday"
          type="date"
          name="birthday"
          placeholder="請選擇出生日期"
          class="w-full border border-zinc-200 rounded-md px-3 py-2"
        />
        <p v-if="GetError('birthday')" class="text-red-600 text-xs">
          請選擇出生日期
        </p>
      </div>
      <div class="mb-10">
        <p class="mb-1">性別</p>
        <div class="relative">
          <SelectArrowIcon
            class="absolute top-1/2 right-5 w-5 pointer-events-none text-black z-10 transform -translate-y-1/2"
          />
          <select
            v-model="form_data.sex"
            class="w-full border border-zinc-200 rounded-md px-3 py-2 relative z-0 appearance-none"
          >
            <option value="M">男</option>
            <option value="W">女</option>
          </select>
        </div>
        <p v-if="GetError('sex')" class="text-red-600 text-xs">請選擇性別</p>
      </div>

      <div>
        <button
          @click="ValidateForm"
          class="px-16 py-3 font-bold text-white bg-primary rounded-full border border-primary transition-colors duration-200 hover:bg-transparent hover:text-primary"
        >
          更新資料
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
import { getAccountInfo, updateAccountInfo } from '@/api/member';
import { validEmail, validPhone } from '@/common/validate';
import { delLocalStorage } from '@/common/cookie';
export default {
  name: 'InfoEditView',
  components: {
    SelectArrowIcon,
  },
  data() {
    return {
      form_data: {
        name: '',
        account: '',
        birthday: '',
        member_id: '',
        phone: '',
        sex: '',
        status: '',
      },
      errors: [],
    };
  },
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    ValidateForm() {
      this.errors = [];
      !validEmail(this.form_data.account) ? this.errors.push('account') : '';
      !validPhone(this.form_data.phone) ? this.errors.push('phone') : '';
      this.form_data.birthday == '' ? this.errors.push('bithday') : '';
      this.form_data.sex == '' ? this.errors.push('sex') : '';
      if (this.errors.length <= 0) {
        this.UpdateData();
      }
    },
    GetData() {
      getAccountInfo().then((res) => {
        if (res.code == 302) {
          // token過期
          this.$router.push('/account/login');
        } else {
          this.form_data = {
            name: res.data.Name,
            account: res.data.Account,
            birthday: res.data.Birthday,
            member_id: res.data.MemberID,
            phone: res.data.Phone,
            sex: res.data.Sex,
            status: res.data.Status,
          };
        }
      });
    },
    UpdateData() {
      const info_data = {
        Phone: this.form_data.phone,
        Email: this.form_data.account,
        Birthday: this.form_data.birthday,
        Sex: this.form_data.sex,
      };
      updateAccountInfo(info_data).then((res) => {
        if (res.code == 302) {
          // token過期
          delLocalStorage('account_token');
          this.$router.push('/account/login');
        } else {
          this.$store.commit('SetDialog', {
            status: true,
            content: '會員資料已更新',
          });
          this.GetData();
        }
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
