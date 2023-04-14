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
          <span class="mr-2 text-xs font-medium text-primary">{{
            shopcart_item.product_data.Option1
          }}</span>
          {{ stock_data.ColorTitle }}
        </p>
        <p
          v-if="stock_data.SizeTitle != '無'"
          class="text-xs font-medium text-white text-opacity-60"
        >
          <span class="mr-2 text-xs font-medium text-primary">{{
            shopcart_item.product_data.Option2
          }}</span>
          {{ stock_data.SizeTitle }}
        </p>
      </div>
    </div>

    <div>
      <p
        v-if="shopcart_item.SellPrice != shopcart_item.FinalPrice"
        class="mr-1 text-xs font-bold line-through transform scale-75 text-zinc-500 font-anybody md:text-base"
      >
        NT${{
          $MoneyFormat(parseInt(shopcart_item.SellPrice) * shopcart_item.Amount)
        }}
      </p>
      <p
        class="w-full text-sm font-bold text-right text-white font-anybody md:w-auto"
      >
        NT${{
          $MoneyFormat(
            parseInt(shopcart_item.FinalPrice) * shopcart_item.Amount
          )
        }}
      </p>
    </div>
    <div
      v-if="
        shopcart_item.DiscountID_PercentFull_Info.length != 0 ||
        shopcart_item.DiscountID_PercentMenu_Info.length != 0
      "
      class="w-full px-3 py-2 mt-2 bg-green-500 border border-green-500 rounded-md bg-opacity-20"
    >
      <span class="block text-xs text-green-500">符合打折優惠</span>
      <p
        v-if="shopcart_item.DiscountID_PercentFull_Info.length != 0"
        class="text-sm text-white"
      >
        {{ shopcart_item.DiscountID_PercentFull_Info.Title }}
      </p>
      <p
        v-if="shopcart_item.DiscountID_PercentMenu_Info.length != 0"
        class="text-sm text-white"
      >
        {{ shopcart_item.DiscountID_PercentMenu_Info.Title }}
      </p>
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
