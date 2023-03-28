<template>
  <div class="relative flex flex-wrap items-start w-full">
    <div class="relative w-20 bg-black rounded-lg aspect-square">
      <span
        class="absolute top-0 right-0 text-white bg-primary w-5 h-5 rounded-[100%] flex items-center justify-center text-center transform translate-x-1 -translate-y-1"
      >
        <span class="block text-xs transform scale-90">{{
          shopcart_item.Amount
        }}</span>
      </span>
      <img
        :src="$ImageUrl(shopcart_item.Image1)"
        class="object-cover w-full h-full"
      />
    </div>
    <div class="flex-1 pl-3 md:w-3/4">
      <div class="flex items-center justify-between">
        <p class="text-sm font-bold text-white truncate xs:text-base">
          {{ shopcart_item.Title }}
        </p>
      </div>
      <p class="text-xs font-medium text-white text-opacity-60">
        <span class="mr-2 text-xs font-medium text-primary">選項一</span>-
        {{ stock_data.ColorTitle }}
      </p>
      <p
        v-if="stock_data.SizeTitle != '無'"
        class="text-xs font-medium text-white text-opacity-60"
      >
        <span class="mr-2 text-xs font-medium text-primary">選項二</span>-
        {{ stock_data.SizeTitle }}
      </p>
      <div class="flex justify-end w-full mt-2">
        <p class="text-sm font-bold text-white font-anybody md:text-base">
          NT${{
            $MoneyFormat(
              parseInt(shopcart_item.DiscountPrice) * shopcart_item.Amount
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopcartProductCard',
  props: {
    shopcart_item: {
      type: Object,
    },
  },
  computed: {
    product_data() {
      return this.$store.state.product_data.filter(
        (item) => item.GoodsID == this.shopcart_item.GoodsID
      )[0];
    },
    stock_data() {
      return this.product_data.Stock.filter(
        (item) =>
          item.ColorID == this.shopcart_item.ColorID &&
          item.SizeID == this.shopcart_item.SizeID
      )[0];
    },
  },
};
</script>
