<template>
  <div class="relative flex flex-wrap items-start w-full">
    <div class="flex w-full mb-3 md:w-auto md:flex-1 md:mb-0">
      <div class="md:flex-1">
        <div class="flex items-center justify-between">
          <p class="text-sm font-bold text-white truncate xs:text-base">
            {{ shopcart_item.product_data.Title }}
            <span class="text-xs">x{{ shopcart_item.Amount }}</span>
          </p>
        </div>
        <p class="text-xs font-medium text-white text-opacity-60">
          <span class="mr-2 text-xs font-medium text-primary">選項一</span>
          {{ stock_data.ColorTitle }}
        </p>
        <p
          v-if="stock_data.SizeTitle != '無'"
          class="text-xs font-medium text-white text-opacity-60"
        >
          <span class="mr-2 text-xs font-medium text-primary">選項二</span>
          {{ stock_data.SizeTitle }}
        </p>
      </div>
    </div>
    <p
      class="w-full text-sm font-bold text-right text-white font-anybody md:w-auto"
    >
      NT${{
        $MoneyFormat(parseInt(shopcart_item.FinalPrice) * shopcart_item.Amount)
      }}
    </p>
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
    stock_data() {
      return this.shopcart_item.product_data.Stock.filter(
        (item) =>
          item.ColorID == this.shopcart_item.ColorID &&
          item.SizeID == this.shopcart_item.SizeID
      )[0];
    },
  },
};
</script>
