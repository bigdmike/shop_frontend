<template>
  <ol class="max-h-[60vh] overflow-y-auto">
    <li
      class="flex flex-wrap items-start pb-5 mb-5 border-b border-zinc-300"
      v-for="(item, item_index) in shopcart"
      :key="`shopcart_${item_index}`"
    >
      <div class="w-1/4 overflow-hidden rounded-lg">
        <img :src="$ImageUrl(item.product_data.Image1)" class="w-full" />
      </div>
      <div class="w-3/4 pl-3">
        <p class="mb-2 text-sm font-bold">
          {{ item.product_data.Title }}
        </p>
        <p class="text-sm text-basic_gray">
          {{ GetActiveOption(item).ColorTitle }}
        </p>
        <p
          v-if="GetActiveOption(item).SizeTitle != '無'"
          class="text-sm text-basic_gray"
        >
          {{ GetActiveOption(item).SizeTitle }}
        </p>
        <div
          class="pt-2"
          v-if="GetDiscountAndPrice(item).discount_list.length > 0"
        >
          <ol>
            <li
              class="mb-2 text-xs text-primary"
              v-for="(event, event_index) in GetDiscountAndPrice(item)
                .discount_list"
              :key="`event_${event_index}`"
            >
              {{ event.Title }}
            </li>
          </ol>
        </div>
      </div>

      <div class="flex items-center justify-end w-full">
        <div class="flex items-center">
          <p
            class="mr-2 text-xs line-through text-basic_gray"
            v-if="
              GetDiscountAndPrice(item).discount_price !=
              GetDiscountAndPrice(item).sell_price
            "
          >
            NT$
            {{ $MoneyFormat(parseInt(GetDiscountAndPrice(item).sell_price)) }}
          </p>
          <p class="text-sm font-bold">
            NT$
            {{
              $MoneyFormat(parseInt(GetDiscountAndPrice(item).discount_price))
            }}
            x {{ item.amount }}
          </p>
        </div>
      </div>
    </li>
  </ol>
</template>

<script>
export default {
  name: 'ShopCart',
  props: {
    shopcart: {
      require: true,
      type: Array,
    },
    checkout_data: {
      require: true,
      type: Array,
    },
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
};
</script>
