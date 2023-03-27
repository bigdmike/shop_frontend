<template>
  <div class="relative flex flex-wrap items-start w-full">
    <div class="w-20 overflow-hidden rounded-lg md:w-1/4 aspect-square">
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
      <p class="mb-2 text-xs font-medium text-white text-opacity-60">
        x{{ shopcart_item.Amount }}
      </p>
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
      <div class="flex justify-end w-full mt-4">
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
