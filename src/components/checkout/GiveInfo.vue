<template>
  <div class="w-full" v-if="show_give_info">
    <GiveImageDialog ref="GiveImageDialog" />
    <div class="w-full">
      <h4 class="mb-2 font-bold text-white">活動贈品</h4>
    </div>
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
</template>

<script>
import GiveImageDialog from '@/components/product_page/EventImageDialog.vue';
export default {
  name: 'CheckoutGiveInfo',
  components: {
    GiveImageDialog,
  },
  props: {
    give_info: {
      require: true,
      type: Array,
    },
  },
  methods: {
    OpenImageDialog(data) {
      this.$refs.GiveImageDialog.Open(data);
    },
  },
  computed: {
    show_give_info() {
      return this.give_info.length > 0;
    },
  },
};
</script>
