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
          v-for="(item, item_index) in trade_product_data"
          :key="`product_${item_index}`"
          class="p-3 mb-4 bg-black rounded-md"
        >
          <CustomShopcartProductCard
            v-if="item.ProductData.IsCustom == 'Y'"
            :shopcart_item="item"
          />
          <ShopcartProductCard v-else :shopcart_item="item" />
        </li>

        <li class="px-2 mb-5" v-if="trade_data.CouponInfo">
          <!-- CouponInfo -->
          <div
            class="w-full px-3 py-2 mt-2 bg-green-500 border border-green-500 rounded-md bg-opacity-20"
          >
            <span class="block text-xs text-green-500"
              >使用優惠代碼 #{{ trade_data.CouponInfo.CouponNumber }}</span
            >
            <p class="text-sm text-white">
              {{ trade_data.CouponInfo.Title }}，折抵NT$
              {{ trade_data.CouponInfo.Money }}
            </p>
          </div>
        </li>

        <li class="flex items-center justify-end px-3 mb-2">
          <p class="text-sm">商品小計</p>
          <p class="w-32 text-sm font-bold text-right font-anybody">
            NT$ {{ $MoneyFormat(original_product_price) }}
          </p>
        </li>

        <li class="flex items-center justify-end px-3 mb-2">
          <p class="text-sm">折扣優惠</p>
          <p class="w-32 text-sm font-bold text-right font-anybody">
            NT$ {{ $MoneyFormat(discount_count) }}
          </p>
        </li>

        <li
          v-if="trade_data.CouponInfo"
          class="flex items-center justify-end px-3 mb-2"
        >
          <p class="text-sm">優惠代碼折扣</p>
          <p class="w-32 text-sm font-bold text-right font-anybody">
            NT$ -{{ $MoneyFormat(trade_data.CouponInfo.Money) }}
          </p>
        </li>

        <li class="flex items-center justify-end px-3 mb-2">
          <p class="text-sm">金流手續費</p>
          <p class="w-32 text-sm font-bold text-right font-anybody">
            NT$ {{ $MoneyFormat(trade_data.PaymentSubtotalFee) }}
          </p>
        </li>
        <li class="flex items-center justify-end px-3 mb-2">
          <p class="text-sm">運費</p>
          <p
            v-if="trade_data.ShippingFree != 'Y'"
            class="w-32 text-sm font-bold text-right font-anybody"
          >
            NT$ {{ $MoneyFormat(trade_data.ShippingFee) }}
          </p>
          <p
            v-else
            class="w-32 font-semibold text-right font-anybody text-primary"
          >
            免運費
          </p>
        </li>
        <li class="flex items-center justify-end px-3">
          <p class="">總金額</p>
          <p class="w-32 font-bold text-right text-primary font-anybody">
            NT$ {{ $MoneyFormat(trade_data.Price) }}
          </p>
        </li>
      </ol>

      <div
        class="w-full"
        v-if="trade_data && trade_data.TradeDiscount.length > 0"
      >
        <p class="mb-3 text-sm">贈品資訊</p>
        <div
          class="block w-full p-3 mb-2 bg-black rounded-md"
          v-for="(item, item_index) in trade_data.TradeDiscount"
          :key="`give_info_${item_index}`"
        >
          <p class="text-sm font-bold text-white">
            {{ item.Title }}
          </p>
          <p class="text-sm text-primary">
            {{ item.GiveName }}
          </p>
        </div>
      </div>
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
import CustomShopcartProductCard from '@/components/member_order/CustomProductCard.vue';
import ShopcartProductCard from '@/components/member_order/ProductCard.vue';
import { getOrderList } from '@/api/member';
import { logoutAccount } from '@/common/cookie';
export default {
  name: 'OrderListView',
  components: {
    CustomShopcartProductCard,
    ShopcartProductCard,
  },
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
          logoutAccount();
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
    trade_product_data() {
      if (this.trade_data == null || this.trade_data == 'error') {
        return [];
      } else {
        let tmp_product_list = JSON.parse(
          JSON.stringify(this.trade_data.SubTradeList)
        );
        let product_list = [];

        tmp_product_list.forEach((item) => {
          const product_detail = this.product_list.filter(
            (product) => product.GoodsID == item.GoodsID
          )[0];
          if (product_detail.IsCustom == 'N') {
            // 一般商品
            let match = -1;
            product_list.forEach((product, product_inndex) => {
              if (
                product.GoodsID == item.GoodsID &&
                product.ColorID == item.ColorID &&
                product.SizeID == item.SizeID
              ) {
                match = product_inndex;
              }
            });
            if (match != -1) {
              product_list[match].Amount += 1;
            } else {
              let tmp_product = Object.assign({}, item);
              tmp_product.Amount = 1;
              tmp_product.ProductData = product_detail;
              product_list.push(tmp_product);
            }
          } else {
            let tmp_product = Object.assign({}, item);
            tmp_product.Amount = 1;
            tmp_product.ProductData = product_detail;
            product_list.push(tmp_product);
          }
        });

        return product_list;
      }
    },
    original_product_price() {
      let price = 0;
      this.trade_data.SubTradeList.forEach((item) => {
        price += parseInt(item.SellPrice);
      });
      return price;
    },
    discount_count() {
      let price = parseInt(this.trade_data.Price) - this.original_product_price;
      this.trade_data.CouponInfo.length != 0
        ? (price += parseInt(this.trade_data.CouponInfo.Money))
        : '';
      return price;
    },
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
    product_list() {
      return this.$store.state.all_product_data;
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
