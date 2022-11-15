<template>
  <div class="flex flex-wrap items-center justify-between">
    <div class="relative sm:w-auto w-full text-center sm:mb-0 mb-10">
      <p>
        搜尋『{{ $route.params.key_word }}』，總共有{{
          product_data.length
        }}項搜尋結果
      </p>
    </div>
    <div class="relative md:w-1/4 sm:w-1/3 w-full md:pl-2">
      <SelectArrowIcon
        class="w-5 absolute top-1/2 right-0 transform -translate-y-1/2 text-zinc-400 z-10 pointer-events-none"
      />
      <select
        :value="sort_type"
        @input="$emit('change-type', $event.target.value)"
        class="relative pr-5 appearance-none pb-2 border-b border-zinc-300 w-full focus:outline-none"
      >
        <option>推薦排序</option>
        <option>價錢由低到高</option>
        <option>價錢由高到低</option>
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
    product_data: {
      type: Array,
      require: true,
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
