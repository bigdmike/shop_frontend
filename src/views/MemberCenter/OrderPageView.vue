<template>
  <div class="relative z-10 w-full pb-32 text-white">
    <div
      v-if="trade_data != null && trade_data != 'error'"
      class="w-full p-5 mb-5 rounded-md bg-basic_black"
    >
      <div
        class="flex items-center justify-between pb-3 mb-3 border-b border-zinc-300"
      >
        <p class="text-sm text-basic_gray">
          訂單編號：<span class="text-primary">{{ trade_data.TradeID }}</span>
        </p>
        <p class="text-sm text-basic_gray">
          訂購日期：<span class="text-white">{{
            trade_data.created_at.slice(0, 10)
          }}</span>
        </p>
      </div>
      <div class="mb-5">
        <p class="mb-3 text-sm text-basic_gray">
          訂單狀態
          <span class="text-primary">{{ trade_data.StatusTxt }}</span>
        </p>
        <p class="mb-3 text-sm text-basic_gray">
          付款方式
          <span class="text-primary">{{ payment_data }}</span>
        </p>
      </div>
      <ol class="mb-5">
        <li
          v-for="(item, item_index) in trade_data.SubTradeList"
          :key="`product_${item_index}`"
          class="p-3 mb-4 bg-black rounded-md"
        >
          <p class="mb-5 font-bold text-primary">
            {{ GetProduct(item) }}
          </p>
          <template v-if="GetProduct(item) != '商品已移除'">
            <div
              class="inline-block mb-2"
              v-if="
                item.DiscountID_PercentMenu_Info &&
                item.DiscountID_PercentMenu_Info.length > 0
              "
            >
              <p class="text-xs">套用優惠：</p>
              <p class="px-5 py-1 text-sm text-white rounded-md bg-basic_black">
                {{ item.DiscountID_PercentMenu_Info.Title }}
              </p>
            </div>
            <div
              class="flex flex-wrap items-center justify-between sm:flex-nowrap"
            >
              <div class="flex items-center text-sm">
                <p class="mr-5">
                  <span
                    v-if="item.SellPrice != item.FinalPrice"
                    class="text-xs line-through text-basic_gray"
                    >NT${{ item.SellPrice }}</span
                  >
                  NT$ {{ item.FinalPrice }}
                </p>
                <p>數量：1</p>
              </div>
              <p class="w-full text-sm text-right sm:w-auto">
                小計 NT${{ item.FinalPrice }}
              </p>
            </div>
          </template>
        </li>
        <li class="flex items-center justify-end p-3">
          <p class="text-sm">金流手續費</p>
          <p class="w-32 text-sm font-bold text-right">
            NT$ {{ trade_data.PaymentSubtotalFee }}
          </p>
        </li>
        <li class="flex items-center justify-end p-3">
          <p class="text-sm">運費</p>
          <p class="w-32 text-sm font-bold text-right">
            NT$ {{ trade_data.ShippingFee }}
          </p>
        </li>
        <li class="flex items-center justify-end p-3">
          <p class="">總金額</p>
          <p class="w-32 font-bold text-right text-primary">
            NT$ {{ trade_data.Price }}
          </p>
        </li>
      </ol>
      <div class="mb-5">
        <p class="mb-3 text-sm">付款資訊</p>
        <ol class="px-2 py-3 bg-black rounded-md">
          <li class="flex items-center px-2 pb-2">
            <p class="w-20 text-sm text-basic_gray">付款狀態</p>
            <p class="text-sm">
              {{ trade_data.PaymentTime == null ? '尚未付款' : '已完成付款' }}
            </p>
          </li>
          <li class="flex items-center px-2 pt-2">
            <p class="w-20 text-sm text-basic_gray">付款方式</p>
            <p class="text-sm">{{ payment_data }}</p>
          </li>
        </ol>
      </div>
      <div class="mb-5">
        <p class="mb-3 text-sm">購買人資訊</p>
        <ol class="px-2 bg-black rounded-md">
          <li class="flex items-center px-2 py-3">
            <p class="w-20 text-sm text-basic_gray">購買人</p>
            <p class="text-sm">
              {{ trade_data.BuyerName }}
            </p>
          </li>
          <li class="flex items-center px-2 py-3">
            <p class="w-20 text-sm text-basic_gray">購買人電話</p>
            <p class="text-sm">{{ trade_data.BuyerPhone }}</p>
          </li>
          <li class="flex items-center px-2 py-3">
            <p class="w-20 text-sm text-basic_gray">購買人信箱</p>
            <p class="text-sm">{{ trade_data.ReceiverEmail }}</p>
          </li>
        </ol>
      </div>
      <div class="mb-5">
        <p class="mb-3 text-sm">收件資訊</p>
        <ol class="px-2 bg-black rounded-md">
          <li class="flex items-center px-2 py-3">
            <p class="w-20 text-sm text-basic_gray">收件人</p>
            <p class="text-sm">
              {{ trade_data.ReceiverName }}
            </p>
          </li>
          <li class="flex items-center px-2 py-3">
            <p class="w-20 text-sm text-basic_gray">收件地址</p>
            <p class="text-sm">
              {{
                trade_city_area.City +
                trade_city_area.Area +
                trade_data.ReceiverAddress
              }}
            </p>
          </li>
          <li class="flex items-center px-2 py-3">
            <p class="w-20 text-sm text-basic_gray">聯絡電話</p>
            <p class="text-sm">{{ trade_data.ReceiverPhone }}</p>
          </li>
        </ol>
      </div>
      <div class="mb-5">
        <p class="mb-3 text-sm">訂單備註</p>
        <div class="p-4 bg-black rounded-md">
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
    zipcode_data() {
      return this.$store.state.zipcode_data;
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
    trade_city_area() {
      return this.zipcode_data.filter(
        (item) => item.ZipCode == this.trade_data.ReceiverAddressCode
      )[0];
    },
  },
  created() {
    this.GetData();
  },
};
</script>
