<template>
  <div class="w-full">
    <ol class="py-5 mb-5 text-white border-t border-b border-zinc-700">
      <li class="flex items-center justify-between w-full mb-3 text-sm">
        <p class="font-medium">合計</p>
        <p class="font-semibold font-anybody">
          NT$ {{ $MoneyFormat(product_total_price) }}
        </p>
      </li>
      <li class="flex items-center justify-between text-sm w-ful">
        <p class="font-medium">運費</p>
        <p class="font-semibold font-anybody" v-if="!shipping_free">
          NT$ {{ $MoneyFormat(ship_price) }}
        </p>
        <p class="font-semibold font-anybody text-primary" v-else>免運費</p>
      </li>
      <li
        v-if="payment_price != 0"
        class="flex items-center justify-between w-full mt-3 text-sm"
      >
        <p class="font-medium">金流手續費</p>
        <p class="font-semibold font-anybody">
          NT$ {{ $MoneyFormat(payment_price) }}
        </p>
      </li>
      <li
        v-if="discount_price != 0"
        class="flex items-center justify-between w-full mt-3 text-sm"
      >
        <p class="font-medium">優惠折扣金額</p>
        <p class="font-semibold font-anybody">
          - NT$ {{ $MoneyFormat(Math.abs(discount_price)) }}
        </p>
      </li>
      <li
        v-if="coupon_discount != 0"
        class="flex items-center justify-between w-full mt-3 text-sm"
      >
        <p class="font-medium">優惠代碼折抵</p>
        <p class="font-semibold font-anybody">
          - NT$ {{ $MoneyFormat(coupon_discount) }}
        </p>
      </li>
    </ol>
    <div class="flex items-center justify-between w-full text-sm text-white">
      <p class="font-medium">總金額</p>
      <p class="font-semibold font-anybody">
        NT$
        {{ $MoneyFormat(total_price) }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPriceInfo',
  props: {
    product_total_price: {
      require: true,
      type: Number,
    },
    ship_price: {
      require: true,
      type: Number,
    },
    shipping_free: {
      require: true,
      type: Boolean,
    },
    payment_price: {
      require: true,
      type: Number,
    },
    discount_price: {
      require: true,
      type: Number,
    },
    coupon_discount: {
      require: true,
      type: Number,
    },
    total_price: {
      require: true,
      type: Number,
    },
  },
};
</script>
