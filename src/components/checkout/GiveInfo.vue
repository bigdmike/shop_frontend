<template>
  <div class="w-full">
    <GiveImageDialog ref="GiveImageDialog" />
    <div class="w-full">
      <h4 class="mb-2 font-bold text-white">活動贈品</h4>
    </div>
    <div class="w-full" v-if="show_give_info">
      <div
        class="flex items-center justify-between w-full p-3 mb-2 bg-black rounded-md"
        v-for="(item, item_index) in give_info"
        :key="`give_info_${item_index}`"
      >
        <div class="">
          <p class="text-sm font-bold text-white">
            {{ item.Title }}
          </p>
          <p class="text-sm text-primary">
            {{ item.GiveName }}
          </p>
        </div>
        <button
          @click="OpenImageDialog(item)"
          class="text-xs underline text-primary"
        >
          查看圖片
        </button>
      </div>
    </div>
    <div
      v-if="invalid_give_info && invalid_give_info.length > 0"
      class="w-full px-3 py-2 mt-2 border rounded-md bg-zinc-500 border-zinc-500 bg-opacity-20"
    >
      <span class="block mb-2 text-xs text-zinc-500">未達門檻 活動贈品</span>
      <div
        class="flex items-center justify-between mb-1"
        v-for="(item, item_index) in invalid_give_info"
        :key="`invalid_give_${item_index}`"
      >
        <div>
          <p class="text-sm text-white">
            {{ item.Title }}
          </p>
          <p class="text-xs text-primary">
            {{ item.GiveName }}
            <span class="ml-2 text-xs"
              >還差NT${{ $MoneyFormat(CheckThreshold(item)) }}</span
            >
          </p>
        </div>

        <button
          @click="OpenImageDialog(item)"
          class="text-xs underline text-primary"
        >
          查看圖片
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import GiveImageDialog from '@/components/product_page/EventImageDialog.vue';
export default {
  name: 'CheckoutGiveInfo',
  components: {
    GiveImageDialog,
  },
  props: {
    checkout_data: {
      require: true,
      type: Object,
    },
    give_info: {
      require: true,
      type: Array,
    },
    invalid_give_info: {
      require: true,
      type: Array,
    },
  },
  methods: {
    // 顯示贈品圖片
    OpenImageDialog(data) {
      this.$refs.GiveImageDialog.Open(data);
    },
    // 取得優惠門檻差額
    CheckThreshold(data) {
      if (data.GoodsIDArray.length <= 0) {
        // 全館優惠
        return (
          parseInt(data.Threshold) -
          parseInt(this.checkout_data.AfterCouponTotal)
        );
      } else {
        // 指定分類優惠
        let product_price_count = 0;
        this.checkout_data.CheckoutList.forEach((product) => {
          if (data.GoodsIDArray.indexOf(product.GoodsID) != -1) {
            product_price_count += parseInt(product.DiscountPrice);
          }
        });
        return parseInt(data.Threshold) - product_price_count;
      }
    },
  },
  computed: {
    show_give_info() {
      return this.give_info.length > 0;
    },
  },
};
</script>
