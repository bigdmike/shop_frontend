<template>
  <main class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 pb-32 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div class="w-full max-w-screen-sm p-10 mx-auto bg-zinc-50 rounded-2xl">
        <h4 class="mb-2 text-xl font-bold text-center sm:text-2xl">
          請輸入訂購人的電話號碼與訂單號碼
        </h4>
        <p class="mb-8 text-sm text-center text-secondary sm:text-base">
          訂單相關資訊可以在訂購人的email中查看
        </p>
        <div class="w-full pt-10 border-t border-zinc-200 md:px-20">
          <div class="mb-4">
            <input
              v-model="phone"
              type="tel"
              name="phone"
              placeholder="請輸入訂購人電話"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('phone')" class="text-xs text-red-600">
              請輸入訂購人電話
            </p>
          </div>
          <div class="mb-4">
            <input
              @keypress.enter="VarDateForm"
              v-model="trade_no"
              type="text"
              name="trade_no"
              placeholder="請輸入訂單編號"
              class="w-full px-3 py-2 border rounded-md border-zinc-200"
            />
            <p v-if="GetError('trade_no')" class="text-xs text-red-600">
              請輸入訂單編號
            </p>
          </div>
          <div class="mb-10">
            <button
              @click="VarDateForm"
              class="block w-full py-3 text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-75"
            >
              送出查詢
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { validPhone } from '@/common/validate';
import { GetOrder } from '@/api/shopcart';
import { setLocalStorage } from '@/common/cookie';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'OrderSearch',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '非會員訂單查詢',
          link: '/order_search',
        },
      ],
      phone: '',
      trade_no: '',
      errors: [],
      meta_data: null,
    };
  },
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    VarDateForm() {
      this.errors = [];
      !validPhone(this.phone) ? this.errors.push('phone') : '';
      this.trade_no == '' ? this.errors.push('trade_no') : '';
      if (this.errors.length <= 0) {
        this.SendData();
      }
    },
    SendData() {
      GetOrder(this.trade_no, this.phone).then((res) => {
        if (res.code == 500) {
          this.$store.commit('SetDialog', { status: true, content: res.msg });
        } else {
          setLocalStorage('trade_data', JSON.stringify(res.data));
          this.$router.push('/order_search/result');
        }
      });
    },
  },
  created() {
    this.meta_data = GetMetaData('訂單查詢', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
