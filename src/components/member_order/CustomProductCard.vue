<template>
  <div class="relative flex flex-wrap items-start w-full">
    <div class="flex w-full mb-3 md:flex-1 md:w-auto md:mb-0">
      <div class="flex-1">
        <p
          class="text-sm font-bold text-white truncate xs:text-base font-anybody"
        >
          {{ shopcart_item.ProductData.Title }}
          <span class="text-xs">x{{ shopcart_item.Amount }}</span>
        </p>

        <p
          v-for="(item, item_index) in stock_data"
          :key="`option_${item_index}`"
          class="text-xs font-medium text-white text-opacity-60"
        >
          <span class="mr-2 text-xs font-medium text-primary">{{
            item.SpecCategoryTitle
          }}</span>
          {{ item.SpecTitle }}
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
  name: 'CustomShopcartProductCard',
  props: {
    shopcart_item: {
      type: Object,
    },
    // shopcart_index: {
    //   type: Number,
    // },
  },
  methods: {
    GetPrice() {
      return this.$GetCustomPrice(this.shopcart_item);
    },
    GetCategoryTitle(spec_id) {
      let spec_item = this.shopcart_item.product_data.CustomSpecList.filter(
        (item) => item.CustomSpecID == spec_id
      )[0];
      return spec_item.SpecCategoryTitle;
    },
    GetSpecTitle(spec_id) {
      let spec_item = this.shopcart_item.product_data.CustomSpecList.filter(
        (item) => item.CustomSpecID == spec_id
      )[0];
      return spec_item.SpecTitle;
    },
  },
  computed: {
    product_data() {
      return this.$store.state.product_data.filter(
        (item) => item.GoodsID == this.shopcart_item.GoodsID
      )[0];
    },
    stock_data() {
      const id_list = this.shopcart_item.CustomSpecID.split(',');
      return this.product_data.CustomSpecList.filter(
        (item) => id_list.indexOf(item.CustomSpecID) != -1
      );
    },
  },
};
</script>
