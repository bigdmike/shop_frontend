<template>
  <div>
    <ol class="flex flex-wrap items-stretch justify-start -mx-2">
      <li
        v-for="(item, item_index) in product_data"
        :key="`product_${item_index}`"
        class="md:w-1/3 sm;w-1/2 w-full px-2 md:mb-20 mb-8"
      >
        <router-link
          :to="
            item.IsCustom == 'N'
              ? `/product/${item.GoodsID}`
              : `/product/custom/${item.GoodsID}`
          "
          class="relative block mb-2 overflow-hidden aspect-square section_corner bg-gradient-to-b from-basic_black to-transparent"
        >
          <img
            :src="$ImageUrl(item.Image1)"
            :alt="item.Title"
            class="relative z-10 block object-contain w-full h-full transition-all duration-200 transform hover:scale-110"
          />
          <img
            src="/img/logo_white.svg"
            class="absolute z-0 w-1/3 top-3 right-3 mix-blend-overlay"
          />
        </router-link>
        <h4 class="mb-0 text-xl font-semibold text-white truncate font-anybody">
          {{ item.Title }}
        </h4>
        <p>
          <span
            v-if="GetPrice(item).Price != GetPrice(item).SellPrice"
            class="mr-1 text-xs text-gray-500 line-through font-anybody"
            >NT${{ $MoneyFormat(GetPrice(item).Price) }}</span
          >
          <span class="font-bold text-green font-anybody text-primary"
            >NT${{ $MoneyFormat(GetPrice(item).SellPrice) }}</span
          >
        </p>
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
  },
  methods: {
    GetPrice(item) {
      if (item.IsCustom == 'N') {
        // 一般商品，讀取Stock資料
        let tmp_data = JSON.parse(JSON.stringify(item.Stock));
        tmp_data = tmp_data.sort((a, b) => {
          return a.SellPrice < b.SellPrice;
        });
        return tmp_data[0];
      } else {
        // 客製化商品，讀取CustomGoodsStock資料
        return item.CustomGoodsStock[0];
      }
    },
  },
};
</script>

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0 100%,
    0 50px,

    50px 0
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,
    0 100%,
    0 50px,
    50px 0
  );
}
</style>
