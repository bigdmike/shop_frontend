<template>
  <main
    data-scroll-section
    class="relative z-10 w-full py-40 text-white bg-bg_black sm:py-40"
  >
    <div
      v-if="form_data != null && data_load_finish"
      class="relative flex items-center justify-center w-full max-w-screen-xl px-5 mx-auto md:px-10 xl:px-0"
    >
      <div class="w-full">
        <div class="flex flex-col-reverse items-center mb-5 text-center">
          <h2 class="relative inline-block px-8">
            <span
              data-section-subtitle-arrow
              class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
            ></span>
            <span
              data-section-subtitle
              class="block text-xl font-bold leading-none text-white"
              >訂單編號 {{ $route.params.id }}</span
            >
            <span
              data-section-subtitle-arrow
              class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
            ></span>
          </h2>
          <h3 class="mb-5 overflow-hidden">
            <span
              data-section-title
              data-text="About Us"
              class="block text-4xl font-black text-basic_gray text-opacity-20 font-anybody"
            >
              Thank You
            </span>
          </h3>
          <img src="@/assets/img/check.svg" class="mx-auto mb-5" />
        </div>
        <div class="mb-10">
          <p class="font-medium text-center text-white">
            感謝您的訂購！已收到訂單，待付款金額確認入帳後客服人員將會與您聯絡核對訂單內容訂單確認後我們將盡快安排商品製作
          </p>
        </div>
        <div class="mb-3">
          <p class="px-2 py-2 font-bold text-white bg-primary bg-opacity-30">
            訂單資訊
          </p>
        </div>
        <ol class="w-full px-2 mb-10">
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">訂單編號</p>
            <p class="text-sm font-medium">#{{ $route.params.id }}</p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">付款方式</p>
            <p class="text-sm font-medium">
              {{ active_payment }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">配送方式</p>
            <p class="text-sm font-medium">
              {{ active_shipway }}
            </p>
          </li>
        </ol>
        <div class="mb-3">
          <p class="px-2 py-2 font-bold text-white bg-primary bg-opacity-30">
            購買人資訊
          </p>
        </div>
        <ol class="w-full px-2 mb-10">
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">購買人姓名</p>
            <p class="text-sm font-medium">
              {{ form_data.buyer_last_name + form_data.buyer_first_name }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">購買人電話</p>
            <p class="text-sm font-medium">
              {{ form_data.buyer_phone }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">購買人信箱</p>
            <p class="text-sm font-medium">
              {{ form_data.consignee_email }}
            </p>
          </li>
        </ol>
        <div class="mb-3">
          <p class="px-2 py-2 font-bold text-white bg-primary bg-opacity-30">
            收件資訊
          </p>
        </div>
        <ol class="w-full px-2 mb-10">
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">收件人姓名</p>
            <p class="text-sm font-medium">
              {{
                form_data.consignee_last_name + form_data.consignee_first_name
              }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">收件人電話</p>
            <p class="text-sm font-medium">
              {{ form_data.consignee_phone }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full mb-3">
            <p class="text-sm">收件人地址</p>
            <p class="text-sm font-medium">
              <!-- get_city_area.City +
                get_city_area.Area + -->
              {{
                form_data.consignee_city +
                form_data.consignee_area +
                form_data.consignee_address
              }}
            </p>
          </li>
        </ol>
        <div class="mb-3">
          <p class="px-2 py-2 font-bold text-white bg-primary bg-opacity-30">
            訂單明細
          </p>
        </div>
        <ol
          class="w-full mb-10 border-b border-zinc-700"
          v-if="shopcart != null"
        >
          <li
            :class="
              item_index != shopcart.length - 1
                ? ' border-b border-zinc-700 mb-3'
                : ''
            "
            class="flex w-full pt-2 pb-3"
            v-for="(item, item_index) in shopcart"
            :key="`shopcart_${item_index}`"
          >
            <ProductCard v-if="item.IsCustom == 'N'" :shopcart_item="item" />
            <CustomProductCard v-else :shopcart_item="item" />
          </li>
        </ol>
        <ol class="pb-5 mb-5 border-b border-zinc-700">
          <li class="flex items-center justify-between w-full mb-3 text-sm">
            <p class="font-medium">合計</p>
            <p class="font-semibold font-anybody">
              NT$ {{ $MoneyFormat(product_original_price) }}
            </p>
          </li>

          <li
            v-if="product_original_price != product_total_price"
            class="flex items-center justify-between w-full mb-3 text-sm"
          >
            <p class="font-medium">合計</p>
            <p class="font-semibold font-anybody">
              - NT$
              {{ $MoneyFormat(product_original_price - product_total_price) }}
            </p>
          </li>

          <li class="flex items-center justify-between text-sm w-ful">
            <p class="font-medium">運費</p>
            <p
              v-if="!checkout_data.ShippingFree"
              class="font-semibold font-anybody"
            >
              NT$ {{ $MoneyFormat(ship_price) }}
            </p>
            <p v-else class="font-semibold font-anybody text-primary">免運費</p>
          </li>
          <li
            v-if="payment_price != 0"
            class="flex items-center justify-between w-full mt-3 text-sm"
          >
            <p class="font-medium">金流手續費</p>
            <p class="font-semibold font-anybody">
              NT$ {{ $MoneyFormat(payment_price) }}
            </p>
          </li>
          <li
            v-if="coupon_discount != 0"
            class="flex items-center justify-between w-full mt-3 text-sm"
          >
            <p class="font-medium">優惠代碼折抵</p>
            <p class="font-semibold font-anybody">
              - NT$ {{ $MoneyFormat(coupon_discount) }}
            </p>
          </li>
        </ol>
        <div class="flex items-center justify-between w-full mb-10 text-sm">
          <p class="font-medium">總金額</p>
          <p class="font-semibold font-anybody">
            NT$
            {{ $MoneyFormat(total_price) }}
          </p>
        </div>

        <div class="w-full text-center">
          <router-link
            to="/"
            class="inline-block py-3 font-bold text-white transition-colors duration-200 rounded-lg px-14 bg-primary hover:bg-opacity-70"
          >
            回到首頁
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ProductCard from '@/components/trade_finish/ProductCard.vue';
import CustomProductCard from '@/components/trade_finish/CustomProductCard.vue';
import { getLocalStorage } from '@/common/cookie';
// delLocalStorage
import { GetMetaData } from '@/common/meta';
import { ConvertAddShopCartData } from '@/common/gtm_methods';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'TradeFinishView',
  data() {
    return {
      form_data: null,
      checkout_data: null,
      meta_data: null,
    };
  },
  components: {
    ProductCard,
    CustomProductCard,
  },
  methods: {
    // GA4 電子商務事件
    SendPurchase() {
      // GTM事件
      let products = [];
      this.shopcart.forEach((item) => {
        const product = ConvertAddShopCartData(
          item.ProductData,
          item.IsCustom == 'Y'
            ? item.CustomSpecID.split(',')
            : [item.ColorID, item.SizeID],
          item.Amount,
          item.DiscountPrice
        );
        products.push(product);
      });
      window.dataLayer.push({
        event: 'purchase',
        trade_no: this.trade_no,
        items: products,
        value: this.total_price,
        currency: 'TWD',
        tax: 0,
        shipping: this.ship_price,
        coupon: this.form_data.coupon,
      });
    },
    PageInit() {
      const trade_data = getLocalStorage('trade_data');
      const checkout_data = getLocalStorage('trade_checkout_data');
      // 確認是否有讀取到付款資料與結帳資料
      if (this.$route.params.id && trade_data && checkout_data) {
        this.form_data =
          JSON.parse(trade_data).length == 1
            ? JSON.parse(trade_data)[0]
            : JSON.parse(trade_data);
        this.checkout_data = JSON.parse(checkout_data);
        // 讀取完成後刪除本地暫存
        // delLocalStorage('trade_data');
        // delLocalStorage('trade_checkout_data');
        // 觸發GA4 電子商務事件
        this.SendPurchase();
        // 清空購物車
        this.$store.commit('shopcart_module/SetShopCart', []);

        this.meta_data = GetMetaData('訂單完成', '', '');
        this.$nextTick(() => {
          this.$emit('page-mounted');
          this.$PageReady(this.meta_data.title);
        });
      }
      // 若沒有正確讀取到資料則返回首頁
      else {
        this.$router.push('/');
      }
    },
  },
  computed: {
    ...mapState([
      'shipway_data',
      'payment_data',
      'product_data',
      'zipcode_data',
    ]),
    ...mapGetters(['data_load_finish']),
    shopcart() {
      let shopcart = [];
      this.checkout_data.CheckoutList.forEach((item) => {
        let is_exist = -1;
        shopcart.forEach((shopcart_item, shopcart_index) => {
          if (
            shopcart_item.GoodsID == item.GoodsID &&
            shopcart_item.ColorID == item.ColorID &&
            shopcart_item.SizeID == item.SizeID &&
            item.IsCustom == 'N'
          ) {
            is_exist = shopcart_index;
          }
        });
        if (is_exist != -1) {
          shopcart[is_exist].Amount += 1;
        } else {
          let tmp_shopcart_item = Object.assign({}, item);
          tmp_shopcart_item.Amount = 1;
          tmp_shopcart_item.ProductData = this.product_data.filter(
            (product) => product.GoodsID == item.GoodsID
          )[0];
          shopcart.push(tmp_shopcart_item);
        }
      });
      return shopcart;
    },
    trade_no() {
      return this.$route.params.id;
    },
    product_original_price() {
      let total_price = 0;
      this.shopcart.forEach((item) => {
        let price = item.SellPrice > item.Price ? item.SellPrice : item.Price;

        total_price += parseInt(price);
      });
      return total_price;
    },
    product_total_price() {
      if (this.checkout_data == null) {
        return 0;
      }
      return this.checkout_data.DiscountFullTotal;
    },
    ship_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.form_data.outlying
          ? this.checkout_data.ShippingFeeOutlying
          : this.checkout_data.ShippingFee;
      }
    },
    payment_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.checkout_data.PaymentSubtotalFee;
      }
    },
    total_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.checkout_data.FinalTotal;
      }
    },
    coupon_discount() {
      if (this.checkout_data == null) {
        return 0;
      }
      return this.checkout_data.CouponInfo.length != 0
        ? this.checkout_data.DiscountFullTotal -
            this.checkout_data.AfterCouponTotal
        : 0;
    },
    active_shipway() {
      if (this.form_data == null) {
        return '';
      }
      return this.shipway_data.filter(
        (item) => item.ShippingID == this.form_data.ship_way
      )[0].Title;
    },
    active_payment() {
      return this.payment_data.filter(
        (item) => item.PaymentID == this.form_data.pay_way
      )[0].Title;
    },
    get_city_area() {
      return this.zipcode_data.filter(
        (item) => item.ZipCode == this.form_data.ReceiverAddressCode
      )[0];
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
