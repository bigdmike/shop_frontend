<template>
  <div class="py-2">
    <div
      class="relative block mb-2 overflow-hidden aspect-square section_corner_tl bg-gradient-to-b from-basic_black to-transparent"
    >
      <div
        v-if="!stock_status"
        class="absolute top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center text-2xl font-bold text-white bg-black bg-opacity-70 font-anybody"
      >
        已售完
      </div>
      <img
        @click="
          $emit('open-dialog', product_data, product_data.IsCustom == 'Y')
        "
        :src="$ImageUrl(product_data.Image1)"
        :alt="product_data.Title"
        class="relative z-10 block object-contain w-full h-full transition-all duration-200 transform hover:scale-110"
      />
      <img
        src="/img/logo_white.svg"
        class="absolute z-0 w-1/3 top-3 right-3 mix-blend-overlay"
      />
    </div>
    <h4 class="mb-0 text-xl font-semibold text-white truncate font-anybody">
      {{ product_data.Title }}
    </h4>
    <p class="mb-5">
      <span
        v-if="GetPrice(product_data).Price != GetPrice(product_data).SellPrice"
        class="mr-1 text-xs text-gray-500 line-through font-anybody"
        >NT${{ $MoneyFormat(GetPrice(product_data).Price) }}</span
      >
      <span class="font-bold text-green font-anybody text-primary"
        >NT${{ $MoneyFormat(GetPrice(product_data).SellPrice) }}</span
      >
    </p>
    <div>
      <button
        @click="
          $emit('open-dialog', product_data, product_data.IsCustom == 'Y')
        "
        v-if="stock_status"
        class="block w-full py-3 font-bold text-center text-white rounded-md bg-primary"
      >
        立即選購
      </button>
      <button
        v-else
        disabled
        class="block w-full py-3 font-bold text-center rounded-md text-basic_gray text-opacity-30 bg-basic_black"
      >
        商品售完
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
      if (this.product_data.IsCustom == 'N') {
        // 一般商品，讀取Stock資料
        let tmp_data = JSON.parse(JSON.stringify(this.product_data.Stock));
        tmp_data = tmp_data.sort((a, b) => {
          return a.SellPrice < b.SellPrice;
        });
        return tmp_data[0];
      } else {
        // 客製化商品，讀取CustomGoodsStock資料
        return this.product_data.CustomGoodsStock[0];
      }
    },
  },
  computed: {
    stock_status() {
      let stock_count = 0;

      if (this.product_data.IsCustom == 'N') {
        this.product_data.Stock.forEach((product_data) => {
          if (product_data.Status == 'Y') {
            stock_count += parseInt(product_data.Stock);
          }
        });
      } else {
        stock_count = this.product_data.CustomGoodsStock[0].Stock;
      }

      return stock_count > 0;
    },
  },
};
</script>
