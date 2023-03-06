<template>
  <Teleport to="#app">
    <div
      ref="MainContent"
      class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen left-full"
    >
      <div
        data-dialog-box
        class="sm:w-[500px] w-full sm:max-h-[90%] sm:h-auto h-full overflow-y-auto max-w-full bg-white relative z-10 rounded-2xl"
      >
        <template v-if="product_data != null">
          <div
            class="relative w-full overflow-hidden aspect-square rounded-tl-2xl rounded-tr-2xl"
          >
            <button
              @click="Close"
              class="absolute z-10 flex items-center justify-center w-8 h-8 bg-white border border-black rounded-full top-4 right-4"
            >
              <span class="w-6 icon-close"></span>
            </button>
            <img
              :src="$ImageUrl(product_data.Image1)"
              :alt="product_data.Title"
              class="relative z-0"
            />
          </div>
          <div class="w-full p-5">
            <h2 class="text-xl font-bold text-secondary">
              {{ product_data.Title }}
            </h2>
            <div class="w-full mt-5 mb-10">
              <p
                class="mb-2 text-xs font-semibold"
                v-if="first_options.length > 0"
              >
                選項一
              </p>
              <div class="relative w-full mb-2" v-if="first_options.length > 0">
                <select
                  @input="$emit('change-option', 0, $event.target.value)"
                  :value="active_option[0]"
                  class="relative z-0 w-full px-5 py-3 border rounded-lg appearance-none border-zinc-300 focus:outline-none"
                >
                  <option
                    v-for="(item, item_index) in first_options"
                    :value="item.ColorID"
                    :key="`option_${item_index}`"
                  >
                    {{ item.Title }}
                  </option>
                </select>
              </div>
              <p
                class="mb-2 text-xs font-semibold"
                v-if="second_options.length > 0"
              >
                選項二
              </p>
              <div
                class="relative w-full mb-2"
                v-if="second_options.length > 0"
              >
                <SelectArrowIcon
                  class="absolute z-10 w-4 transform -translate-y-1/2 pointer-events-none top-1/2 right-5"
                />
                <select
                  @input="$emit('change-option', 1, $event.target.value)"
                  :value="active_option[1]"
                  class="relative z-0 w-full px-5 py-3 border rounded-lg appearance-none border-zinc-300 focus:outline-none"
                >
                  <option
                    v-for="(item, item_index) in second_options"
                    :value="item.SizeID"
                    :key="`option_${item_index}`"
                  >
                    {{ item.Title }}
                  </option>
                </select>
              </div>
              <p
                class="flex items-center justify-between mb-2 text-xs font-semibold"
                v-if="second_options.length > 0"
              >
                數量

                <span class="ml-3 text-sm text-center text-primary">
                  目前庫存數量：{{ active_stock.Stock }}
                </span>
              </p>
              <div
                v-if="product_data.Stock.length > 0"
                class="relative flex items-stretch w-full overflow-hidden border rounded-lg border-zinc-300"
              >
                <button
                  @click="ChangeAmount(-1)"
                  class="px-5 py-4 text-black duration-200 transition-color hover:bg-secondary hover:text-white"
                >
                  <span class="w-3 icon-minus"></span>
                </button>
                <input
                  class="flex-1 text-center focus:outline-none"
                  type="text"
                  :value="amount"
                  readonly
                />
                <button
                  @click="amount >= active_stock.Stock ? '' : ChangeAmount(1)"
                  class="px-5 py-4 text-black duration-200 transition-color hover:bg-secondary hover:text-white"
                >
                  <PlusIcon class="w-3" />
                </button>
              </div>
            </div>
            <div>
              <button
                v-if="active_stock.Stock > 0"
                @click="AddShopCart"
                class="block w-full py-3 text-sm text-center text-white transition-colors duration-200 rounded-lg bg-primary hover:bg-opacity-80"
              >
                加入購物車
              </button>
              <button
                v-else
                class="block w-full py-4 text-center text-white transition-colors duration-200 rounded-lg cursor-not-allowed bg-zinc-600 hover:bg-opacity-80"
              >
                商品已售完
              </button>
            </div>
          </div>
        </template>
      </div>
      <div
        data-dialog-bg
        @click="Close"
        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-basic_white bg-opacity-80"
      ></div></div
  ></Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';
import { getLocalStorage } from '@/common/cookie';
import { ConvertAddShopCartData } from '@/common/gtm_methods';

import { dialog_animation } from '@/gsap/dialog';
export default {
  name: 'ProductDialog',
  components: {
    Teleport,
  },
  data() {
    return {
      active_option: [],
      amount: 1,
      dialog_animation: null,
      product_data: null,
    };
  },
  methods: {
    Open(product) {
      this.product_data = product;
      this.$set(this.active_option, 0, this.product_data.Stock[0].ColorID);
      this.$set(this.active_option, 1, this.product_data.Stock[0].SizeID);
      this.amount = 1;
      this.dialog_animation.open();
    },
    Close() {
      this.dialog_animation.close();
      setTimeout(() => {
        this.product_data = null;
        this.active_option = [];
        this.amount = 1;
      }, 1000);
    },
    ChangeAmount(val) {
      this.amount + val <= 1 ? (this.amount = 1) : (this.amount += val);
    },
    AddShopCart() {
      window.dataLayer.push({
        event: 'add_to_cart',
        items: [
          ConvertAddShopCartData(
            this.product_data,
            this.active_option,
            this.amount
          ),
        ],
        value: 0,
        currency: 'TWD',
      });
      const shop_cart_item = {
        product: this.product_data,
        options: this.active_option,
        amount: this.amount,
        show_message: true,
      };
      console.log('add');
      if (getLocalStorage('account_token')) {
        this.$store.dispatch('shopcart_module/AddShopCart', shop_cart_item);
      } else {
        this.$store.commit('shopcart_module/AddShopCart', shop_cart_item);
      }
    },
  },
  mounted() {
    this.dialog_animation = new dialog_animation(this.$refs.MainContent);
  },
  computed: {
    first_options() {
      let tmp_options = [];
      this.product_data.Stock.forEach((item) => {
        let option = tmp_options.filter(
          (option_item) => option_item.ColorID == item.ColorID
        );
        if (option.length <= 0) {
          tmp_options.push({
            ColorID: item.ColorID,
            Title: item.ColorTitle,
          });
        }
      });
      return tmp_options;
    },
    second_options() {
      let tmp_options = [];
      let options = this.product_data.Stock.filter(
        (option_item) => option_item.ColorID == this.active_option[0]
      );
      options.forEach((item) => {
        let option = tmp_options.filter(
          (option_item) => option_item.SizeID == item.SizeID
        );
        if (option.length <= 0) {
          tmp_options.push({
            SizeID: item.SizeID,
            Title: item.SizeTitle,
          });
        }
      });
      return tmp_options;
    },
    active_stock() {
      let stock = this.product_data.Stock.filter((item) => {
        console.log(
          item.ColorID,
          item.SizeID,
          this.active_option[0],
          this.active_option[1]
        );
        return (
          item.ColorID == this.active_option[0] &&
          item.SizeID == this.active_option[1]
        );
      });
      return stock.length > 0
        ? stock[0]
        : { Status: 'N', Price: 0, SellPrice: 0 };
    },
    low_price() {
      let price = 99999999;
      this.product_data.Stock.forEach((item) => {
        parseInt(item.SellPrice) < price ? (price = item.Price) : '';
      });
      return price == 99999999 ? 0 : price;
    },
    high_price() {
      let price = 0;
      this.product_data.Stock.forEach((item) => {
        parseInt(item.SellPrice) > price ? (price = item.Price) : '';
      });
      return price;
    },
    offer_count() {
      let count = 0;
      this.product_data.Stock.forEach((item) => {
        count += parseInt(item.Stock);
      });
      return count;
    },
  },
};
</script>
