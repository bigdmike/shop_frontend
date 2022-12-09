<template>
  <div>
    <ol class="flex flex-wrap items-stretch justify-start -mx-2">
      <li
        v-for="(item, item_index) in page_product_data"
        :key="`product_${item_index}`"
        class="md:w-1/3 sm;w-1/2 w-full px-2 md:mb-20 mb-8"
      >
        <router-link
          :to="`/product/${item.GoodsID}`"
          class="block mb-2 overflow-hidden rounded-xl aspect-square"
        >
          <img
            :src="$ImageUrl(item.Image1)"
            class="block w-full transition-all duration-200 transform hover:scale-110"
          />
        </router-link>
        <h4 class="mb-2 font-semibold truncate">{{ item.Title }}</h4>
        <p>
          <span
            v-if="GetPrice(item).Price != GetPrice(item).SellPrice"
            class="mr-1 text-xs text-gray-500 line-through"
            >NT${{ GetPrice(item).Price | currency }}</span
          >
          <span class="text-green"
            >NT${{ GetPrice(item).SellPrice | currency }}</span
          >
        </p>
      </li>
      <li class="w-full text-center">
        <button
          @click="$emit('next-page')"
          v-if="page_product_data.length != product_data.length"
          class="px-16 py-3 font-bold transition-colors duration-200 bg-transparent border rounded-full text-primary border-primary hover:bg-primary hover:text-white"
        >
          查看更多商品
        </button>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    product_data: {
      require: true,
      type: Array,
    },
    page_product_data: {
      require: true,
      type: Array,
    },
  },
  methods: {
    GetPrice(item) {
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
  },
  filters: {
    currency(price) {
      let val = (price / 1).toFixed(0).replace('.', ',');
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
};
</script>
