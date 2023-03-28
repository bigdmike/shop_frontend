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
          <div class="px-5 pt-5">
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
export default {
  name: 'ShopCartFooter',
  props: {
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
};
</script>
