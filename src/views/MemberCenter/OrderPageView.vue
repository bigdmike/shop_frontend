<template>
  <div class="w-full relative z-10 pb-32">
    <div
      v-if="trade_data != null && trade_data != 'error'"
      class="w-full md:p-3 md:border md:border-zinc-300 rounded-md mb-5"
    >
      <div
        class="flex items-center justify-between pb-3 border-b border-zinc-300 mb-3"
      >
        <p class="text-sm text-basic_gray">
          訂單編號：<span class="text-secondary">{{ trade_data.TradeID }}</span>
        </p>
        <p class="text-sm text-basic_gray">
          訂購日期：<span class="text-black">{{
            trade_data.created_at.slice(0, 10)
          }}</span>
        </p>
      </div>
      <div class="mb-5">
        <p class="text-sm text-basic_gray mb-3">
          訂單狀態
          <span class="text-secondary">{{ trade_data.StatusTxt }}</span>
        </p>
        <p class="text-sm text-basic_gray mb-3">
          付款方式
          <span class="text-secondary">{{ payment_data }}</span>
        </p>
      </div>
      <ol class="mb-5">
        <li
          v-for="(item, item_index) in trade_data.SubTradeList"
          :key="`product_${item_index}`"
          :class="item_index == 0 ? 'rounded-t-md' : ''"
          class="p-3 border-x border-t"
        >
          <p class="mb-5">
            {{ GetProduct(item) }}
          </p>
          <template v-if="GetProduct(item) != '商品已移除'">
            <div
              class="inline-block mb-2"
              v-if="item.DiscountID_PercentMenu_Info"
            >
              <p class="text-xs">套用優惠：</p>
              <p class="text-sm px-5 py-1 rounded-md bg-primary text-white">
                {{ item.DiscountID_PercentMenu_Info.Title }}
              </p>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center text-sm">
                <p class="mr-5">
                  <span class="line-through text-xs text-basic_gray"
                    >NT${{ item.SellPrice }}</span
                  >
                  NT$ {{ item.FinalPrice }}
                </p>
                <p>數量：1</p>
              </div>
              <p class="text-sm">小計 NT${{ item.FinalPrice }}</p>
            </div>
          </template>
        </li>
        <li class="p-3 flex items-center justify-end border-x border-t">
          <p class="text-sm">金流手續費</p>
          <p class="w-32 text-right font-bold text-sm">
            NT$ {{ trade_data.PaymentSubtotalFee }}
          </p>
        </li>
        <li class="p-3 flex items-center justify-end border-x border-t">
          <p class="text-sm">運費</p>
          <p class="w-32 text-right font-bold text-sm">
            NT$ {{ trade_data.ShippingFee }}
          </p>
        </li>
        <li class="p-3 flex items-center justify-end border rounded-b-md">
          <p class="">總金額</p>
          <p class="text-secondary font-bold w-32 text-right">
            NT$ {{ trade_data.Price }}
          </p>
        </li>
      </ol>
      <div class="mb-5">
        <p class="text-sm mb-3">付款資訊</p>
        <ol class="border border-zinc-300 rounded-md px-2 py-3">
          <li class="border-b border-zinc-300 px-2 pb-2 flex items-center">
            <p class="text-sm text-basic_gray w-20">付款狀態</p>
            <p class="text-sm">
              {{ trade_data.PaymentTime == null ? '尚未付款' : '已完成付款' }}
            </p>
          </li>
          <li class="px-2 pt-2 flex items-center">
            <p class="text-sm text-basic_gray w-20">付款方式</p>
            <p class="text-sm">{{ payment_data }}</p>
          </li>
        </ol>
      </div>
      <div class="mb-5">
        <p class="text-sm mb-3">收件資訊</p>
        <ol class="border border-zinc-300 rounded-md px-2">
          <li class="border-b border-zinc-300 px-2 py-3 flex items-center">
            <p class="text-sm text-basic_gray w-20">收件人</p>
            <p class="text-sm">
              {{ trade_data.ReceiverName }}
            </p>
          </li>
          <li class="border-b border-zinc-300 px-2 py-3 flex items-center">
            <p class="text-sm text-basic_gray w-20">收件地址</p>
            <p class="text-sm">
              {{ trade_data.ReceiverAddress }}
            </p>
          </li>
          <li class="px-2 py-3 flex items-center">
            <p class="text-sm text-basic_gray w-20">聯絡電話</p>
            <p class="text-sm">{{ trade_data.ReceiverPhone }}</p>
          </li>
        </ol>
      </div>
      <div class="mb-5">
        <p class="text-sm mb-3">訂單備註</p>
        <div class="border border-zinc-300 rounded-md p-4">
          {{
            trade_data.ReceiverMemo == ''
              ? '無任何資訊'
              : trade_data.ReceiverMemo
          }}
        </div>
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
          console.log(res.data);
        }
      });
    },
    GetProduct(item) {
      const product_data = this.product_list.filter(
        (product) => product.GoodsID == item.GoodsID
      );
      return product_data.length > 0 ? product_data[0].Title : '商品已移除';
    },
    GetProductOption(item) {
      const product_data = this.product_list.filter(
        (product) => product.GoodsID == item.GoodsID
      );
      let ColorOptionTitle = '';
      let SizeOptionTitle = '';
      product_data.Stock.forEach((stock) => {
        if (stock.ColorID == item.ColorID) {
          ColorOptionTitle = stock.ColorTitle;
        }
        if (stock.SizeID == item.SizeID) {
          SizeOptionTitle = stock.SizeTitle;
        }
      });
      return [ColorOptionTitle, SizeOptionTitle];
    },
  },
  watch: {
    trade_data() {
      if (this.trade_data == 'error') {
        this.$router.push('/account/orders');
      }
    },
  },
  computed: {
    trade_data() {
      if (this.trade_list.length <= 0) {
        return null;
      }
      let trade_data = this.trade_list.filter(
        (item) => item.TradeID == this.$route.params.id
      );
      return trade_data.length > 0 ? trade_data[0] : 'error';
    },
    product_list() {
      return this.$store.state.product_data;
    },
    payment_list() {
      return this.$store.state.payment_data;
    },
    shipway_list() {
      return this.$store.state.shipway_data;
    },
    payment_data() {
      return this.payment_list.filter(
        (item) => item.PaymentID == this.trade_data.PaymentID
      )[0].Title;
    },
    shipway_data() {
      return this.shipway_list.filter(
        (item) => item.ShippingID == this.trade_data.ShippingID
      )[0].Title;
    },
  },
  created() {
    this.GetData();
  },
};
</script>
