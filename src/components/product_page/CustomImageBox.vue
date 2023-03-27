<template>
  <div>
    <div
      class="relative w-full overflow-hidden bg-gradient-to-b from-basic_black to-transparent section_corner aspect-square"
    >
      <Skeleton v-if="!block_ready" />
      <div v-else class="relative w-full h-full">
        <div
          v-for="(category, category_index) in category_list"
          :key="`category_${category_index}`"
          class="absolute top-0 left-0 w-full h-full"
          :style="`z-index:${category_index + 2}`"
        >
          <img
            v-if="
              CheckImagePath(category.SpecCategoryTitle) &&
              active_option[category_index] &&
              active_option[category_index] != ''
            "
            :alt="product_data.Title + '-' + category.SpecCategoryTitle"
            width="640"
            height="640"
            :src="GetImage(category_index)"
            class="relative z-10 object-cover w-full h-full"
          />
        </div>
        <img
          width="640"
          height="640"
          :alt="product_data.Title + '-本體'"
          :src="CheckImagePath('本體') + 'base.webp'"
          class="absolute z-[1] top-0 left-0 object-cover w-full h-full"
        />
        <img
          width="550"
          height="122"
          src="/img/logo_white.svg"
          :alt="$GetColumn('brand_name')"
          class="absolute z-0 w-11/12 transform -translate-x-1/2 -translate-y-1/2 opacity-20 top-1/2 left-1/2 mix-blend-overlay"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Skeleton from '@/components/product_page/Skeleton/ImageBox.vue';
export default {
  name: 'CustomProductImageBox',
  props: {
    category_list: {
      type: Array,
    },
    spec_list: {
      type: Array,
    },
    active_option: {
      type: Array,
    },
    image_path: {
      type: Object,
    },
    product_data: {
      type: Object,
    },
  },
  components: {
    Skeleton,
  },
  data() {
    return {
      block_ready: false,
    };
  },
  methods: {
    CheckImagePath(key) {
      return this.image_path[key];
    },
    GetImage(index) {
      const dir_path = this.CheckImagePath(
        this.category_list[index].SpecCategoryTitle
      );
      const option_name = this.spec_list.filter(
        (item) => item.CustomSpecID == this.active_option[index]
      )[0].SpecTitle;

      return dir_path + option_name + '.webp';
    },
    SetGsap() {
      this.block_ready = true;
    },
  },
  mounted() {},
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
