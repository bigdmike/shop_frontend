<template>
  <div>
    <div class="relative w-1/2 pl-2 mr-2 md:w-1/4">
      <!-- <SelectArrowIcon
        class="absolute right-0 z-10 w-5 transform -translate-y-1/2 pointer-events-none top-1/2 text-zinc-400"
      />
      <select
        :value="active_category"
        @input="$emit('change-category', $event.target.value)"
        class="relative w-full pb-2 pr-5 border-b appearance-none border-zinc-300 focus:outline-none"
      >
        <option value="all">全部商品</option>
        <option
          v-for="(item, item_index) in category_data"
          :key="`category_md_${item_index}`"
          :value="item.MenuID"
        >
          {{ item.Title }}
        </option>
      </select> -->
      <span
        class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
      ></span>
      <select
        :value="active_category"
        @input="$emit('change-category', $event.target.value)"
        class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-basic_black focus:outline-none"
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

    <!-- <div class="relative w-1/2 pl-2 md:w-1/4">
      <SelectArrowIcon
        class="absolute right-0 z-10 w-5 transform -translate-y-1/2 pointer-events-none top-1/2 text-zinc-400"
      />
      <select
        :value="sort_type"
        @input="$emit('change-type', $event.target.value)"
        class="relative w-full pb-2 pr-5 border-b appearance-none border-zinc-300 focus:outline-none"
      >
        <option>推薦排序</option>
        <option>價錢由低到高</option>
        <option>價錢由高到低</option>
        <option>時間由舊到新</option>
        <option>時間由新到舊</option>
      </select>
    </div> -->
  </div>
</template>

<script>
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
  components: {},
};
</script>
