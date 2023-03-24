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
              NT$ {{ $MoneyFormat(product_total_price) }}
            </p>
          </li>
          <li class="flex items-center justify-between text-sm w-ful">
            <p class="font-medium">運費</p>
            <p class="font-semibold font-anybody">
              NT$ {{ $MoneyFormat(ship_price) }}
            </p>
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
import ProductCard from '@/components/trade_finish/product_card.vue';
import CustomProductCard from '@/components/trade_finish/custom_product_card.vue';
// delLocalStorage
import { getLocalStorage } from '@/common/cookie';
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
    GetActiveOption(shopcart_item) {
      return shopcart_item.product_data.Stock.filter((item) => {
        return (
          item.ColorID == shopcart_item.active_option[0] &&
          item.SizeID == shopcart_item.active_option[1]
        );
      })[0];
    },
    GetDiscountAndPrice(item) {
      let product = this.checkout_data.CheckoutList.filter((checkout_item) => {
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
    SendPurchase() {
      // GTM事件
      let products = [];
      this.shopcart.forEach((item) => {
        console.log(item.CustomSpecID);
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
      if (this.$route.params.id && trade_data && checkout_data) {
        this.form_data =
          JSON.parse(trade_data).length == 1
            ? JSON.parse(trade_data)[0]
            : JSON.parse(trade_data);
        this.checkout_data = JSON.parse(checkout_data);
        // delLocalStorage('trade_data');
        // delLocalStorage('trade_checkout_data');
        this.SendPurchase();
        this.$store.commit('shopcart_module/SetShopCart', []);
        this.meta_data = GetMetaData('訂單完成', '', '');
        this.$nextTick(() => {
          this.$PageReady(this.meta_data.title);
        });
      } else {
        // this.$router.push('/');
      }
    },
  },
  watch: {
    data_load_finish() {
      this.data_load_finish ? this.$emit('load-image') : '';
    },
    image_loaded() {
      this.image_loaded ? this.PageInit() : '';
    },
  },
  computed: {
    ...mapState([
      'shipway_data',
      'payment_data',
      'image_loaded',
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
      console.log(this.shipway_data, this.form_data.ship_way);
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
  mounted() {
    this.$emit('page-mounted');
  },
  created() {
    this.image_loaded ? this.PageInit() : '';
    this.data_load_finish ? this.$emit('load-image') : '';
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
