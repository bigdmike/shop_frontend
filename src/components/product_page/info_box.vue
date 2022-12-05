<template>
  <section class="relative z-10 w-full">
    <EventImageDialog ref="EventImageDialog" />
    <h2 class="mb-5 text-xl font-bold xs:text-2xl sm:text-3xl">
      {{ product_data.Title }}
    </h2>
    <div
      class="flex items-center justify-between pb-2 mb-5 border-b border-zinc-300"
    >
      <p class="font-semibold sm:text-2xl">
        <span
          v-if="active_stock.Price != active_stock.SellPrice"
          class="text-sm line-through text-basic_gray"
          >NT${{ active_stock.Price }}</span
        >
        NT${{ active_stock.SellPrice }}
      </p>
      <div class="flex items-center">
        <button
          @click="CopyLink"
          class="flex items-center justify-center mr-2 transition-colors duration-200 rounded-md w-9 h-9 bg-basic_black hover:bg-secondary"
        >
          <ShareLinkIcon class="w-5 text-white" />
        </button>
        <button
          @click="ShareToFB"
          class="flex items-center justify-center mr-2 transition-colors duration-200 rounded-md w-9 h-9 bg-basic_black hover:bg-secondary"
        >
          <FacebookIcon class="w-5 text-white" />
        </button>
        <button
          @click="ShareToLine"
          class="flex items-center justify-center transition-colors duration-200 rounded-md w-9 h-9 bg-basic_black hover:bg-secondary"
        >
          <LineIcon class="w-5 text-white" />
        </button>
      </div>
    </div>

    <div v-if="product_data.Discount.length > 0" class="mb-5">
      <p class="mb-2 text-sm text-primary">此商品參與的優惠活動</p>
      <ol
        class="py-2 border rounded-lg text-primary bg-primary bg-opacity-10 border-primary"
      >
        <li
          class="flex items-center px-4 py-1 text-sm"
          :key="`event_${item_index}`"
          v-for="(item, item_index) in product_data.Discount"
        >
          {{ item.Title }}
          <a
            @click="OpenEventImageDialog(item)"
            v-if="item.Image1 != ''"
            class="block ml-2 text-xs font-bold underline cursor-pointer"
            >查看贈品</a
          >
        </li>
      </ol>
    </div>
    <div class="w-full mt-5 mb-10">
      <p class="mb-2 font-semibold" v-if="first_options.length > 0">選項一</p>
      <div class="relative w-full mb-5" v-if="first_options.length > 0">
        <SelectArrowIcon
          class="absolute z-10 w-4 transform -translate-y-1/2 pointer-events-none top-1/2 right-5"
        />
        <select
          @input="$emit('change-option', 0, $event.target.value)"
          :value="active_option[0]"
          class="relative z-0 w-full px-5 py-3 border rounded-lg appearance-none border-zinc-300 focus:outline-none"
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
      <p class="mb-2 font-semibold" v-if="second_options.length > 0">選項二</p>
      <div class="relative w-full mb-5" v-if="second_options.length > 0">
        <SelectArrowIcon
          class="absolute z-10 w-4 transform -translate-y-1/2 pointer-events-none top-1/2 right-5"
        />
        <select
          @input="$emit('change-option', 1, $event.target.value)"
          :value="active_option[1]"
          class="relative z-0 w-full px-5 py-3 border rounded-lg appearance-none border-zinc-300 focus:outline-none"
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
      <p class="mb-2 font-semibold" v-if="second_options.length > 0">
        數量

        <span class="ml-3 text-sm text-center text-primary">
          目前庫存數量：{{ active_stock.Stock }}
        </span>
      </p>
      <div
        v-if="product_data.Stock.length > 0"
        class="relative flex items-stretch w-full overflow-hidden border rounded-lg border-zinc-300"
      >
        <button
          @click="$emit('change-amount', -1)"
          class="px-5 py-4 text-black duration-200 transition-color hover:bg-secondary hover:text-white"
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
          @click="amount >= active_stock.Stock ? '' : $emit('change-amount', 1)"
          class="px-5 py-4 text-black duration-200 transition-color hover:bg-secondary hover:text-white"
        >
          <PlusIcon class="w-3" />
        </button>
      </div>
    </div>
    <div class="hidden md:block">
      <button
        v-if="active_stock.Stock > 0"
        @click="$emit('add-cart')"
        class="block w-full py-4 text-center text-white transition-colors duration-200 rounded-lg bg-primary hover:bg-opacity-80"
      >
        加入購物車
      </button>
      <button
        v-else
        class="block w-full py-4 text-center text-white transition-colors duration-200 rounded-lg cursor-not-allowed bg-zinc-600 hover:bg-opacity-80"
      >
        商品已售完
      </button>
    </div>
  </section>
</template>

<script>
import PlusIcon from '@/components/svg/PlusIcon.vue';
import MinusIcon from '@/components/svg/MinusIcon.vue';
import ShareLinkIcon from '@/components/svg/ShareLinkIcon.vue';
import FacebookIcon from '@/components/svg/FacebookIcon.vue';
import LineIcon from '@/components/svg/LineIcon.vue';
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
import EventImageDialog from '@/components/product_page/EventImageDialog.vue';
export default {
  name: 'ProductInfoBox',
  components: {
    ShareLinkIcon,
    FacebookIcon,
    SelectArrowIcon,
    LineIcon,
    MinusIcon,
    PlusIcon,
    EventImageDialog,
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
  methods: {
    OpenEventImageDialog(item) {
      this.$refs.EventImageDialog.Open(item);
    },
    CopyLink() {
      this.$refs.clone.focus();
      document.execCommand('copy');
      alert('已複製到剪貼簿');
    },
    ShareToFB() {
      window
        .open(
          `https://www.facebook.com/sharer.php?u=${window.location.href}`,
          '_blank'
        )
        .focus();
    },
    ShareToLine() {
      window.open(`line://msg/text/${window.location.href}`, '_blank').focus();
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
      let options = this.product_data.Stock.filter(
        (option_item) => option_item.ColorID == this.active_option[0]
      );
      options.forEach((item) => {
        let option = tmp_options.filter(
          (option_item) => option_item.SizeID == item.SizeID
        );
        if (option.length <= 0) {
          tmp_options.push({
            SizeID: item.SizeID,
            Title: item.SizeTitle,
          });
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
