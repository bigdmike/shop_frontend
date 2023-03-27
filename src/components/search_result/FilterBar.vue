<template>
  <div class="flex flex-wrap items-center justify-between">
    <div class="relative w-full mb-10 text-center text-white sm:w-auto sm:mb-0">
      <p>
        搜尋『{{ $route.params.key_word }}』，總共有{{
          product_data.length
        }}項搜尋結果
      </p>
    </div>
    <div class="relative w-1/2 pl-2 md:w-1/4">
      <span
        class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
      ></span>
      <select
        :value="sort_type"
        @input="$emit('change-type', $event.target.value)"
        class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-basic_black focus:outline-none"
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
  components: {},
};
</script>
