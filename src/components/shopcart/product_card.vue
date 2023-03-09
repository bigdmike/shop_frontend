<template>
  <div class="relative flex flex-wrap items-start w-full">
    <div class="w-1/4 overflow-hidden rounded-lg aspect-square">
      <img
        :src="$ImageUrl(shopcart_item.product_data.Image1)"
        class="object-cover w-full h-full"
      />
    </div>
    <div
      class="w-3/4 pl-3 mb-4"
      v-if="GetActiveOption(shopcart_item) != 'error'"
    >
      <div class="flex items-center justify-between mb-2">
        <p class="text-sm font-bold truncate xs:text-base">
          {{ shopcart_item.product_data.Title }}
        </p>
        <button
          @click="$emit('remove-action', shopcart_index, shopcart_item.amount)"
          class="text-sm text-primary"
        >
          <span class="text-xl icon-trash"></span>
        </button>
      </div>
      <p class="text-xs font-medium text-opacity-60 text-basic_black">
        <span class="mr-2 text-xs font-medium text-primary">選項一</span>-
        {{ GetActiveOption(shopcart_item).ColorTitle }}
      </p>
      <p
        v-if="GetActiveOption(shopcart_item).SizeTitle != '無'"
        class="text-xs font-medium text-opacity-60 text-basic_black"
      >
        <span class="mr-2 text-xs font-medium text-primary">選項二</span>-
        {{ GetActiveOption(shopcart_item).SizeTitle }}
      </p>
    </div>
    <div class="flex justify-end w-full mt-2">
      <div class="flex items-center justify-between w-full">
        <div class="flex items-center">
          <div
            class="inline-flex items-stretch mr-5 bg-white border rounded-sm"
          >
            <button
              @click="$emit('remove-action', shopcart_index, 1)"
              class="px-2"
            >
              <span class="text-xs text-black icon-minus"></span>
            </button>
            <input
              :value="shopcart_item.amount"
              type="text"
              readonly
              class="w-10 text-center"
            />
            <button @click="$emit('add-action', shopcart_index)" class="px-2">
              <span class="text-xs text-black icon-plus"></span>
            </button>
          </div>
        </div>
        <p
          v-if="!is_member"
          class="text-sm font-bold font-anybody xs:text-base"
        >
          NT${{
            $MoneyFormat(
              parseInt(GetActiveOption(shopcart_item).SellPrice) *
                shopcart_item.amount
            )
          }}
        </p>
        <p v-else class="text-sm font-bold font-anybody xs:text-base">
          NT${{
            $MoneyFormat(
              parseInt(GetActiveOption(shopcart_item).MemberSellPrice) *
                shopcart_item.amount
            )
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getLocalStorage } from '@/common/cookie';
export default {
  name: 'ShopcartProductCard',
  props: {
    shopcart_item: {
      type: Object,
    },
    shopcart_index: {
      type: Number,
    },
  },
  methods: {
    GetActiveOption(shopcart_item) {
      const stock = shopcart_item.product_data.Stock.filter((item) => {
        return (
          item.ColorID == shopcart_item.active_option[0] &&
          item.SizeID == shopcart_item.active_option[1]
        );
      });
      return stock.length > 0 ? stock[0] : 'error';
    },
  },
  computed: {
    is_member() {
      return getLocalStorage('account_token');
    },
  },
};
</script>
