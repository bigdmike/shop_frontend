<template>
  <div>
    <div
      :class="open ? 'block' : 'hidden'"
      class="fixed top-0 bottom-0 left-0 right-0 z-10 bg-white bg-opacity-70"
    ></div>
    <div class="fixed bottom-0 left-0 right-0 z-20">
      <div
        class="text-primary flex items-center justify-between w-full px-5 py-4 bg-basic_white"
      >
        <button @click="open = !open" class="font-bold flex items-center">
          顯示訂單資訊<SelectArrowIcon
            :class="open ? '-scale-y-100' : ''"
            class="ml-2 w-4 transform"
          />
        </button>
        <p class="font-bold">NT${{ total_price }}</p>
      </div>
      <div
        :class="open ? 'max-h-screen pb-5' : 'max-h-0'"
        class="w-full overflow-hidden bg-basic_white"
      >
        <ol class="max-h-[300px] overflow-y-auto px-5 mb-5">
          <li
            :class="
              item_index != shopcart.length - 1
                ? ' border-b border-zinc-300'
                : ''
            "
            class="pb-5 mb-5 flex flex-wrap items-start"
            v-for="(item, item_index) in shopcart"
            :key="`shopcart_${item_index}`"
          >
            <div class="rounded-lg overflow-hidden w-20">
              <img :src="$ImageUrl(item.product_data.Image1)" class="w-full" />
            </div>
            <div class="w-3/4 pl-3 mb-10">
              <p class="font-bold text-sm mb-2">
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
            </div>
            <div class="w-full flex justify-end">
              <p class="font-bold text-sm">
                NT$
                {{
                  $MoneyFormat(
                    parseInt(GetActiveOption(item).SellPrice) * item.amount
                  )
                }}
              </p>
            </div>
          </li>
        </ol>
        <div class="px-5">
          <ol class="pb-5 px-5 mb-5 border-b border-t pt-5 border-zinc-300">
            <li class="w-full flex items-center justify-between text-sm mb-3">
              <p class="font-medium">合計</p>
              <p class="font-semibold">
                NT$ {{ $MoneyFormat(product_total_price) }}
              </p>
            </li>
            <li class="w-full flex items-center justify-between text-sm">
              <p class="font-medium">運費</p>
              <p class="font-semibold">NT$ {{ $MoneyFormat(ship_price) }}</p>
            </li>
          </ol>
          <div
            class="w-full px-5 pb-5 flex items-center justify-between text-sm"
          >
            <p class="font-medium">總金額</p>
            <p class="font-semibold">
              NT$
              {{ $MoneyFormat(total_price) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
export default {
  name: 'ShopCartFooter',
  props: {
    shopcart: {
      require: true,
      type: Array,
    },
    product_total_price: {
      require: true,
      type: Number,
    },
    ship_price: {
      require: true,
      type: Number,
    },
    total_price: {
      require: true,
      type: Number,
    },
  },
  data() {
    return {
      open: false,
    };
  },
  components: {
    SelectArrowIcon,
  },
  watch: {
    open() {
      if (this.open) {
        this.$store.commit('SetBodyLock', 1);
      } else {
        this.$store.commit('SetBodyLock', -1);
      }
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
  },
};
</script>
