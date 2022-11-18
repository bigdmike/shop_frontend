<template>
  <Teleport to="#app">
    <div class="block md:hidden">
      <div
        :class="open ? 'block' : 'hidden'"
        class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-white bg-opacity-70"
      ></div>
      <div class="fixed bottom-0 left-0 right-0 z-20">
        <div
          class="flex items-center justify-between w-full px-5 py-4 text-primary bg-basic_white"
        >
          <button @click="open = !open" class="flex items-center font-bold">
            顯示訂單資訊<SelectArrowIcon
              :class="open ? '-scale-y-100' : ''"
              class="w-4 ml-2 transform"
            />
          </button>
          <p class="font-bold">NT${{ total_price }}</p>
        </div>
        <div
          :class="open ? 'max-h-screen pb-5' : 'max-h-0'"
          class="w-full overflow-hidden bg-basic_white"
        >
          <ol class="max-h-[300px] overflow-y-auto px-5 mb-5">
            <li
              :class="
                item_index != shopcart.length - 1
                  ? ' border-b border-zinc-300'
                  : ''
              "
              class="flex flex-wrap items-start pb-5 mb-5"
              v-for="(item, item_index) in shopcart"
              :key="`shopcart_${item_index}`"
            >
              <div class="w-1/4 overflow-hidden rounded-lg">
                <img
                  :src="$ImageUrl(item.product_data.Image1)"
                  class="w-full"
                />
              </div>
              <div class="w-3/4 pl-3">
                <p class="mb-2 text-sm font-bold">
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
                <div
                  class="pt-2"
                  v-if="GetDiscountAndPrice(item).discount_list.length > 0"
                >
                  <ol>
                    <li
                      class="mb-2 text-xs text-primary"
                      v-for="(event, event_index) in GetDiscountAndPrice(item)
                        .discount_list"
                      :key="`event_${event_index}`"
                    >
                      {{ event.Title }}
                    </li>
                  </ol>
                </div>
              </div>

              <div class="flex items-center justify-end w-full">
                <p
                  class="mr-2 text-xs line-through text-basic_gray"
                  v-if="
                    GetDiscountAndPrice(item).discount_price !=
                    GetDiscountAndPrice(item).sell_price
                  "
                >
                  NT$
                  {{
                    $MoneyFormat(
                      parseInt(GetDiscountAndPrice(item).sell_price) *
                        item.amount
                    )
                  }}
                </p>
                <p class="text-sm font-bold">
                  NT$
                  {{
                    $MoneyFormat(
                      parseInt(GetDiscountAndPrice(item).discount_price) *
                        item.amount
                    )
                  }}
                </p>
              </div>
            </li>
          </ol>
          <div class="px-5">
            <ol class="px-5 pt-5 pb-5 mb-5 border-t border-b border-zinc-300">
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
              <li
                v-if="payment_price != 0"
                class="flex items-center justify-between w-full mt-3 text-sm"
              >
                <p class="font-medium">金流手續費</p>
                <p class="font-semibold">
                  NT$ {{ $MoneyFormat(payment_price) }}
                </p>
              </li>
              <li
                v-if="coupon_discount != 0"
                class="flex items-center justify-between w-full mt-3 text-sm"
              >
                <p class="font-medium">優惠代碼折抵</p>
                <p class="font-semibold">
                  - NT$ {{ $MoneyFormat(coupon_discount) }}
                </p>
              </li>
            </ol>
            <div
              class="flex items-center justify-between w-full px-5 pb-5 text-sm"
            >
              <p class="font-medium">總金額</p>
              <p class="font-semibold">
                NT$
                {{ $MoneyFormat(total_price) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div></Teleport
  >
</template>

<script>
import Teleport from 'vue2-teleport';
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
export default {
  name: 'ShopCartFooter',
  props: {
    shopcart: {
      require: true,
      type: Array,
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
  },
  data() {
    return {
      open: false,
    };
  },
  components: {
    SelectArrowIcon,
    Teleport,
  },
  watch: {
    open() {
      if (this.open) {
        this.$store.commit('SetBodyLock', 1);
      } else {
        this.$store.commit('SetBodyLock', -1);
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
};
</script>
