<template>
  <Teleport to="#app">
    <div id="ShopcartFooter" class="block md:hidden">
      <div
        @click="open = !open"
        :class="open ? 'block' : 'hidden'"
        class="fixed top-0 bottom-0 left-0 right-0 z-30 bg-basic_black bg-opacity-70"
      ></div>
      <div class="fixed bottom-0 left-0 right-0 z-[31]">
        <div
          class="flex items-center justify-between w-full px-5 py-4 text-white bg-primary"
        >
          <button
            @click="open = !open"
            class="relative flex items-center pr-2 font-bold"
          >
            顯示訂單資訊
            <span
              :class="open ? 'rotate-90' : '-rotate-90'"
              class="absolute right-0 z-10 text-sm transform translate-x-full -translate-y-1/2 pointer-events-none icon-chevron_right top-1/2"
            ></span>
          </button>
          <p class="font-bold font-anybody">
            NT${{ $MoneyFormat(total_price) }}
          </p>
        </div>
        <div
          :class="open ? 'max-h-screen pb-5' : 'max-h-0'"
          class="w-full overflow-hidden bg-basic_black"
        >
          <!-- <ol
            class="max-h-[300px] overflow-y-auto custom_scroll px-5 pt-5 mb-5"
          >
            <li
              :class="
                item_index != shopcart.length - 1
                  ? ' border-b border-zinc-700'
                  : ''
              "
              class="flex flex-wrap items-start pb-5 mb-5"
              v-for="(item, item_index) in shopcart"
              :key="`shopcart_${item_index}`"
            >
              <ProductCard v-if="item.IsCustom == 'N'" :shopcart_item="item" />
              <CustomProductCard v-else :shopcart_item="item" />
            </li>
          </ol> -->

          <div class="px-5 pt-5">
            <!-- <div class="w-full mb-5" v-if="give_info.length > 0">
              <div class="w-full">
                <h4 class="mb-2 font-bold text-white">活動贈品</h4>
              </div>
              <div
                class="flex items-center justify-between w-full p-3 mb-2 bg-black rounded-md"
                v-for="(item, item_index) in give_info"
                :key="`give_info_${item_index}`"
              >
                <div class="">
                  <p class="text-sm font-bold text-white">
                    {{ item.Title }}
                  </p>
                  <p class="text-sm text-primary">
                    {{ item.GiveName }}
                  </p>
                </div>
                <button
                  @click="$emit('open-image-dialg', item)"
                  class="text-xs underline text-primary"
                >
                  查看圖片
                </button>
              </div>
            </div> -->
            <ol
              class="px-0 pt-5 pb-5 mb-5 border-t border-b border-zinc-600 border-opacity-20"
            >
              <li
                class="flex items-center justify-between w-full mb-3 text-sm text-white"
              >
                <p class="font-medium">合計</p>
                <p class="font-semibold font-anybody">
                  NT$ {{ $MoneyFormat(product_total_price) }}
                </p>
              </li>
              <li
                class="flex items-center justify-between w-full text-sm text-white"
              >
                <p class="font-medium">運費</p>
                <p class="font-semibold font-anybody" v-if="!shipping_free">
                  NT$ {{ $MoneyFormat(ship_price) }}
                </p>
                <p class="font-semibold text-primary font-anybody" v-else>
                  免運費
                </p>
              </li>
              <li
                v-if="payment_price != 0"
                class="flex items-center justify-between w-full mt-3 text-sm text-white"
              >
                <p class="font-medium">金流手續費</p>
                <p class="font-semibold font-anybody">
                  NT$ {{ $MoneyFormat(payment_price) }}
                </p>
              </li>
              <li
                v-if="discount_price != 0"
                class="flex items-center justify-between w-full mt-3 text-sm text-white"
              >
                <p class="font-medium">優惠折扣金額</p>
                <p class="font-semibold font-anybody">
                  - NT$ {{ $MoneyFormat(discount_price) }}
                </p>
              </li>
              <li
                v-if="coupon_discount != 0"
                class="flex items-center justify-between w-full mt-3 text-sm text-white"
              >
                <p class="font-medium">優惠代碼折抵</p>
                <p class="font-semibold font-anybody">
                  - NT$ {{ $MoneyFormat(coupon_discount) }}
                </p>
              </li>
            </ol>
            <div
              class="flex items-center justify-between w-full pb-5 text-sm text-white"
            >
              <p class="font-medium">總金額</p>
              <p class="font-semibold font-anybody">
                NT$
                {{ $MoneyFormat(total_price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';
// import ProductCard from '@/components/checkout/ProductCard.vue';
// import CustomProductCard from '@/components/checkout/CustomProductCard.vue';
export default {
  name: 'ShopCartFooter',
  props: {
    // shopcart: {
    //   require: true,
    //   type: Array,
    // },
    shipping_free: {
      require: true,
      type: Boolean,
    },
    discount_price: {
      require: true,
      type: Number,
    },
    product_total_price: {
      require: true,
      type: Number,
    },
    payment_price: {
      require: true,
      type: Number,
    },
    ship_price: {
      require: true,
      type: Number,
    },
    total_price: {
      require: true,
      type: Number,
    },
    checkout_data: {
      require: true,
      type: Array,
    },
    coupon_discount: {
      require: true,
      type: Number,
    },
    give_info: {
      require: true,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  components: {
    Teleport,
    // ProductCard,
    // CustomProductCard,
  },
  watch: {
    open() {
      if (this.open) {
        this.$emit('stop-scroll');
      } else {
        this.$emit('start-scroll');
      }
    },
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
    GetDiscountAndPrice(item) {
      let product = this.checkout_data.filter((checkout_item) => {
        return (
          checkout_item.GoodsID == item.product_data.GoodsID &&
          checkout_item.ColorID == item.active_option[0] &&
          checkout_item.SizeID == item.active_option[1]
        );
      })[0];
      let discount_list = [];
      Object.keys(product.DiscountPercentFullInfo).length > 0
        ? discount_list.push(product.DiscountPercentFullInfo)
        : '';
      Object.keys(product.DiscountPercentMenuInfo).length > 0
        ? discount_list.push(product.DiscountPercentMenuInfo)
        : '';
      return {
        discount_list: discount_list,
        discount_price: product.DiscountPrice,
        sell_price: product.SellPrice,
      };
    },
  },
  computed: {
    shopcart() {
      let shopcart = [];
      this.checkout_data.forEach((item) => {
        let is_exist = -1;
        shopcart.forEach((shopcart_item, shopcart_index) => {
          if (
            shopcart_item.GoodsID == item.GoodsID &&
            shopcart_item.ColorID == item.ColorID &&
            shopcart_item.SizeID == item.SizeID &&
            item.IsCustom == 'N'
          ) {
            is_exist = shopcart_index;
          }
        });
        if (is_exist != -1) {
          shopcart[is_exist].Amount += 1;
        } else {
          let tmp_shopcart_item = Object.assign({}, item);
          tmp_shopcart_item.Amount = 1;
          shopcart.push(tmp_shopcart_item);
        }
      });
      return shopcart;
    },
  },
};
</script>
