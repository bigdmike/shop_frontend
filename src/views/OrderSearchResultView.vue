<template>
  <main class="relative z-10 w-full">
    <div
      class="relative flex items-center justify-center w-full max-w-screen-xl px-5 mx-auto md:px-10 pb-14 pt-14 xl:px-0"
    >
      <div class="w-full">
        <div class="mb-10 text-center">
          <p class="mb-4 text-primary">訂單編號 #{{ trade_data.TradeID }}</p>
          <p class="mb-10 text-basic_gray">以下是您的購物明細</p>
        </div>
        <div class="mb-5">
          <p class="px-2 py-2 font-bold text-primary bg-primary bg-opacity-20">
            訂單資訊
          </p>
        </div>
        <ol class="w-full">
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">訂單編號</p>
            <p class="text-sm font-bold sm:text-base">
              #{{ trade_data.TradeID }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">付款方式</p>
            <p class="text-sm font-bold sm:text-base">
              {{ active_payment }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">配送方式</p>
            <p class="text-sm font-bold sm:text-base">
              {{ active_shipway }}
            </p>
          </li>
        </ol>
        <div class="mb-5">
          <p class="px-2 py-2 font-bold text-primary bg-primary bg-opacity-20">
            收件資訊
          </p>
        </div>
        <ol class="w-full">
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">收件人姓名</p>
            <p class="text-sm font-bold sm:text-base">
              {{ trade_data.ReceiverName }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">收件人電話</p>
            <p class="text-sm font-bold sm:text-base">
              {{ trade_data.ReceiverPhone }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">收件人地址</p>
            <p class="text-sm font-bold sm:text-base">
              {{ trade_data.ReceiverAddress }}
            </p>
          </li>
        </ol>
        <div class="mb-5">
          <p class="px-2 py-2 font-bold text-primary bg-primary bg-opacity-20">
            訂單明細
          </p>
        </div>
        <ol
          class="w-full mb-10 border-b border-zinc-300"
          v-if="shopcart != null"
        >
          <li
            :class="
              item_index != shopcart.length - 1
                ? ' border-b border-zinc-300 mb-3'
                : ''
            "
            class="flex w-full pb-3"
            v-for="(item, item_index) in shopcart"
            :key="`shopcart_${item_index}`"
          >
            <!-- <div class="w-[100px] overflow-hidden rounded-lg">
              <img :src="$ImageUrl(item.product_data.Image1)" class="w-full" />
            </div> -->
            <div class="flex-1 w-full">
              <p class="mb-2 text-sm font-bold">
                {{ item.product_data.Title }}
              </p>
              <p class="text-sm text-basic_gray">
                {{ GetActiveOption(item).ColorTitle }}
              </p>
              <p
                v-if="GetActiveOption(item).SizeTitle != '無'"
                class="text-sm text-basic_gray"
              >
                {{ GetActiveOption(item).SizeTitle }}
              </p>
            </div>

            <div class="flex items-center justify-end">
              <div class="flex items-center">
                <p
                  class="mr-2 text-xs line-through text-basic_gray"
                  v-if="
                    item.checkout_data.SellPrice !=
                    item.checkout_data.FinalPrice
                  "
                >
                  NT$
                  {{ $MoneyFormat(parseInt(item.checkout_data.SellPrice)) }}
                </p>
                <p class="text-sm font-bold">
                  NT$
                  {{ $MoneyFormat(parseInt(item.checkout_data.FinalPrice)) }}
                  x {{ item.amount }}
                </p>
              </div>
            </div>
          </li>
        </ol>
        <ol class="pb-5 mb-5 border-b border-zinc-300">
          <li class="flex items-center justify-between w-full mb-3 text-sm">
            <p class="font-medium">合計</p>
            <p class="font-semibold">
              NT$ {{ $MoneyFormat(product_total_price) }}
            </p>
          </li>
          <li class="flex items-center justify-between text-sm w-ful">
            <p class="font-medium">運費</p>
            <p class="font-semibold">NT$ {{ $MoneyFormat(ship_price) }}</p>
          </li>
          <li
            v-if="payment_price != 0"
            class="flex items-center justify-between w-full mt-3 text-sm"
          >
            <p class="font-medium">金流手續費</p>
            <p class="font-semibold">NT$ {{ $MoneyFormat(payment_price) }}</p>
          </li>
          <li
            v-if="trade_data.CouponMoney != 0"
            class="flex items-center justify-between w-full mt-3 text-sm"
          >
            <p class="font-medium">優惠代碼折抵</p>
            <p class="font-semibold">
              - NT$ {{ $MoneyFormat(trade_data.CouponMoney) }}
            </p>
          </li>
        </ol>
        <div class="flex items-center justify-between w-full mb-10 text-sm">
          <p class="font-medium">總金額</p>
          <p class="font-semibold">
            NT$
            {{ $MoneyFormat(total_price) }}
          </p>
        </div>

        <div class="w-full text-center">
          <router-link
            to="/"
            class="inline-block py-3 text-white transition-colors duration-200 rounded-lg px-14 bg-primary hover:bg-opacity-70"
          >
            回到首頁
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getLocalStorage, delLocalStorage } from '@/common/cookie';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'TradeFinishView',
  data() {
    return {
      trade_data: null,
      meta_data: null,
    };
  },
  methods: {
    GetActiveOption(shopcart_item) {
      return shopcart_item.product_data.Stock.filter((item) => {
        return (
          item.ColorID == shopcart_item.active_option[0] &&
          item.SizeID == shopcart_item.active_option[1]
        );
      })[0];
    },
    GetDiscountAndPrice(item) {
      let product = this.trade_data.CheckoutList.filter((checkout_item) => {
        return (
          checkout_item.GoodsID == item.product_data.GoodsID &&
          checkout_item.ColorID == item.active_option[0] &&
          checkout_item.SizeID == item.active_option[1]
        );
      })[0];
      let discount_list = [];
      Object.keys(product.DiscountPercentFullInfo).length > 0
        ? discount_list.push(product.DiscountPercentFullInfo)
        : '';
      Object.keys(product.DiscountPercentMenuInfo).length > 0
        ? discount_list.push(product.DiscountPercentMenuInfo)
        : '';
      return {
        discount_list: discount_list,
        discount_price: product.DiscountPrice,
        sell_price: product.SellPrice,
      };
    },
  },
  computed: {
    product_total_price() {
      if (this.trade_data == null) {
        return 0;
      }
      let price = 0;
      this.trade_data.SubTradeList.forEach((item) => {
        price += parseInt(item.FinalPrice);
      });
      return price;
    },
    shipway_data() {
      return this.$store.state.shipway_data;
    },
    payment_data() {
      return this.$store.state.payment_data;
    },
    product_list() {
      return this.$store.state.product_data;
    },
    ship_price() {
      if (this.trade_data == null) {
        return 0;
      } else {
        return this.trade_data.ShippingFee;
      }
    },
    payment_price() {
      if (this.trade_data == null) {
        return 0;
      } else {
        return this.trade_data.PaymentSubtotalFee;
      }
    },
    total_price() {
      if (this.trade_data == null) {
        return 0;
      } else {
        return this.trade_data.Price;
      }
      // AfterCouponTotal
      // return parseInt(this.product_total_price) + parseInt(this.ship_price);
    },
    coupon_discount() {
      if (this.trade_data == null) {
        return 0;
      }
      return this.trade_data.CouponInfo.length != 0
        ? this.trade_data.DiscountFullTotal - this.trade_data.AfterCouponTotal
        : 0;
    },
    active_shipway() {
      if (this.trade_data == null) {
        return '';
      }
      return this.shipway_data.filter(
        (item) => item.ShippingID == this.trade_data.ShippingID
      )[0].Title;
    },
    active_payment() {
      if (this.trade_data == null) {
        return '';
      }
      return this.payment_data.filter(
        (item) => item.PaymentID == this.trade_data.PaymentID
      )[0].Title;
    },
    shopcart() {
      if (this.trade_data == null) {
        return [];
      }
      let shopcart = [];
      this.trade_data.SubTradeList.forEach((item) => {
        let product_exist = -1;
        shopcart.forEach((shopcart_item, shopcart_item_index) => {
          if (
            shopcart_item.product_data.GoodsID == item.GoodsID &&
            shopcart_item.active_option[0] == item.ColorID &&
            shopcart_item.active_option[1] == item.SizeID
          ) {
            product_exist = shopcart_item_index;
          }
        });
        if (product_exist != -1) {
          shopcart[product_exist].amount += 1;
        } else {
          let product_data = this.product_list.filter(
            (product) => product.GoodsID == item.GoodsID
          )[0];
          shopcart.push({
            product_data: product_data,
            checkout_data: item,
            active_option: [item.ColorID, item.SizeID],
            amount: 1,
          });
        }
      });

      return shopcart;
    },
  },
  created() {
    const trade_data = getLocalStorage('trade_data');
    if (trade_data) {
      this.trade_data = JSON.parse(trade_data)[0];
      delLocalStorage('trade_data');
      this.meta_data = GetMetaData('訂單查詢', '', '');
      this.$nextTick(() => {
        window.prerenderReady = true;
      });
    } else {
      this.$router.push('/order_search/search');
    }
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
