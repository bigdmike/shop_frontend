<template>
  <main class="relative z-10 w-full min-h-screen overflow-hidden">
    <div
      v-if="checkout_data != null"
      class="relative flex w-full max-w-screen-xl mx-auto"
    >
      <div class="w-full px-5 pb-32 md:w-2/3 xl:pl-0 sm:pl-10 sm:pr-10">
        <BreadCrumb :path="bread_crumb_path" class="mb-20" />
        <ShopCartForm
          :errors="errors"
          :form_data="form_data"
          :shopcart="shopcart"
          :coupon_info="checkout_data.CouponInfo"
          @update-action="UpdateForm"
          @validate="ValidateForm"
          @update-coupon="GetCashier"
        />
      </div>

      <div
        class="fixed top-0 right-0 z-0 hidden w-1/3 h-screen p-12 pt-40 bg-basic_white sm:pt-44 md:block"
      >
        <ShopCart
          :shopcart="shopcart"
          :checkout_data="checkout_data.CheckoutList"
        />
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
            v-if="coupon_discount != 0"
            class="flex items-center justify-between w-full mt-3 text-sm"
          >
            <p class="font-medium">優惠代碼折抵</p>
            <p class="font-semibold">
              - NT$ {{ $MoneyFormat(coupon_discount) }}
            </p>
          </li>
        </ol>
        <div class="flex items-center justify-between w-full text-sm">
          <p class="font-medium">總金額</p>
          <p class="font-semibold">
            NT$
            {{ $MoneyFormat(total_price) }}
          </p>
        </div>
      </div>
    </div>

    <ShopCartFooter
      v-if="checkout_data != null"
      class="block md:hidden"
      :shopcart="shopcart"
      :product_total_price="parseInt(product_total_price)"
      :ship_price="parseInt(ship_price)"
      :payment_price="parseInt(payment_price)"
      :total_price="parseInt(total_price)"
      :checkout_data="checkout_data.CheckoutList"
      :coupon_discount="parseInt(coupon_discount)"
    />
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ShopCartForm from '@/components/shopcart/form.vue';
import ShopCartFooter from '@/components/shopcart/footer.vue';
import ShopCart from '@/components/shopcart/shopcart.vue';
import {
  validName,
  validEmail,
  validPhone,
  validAddress,
} from '@/common/validate';
import { getCashier, SendCheckout } from '@/api/shopcart';
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from '@/common/cookie';
import { SaveShopCart } from '@/common/shopcart';
export default {
  name: 'ShopCartView',
  components: {
    BreadCrumb,
    ShopCartForm,
    ShopCartFooter,
    ShopCart,
  },
  data() {
    return {
      form_data: {
        ship_way: '',
        consignee_first_name: '',
        consignee_last_name: '',
        consignee_email: '',
        consignee_phone: '',
        consignee_city: '',
        consignee_area: '',
        consignee_address: '',
        comment: '',
        pay_way: '',
        outlying: false,
        coupon: '',
        shop_id: '',
        shop_name: '',
        shop_address: '',
      },
      errors: [],
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '結帳',
          link: '/shopcart',
        },
      ],
      checkout_data: null,
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
    UpdateForm(key, val) {
      this.$set(this.form_data, key, val);
      if (key == 'city') {
        this.$set(this.form_data, 'area', '');
      }
      if (key == 'city' || key == 'area') {
        if (
          val == '蘭嶼鄉' ||
          val == '連江縣' ||
          val == '綠島鄉' ||
          val == '澎湖縣' ||
          val == '金門縣'
        ) {
          this.$set(this.form_data, 'outlying', true);
        } else {
          this.$set(this.form_data, 'outlying', false);
        }
      }
      if (key == 'ship_way' || key == 'pay_way') {
        this.GetCashier();
      }
    },
    GetCashier() {
      getCashier(
        this.form_data.coupon,
        this.form_data.pay_way,
        this.form_data.ship_way,
        this.shopcart
      ).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.checkout_data = res.data;
        } else if (res.msg.indexOf('超過物流限制') != -1) {
          this.$store.commit('SetDialog', {
            status: true,
            content:
              '很抱歉！<br/>購物車商品超出物流的積材上限，請選擇其他物流方式或分次下單',
          });
          this.form_data.ship_way = '';
        } else if (res.msg == '現金折抵優惠券錯誤') {
          this.$store.commit('SetDialog', {
            status: true,
            content: '很抱歉！<br/>您所輸入的優惠代碼不存在或已經兌換完畢',
          });
          this.form_data.coupon = '';
        }
      });
    },
    ValidateForm() {
      this.errors = [];
      this.form_data.ship_way == '' ? this.errors.push('ship_way') : '';
      if (
        !validName(
          this.form_data.consignee_last_name +
            this.form_data.consignee_first_name
        )
      ) {
        this.errors.push('consignee_first_name');
        this.errors.push('consignee_last_name');
      }
      !validEmail(this.form_data.consignee_email)
        ? this.errors.push('consignee_email')
        : '';
      !validPhone(this.form_data.consignee_phone)
        ? this.errors.push('consignee_phone')
        : '';
      this.form_data.consignee_city == ''
        ? this.errors.push('consignee_city')
        : '';
      this.form_data.consignee_area == ''
        ? this.errors.push('consignee_area')
        : '';
      !validAddress(this.form_data.consignee_address)
        ? this.errors.push('consignee_address')
        : '';
      this.form_data.pay_way == '' ? this.errors.push('pay_way') : '';

      if (this.errors.length > 0) {
        window.scrollTo(0, 0);
      } else {
        this.SendData();
      }
    },
    SendData() {
      SendCheckout(this.form_data, this.shopcart).then((res) => {
        if (res.code == 200) {
          // trade_data
          setLocalStorage('trade_data', JSON.stringify(this.form_data));
          setLocalStorage('trade_shopcart', JSON.stringify(this.shopcart));
          setLocalStorage(
            'trade_checkout_data',
            JSON.stringify(this.checkout_data)
          );
          SaveShopCart([]);
          this.$store.commit('SetShopCart', []);
          document
            .querySelector('body')
            .insertAdjacentHTML('afterend', res.data.PaymentHTML);
          document.querySelector('#ecpay-form').submit();
        }
      });
    },
  },
  created() {
    if (this.shopcart.length > 0) {
      if (getLocalStorage('check_out_form')) {
        this.form_data = JSON.parse(getLocalStorage('check_out_form'));
        this.form_data.shop_id = this.$route.query.CVSStoreID;
        this.form_data.shop_name = this.$route.query.CVSStoreName;
        this.form_data.shop_address = this.$route.query.CVSAddress;
        delLocalStorage('check_out_form');
      }
      this.GetCashier();
    }
  },
  watch: {
    shopcart() {
      if (this.shopcart.length > 0) {
        this.GetCashier();
      } else {
        this.$store.commit('SetDialog', {
          status: true,
          content: '購物車目前沒有商品',
        });
        this.$router.push('/');
      }
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart;
    },
    product_total_price() {
      if (this.checkout_data == null) {
        return 0;
      }
      return this.checkout_data.DiscountFullTotal;
    },
    shipway_data() {
      return this.$store.state.shipway_data;
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
      // AfterCouponTotal
      // return parseInt(this.product_total_price) + parseInt(this.ship_price);
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
  },
};
</script>
