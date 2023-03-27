<template>
  <div>
    <ol class="flex flex-wrap items-stretch justify-start -mx-2">
      <li
        v-for="(item, item_index) in page_product_data.slice(0, 4)"
        :key="`product_${item_index}`"
        class="w-full px-2 mb-8 md:mb-10"
        :class="promote ? 'md:w-1/2' : ' lg:w-1/4 md:w-1/3 sm:w-1/2'"
      >
        <router-link
          :to="
            item.IsCustom == 'N'
              ? `/product/${item.GoodsID}`
              : `/product/custom/${item.GoodsID}`
          "
          class="relative block mb-2 overflow-hidden section_corner bg-gradient-to-b from-basic_black to-transparent"
          :class="promote ? 'aspect-video' : 'aspect-square'"
        >
          <img
            :src="$ImageUrl(item.Image1)"
            :alt="item.Title"
            class="relative z-10 block object-contain w-full h-full transition-all duration-200 transform hover:scale-110"
          />

          <img
            src="/img/logo_white.svg"
            :alt="$GetColumn('brand_name')"
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
          <span
            v-if="!is_member"
            class="font-bold text-green font-anybody text-primary"
            >NT${{ $MoneyFormat(GetPrice(item).SellPrice) }}</span
          >
          <span v-else class="font-bold text-green font-anybody text-primary"
            >NT${{ $MoneyFormat(GetPrice(item).MemberSellPrice) }}</span
          >
        </p>
      </li>
    </ol>
  </div>
</template>

<script>
import { getLocalStorage } from '@/common/cookie';
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
    promote: {
      require: true,
      type: Boolean,
      default: false,
    },
  },
  methods: {
    GetPrice(item) {
      if (item.IsCustom == 'N') {
        // 一般商品，讀取Stock資料
        let tmp_data = JSON.parse(JSON.stringify(item.Stock));
        if (this.is_member) {
          tmp_data = tmp_data.sort((a, b) => {
            return a.MemberSellPrice < b.MemberSellPrice;
          });
        } else {
          tmp_data = tmp_data.sort((a, b) => {
            return a.SellPrice < b.SellPrice;
          });
        }
        return tmp_data[0];
      } else {
        // 客製化商品，讀取CustomGoodsStock資料
        return item.CustomGoodsStock[0];
      }
    },
  },
  computed: {
    is_member() {
      return getLocalStorage('account_token');
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
