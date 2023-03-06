<template>
  <div class="relative flex flex-wrap items-start w-full">
    <div class="flex w-full mb-3 md:w-auto md:flex-1 md:mb-0">
      <div class="relative">
        <p
          class="absolute top-0 right-0 z-10 flex items-center justify-center w-5 h-5 text-xs font-medium text-white transform translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        >
          <span class="block transform scale-75">{{
            shopcart_item.Amount
          }}</span>
        </p>
        <div
          class="relative w-20 overflow-hidden rounded-md aspect-square bg-basic_white"
        >
          <img
            :src="$ImageUrl(shopcart_item.Image1)"
            class="object-cover w-full h-full"
          />
        </div>
      </div>
      <div class="pl-5 md:flex-1">
        <div class="flex items-center justify-between">
          <p class="text-sm font-bold text-white truncate xs:text-base">
            {{ shopcart_item.Title }}
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
        $MoneyFormat(
          parseInt(shopcart_item.DiscountPrice) * shopcart_item.Amount
        )
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
