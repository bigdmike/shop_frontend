<template>
  <section class="w-full">
    <AddressDialog @update-action="UpdateAddress" ref="AddressDialog" />
    <div class="mb-5">
      <h4 class="text-2xl font-bold text-white">配送方式</h4>
    </div>
    <div
      v-if="shipway_data.length > 0"
      class="pb-5 mb-6 border-b border-zinc-300"
    >
      <div class="relative">
        <span
          class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
        ></span>
        <select
          :value="form_data.ship_way"
          @input="UpdateForm('ship_way', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 pr-10 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
        >
          <option class="bg-basic_gray" value="">選擇配送方式</option>
          <option
            v-for="(item, item_index) in shipway_data"
            :value="item.ShippingID"
            :key="`ship_way_${item_index}`"
            class="bg-basic_gray"
          >
            {{ item.Title }}(運費：NT${{
              form_data.outlying ? item.ShippingFeeOutlying : item.ShippingFee
            }})
          </option>
        </select>
      </div>
      <p v-if="GetError('ship_way')" class="text-xs text-red-600">
        請選擇配送方式
      </p>
      <div
        v-if="form_data.ship_way == 1 || form_data.ship_way == 2"
        class="relative mt-3"
      >
        <div class="w-full p-3 mb-3 rounded-md bg-basic_gray bg-opacity-20">
          <p v-if="form_data.shop_name == ''" class="text-sm text-white">
            尚未選擇門市
          </p>
          <p v-else class="text-sm text-white">
            您已選擇門市：<b class="text-base font-bold text-white">{{
              form_data.shop_name
            }}</b
            >・{{ form_data.shop_address }}
          </p>
        </div>
        <button
          @click="GetShopMap"
          class="px-5 py-2 text-white rounded-lg bg-primary"
        >
          {{ form_data.shop_id == '' ? '選擇取貨門市' : '重新選擇取貨門市' }}
        </button>
      </div>
      <template v-if="form_data.ship_way == 1 || form_data.ship_way == 2">
        <p v-if="GetError('ship_way')" class="text-xs text-red-600">
          請選擇配送方式
        </p>
      </template>
    </div>
    <p v-else class="mb-10 text-sm text-red-700">
      沒有可用的配送方式！<br />
      您購物車中的商品尺寸或重量總和超過可運送的範圍，請分次下單結帳謝謝！
    </p>
    <!-- buyer -->

    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold text-white">購買人資訊</h4>
      <p class="text-sm text-basic_gray" v-if="!member_login">
        已經有帳戶？
        <router-link class="text-primary" to="/account/login">登入</router-link>
      </p>
    </div>
    <div class="flex flex-wrap items-center mb-6 -mx-2">
      <div class="w-full px-2 mb-4 md:w-1/2">
        <input
          type="text"
          name="first_name"
          :value="form_data.buyer_first_name"
          @input="UpdateForm('buyer_first_name', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="名字"
        />
        <p v-if="GetError('buyer_first_name')" class="text-xs text-red-600">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-full px-2 mb-4 md:w-1/2">
        <input
          type="text"
          name="last_name"
          :value="form_data.buyer_last_name"
          @input="UpdateForm('buyer_last_name', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="姓氏"
        />
        <p v-if="GetError('buyer_last_name')" class="text-xs text-red-600">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="email"
          name="email"
          :value="form_data.consignee_email"
          @input="UpdateForm('consignee_email', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="電子郵件"
        />
        <p v-if="GetError('consignee_email')" class="text-xs text-red-600">
          請輸入正確的電子郵件
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="tel"
          name="phone"
          :value="form_data.buyer_phone"
          @input="UpdateForm('buyer_phone', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="手機號碼"
        />
        <p v-if="GetError('buyer_phone')" class="text-xs text-red-600">
          請輸入正確的手機號碼
        </p>
      </div>
      <div class="w-full px-2">
        <span class="block w-full border-b border-zinc-300"></span>
      </div>
    </div>
    <!-- buyer -->

    <!-- resiver -->
    <div class="flex flex-wrap items-center justify-between mb-5">
      <h4 class="mb-5 text-2xl font-bold text-white sm:mb-0">收件人資訊</h4>
      <div class="flex items-center w-full sm:w-auto">
        <button
          @click="$emit('set-samebuyer')"
          class="px-3 py-2 mr-2 text-xs text-white transition-colors duration-200 rounded-full xs:px-5 xs:text-sm bg-primary hover:bg-opacity-70"
        >
          同購買人
        </button>
        <button
          @click="OpenAddressDialog"
          v-if="member_login"
          class="px-3 py-2 text-xs text-white transition-colors duration-200 rounded-full xs:px-5 xs:text-sm bg-primary hover:bg-opacity-70"
        >
          選擇常用收件資訊
        </button>
      </div>
    </div>
    <div class="flex flex-wrap items-center mb-6 -mx-2">
      <div class="w-full px-2 mb-4 md:w-1/2">
        <input
          type="text"
          name="first_name"
          :value="form_data.consignee_first_name"
          @input="UpdateForm('consignee_first_name', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="名字"
        />
        <p v-if="GetError('consignee_first_name')" class="text-xs text-red-600">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-full px-2 mb-4 md:w-1/2">
        <input
          type="text"
          name="last_name"
          :value="form_data.consignee_last_name"
          @input="UpdateForm('consignee_last_name', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="姓氏"
        />
        <p v-if="GetError('consignee_last_name')" class="text-xs text-red-600">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="tel"
          name="phone"
          :value="form_data.consignee_phone"
          @input="UpdateForm('consignee_phone', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="手機號碼"
        />
        <p v-if="GetError('consignee_phone')" class="text-xs text-red-600">
          請輸入正確的手機號碼
        </p>
      </div>
      <div class="w-full px-2 mb-4 md:w-1/2">
        <div class="relative rounded-md">
          <label class="absolute z-10 text-xs top-2 left-4 text-basic_gray"
            >縣市</label
          >
          <span
            class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
          ></span>
          <select
            :value="form_data.consignee_city"
            @input="UpdateForm('consignee_city', $event.target.value)"
            class="relative z-0 w-full px-4 py-3 pt-6 pr-10 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          >
            <option value="">選擇縣市</option>
            <option v-for="item in city_list" :key="item">{{ item }}</option>
          </select>
        </div>
        <p v-if="GetError('consignee_city')" class="text-xs text-red-600">
          請選擇縣市
        </p>
      </div>
      <div class="w-full px-2 mb-4 md:w-1/2">
        <div class="relative rounded-md">
          <span
            class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
          ></span>
          <label class="absolute z-10 text-xs top-2 left-4 text-basic_gray"
            >鄉鎮區域</label
          >
          <select
            :value="form_data.consignee_area"
            @input="UpdateForm('consignee_area', $event.target.value)"
            class="relative z-0 w-full px-4 py-3 pt-6 pr-10 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          >
            <option value="">選擇區域</option>
            <option v-for="item in area_list" :key="item">{{ item }}</option>
          </select>
        </div>
        <p v-if="GetError('consignee_area')" class="text-xs text-red-600">
          請選擇區域
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="text"
          name="address"
          :value="form_data.consignee_address"
          @input="UpdateForm('consignee_address', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="詳細地址"
        />
        <p v-if="GetError('consignee_address')" class="text-xs text-red-600">
          請輸入地址
        </p>
      </div>
      <div class="w-full px-2">
        <span class="block w-full border-b border-zinc-300"></span>
      </div>
    </div>
    <!-- resiver -->
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold text-white">訂單備註</h4>
    </div>
    <div class="flex flex-wrap items-center mb-6 -mx-2">
      <div class="w-full px-2 mb-4">
        <textarea
          name="comment"
          :value="form_data.comment"
          @input="UpdateForm('comment', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary min-h-[150px]"
          placeholder="留言"
        ></textarea>
      </div>
    </div>
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold text-white">優惠代碼</h4>
    </div>
    <div class="flex flex-wrap items-center mb-6 -mx-2">
      <div class="flex items-stretch w-full px-2">
        <input
          type="text"
          name="coupon"
          :value="form_data.coupon"
          @input="UpdateForm('coupon', $event.target.value)"
          class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          placeholder="請輸入優惠代碼"
        />
        <button
          @click="$emit('update-coupon')"
          class="flex-shrink-0 px-5 py-2 ml-3 text-white rounded-lg bg-primary"
        >
          確認
        </button>
      </div>
    </div>
    <div
      v-if="coupon_info.length != 0"
      class="flex flex-wrap items-center mb-6"
    >
      <div class="w-full p-5 bg-green-500 rounded-xl bg-opacity-20">
        <p class="text-xs text-green-500">已套用優惠代碼：</p>
        <h4 class="mb-2 text-2xl font-bold text-white">
          {{ coupon_info.Title }}
        </h4>
        <p class="text-sm text-white">
          訂單滿額NT$ {{ coupon_info.Threshold }}，折抵NT$
          {{ coupon_info.Money }}
        </p>
      </div>
    </div>
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold text-white">付款方式</h4>
    </div>
    <div class="flex flex-wrap items-center mb-6">
      <ol class="w-full rounded-lg bg-basic_black">
        <li
          v-for="(item, item_index) in payment_data"
          :key="`payment_${item_index}`"
        >
          <label
            @click="UpdateForm('pay_way', item.PaymentID)"
            :class="
              item_index != payment_data.length - 1
                ? 'border-b border-zinc-300 border-opacity-5'
                : ''
            "
            class="block px-4 py-3 transition-colors duration-200 hover:bg-primary hover:bg-opacity-10"
          >
            <input
              type="radio"
              class="mr-3 checked:accent-primary"
              :checked="item.PaymentID == form_data.pay_way"
            />
            <span
              :class="
                item.PaymentID == form_data.pay_way
                  ? 'text-primary'
                  : 'text-basic_gray'
              "
              class="text-sm xs:text-base"
              >{{ item.Title }} (手續費: {{ GetPayemntFee(item) }})</span
            >
          </label>
        </li>
      </ol>
      <p v-if="GetError('pay_way')" class="text-xs text-red-600">
        請選擇付款方式
      </p>
      <span class="block w-full mt-5 border-b border-zinc-300"></span>
    </div>
    <div class="">
      <p class="mb-5 text-sm text-white xs:text-base">
        提交訂單表示同意 <b class="text-white">Krace凱鋭斯</b> 的<a
          class="text-primary"
          >服務條款</a
        >、<a class="text-primary">隱私政策</a>和<a class="text-primary"
          >退貨政策</a
        >
      </p>
      <button
        @click="Validate"
        class="block w-full py-3 font-bold text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-75"
      >
        立即下單
      </button>
    </div>
  </section>
</template>

<script>
import AddressDialog from '@/components/checkout/AddressDialog.vue';
import { getLocalStorage, setLocalStorage } from '@/common/cookie';
import { Get711Map, GetFamilyMap } from '@/api/shopcart';
export default {
  name: 'ShopCartForm',
  props: {
    form_data: {
      require: true,
      type: Object,
    },
    errors: {
      require: true,
      type: Array,
    },
    coupon_info: {
      require: true,
    },
    checkout_data: {
      require: true,
      type: Object,
    },
  },
  components: {
    AddressDialog,
  },
  data() {
    return {
      member_login: false,
    };
  },
  methods: {
    UpdateForm(key, val) {
      // 選擇7-11物流
      if (key == 'ship_way' && val == 2) {
        this.$emit('update-action', 'pay_way', 5);
      }
      // 選擇全家物流
      else if (key == 'ship_way' && val == 1) {
        this.$emit('update-action', 'pay_way', 4);
      }
      this.$emit('update-action', key, val);
    },
    UpdateAddress(data) {
      Object.keys(data).forEach((key) => {
        this.UpdateForm(key, data[key]);
      });
    },
    Validate() {
      this.$emit('validate');
    },
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    OpenAddressDialog() {
      this.$refs.AddressDialog.Open();
    },
    GetPayemntFee(item) {
      if (item.ChargePercent == 0) {
        return `NT$${item.ChargeFee}`;
      } else {
        return `${item.ChargePercent}%`;
      }
    },
    GetShopMap() {
      // 將目前資訊存入 localstorage
      setLocalStorage('check_out_form', JSON.stringify(this.form_data));
      // 呼叫超商地圖
      if (this.form_data.ship_way == 2) {
        Get711Map().then((res) => {
          document
            .querySelector('body')
            .insertAdjacentHTML('afterend', res.data.PaymentHTML);
          document.querySelector('#ecpay-form').submit();
        });
      }
      if (this.form_data.ship_way == 1) {
        GetFamilyMap().then((res) => {
          document
            .querySelector('body')
            .insertAdjacentHTML('afterend', res.data.PaymentHTML);
          document.querySelector('#ecpay-form').submit();
        });
      }
    },
  },
  watch: {
    shipway_data() {
      // 如果積材超出所有物流方式則顯示錯誤訊息，並轉跳回首頁
      if (this.shipway_data.length <= 0) {
        this.$router.push('/');
        this.$store.commit('SetDialog', {
          status: true,
          content: `很抱歉！<br/>購物車商品超出可運送範圍，您可以分次下單<br/>如需訂購大量商品請<a class="text-primary" href="${this.$GetColumn(
            'company_messenger'
          )}" target="_blank">聯絡我們</a>`,
        });
      }
    },
  },
  computed: {
    // 取得物流方式
    shipway_data() {
      let shipway_list = JSON.parse(
        JSON.stringify(this.$store.state.shipway_data)
      );
      // 如果目前商品中有低溫商品，則過濾出所有低溫物流
      if (this.has_forzen_product) {
        shipway_list = shipway_list.filter(
          (item) => item.DeliveryFrozen == 'Y'
        );
      }
      // 如果目前商品中沒有低溫商品，則過濾出所有非低溫物流
      else {
        shipway_list = shipway_list.filter(
          (item) => item.DeliveryFrozen == 'N'
        );
      }
      // 過濾出積材上限比目前購物車積材總合高的物流
      shipway_list = shipway_list.filter(
        (item) =>
          item.DeliverVolumeMax >= this.checkout_data.TotalDeliverVolume &&
          item.DeliverWeightMax >= this.checkout_data.TotalDeliverWeight
      );
      return shipway_list;
    },
    // 取得付款方式
    payment_data() {
      // 如果選擇 7-11物流則只能選 7-11取貨付款
      if (this.form_data.ship_way == 2) {
        return this.$store.state.payment_data.filter(
          (item) => item.PaymentID == 5
        );
      }
      // 如果選擇 全家物流則只能選 全家取貨付款
      else if (this.form_data.ship_way == 1) {
        return this.$store.state.payment_data.filter(
          (item) => item.PaymentID == 4
        );
      } else {
        return this.$store.state.payment_data.filter(
          (item) => item.PaymentID != 5 && item.PaymentID != 4
        );
      }
    },
    // 縣市、郵遞區號資料
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
    // 取得城市資料
    city_list() {
      let city = [];
      this.zipcode_data.forEach((item) => {
        let if_exist = city.indexOf(item.City) != -1;
        if (!if_exist) {
          city.push(item.City);
        }
      });
      return city;
    },
    // 取得目前選擇縣市底下的所有區域
    area_list() {
      // 若城市還未選取，則回傳空陣列
      if (this.form_data.consignee_city == '') {
        return [];
      }
      // 過濾目前城市底下的所有區域
      else {
        let area_list = [];
        this.zipcode_data.forEach((item) => {
          if (item.City == this.form_data.consignee_city) {
            area_list.push(item.Area);
          }
        });
        return area_list;
      }
    },
    // 判斷目前購物車種是否包含低溫商品
    has_forzen_product() {
      let forzen = false;
      this.checkout_data.CheckoutList.forEach((item) => {
        if (item.DeliveryFrozen == 'Y') {
          forzen = true;
        }
      });
      return forzen;
    },
  },
  created() {
    // 判斷是否登入
    if (getLocalStorage('account_token')) {
      this.member_login = true;
    } else {
      this.member_login = false;
    }
    // 如果購物車商品積材過大沒有可用的物流，顯示錯誤訊息並轉跳回首頁
    if (this.shipway_data.length <= 0) {
      this.$router.push('/');
      this.$store.commit('SetDialog', {
        status: true,
        content: `很抱歉！<br/>購物車商品超出可運送範圍，您可以分次下單<br/>如需訂購大量商品請<a class="text-primary" href="${this.$GetColumn(
          'company_messenger'
        )}" target="_blank">聯絡我們</a>`,
      });
    }
  },
};
</script>
