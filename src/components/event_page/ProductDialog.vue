<template>
  <Teleport to="#app">
    <div
      ref="MainContent"
      class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen text-white left-full"
    >
      <div
        data-dialog-box
        class="sm:w-[500px] w-full sm:max-h-[90%] sm:h-auto h-full overflow-y-auto max-w-full bg-bg_black relative z-10 rounded-2xl custom_scroll"
      >
        <template v-if="product_data != null">
          <div
            class="relative w-full overflow-hidden aspect-square rounded-tl-2xl rounded-tr-2xl"
          >
            <button
              @click="Close"
              class="absolute z-10 flex items-center justify-center w-8 h-8 border border-black rounded-full bg-primary top-4 right-4"
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
            <h2 class="text-xl font-bold text-white">
              {{ product_data.Title }}
            </h2>
            <p
              v-if="!is_member"
              class="mb-5 font-semibold text-primary font-anybody"
            >
              NT$ {{ $MoneyFormat(GetPrice().SellPrice) }}
            </p>
            <p v-else class="mb-5 font-semibold text-primary font-anybody">
              NT$ {{ $MoneyFormat(GetPrice().MemberSellPrice) }}
            </p>
            <div class="w-full mt-5 mb-10">
              <div class="mb-5">
                <p
                  class="flex-shrink-0 mb-2 mr-10 font-medium text-white font-anybody"
                  v-if="first_options.length > 0"
                >
                  選項一
                </p>
                <div class="relative w-full" v-if="first_options.length > 0">
                  <span
                    class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
                  ></span>
                  <select
                    @input="$emit('change-option', 0, $event.target.value)"
                    :value="active_option[0]"
                    class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-basic_black focus:outline-none"
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
              </div>

              <div class="mb-5">
                <p
                  class="flex-shrink-0 mb-2 mr-10 font-medium text-white font-anybody"
                  v-if="second_options.length > 0"
                >
                  選項二
                </p>
                <div
                  class="relative w-full mb-5"
                  v-if="second_options.length > 0"
                >
                  <span
                    class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
                  ></span>
                  <select
                    @input="$emit('change-option', 1, $event.target.value)"
                    :value="active_option[1]"
                    class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-basic_black focus:outline-none"
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
              </div>
              <div>
                <p
                  class="mb-2 font-semibold text-white"
                  v-if="second_options.length > 0"
                >
                  數量

                  <span class="ml-3 text-sm text-center text-primary">
                    目前庫存數量：{{ active_stock.Stock }}
                  </span>
                </p>
                <div
                  v-if="product_data.Stock.length > 0"
                  class="relative flex items-stretch w-full overflow-hidden rounded-md bg-basic_black"
                >
                  <button
                    @click="ChangeAmount(-1)"
                    class="px-5 py-3 duration-200 text-primary transition-color hover:bg-primary hover:text-white"
                  >
                    <span class="text-sm icon-minus"></span>
                  </button>
                  <input
                    class="flex-1 text-center text-white focus:outline-none bg-basic_black"
                    type="text"
                    :value="amount"
                    readonly
                  />
                  <button
                    @click="amount >= active_stock.Stock ? '' : ChangeAmount(1)"
                    class="px-5 py-3 duration-200 text-primary transition-color hover:bg-primary hover:text-white"
                  >
                    <span class="text-sm icon-plus"></span>
                  </button>
                </div>
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
        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black bg-opacity-80"
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
      this.$emit('stop-scroll');
    },
    Close() {
      this.dialog_animation.close();
      this.$emit('start-scroll');
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
            this.amount,
            this.GetPrice().SellPrice
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
      if (getLocalStorage('account_token')) {
        this.$store.dispatch('shopcart_module/AddShopCart', shop_cart_item);
      } else {
        this.$store.commit('shopcart_module/AddShopCart', shop_cart_item);
      }
    },
    GetPrice() {
      if (this.product_data.IsCustom == 'N') {
        // 一般商品，讀取Stock資料
        let tmp_data = JSON.parse(JSON.stringify(this.product_data.Stock));
        tmp_data = tmp_data.sort((a, b) => {
          return a.SellPrice < b.SellPrice;
        });
        return tmp_data[0];
      } else {
        // 客製化商品，讀取CustomGoodsStock資料
        return this.product_data.CustomGoodsStock[0];
      }
    },
  },
  mounted() {
    this.dialog_animation = new dialog_animation(this.$refs.MainContent);
  },
  computed: {
    is_member() {
      return getLocalStorage('account_token');
    },
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
