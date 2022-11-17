<template>
  <main
    class="relative z-10 w-full min-h-screen overflow-hidden"
    v-if="checkout_data != null"
  >
    <div class="relative flex w-full max-w-screen-xl mx-auto">
      <div class="w-full px-5 pb-32 md:w-2/3 xl:pl-0 sm:pl-10 sm:pr-10">
        <BreadCrumb :path="bread_crumb_path" class="mb-20" />
        <ShopCartForm
          :errors="errors"
          :form_data="form_data"
          :shopcart="shopcart"
          :coupon_info="coupon_info"
          @update-action="UpdateForm"
          @validate="ValidateForm"
          @update-coupon="GetCashier"
        />
      </div>

      <div
        class="fixed top-0 right-0 z-0 hidden w-1/3 h-screen p-12 pt-40 bg-basic_white sm:pt-44 md:block"
      >
        <ShopCart :shopcart="shopcart" :checkout_data="checkout_data" />
        <ol class="pb-5 mb-5 border-b border-zinc-300">
          <li class="flex items-center justify-between w-full mb-3 text-sm">
            <p class="font-medium">合計</p>
            <p class="font-semibold">
              NT$ {{ $MoneyFormat(product_total_price) }}
            </p>
          </li>
          <li class="flex items-center justify-between w-full text-sm">
            <p class="font-medium">運費</p>
            <p class="font-semibold">NT$ {{ $MoneyFormat(ship_price) }}</p>
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
      class="block md:hidden"
      :shopcart="shopcart"
      :product_total_price="parseInt(product_total_price)"
      :ship_price="parseInt(ship_price)"
      :total_price="parseInt(total_price)"
      :checkout_data="checkout_data"
      :coupon_info="coupon_info"
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
import { getCashier } from '@/api/shopcart';
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
        contact_first_name: '',
        contact_last_name: '',
        contact_email: '',
        contact_phone: '',
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
      },
      coupon_info: null,
      errors: [],
      checkout_data: null,
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
        if (res.code != 200 && res.msg.indexOf('超過物流限制') != -1) {
          this.$store.commit('SetDialog', {
            status: true,
            content:
              '很抱歉！<br/>購物車商品超出物流的積材上限，請選擇其他物流方式或分次下單',
          });
          this.form_data.ship_way = '';
        } else if (res.code != 200 && res.msg == '現金折抵優惠券錯誤') {
          this.$store.commit('SetDialog', {
            status: true,
            content: '很抱歉！<br/>您所輸入的優惠代碼不存在或已經兌換完畢',
          });
          this.form_data.coupon = '';
          this.coupon_info = null;
        } else {
          this.checkout_data = res.data.CheckoutList;
          res.data.CouponInfo.length <= 0
            ? ''
            : (this.coupon_info = res.data.CouponInfo);
        }
      });
    },
    ValidateForm() {
      this.errors = [];
      if (
        !validName(
          this.form_data.contact_last_name + this.form_data.contact_first_name
        )
      ) {
        this.errors.push('contact_first_name');
        this.errors.push('contact_last_name');
      }
      !validEmail(this.form_data.contact_email)
        ? this.errors.push('contact_email')
        : '';
      !validPhone(this.form_data.contact_phone)
        ? this.errors.push('contact_phone')
        : '';
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
      }
    },
  },
  created() {
    if (this.shopcart.length > 0) {
      this.GetCashier();
    }
  },
  watch: {
    shopcart() {
      if (this.shopcart.length > 0) {
        this.GetCashier();
      }
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart;
    },
    product_total_price() {
      let price = 0;
      this.$store.state.shopcart.forEach((shopcart_item) => {
        const stock = shopcart_item.product_data.Stock.filter(
          (item) =>
            item.ColorID == shopcart_item.active_option[0] &&
            item.SizeID == shopcart_item.active_option[1]
        )[0];
        price += parseInt(stock.SellPrice) * shopcart_item.amount;
      });
      return price;
    },
    shipway_data() {
      return this.$store.state.shipway_data;
    },
    ship_price() {
      if (this.form_data.ship_way == '') {
        return 0;
      } else {
        const ship_way = this.shipway_data.filter(
          (item) => item.ShippingID == this.form_data.ship_way
        )[0];
        return this.form_data.outlying
          ? ship_way.ShippingFeeOutlying
          : ship_way.ShippingFee;
      }
    },
    total_price() {
      return parseInt(this.product_total_price) + parseInt(this.ship_price);
    },
  },
};
</script>
