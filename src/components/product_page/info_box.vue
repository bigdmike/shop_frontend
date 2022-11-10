<template>
  <section class="w-full relative z-10">
    <h2 class="sm:text-3xl text-2xl font-bold mb-5">
      {{ product_data.Title }}
    </h2>
    <div
      class="flex items-center justify-between pb-2 border-b border-zinc-300 mb-10"
    >
      <p class="sm:text-2xl font-semibold">
        <span
          v-if="active_stock.Price != active_stock.SellPrice"
          class="text-sm line-through text-basic_gray"
          >NT${{ active_stock.Price }}</span
        >
        NT${{ active_stock.SellPrice }}
      </p>
      <div class="flex items-center">
        <button
          class="w-9 h-9 mr-2 bg-basic_black flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-secondary"
        >
          <ShareLinkIcon class="text-white w-5" />
        </button>
        <button
          class="w-9 h-9 bg-basic_black flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-secondary"
        >
          <FacebookIcon class="text-white w-5" />
        </button>
      </div>
    </div>
    <div class="w-full mb-10">
      <p class="font-semibold mb-2">選項一</p>
      <div class="w-full relative mb-5">
        <SelectArrowIcon
          class="absolute top-1/2 right-5 transform -translate-y-1/2 w-4 z-10 touch-none"
        />
        <select
          class="relative z-0 border border-zinc-300 w-full px-5 py-3 appearance-none focus:outline-none rounded-lg"
        >
          <option
            v-for="(item, item_index) in first_options"
            :value="item.ColorID"
            :key="`option_${item_index}`"
          >
            {{ item.Title }}
          </option>
        </select>
      </div>
      <p class="font-semibold mb-2">選項二</p>
      <div class="w-full relative mb-5">
        <SelectArrowIcon
          class="absolute top-1/2 right-5 transform -translate-y-1/2 w-4 z-10 touch-none"
        />
        <select
          class="relative z-0 border border-zinc-300 w-full px-5 py-3 appearance-none focus:outline-none rounded-lg"
        >
          <option
            v-for="(item, item_index) in second_options"
            :value="item.SizeID"
            :key="`option_${item_index}`"
          >
            {{ item.Title }}
          </option>
        </select>
      </div>
      <p class="font-semibold mb-2">數量</p>
      <div
        class="w-full relative flex items-stretch border border-zinc-300 rounded-lg overflow-hidden"
      >
        <button
          @click="$emit('change-amount', -1)"
          class="px-5 py-4 text-black transition-color duration-200 hover:bg-secondary hover:text-white"
        >
          <MinusIcon class="w-3" />
        </button>
        <input
          class="flex-1 text-center focus:outline-none"
          type="text"
          :value="amount"
          readonly
        />
        <button
          @click="$emit('change-amount', 1)"
          class="px-5 py-4 text-black transition-color duration-200 hover:bg-secondary hover:text-white"
        >
          <PlusIcon class="w-3" />
        </button>
      </div>
    </div>
    <div class="md:block hidden">
      <button
        @click="$emit('add-cart')"
        class="block py-4 text-white rounded-lg text-center bg-primary w-full transition-colors duration-200 hover:bg-opacity-80"
      >
        加入購物車
      </button>
    </div>
  </section>
</template>

<script>
import PlusIcon from '@/components/svg/PlusIcon.vue';
import ShareLinkIcon from '@/components/svg/ShareLinkIcon.vue';
import MinusIcon from '@/components/svg/MinusIcon.vue';
import FacebookIcon from '@/components/svg/FacebookIcon.vue';
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
export default {
  name: 'ProductInfoBox',
  components: {
    ShareLinkIcon,
    FacebookIcon,
    SelectArrowIcon,
    MinusIcon,
    PlusIcon,
  },
  props: {
    product_data: {
      require: true,
      type: Object,
    },
    active_option: {
      require: true,
      type: Array,
    },
    amount: {
      require: true,
      type: Number,
    },
  },
  computed: {
    first_options() {
      let tmp_options = [];
      this.product_data.Stock.forEach((item) => {
        let option = tmp_options.filter(
          (option_item) => option_item.ColorID == item.ColorID
        );
        if (option.length <= 0) {
          tmp_options.push({
            ColorID: item.ColorID,
            Title: item.ColorTitle,
          });
        }
      });
      return tmp_options;
    },
    second_options() {
      let tmp_options = [];
      this.product_data.Stock.forEach((item) => {
        let option = tmp_options.filter(
          (option_item) => option_item.SizeID == item.SizeID
        );
        if (option.length <= 0) {
          if (item.ColorID == this.active_option[0]) {
            tmp_options.push({
              SizeID: item.SizeID,
              Title: item.SizeTitle,
            });
          }
        }
      });
      return tmp_options;
    },
    active_stock() {
      let stock = this.product_data.Stock.filter(
        (item) =>
          item.ColorID == this.active_option[0] &&
          item.SizeID == this.active_option[1]
      );
      return stock.length > 0
        ? stock[0]
        : { Status: 'N', Price: 0, SellPrice: 0 };
    },
  },
};
</script>
