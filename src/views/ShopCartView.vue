<template>
  <main
    id="ShopcartContainer"
    data-scroll-section
    class="relative z-10 w-full min-h-screen bg-bg_black"
  >
    <div v-if="data_load_finish" class="relative z-10 w-full">
      <div
        v-if="checkout_data != null"
        class="relative flex w-full max-w-screen-xl pt-24 pb-20 mx-auto md:pt-40"
      >
        <!-- left side view -->
        <div
          class="w-full px-5 pt-5 pb-32 md:w-2/3 xl:pl-0 sm:pl-10 sm:pr-10 xs:pt-0"
        >
          <BreadCrumb :path="bread_crumb_path" class="mb-10 sm:mb-20" />
          <header
            class="relative z-10 flex flex-col-reverse items-start w-full mb-10"
          >
            <h2 class="relative inline-block px-8">
              <span
                data-section-subtitle-arrow
                class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
              ></span>
              <span
                data-section-subtitle
                class="block font-bold leading-none text-white md:leading-none"
                >結帳</span
              >
              <span
                data-section-subtitle-arrow
                class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
              ></span>
            </h2>
            <h3 class="mb-2 overflow-hidden">
              <span
                data-section-title
                data-text="About Us"
                class="block text-4xl font-black text-basic_gray text-opacity-20 font-anybody"
              >
                Check Out
              </span>
            </h3>
          </header>

          <ShopCart :checkout_data="checkout_data.CheckoutList" />
          <GiveInfo
            :give_info="checkout_data.GiveInfo"
            class="block mb-5 md:hidden"
          />
          <ShopCartForm
            :errors="errors"
            :form_data="form_data"
            :checkout_data="checkout_data"
            :coupon_info="checkout_data.CouponInfo"
            @set-samebuyer="SetSameBuyer"
            @update-action="UpdateForm"
            @validate="ValidateForm"
            @update-coupon="GetCashier"
          />
        </div>
      </div>
      <!-- left side view -->

      <!-- right side view -->
      <div
        v-if="checkout_data != null"
        data-scroll
        data-scroll-sticky
        data-scroll-target="#ShopcartContainer"
        class="absolute top-0 right-0 z-0 hidden w-1/3 h-screen pt-40 pb-20 overflow-y-auto custom_scroll bg-basic_black sm:pt-44 md:block"
        @mouseover="$emit('stop-scroll')"
        @mouseleave="$emit('start-scroll')"
      >
        <div class="px-10">
          <GiveInfo :give_info="checkout_data.GiveInfo" class="mb-5" />
          <PriceInfo
            :coupon_discount="parseInt(coupon_discount)"
            :product_total_price="parseInt(product_total_price)"
            :ship_price="parseInt(ship_price)"
            :shipping_free="checkout_data.ShippingFree"
            :payment_price="parseInt(payment_price)"
            :discount_price="parseInt(discount_price)"
            :total_price="parseInt(total_price)"
          />
        </div>
      </div>
      <!-- right side view -->

      <EmptyShopCart v-if="checkout_data == null" />

      <FixedFooter
        v-if="checkout_data != null"
        class="block md:hidden"
        :product_total_price="parseInt(product_total_price)"
        :ship_price="parseInt(ship_price)"
        :shipping_free="checkout_data.ShippingFree"
        :payment_price="parseInt(payment_price)"
        :discount_price="parseInt(discount_price)"
        :total_price="parseInt(total_price)"
        :coupon_discount="parseInt(coupon_discount)"
        :give_info="checkout_data.GiveInfo"
        @stop-scroll="$emit('stop-scroll')"
        @start-scroll="$emit('start-scroll')"
        @open-image-dialg="OpenImageDialog"
      />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ShopCartForm from '@/components/shopcart/ShopCartForm.vue';
import FixedFooter from '@/components/shopcart/FixedFooter.vue';
import ShopCart from '@/components/shopcart/ShopCartList.vue';
import GiveInfo from '@/components/checkout/GiveInfo.vue';
import PriceInfo from '@/components/checkout/PriceInfo.vue';
import EmptyShopCart from '@/components/checkout/EmptyShopCart.vue';
import {
  validName,
  validEmail,
  validPhone,
  validAddress,
} from '@/common/validate';
import { getAccountInfo } from '@/api/member';
import { getCashier, SendCheckout } from '@/api/shopcart';
import {
  getLocalStorage,
  setLocalStorage,
  delLocalStorage,
} from '@/common/cookie';
import { GetMetaData } from '@/common/meta';
import { ConvertAddShopCartData } from '@/common/gtm_methods';
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'ShopCartView',
  components: {
    BreadCrumb,
    ShopCartForm,
    FixedFooter,
    ShopCart,
    GiveInfo,
    PriceInfo,
    EmptyShopCart,
  },
  data() {
    return {
      form_data: {
        ship_way: '',
        consignee_first_name: '', //收件人姓名
        consignee_last_name: '', //收件人姓名
        consignee_phone: '', //收件人電話
        consignee_city: '', //收件人地址
        consignee_area: '', //收件人地址
        consignee_address: '', //收件人地址
        consignee_email: '', //購買人信箱
        buyer_first_name: '', //購買人姓名
        buyer_last_name: '', //購買人姓名
        buyer_phone: '', //收購買人電話
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
      shop_cart_first_load: false,
      meta_data: null,
      first_enter: true,
      first_choose_shipping: true,
      first_choose_payment: true,
    };
  },
  methods: {
    OpenImageDialog(data) {
      this.$refs.GiveImageDialog.Open(data);
    },
    SetSameBuyer() {
      this.form_data.consignee_first_name = this.form_data.buyer_first_name;
      this.form_data.consignee_last_name = this.form_data.buyer_last_name;
      this.form_data.consignee_phone = this.form_data.buyer_phone;
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
      if (key == 'ship_way' && this.first_choose_shipping) {
        this.first_choose_shipping = false;
        this.AddShipInfo();
      }
      if (key == 'pay_way' && this.first_choose_payment) {
        this.first_choose_payment = false;
        this.AddPaymentInfo();
      }
    },
    GetCashier() {
      if (this.shopcart.length > 0) {
        getCashier(
          this.form_data.coupon,
          this.form_data.pay_way,
          this.form_data.ship_way,
          this.shopcart
        ).then((res) => {
          if (res.code == 200) {
            this.checkout_data = res.data;
            if (this.first_enter) {
              this.first_enter = false;
              // GTM事件
              let products = [];
              this.shopcart.forEach((item) => {
                const product = ConvertAddShopCartData(
                  item.product_data,
                  item.active_option,
                  1,
                  this.GetPrice(item.product_data, item.active_option)
                );
                products.push(product);
              });
              window.dataLayer.push({
                event: 'beginCheckout',
                items: products,
                value: 0,
                currency: 'TWD',
              });
            }
          } else if (res.msg.indexOf('超過物流限制') != -1) {
            this.$store.commit('SetDialog', {
              status: true,
              content: `很抱歉！<br/>購物車商品超出可運送範圍，您可以分次下單<br/>如需訂購大量商品請<a class="text-primary" href="${this.$GetColumn(
                'company_messenger'
              )}" target="_blank">聯絡我們</a>`,
            });
            this.form_data.ship_way = '';
          } else if (res.msg == '現金折抵優惠券錯誤') {
            this.$store.commit('SetDialog', {
              status: true,
              content: '很抱歉！<br/>您所輸入的優惠代碼不存在或已經兌換完畢',
            });
            this.form_data.coupon = '';
          } else if (res.msg.indexOf('已無庫存') != -1) {
            this.$store.commit('SetDialog', {
              status: true,
              content: `很抱歉！<br/><b class="text-primary">${res.msg}</b><br/>請先將商品移除後再次結帳`,
            });
            this.$router.push('/');
          } else if (res.msg.indexOf('庫存數量不足') != -1) {
            const product_name = res.msg.split('庫存數量不足')[0];
            const count = res.msg.split('庫存數量不足:')[1];
            this.$store.commit('SetDialog', {
              status: true,
              content: `很抱歉！<br/><b class="text-primary">${product_name}<br/>目前庫存剩餘${count}</b><br/>請先移除超出的數量後再次結帳`,
            });
            this.$router.push('/');
          } else if (res.msg.indexOf('庫存為關閉狀態') != -1) {
            const product_name = res.msg.split('庫存為關閉狀態')[0];
            this.$store.commit('SetDialog', {
              status: true,
              content: `很抱歉！<br/><b class="text-primary">${product_name}<br/>目前所選擇的規格已無庫存</b><br/>請先移除超出的數量後再次結帳`,
            });
            this.$router.push('/');
          }
          //
        });
      }
    },
    ValidateForm() {
      this.errors = [];
      this.form_data.ship_way == '' ? this.errors.push('ship_way') : '';

      if (
        !validName(
          this.form_data.buyer_last_name + this.form_data.buyer_first_name
        )
      ) {
        this.errors.push('buyer_first_name');
        this.errors.push('buyer_last_name');
      }
      !validPhone(this.form_data.buyer_phone)
        ? this.errors.push('buyer_phone')
        : '';

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
          setLocalStorage('trade_data', JSON.stringify(this.form_data));
          setLocalStorage('trade_shopcart', JSON.stringify(this.shopcart));
          setLocalStorage(
            'trade_checkout_data',
            JSON.stringify(this.checkout_data)
          );
          // this.$store.commit('shopcart_module/SetShopCart', []);
          if (
            this.checkout_data.PaymentInfo.PaymentType == 'PCHomeCredit' ||
            this.checkout_data.PaymentInfo.PaymentType == 'PCHomeATM'
          ) {
            window.location.replace(res.data.PaymentHTML);
          } else {
            document
              .querySelector('body')
              .insertAdjacentHTML('afterend', res.data.PaymentHTML);
            document.querySelector('#ecpay-form').submit();
          }
        }
      });
    },
    AddShipInfo() {
      // GTM事件
      const shipway = this.shipway_data.filter(
        (item) => item.ShippingID == this.form_data.ship_way
      )[0];
      let products = [];
      this.shopcart.forEach((item) => {
        const product = ConvertAddShopCartData(
          item.product_data,
          item.active_option,
          item.amount
        );
        products.push(product);
      });
      window.dataLayer.push({
        event: 'addShippingInfo',
        items: products,
        value: 0,
        currency: 'TWD',
        shipping: this.ship_price,
        shipping_tier: shipway.Title,
      });
    },
    AddPaymentInfo() {
      // GTM事件
      const payment_type = this.payment_data.filter(
        (item) => item.PaymentID == this.form_data.pay_way
      )[0];
      let products = [];
      this.shopcart.forEach((item) => {
        const product = ConvertAddShopCartData(
          item.product_data,
          item.active_option,
          item.amount
        );
        products.push(product);
      });
      window.dataLayer.push({
        event: 'addPaymentInfo',
        items: products,
        value: 0,
        currency: 'TWD',
        payment_type: payment_type.Title,
      });
    },
    GetAccountData() {
      if (getLocalStorage('account_token')) {
        getAccountInfo().then((res) => {
          if (res.code == 302) {
            // token過期
            this.$router.push('/account/login');
          } else {
            this.form_data.consignee_email = res.data.Account;
            this.form_data.buyer_first_name = res.data.Name.slice(1);
            this.form_data.buyer_last_name = res.data.Name[0];
            this.form_data.buyer_phone = res.data.Phone;
          }
        });
      }
    },
    SetCVSData() {
      if (getLocalStorage('check_out_form')) {
        this.form_data = JSON.parse(getLocalStorage('check_out_form'));

        // ?MerchantID=2000933&MerchantTradeNo=miGQA1678428295&LogisticsSubType=UNIMARTC2C&CVSStoreID=131386&CVSStoreName=建盛門市&CVSAddress=新竹市東區建中一路52號1樓&CVSTelephone=&CVSOutSide=0&ExtraData=
        if (this.$route.query.MerchantID) {
          this.form_data.shop_id = this.$route.query.CVSStoreID;
          this.form_data.shop_name = this.$route.query.CVSStoreName;
          this.form_data.shop_address = this.$route.query.CVSAddress;
        }
        delLocalStorage('check_out_form_');
      }
    },
    GetPrice(shop_cart_item, active_option) {
      if (shop_cart_item.IsCustom == 'N') {
        // 一般商品，讀取Stock資料 DiscountPrice
        const checkout_item = this.checkout_data.CheckoutList.filter((item) => {
          return (
            item.GoodsID == shop_cart_item.GoodsID &&
            item.ColorID == active_option[0] &&
            item.SizeID == active_option[1]
          );
        });
        return checkout_item[0].DiscountPrice;
      } else {
        // 客製化商品，讀取CustomGoodsStock資料
        const spec_text = active_option.join();
        const checkout_item = this.checkout_data.CheckoutList.filter((item) => {
          return (
            item.GoodsID == shop_cart_item.GoodsID &&
            item.CustomSpecID == spec_text
          );
        });
        return checkout_item[0].DiscountPrice;
      }
    },
    PageInit() {
      this.GetAccountData();
      this.SetCVSData();

      if (this.shopcart.length > 0) {
        this.GetCashier();
      }

      this.meta_data = GetMetaData('結帳', '', '');
      this.$nextTick(() => {
        this.$emit('load-image');
        this.$PageReady(this.meta_data.title);
        this.$emit('page-mounted');
      });
    },
  },

  watch: {
    shopcart() {
      if (!this.shop_cart_first_load) {
        this.shop_cart_first_load = true;
        this.GetCashier();
      }
      if (this.shopcart.length <= 0) {
        this.checkout_data = null;
      }
    },
    shopcart_drawer() {
      if (!this.shopcart_drawer) {
        this.GetCashier();
      }
    },
    data_load_finish() {
      this.data_load_finish ? this.PageInit() : '';
    },
  },
  computed: {
    ...mapGetters(['data_load_finish']),
    ...mapState({
      shopcart_drawer: 'shopcart_drawer',
      shopcart: (state) => state.shopcart_module.shopcart,
      payment_data: 'payment_data',
      shipway_data: 'shipway_data',
    }),
    product_total_price() {
      // 返回商品原始價格加總
      if (this.checkout_data == null) {
        return 0;
      }
      let price = 0;
      this.checkout_data.CheckoutList.forEach((item) => {
        if (item.MemberSellPrice) {
          price += parseInt(item.MemberSellPrice);
        } else {
          price += parseInt(item.SellPrice);
        }
      });
      return price;
    },
    discount_price() {
      // 返回優惠價與原價價差
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.product_total_price - this.checkout_data.DiscountFullTotal;
      }
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
  },
  beforeRouteLeave(to, from, next) {
    setLocalStorage('check_out_form', JSON.stringify(this.form_data));
    next();
  },
  created() {
    this.data_load_finish ? this.PageInit() : '';
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
