<template>
  <ol class="max-h-[50vh] overflow-y-auto custom_scroll pt-5">
    <li
      class="flex flex-wrap items-start pb-2 mb-5 border-b border-zinc-700"
      v-for="(item, item_index) in shopcart"
      :key="`shopcart_${item_index}`"
    >
      <ProductCard v-if="item.IsCustom == 'N'" :shopcart_item="item" />
      <CustomProductCard v-else :shopcart_item="item" />
    </li>
  </ol>
</template>

<script>
import ProductCard from '@/components/checkout/ProductCard.vue';
import CustomProductCard from '@/components/checkout/CustomProductCard.vue';
export default {
  name: 'ShopCart',
  props: {
    checkout_data: {
      require: true,
      type: Array,
    },
  },
  components: {
    ProductCard,
    CustomProductCard,
  },
  computed: {
    // 轉換API返回的購物車
    shopcart() {
      let shopcart = [];
      this.checkout_data.forEach((item) => {
        let is_exist = -1;
        shopcart.forEach((shopcart_item, shopcart_index) => {
          if (
            shopcart_item.GoodsID == item.GoodsID &&
            shopcart_item.ColorID == item.ColorID &&
            shopcart_item.SizeID == item.SizeID &&
            item.IsCustom == 'N'
          ) {
            is_exist = shopcart_index;
          }
        });
        if (is_exist != -1) {
          shopcart[is_exist].Amount += 1;
        } else {
          let tmp_shopcart_item = Object.assign({}, item);
          tmp_shopcart_item.Amount = 1;
          shopcart.push(tmp_shopcart_item);
        }
      });
      return shopcart;
    },
  },
};
</script>
