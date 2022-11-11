<template>
  <section class="w-full">
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold">聯絡資訊</h4>
      <p class="text-sm text-basic_gray">
        已經有帳戶？
        <router-link class="text-primary" to="/login">登入</router-link>
      </p>
    </div>
    <div class="flex items-start flex-wrap -mx-2 mb-6">
      <div class="w-1/2 px-2 mb-4">
        <input
          type="text"
          name="first_name"
          :value="form_data.contact_first_name"
          @input="UpdateForm('contact_first_name', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="名字"
        />
        <p v-if="GetError('contact_first_name')" class="text-red-600 text-xs">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-1/2 px-2 mb-4">
        <input
          type="text"
          name="last_name"
          :value="form_data.contact_last_name"
          @input="UpdateForm('contact_last_name', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="姓氏"
        />
        <p v-if="GetError('contact_last_name')" class="text-red-600 text-xs">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="email"
          name="email"
          :value="form_data.contact_email"
          @input="UpdateForm('contact_email', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="電子郵件"
        />
        <p v-if="GetError('contact_email')" class="text-red-600 text-xs">
          請輸入正確的電子郵件
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="tel"
          name="phone"
          :value="form_data.contact_phone"
          @input="UpdateForm('contact_phone', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="手機號碼"
        />
        <p v-if="GetError('contact_phone')" class="text-red-600 text-xs">
          請輸入正確的手機號碼
        </p>
      </div>
      <div class="w-full px-2">
        <span class="w-full block border-b border-zinc-300"></span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold">配送方式</h4>
    </div>
    <div class="border-b border-zinc-300 pb-5 mb-6">
      <div class="relative">
        <SelectArrowIcon
          class="absolute top-1/2 right-2 w-5 pointer-events-none text-black z-10 transform -translate-y-1/2"
        />
        <select
          :value="form_data.ship_way"
          @input="UpdateForm('ship_way', $event.target.value)"
          class="w-full border border-zinc-300 rounded-md px-2 py-3 focus:outline-primary appearance-none relative z-0"
        >
          <option value="">選擇配送方式</option>
          <option
            v-for="(item, item_index) in shipway_data"
            :value="item.ShippingID"
            :key="`ship_way_${item_index}`"
          >
            {{ item.Title }}(運費：NT${{
              form_data.outlying ? item.ShippingFeeOutlying : item.ShippingFee
            }})
          </option>
        </select>
      </div>
      <p v-if="GetError('ship_way')" class="text-red-600 text-xs">
        請選擇配送方式
      </p>
    </div>
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold">收件地址</h4>
    </div>
    <div class="flex items-center flex-wrap -mx-2 mb-6">
      <div class="w-1/2 px-2 mb-4">
        <input
          type="text"
          name="first_name"
          :value="form_data.consignee_first_name"
          @input="UpdateForm('consignee_first_name', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="名字"
        />
        <p v-if="GetError('consignee_first_name')" class="text-red-600 text-xs">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-1/2 px-2 mb-4">
        <input
          type="text"
          name="last_name"
          :value="form_data.consignee_last_name"
          @input="UpdateForm('consignee_last_name', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="姓氏"
        />
        <p v-if="GetError('consignee_last_name')" class="text-red-600 text-xs">
          請輸入正確的中文姓名
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="email"
          name="email"
          :value="form_data.consignee_email"
          @input="UpdateForm('consignee_email', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="電子郵件"
        />
        <p v-if="GetError('consignee_email')" class="text-red-600 text-xs">
          請輸入正確的電子郵件
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="tel"
          name="phone"
          :value="form_data.consignee_phone"
          @input="UpdateForm('consignee_phone', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="手機號碼"
        />
        <p v-if="GetError('consignee_phone')" class="text-red-600 text-xs">
          請輸入正確的手機號碼
        </p>
      </div>
      <div class="w-1/2 px-2 mb-4">
        <div class="relative border border-zinc-300 rounded-md px-2 py-1">
          <SelectArrowIcon
            class="absolute top-1/2 right-5 w-5 pointer-events-none text-black z-10 transform -translate-y-1/2"
          />
          <label class="absolute top-2 left-2 text-basic_gray z-10 text-xs"
            >縣市</label
          >
          <select
            :value="form_data.consignee_city"
            @input="UpdateForm('consignee_city', $event.target.value)"
            class="w-full focus:outline-none appearance-none relative z-0 pt-5"
          >
            <option value="">選擇縣市</option>
            <option v-for="item in city_list" :key="item">{{ item }}</option>
          </select>
        </div>
        <p v-if="GetError('consignee_city')" class="text-red-600 text-xs">
          請選擇縣市
        </p>
      </div>
      <div class="w-1/2 px-2 mb-4">
        <div class="relative border border-zinc-300 rounded-md px-2 py-1">
          <SelectArrowIcon
            class="absolute top-1/2 right-5 w-5 pointer-events-none text-black z-10 transform -translate-y-1/2"
          />
          <label class="absolute top-2 left-2 text-basic_gray z-10 text-xs"
            >鄉鎮區域</label
          >
          <select
            :value="form_data.consignee_area"
            @input="UpdateForm('consignee_area', $event.target.value)"
            class="w-full focus:outline-none appearance-none relative z-0 pt-5"
          >
            <option value="">選擇區域</option>
            <option v-for="item in area_list" :key="item">{{ item }}</option>
          </select>
        </div>
        <p v-if="GetError('consignee_area')" class="text-red-600 text-xs">
          請選擇區域
        </p>
      </div>
      <div class="w-full px-2 mb-4">
        <input
          type="text"
          name="address"
          :value="form_data.consignee_address"
          @input="UpdateForm('consignee_address', $event.target.value)"
          class="px-2 py-3 border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="詳細地址"
        />
        <p v-if="GetError('consignee_address')" class="text-red-600 text-xs">
          請輸入地址
        </p>
      </div>
      <div class="w-full px-2">
        <span class="w-full block border-b border-zinc-300"></span>
      </div>
    </div>
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold">訂單備註</h4>
    </div>
    <div class="flex items-center flex-wrap -mx-2 mb-6">
      <div class="w-full px-2 mb-4">
        <textarea
          name="comment"
          :value="form_data.comment"
          @input="UpdateForm('comment', $event.target.value)"
          class="px-2 py-3 min-h-[130px] border border-zinc-300 rounded-md w-full focus:outline-primary"
          placeholder="留言"
        ></textarea>
      </div>
    </div>
    <div class="flex items-center justify-between mb-5">
      <h4 class="text-2xl font-bold">付款方式</h4>
    </div>
    <div class="flex items-center flex-wrap mb-6">
      <ol class="border border-zinc-300 rounded-lg w-full">
        <li
          v-for="(item, item_index) in payment_data"
          :key="`payment_${item_index}`"
        >
          <label
            @click="UpdateForm('pay_way', item.PaymentID)"
            :class="
              item_index != payment_data.length - 1
                ? 'border-b border-zinc-300'
                : ''
            "
            class="px-2 py-3 block transition-colors duration-200 hover:bg-primary hover:bg-opacity-10"
          >
            <input
              type="radio"
              class="checked:accent-primary mr-3"
              :checked="item.PaymentID == form_data.pay_way"
            />
            <span
              :class="
                item.PaymentID == form_data.pay_way
                  ? 'text-primary'
                  : 'text-basic_gray'
              "
              >{{ item.Title }}</span
            >
          </label>
        </li>
      </ol>
      <p v-if="GetError('pay_way')" class="text-red-600 text-xs">
        請選擇付款方式
      </p>
      <span class="w-full block border-b mt-5 border-zinc-300"></span>
    </div>
    <div class="">
      <p class="mb-5">
        提交訂單表示同意<b class="text-secondary">耀聞水果世界</b>的<a
          class="text-primary"
          >服務條款</a
        >、<a class="text-primary">隱私政策</a>和<a class="text-primary"
          >退貨政策</a
        >
      </p>
      <button
        @click="Validate"
        class="bg-primary py-3 block w-full rounded-md text-white transition-colors duration-200 hover:bg-opacity-75"
      >
        立即下單
      </button>
    </div>
  </section>
</template>

<script>
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
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
  },
  components: {
    SelectArrowIcon,
  },
  methods: {
    UpdateForm(key, val) {
      this.$emit('update-action', key, val);
    },
    Validate() {
      this.$emit('validate');
    },
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
  },
  computed: {
    shipway_data() {
      return this.$store.state.shipway_data;
    },
    payment_data() {
      return this.$store.state.payment_data;
    },
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
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
    area_list() {
      if (this.form_data.consignee_city == '') {
        return [];
      } else {
        let area_list = [];
        this.zipcode_data.forEach((item) => {
          if (item.City == this.form_data.consignee_city) {
            area_list.push(item.Area);
          }
        });
        return area_list;
      }
    },
  },
};
</script>
