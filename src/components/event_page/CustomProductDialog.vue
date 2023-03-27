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
            <h2 class="text-xl font-bold text-white font-anybody">
              {{ product_data.Title }}
            </h2>
            <p class="mb-5 font-semibold text-primary font-anybody">
              NT$ {{ $MoneyFormat(GetPrice()[0]) }}
            </p>
            <div
              class="mb-5"
              v-for="(item, item_index) in product_data.SpecCategoryList"
              :key="`category_${item_index}`"
            >
              <p
                class="flex-shrink-0 mb-2 mr-10 font-medium text-white font-anybody"
              >
                {{ item.SpecCategoryTitle }}
              </p>
              <div class="relative w-full">
                <span
                  class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
                ></span>
                <select
                  @input="ChangeOption(item_index, $event.target.value)"
                  :value="active_option[item_index]"
                  class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-basic_black focus:outline-none"
                >
                  <option value="">請選擇</option>
                  <option
                    v-for="(option, option_index) in GetCategorySpec(
                      item.SpecCategoryID,
                      item_index
                    )"
                    :value="option.CustomSpecID"
                    :key="`option_${item_index}_${option_index}`"
                  >
                    {{ option.SpecTitle }}
                  </option>
                </select>
              </div>
            </div>
            <div class="mb-5">
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
                v-if="product_data.CustomGoodsStock.length > 0"
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
                  @click="ChangeAmount(1)"
                  class="px-5 py-3 duration-200 text-primary transition-color hover:bg-primary hover:text-white"
                >
                  <span class="text-sm icon-plus"></span>
                </button>
              </div>
            </div>

            <div class="flex items-center">
              <button
                @click="AddShopCart"
                v-if="time_status != 'end' && time_status != 'prepare'"
                class="flex items-center justify-center w-full h-12 font-bold text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-80"
              >
                加入購物車
                <span class="ml-3 text-xl icon-arrow_right"></span>
              </button>
              <button
                v-else
                class="block w-full h-12 font-bold text-center text-white transition-colors duration-200 rounded-md cursor-not-allowed bg-zinc-600 hover:bg-opacity-80"
              >
                {{
                  time_status == 'end'
                    ? '已結束販售'
                    : time_status == 'prepare'
                    ? '尚未開賣'
                    : '商品已售完'
                }}
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
      const tmp_product = JSON.parse(JSON.stringify(product));
      this.product_data = this.InitActiveOption(tmp_product);
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
    ChangeOption(index, val) {
      this.active_option.forEach((item, item_index) => {
        item_index > index ? this.$set(this.active_option, item_index, '') : '';
      });
      this.$set(this.active_option, index, val);
    },
    AddShopCart() {
      if (this.CheckActiveOption()) {
        window.dataLayer.push({
          event: 'add_to_cart',
          items: [
            ConvertAddShopCartData(
              this.product_data,
              this.active_option,
              this.amount,
              this.GetPrice()[0]
            ),
          ],
          value: 0,
          currency: 'TWD',
        });
        const shop_cart_item = {
          product: this.product_data,
          is_custom: 'Y',
          options: this.active_option,
          amount: this.amount,
          show_message: true,
        };
        if (getLocalStorage('account_token')) {
          this.$store.dispatch('shopcart_module/AddShopCart', shop_cart_item);
        } else {
          this.$store.commit('shopcart_module/AddShopCart', shop_cart_item);
        }
      } else {
        this.$store.commit('SetDialog', {
          status: true,
          content: '請確認所有選項都有選取',
        });
      }
    },
    CheckActiveOption() {
      let empty_count = 0;
      this.active_option.forEach((item) => {
        item == '' ? (empty_count += 1) : '';
      });
      return empty_count > 0 ? false : true;
    },
    InitActiveOption(data) {
      let category = [];
      // 取出所有選項ID
      data.CustomSpecList.forEach((item) => {
        const exist_category = category.filter(
          (category) => category.SpecCategoryID == item.SpecCategoryID
        );
        if (exist_category.length <= 0) {
          category.push({
            SpecCategoryID: item.SpecCategoryID,
            SpecCategoryTitle: item.SpecCategoryTitle,
            SpecCategoryStatus: item.SpecCategoryStatus,
            SpecCategorySeq: item.SpecCategorySeq,
          });
        }
      });
      data.SpecCategoryList = category;
      // 黑名單id list 轉換成array
      data.CustomGoodsSpecBlacklist.forEach((item) => {
        item.CustomSpecID = item.CustomSpecID.split(',');
      });
      // 價格變動id list 轉為array
      data.CustomGoodsChangePrice.forEach((item) => {
        item.CustomSpecID = item.CustomSpecID.split(',');
      });
      // 設定所有選項預設規格
      this.active_option = [];
      category.forEach(() => {
        this.active_option.push('');
      });
      return data;
    },
    GetCategorySpec(id, index) {
      let first_empty_option = this.active_option.indexOf('');
      if (index == 0) {
        //第一個選項
        return this.product_data.CustomSpecList.filter(
          (item) => item.SpecCategoryID == id
        );
      } else if (first_empty_option < index && first_empty_option != -1) {
        // 前面的選項還沒選
        return [];
      } else {
        const spec_list = this.GetAvailableSpec();
        return spec_list.filter((item) => item.SpecCategoryID == id);
      }
    },
    GetAvailableSpec() {
      let disable_id = [];
      this.product_data.CustomGoodsSpecBlacklist.forEach((blacklist) => {
        const need_filter_id = this.GetDisableSpecID(
          blacklist.CustomSpecID,
          this.active_option.filter((item) => item != '')
        );
        if (need_filter_id.length > 0) {
          // 取出除了active_option其餘的ID
          disable_id = disable_id.concat(need_filter_id);
        }
      });
      disable_id = disable_id.filter(function (item, index) {
        return disable_id.indexOf(item) === index;
      });
      return this.product_data.CustomSpecList.filter((item) => {
        return disable_id.indexOf(item.CustomSpecID) == -1;
      });
    },
    GetDisableSpecID(black_list, active_list) {
      let match_id = [];
      let dismatch_id = [];
      // 統計與目前傳入的黑名單陣列符合的ID與不符合的ID
      black_list.forEach((id) => {
        active_list.indexOf(id) != -1
          ? match_id.push(id)
          : dismatch_id.push(id);
      });
      // 若只差一個就符合則將該選項禁用
      if (match_id.length >= black_list.length - 1) {
        return dismatch_id;
      } else {
        return [];
      }
    },
    GetPrice() {
      let change_price = 0;
      this.product_data.CustomGoodsChangePrice.forEach((change_item) => {
        let match_count = 0;
        change_item.CustomSpecID.forEach((id) => {
          this.active_option.indexOf(id) != -1 ? (match_count += 1) : '';
        });
        if (match_count == change_item.CustomSpecID.length) {
          change_price += parseInt(change_item.ChangePrice);
        }
      });

      const product_data = {
        product_data: this.product_data,
        active_option: this.active_option,
      };

      this.$GetCustomPrice(product_data);
      return [
        parseInt(this.product_data.CustomGoodsStock[0].SellPrice) +
          change_price,
        parseInt(this.product_data.CustomGoodsStock[0].MemberSellPrice) +
          change_price,
      ];
    },
  },
  mounted() {
    this.dialog_animation = new dialog_animation(this.$refs.MainContent);
  },
  computed: {
    time_status() {
      if (this.start_time == null || this.end_time == null) {
        return 'none';
      }
      let nowTime = new Date().getTime(); // 獲取當前毫秒數
      if (nowTime < this.start_time) {
        // 活動尚未開始
        return 'prepare';
      } else if (nowTime > this.start_time && nowTime < this.end_time) {
        // 活動進行中
        return 'start';
      } else {
        // 活動結束
        return 'end';
      }
    },
    start_time() {
      if (
        this.product_data.GoodsTimeStart == '' ||
        this.product_data.GoodsTimeStart == null
      ) {
        return null;
      }
      let time = new Date();
      time.setFullYear(this.product_data.GoodsTimeStart.slice(0, 4)); // 設定結束年份
      time.setMonth(parseInt(this.product_data.GoodsTimeStart.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
      time.setDate(parseInt(this.product_data.GoodsTimeStart.slice(8, 10))); //   獲取結束 日
      time.setHours(parseInt(this.product_data.GoodsTimeStart.slice(11, 13))); //   獲取結束 時
      time.setMinutes(parseInt(this.product_data.GoodsTimeStart.slice(14, 16))); //   獲取結束 分
      time.setSeconds(parseInt(this.product_data.GoodsTimeStart.slice(17, 19)));
      return time.getTime();
    },
    end_time() {
      if (
        this.product_data.GoodsTimeEnd == '' ||
        this.product_data.GoodsTimeEnd == null
      ) {
        return null;
      }
      let time = new Date();
      time.setFullYear(this.product_data.GoodsTimeEnd.slice(0, 4)); // 設定結束年份
      time.setMonth(parseInt(this.product_data.GoodsTimeEnd.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
      time.setDate(parseInt(this.product_data.GoodsTimeEnd.slice(8, 10))); //   獲取結束 日
      time.setHours(parseInt(this.product_data.GoodsTimeEnd.slice(11, 13))); //   獲取結束 時
      time.setMinutes(parseInt(this.product_data.GoodsTimeEnd.slice(14, 16))); //   獲取結束 分
      time.setSeconds(parseInt(this.product_data.GoodsTimeEnd.slice(17, 19)));
      return time.getTime();
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
