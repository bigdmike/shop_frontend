<template>
  <div class="w-full">
    <div
      v-if="checkout_data.ShippingFreeInfo.length > 0"
      class="w-full px-3 py-2 bg-green-500 border border-green-500 rounded-md bg-opacity-20"
    >
      <span class="block text-xs text-green-500">符合免運優惠</span>
      <p class="text-sm text-white">
        {{ checkout_data.ShippingFreeInfo[0].Title }}
      </p>
    </div>
    <div
      v-if="
        checkout_data.ShippingFreeInfo.length <= 0 &&
        checkout_data.ShippingFreeInvalidInfo.length > 0
      "
      class="w-full px-3 py-2 mt-2 border rounded-md bg-zinc-500 border-zinc-500 bg-opacity-20"
    >
      <span class="block mb-2 text-xs text-zinc-500">未達門檻 免運優惠</span>
      <p
        class="mb-1 text-sm text-white"
        v-for="(item, item_index) in checkout_data.ShippingFreeInvalidInfo"
        :key="`ship_free_${item_index}`"
      >
        {{ item.Title }}
        <span class="ml-2 text-xs"
          >還差NT${{ $MoneyFormat(CheckThreshold(item)) }}</span
        >
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckoutShipFreeInfo',
  props: {
    checkout_data: {
      type: Object,
    },
  },
  methods: {
    CheckThreshold(data) {
      if (data.GoodsIDArray.length <= 0) {
        // 全館優惠
        return (
          parseInt(data.Threshold) -
          parseInt(this.checkout_data.AfterCouponTotal)
        );
      } else {
        // 指定分類優惠
        let product_price_count = 0;
        this.checkout_data.CheckoutList.forEach((product) => {
          if (data.GoodsIDArray.indexOf(product.GoodsID) != -1) {
            product_price_count += parseInt(product.DiscountPrice);
          }
        });
        return parseInt(data.Threshold) - product_price_count;
      }
    },
  },
};
</script>
