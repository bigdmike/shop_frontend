<template>
  <div>
    <div class="relative md:hidden block w-1/2 pl-2 mr-2">
      <SelectArrowIcon
        class="w-5 absolute top-1/2 right-0 transform -translate-y-1/2 text-zinc-400 z-10 pointer-events-none"
      />
      <select
        :value="active_category"
        @input="$emit('change-category', $event.target.value)"
        class="relative pr-5 appearance-none pb-2 border-b border-zinc-300 w-full focus:outline-none"
      >
        <option value="all">全部商品</option>
        <option
          v-for="(item, item_index) in category_data"
          :key="`category_md_${item_index}`"
          :value="item.MenuID"
        >
          {{ item.Title }}
        </option>
      </select>
    </div>
    <div class="relative md:w-1/4 w-1/2 pl-2">
      <SelectArrowIcon
        class="w-5 absolute top-1/2 right-0 transform -translate-y-1/2 text-zinc-400 z-10 pointer-events-none"
      />
      <select
        :value="sort_type"
        @input="$emit('change-type', $event.target.value)"
        class="relative pr-5 appearance-none pb-2 border-b border-zinc-300 w-full focus:outline-none"
      >
        <option>推薦排序</option>
        <option>時間由舊到新</option>
        <option>時間由新到舊</option>
      </select>
    </div>
  </div>
</template>

<script>
import SelectArrowIcon from '@/components/svg/SelectArrowIcon.vue';
export default {
  name: 'ProductListFilterBar',
  props: {
    category_data: {
      require: true,
      type: Array,
    },
    active_category: {
      require: true,
      type: String,
      default: 'all',
    },
    sort_type: {
      require: true,
      type: String,
      default: '推薦排序',
    },
  },
  components: {
    SelectArrowIcon,
  },
};
</script>
