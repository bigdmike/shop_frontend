<template>
  <main class="w-full relative z-10 min-h-screen overflow-hidden">
    <div class="w-full max-w-screen-xl mx-auto relative flex">
      <div class="md:w-2/3 w-full xl:pl-0 sm:pl-10 sm:pr-10 px-5 pb-32">
        <BreadCrumb :path="bread_crumb_path" class="mb-20" />
        <ShopCartForm
          :errors="errors"
          :form_data="form_data"
          @update-action="UpdateForm"
          @validate="ValidateForm"
        />
      </div>
      <div
        class="w-1/3 bg-basic_white h-screen p-12 fixed z-0 top-0 right-0 sm:pt-44 pt-40 md:block hidden"
      >
        <ol class="max-h-[60vh] overflow-y-auto">
          <li
            class="pb-5 mb-5 border-b border-zinc-300 flex flex-wrap items-start"
            v-for="(item, item_index) in shopcart"
            :key="`shopcart_${item_index}`"
          >
            <div class="rounded-lg overflow-hidden w-1/4">
              <img :src="$ImageUrl(item.product_data.Image1)" class="w-full" />
            </div>
            <div class="w-3/4 pl-3 mb-10">
              <p class="font-bold text-sm mb-2">
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
            <div class="w-full flex justify-end">
              <p class="font-bold text-sm">
                NT$
                {{
                  $MoneyFormat(
                    parseInt(GetActiveOption(item).SellPrice) * item.amount
                  )
                }}
              </p>
            </div>
          </li>
        </ol>
        <ol class="pb-5 mb-5 border-b border-zinc-300">
          <li class="w-full flex items-center justify-between text-sm mb-3">
            <p class="font-medium">合計</p>
            <p class="font-semibold">
              NT$ {{ $MoneyFormat(product_total_price) }}
            </p>
          </li>
          <li class="w-full flex items-center justify-between text-sm">
            <p class="font-medium">運費</p>
            <p class="font-semibold">NT$ {{ $MoneyFormat(ship_price) }}</p>
          </li>
        </ol>
        <div class="w-full flex items-center justify-between text-sm">
          <p class="font-medium">總金額</p>
          <p class="font-semibold">
            NT$
            {{ $MoneyFormat(total_price) }}
          </p>
        </div>
      </div>
    </div>

    <ShopCartFooter
      class="md:hidden block"
      :shopcart="shopcart"
      :product_total_price="product_total_price"
      :ship_price="ship_price"
      :total_price="total_price"
    />
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ShopCartForm from '@/components/shopcart/form.vue';
import ShopCartFooter from '@/components/shopcart/footer.vue';
import {
  validName,
  validEmail,
  validPhone,
  validAddress,
} from '@/common/validate';
export default {
  name: 'ShopCartView',
  components: {
    BreadCrumb,
    ShopCartForm,
    ShopCartFooter,
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
