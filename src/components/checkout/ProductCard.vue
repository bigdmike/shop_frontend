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
        <span class="mr-2 text-xs font-medium text-primary">{{
          shopcart_item.Option1
        }}</span
        >-
        {{ stock_data.ColorTitle }}
      </p>
      <p
        v-if="stock_data.SizeTitle != '無'"
        class="text-xs font-medium text-white text-opacity-60"
      >
        <span class="mr-2 text-xs font-medium text-primary">{{
          shopcart_item.Option2
        }}</span
        >-
        {{ stock_data.SizeTitle }}
      </p>
      <div class="flex justify-end w-full mt-2">
        <p
          v-if="original_price != shopcart_item.DiscountPrice"
          class="mr-1 text-xs font-bold line-through transform scale-75 text-zinc-500 font-anybody md:text-base"
        >
          NT${{ $MoneyFormat(parseInt(original_price) * shopcart_item.Amount) }}
        </p>
        <p class="text-sm font-bold text-white font-anybody md:text-base">
          NT${{
            $MoneyFormat(
              parseInt(shopcart_item.DiscountPrice) * shopcart_item.Amount
            )
          }}
        </p>
      </div>
    </div>
    <div
      v-if="
        shopcart_item.DiscountPercentMenuInfo &&
        shopcart_item.DiscountPercentMenuInfo.length != 0
      "
      class="w-full px-3 py-2 mt-2 bg-green-500 border border-green-500 rounded-md bg-opacity-20"
    >
      <span class="block text-xs text-green-500">符合打折優惠</span>
      <p class="text-sm text-white">
        {{ shopcart_item.DiscountPercentMenuInfo.Title }}
      </p>
      <p
        v-if="shopcart_item.DiscountPercentFullInfo.length != 0"
        class="text-sm text-white"
      >
        {{ shopcart_item.DiscountPercentFullInfo.Title }}
      </p>
    </div>
    <div
      v-if="
        shopcart_item.DiscountPercentMenuInvalidInfo ||
        shopcart_item.DiscountPercentFullInvalidInfo
      "
      class="w-full px-3 py-2 mt-2 border rounded-md bg-zinc-500 border-zinc-500 bg-opacity-20"
    >
      <span class="block text-xs text-zinc-500">未達門檻 打折優惠</span>
      <p
        v-if="shopcart_item.DiscountPercentMenuInvalidInfo"
        class="text-sm text-white"
      >
        {{ shopcart_item.DiscountPercentMenuInvalidInfo.Title }}
        <span class="ml-2 text-xs"
          >還差NT${{
            $MoneyFormat(
              parseInt(shopcart_item.DiscountPercentMenuInvalidInfo.Threshold) -
                parseInt(shopcart_item.MemberSellPrice)
            )
          }}</span
        >
      </p>
      <p
        v-if="shopcart_item.DiscountPercentFullInvalidInfo"
        class="text-sm text-white"
      >
        {{ shopcart_item.DiscountPercentFullInvalidInfo.Title }}
        <span class="ml-2 text-xs"
          >還差NT${{
            $MoneyFormat(
              parseInt(shopcart_item.DiscountPercentFullInvalidInfo.Threshold) -
                parseInt(shopcart_item.MemberSellPrice)
            )
          }}</span
        >
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
    original_price() {
      return this.shopcart_item.SellPrice > this.shopcart_item.Price
        ? this.shopcart_item.SellPrice
        : this.shopcart_item.Price;
    },
  },
};
</script>
