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
      <p class="text-sm font-bold text-white truncate xs:text-base">
        {{ shopcart_item.Title }}
      </p>

      <p
        v-for="(item, item_index) in stock_data"
        :key="`option_${item_index}`"
        class="text-xs font-medium text-white text-opacity-60"
      >
        <span class="mr-2 text-xs font-medium text-primary">{{
          item.SpecCategoryTitle
        }}</span
        >-
        {{ item.SpecTitle }}
      </p>
      <div class="flex items-center justify-end w-full mt-2">
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
