<template>
  <div class="relative z-10 w-full pb-32">
    <div>
      <ol>
        <li
          class="w-full p-3 mb-5 rounded-md bg-basic_black"
          v-for="(item, item_index) in page_count"
          :key="`order_${item_index}`"
        >
          <div
            class="flex items-center justify-between pb-3 mb-3 border-b border-zinc-800"
          >
            <p class="text-sm text-basic_gray">
              訂單編號：<span class="text-primary">{{ item.TradeID }}</span>
            </p>
            <p class="text-sm text-basic_gray">
              訂購日期：<span class="text-white">{{
                item.created_at.slice(0, 10)
              }}</span>
            </p>
          </div>
          <div class="">
            <p class="mb-3 text-sm text-basic_gray">
              訂單狀態 <span class="text-primary">{{ item.StatusTxt }}</span>
            </p>
            <p class="mb-3 text-sm text-basic_gray">
              付款方式
              <span class="text-primary">{{
                GetPayment(item.PaymentID).Title
              }}</span>
            </p>
            <p class="text-sm text-basic_gray">
              訂單金額
              <span class="text-primary">NT${{ item.Price }}</span>
            </p>
          </div>
          <div class="flex items-center justify-end">
            <router-link
              :to="`/account/order/${item.TradeID}`"
              class="px-5 py-2 text-xs text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-70"
            >
              訂單詳細
            </router-link>
          </div>
        </li>
      </ol>
      <div class="flex justify-center">
        <button
          @click="page += 1"
          v-if="count_per_page * page < trade_list.length"
          class="px-16 py-2 font-bold text-white transition-colors duration-200 border rounded-full bg-primary border-primary hover:bg-transparent hover:text-primary"
        >
          載入更多
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { getOrderList } from '@/api/member';
import { delLocalStorage } from '@/common/cookie';
export default {
  name: 'OrderListView',
  data() {
    return {
      trade_list: [],
      count_per_page: 5,
      page: 1,
    };
  },
  methods: {
    GetData() {
      getOrderList().then((res) => {
        if (res.code == 302) {
          // token 過期
          delLocalStorage('account_token');
          this.$router.push('/account/login');
        } else {
          this.trade_list = res.data;
        }
      });
    },
    GetPayment(id) {
      let payment = this.payment_data.filter((item) => item.PaymentID == id);
      return payment.length > 0 ? payment[0] : { Title: '查無付款方式' };
    },
    GetShipway(id) {
      return this.shipway_data.filter((item) => item.ShippingID == id)[0];
    },
  },
  computed: {
    page_count() {
      return this.trade_list.slice(0, this.count_per_page * this.page - 1);
    },
    payment_data() {
      return this.$store.state.payment_data;
    },
    shipway_data() {
      return this.$store.state.shipway_data;
    },
  },
  created() {
    this.GetData();
  },
};
</script>
