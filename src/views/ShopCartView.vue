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

          <ShopCart
            :checkout_data="checkout_data.CheckoutList"
            @stop-scroll="$emit('stop-scroll')"
            @start-scroll="$emit('start-scroll')"
          />
          <GiveInfo
            :checkout_data="checkout_data"
            :give_info="checkout_data.GiveInfo"
            :invalid_give_info="checkout_data.GiveInvalidInfo"
            class="block mb-3 md:hidden"
          />
          <ShipFreeInfo
            :checkout_data="checkout_data"
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
          <GiveInfo
            :checkout_data="checkout_data"
            :give_info="checkout_data.GiveInfo"
            :invalid_give_info="checkout_data.GiveInvalidInfo"
            class="mb-5"
          />
          <ShipFreeInfo :checkout_data="checkout_data" />
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
import ShopCartForm from '@/components/checkout/ShopCartForm.vue';
import ShopCart from '@/components/checkout/ShopCartList.vue';
import FixedFooter from '@/components/checkout/FixedFooter.vue';
import GiveInfo from '@/components/checkout/GiveInfo.vue';
import PriceInfo from '@/components/checkout/PriceInfo.vue';
import EmptyShopCart from '@/components/checkout/EmptyShopCart.vue';
import ShipFreeInfo from '@/components/checkout/ShipFreeInfo.vue';
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
    ShipFreeInfo,
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
    // 顯示贈品圖片視窗
    OpenImageDialog(data) {
      this.$refs.GiveImageDialog.Open(data);
    },
    // 點選收件人同購買人時，將購買人資訊複製到收件人欄位
    SetSameBuyer() {
      this.form_data.consignee_first_name = this.form_data.buyer_first_name;
      this.form_data.consignee_last_name = this.form_data.buyer_last_name;
      this.form_data.consignee_phone = this.form_data.buyer_phone;
    },
    // 更新結帳表單資訊
    UpdateForm(key, val) {
      this.$set(this.form_data, key, val);
      // 若更新城市欄位則將地區清空
      if (key == 'city') {
        this.$set(this.form_data, 'area', '');
      }
      // 若更新城市或是地區則重新判斷地址是否在外島
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
      // 若更新付款方式或物流方式則重新取得結帳資料
      if (key == 'ship_way' || key == 'pay_way') {
        this.GetCashier();
      }
      // 如果第一次更新物流方式則觸發GA4電子商務事件『選擇配送方式』
      if (key == 'ship_way' && this.first_choose_shipping) {
        this.first_choose_shipping = false;
        this.AddShipInfo();
      }
      // 如果第一次更新付款方式則觸發GA4電子商務事件『選擇付款方式』
      if (key == 'pay_way' && this.first_choose_payment) {
        this.first_choose_payment = false;
        this.AddPaymentInfo();
      }
    },
    // 取得結帳資訊API
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
            // 第一次呼叫時，觸發GA4 電子商務事件『開始結帳』
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
          }
          // 判斷各種錯誤訊息，開啟系統訊息顯示，如果發生無法結帳的錯誤則返回首頁
          else if (res.msg.indexOf('超過物流限制') != -1) {
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
        });
      }
    },
    // 驗證結帳表單
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
    // 送出結帳
    SendData() {
      SendCheckout(this.form_data, this.shopcart).then((res) => {
        if (res.code == 200) {
          // 將結帳資訊與購物車資訊暫存至LocalStorage
          setLocalStorage('trade_data', JSON.stringify(this.form_data));
          setLocalStorage('trade_shopcart', JSON.stringify(this.shopcart));
          setLocalStorage(
            'trade_checkout_data',
            JSON.stringify(this.checkout_data)
          );
          // 若付款方式為PCHome則直接轉跳到回傳的網址
          if (
            this.checkout_data.PaymentInfo.PaymentType == 'PCHomeCredit' ||
            this.checkout_data.PaymentInfo.PaymentType == 'PCHomeATM'
          ) {
            window.location.replace(res.data.PaymentHTML);
          }
          // 若是綠界則新增form至body並觸發submit轉跳
          else {
            document
              .querySelector('body')
              .insertAdjacentHTML('afterend', res.data.PaymentHTML);
            document.querySelector('#ecpay-form').submit();
          }
        }
      });
    },
    // GA4電子商務事件『新增收貨資訊』
    AddShipInfo() {
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
    // GA4電子商務事件『新增付款資訊』
    AddPaymentInfo() {
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
    // 如果有登入會員則將購買人資料自動填入會員資料
    GetAccountData() {
      if (getLocalStorage('account_token')) {
        getAccountInfo().then((res) => {
          if (res.code == 302) {
            // token過期，轉跳至登入畫面
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
    // 設定超商取貨資訊
    SetCVSData() {
      if (getLocalStorage('check_out_form')) {
        // 從LocalStorage讀取結帳資訊
        this.form_data = JSON.parse(getLocalStorage('check_out_form'));
        // 若URL QUERY有帶入MerchantID則填入超商門市資訊
        if (this.$route.query.MerchantID) {
          this.form_data.shop_id = this.$route.query.CVSStoreID;
          this.form_data.shop_name = this.$route.query.CVSStoreName;
          this.form_data.shop_address = this.$route.query.CVSAddress;
        }
        // 刪除本地暫存結帳資料
        delLocalStorage('check_out_form');
      }
    },
    // 取得商品價錢
    GetPrice(shop_cart_item, active_option) {
      // 一般商品，讀取Stock資料 DiscountPrice
      if (shop_cart_item.IsCustom == 'N') {
        const checkout_item = this.checkout_data.CheckoutList.filter((item) => {
          return (
            item.GoodsID == shop_cart_item.GoodsID &&
            item.ColorID == active_option[0] &&
            item.SizeID == active_option[1]
          );
        });
        return checkout_item[0].DiscountPrice;
      }
      // 客製化商品，讀取CustomGoodsStock資料
      else {
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
    // 初始化
    PageInit() {
      // 取得會員資訊
      this.GetAccountData();
      // 取得超商門市資訊
      this.SetCVSData();

      // 若購物車不為空則呼叫取得結帳資訊
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
      // 當購物車抽屜關閉時，因為有可能有調整過商品數量所以重新取得結帳資訊
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
    // 取得商品原始價格加總
    product_total_price() {
      if (this.checkout_data == null) {
        return 0;
      }
      let price = 0;
      this.checkout_data.CheckoutList.forEach((item) => {
        price += parseInt(item.SellPrice);
      });
      return price;
    },
    // 取得優惠價與原價價差
    discount_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.product_total_price - this.checkout_data.DiscountFullTotal;
      }
    },
    // 取得運費
    ship_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        // 判斷本島外島
        return this.form_data.outlying
          ? this.checkout_data.ShippingFeeOutlying
          : this.checkout_data.ShippingFee;
      }
    },
    // 取得金流手續費
    payment_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.checkout_data.PaymentSubtotalFee;
      }
    },
    // 取得結帳總金額
    total_price() {
      if (this.checkout_data == null) {
        return 0;
      } else {
        return this.checkout_data.FinalTotal;
      }
    },
    // 取得優惠券折扣金額
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
  // 離開頁面前先將結帳資訊儲存至本地，下次返回時可以繼續結帳
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
