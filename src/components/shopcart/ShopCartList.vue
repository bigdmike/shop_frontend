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
  methods: {
    GetActiveOption(shopcart_item) {
      return shopcart_item.product_data.Stock.filter((item) => {
        return (
          item.ColorID == shopcart_item.active_option[0] &&
          item.SizeID == shopcart_item.active_option[1]
        );
      })[0];
    },
    GetDiscountAndPrice(item) {
      let product = this.checkout_data.filter((checkout_item) => {
        return (
          checkout_item.GoodsID == item.product_data.GoodsID &&
          checkout_item.ColorID == item.active_option[0] &&
          checkout_item.SizeID == item.active_option[1]
        );
      })[0];
      let discount_list = [];
      Object.keys(product.DiscountPercentFullInfo).length > 0
        ? discount_list.push(product.DiscountPercentFullInfo)
        : '';
      Object.keys(product.DiscountPercentMenuInfo).length > 0
        ? discount_list.push(product.DiscountPercentMenuInfo)
        : '';
      return {
        discount_list: discount_list,
        discount_price: product.DiscountPrice,
        sell_price: product.SellPrice,
      };
    },
  },
  computed: {
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
