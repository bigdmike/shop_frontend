<template>
  <div class="py-2">
    <div class="mb-4 overflow-hidden rounded-2xl aspect-square">
      <img
        @click="$emit('open-dialog', product_data)"
        :src="$ImageUrl(product_data.Image1)"
        :alt="product_data.Title"
        class="block w-full transition-all duration-300 transform cursor-pointer hover:scale-110"
      />
    </div>
    <div class="text-center">
      <h4 class="mb-2 font-bold truncate text-secondary">
        {{ product_data.Title }}
      </h4>
      <p class="mb-4">
        <span
          v-if="GetPrice().Price != GetPrice().SellPrice"
          class="mr-1 text-xs text-gray-500 line-through"
          >NT${{ GetPrice().Price | currency }}</span
        >
        <span class="text-green">NT${{ GetPrice().SellPrice | currency }}</span>
      </p>
      <button
        @click="$emit('open-dialog', product_data)"
        class="w-full px-4 py-2 text-white transition-all duration-300 rounded-lg bg-secondary hover:opacity-80"
      >
        選購
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product_data: {
      require: true,
    },
  },
  methods: {
    GetPrice() {
      let tmp_data = JSON.parse(JSON.stringify(this.product_data.Stock));
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
