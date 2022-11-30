<template>
  <nav>
    <h4 class="mb-5 text-xl font-bold text-basic_gray">商品類別</h4>
    <ol class="pb-3 border-b border-zinc-300">
      <li>
        <router-link
          to="/collections?category=all"
          class="block py-3 font-bold link_color"
          :class="
            active_category == 'all' ? 'text-secondary' : 'text-basic_black'
          "
        >
          全部商品
        </router-link>
      </li>
      <li
        v-for="(item, item_index) in category_data"
        :key="`menu_${item_index}`"
      >
        <router-link
          :to="`/collections?category=${item.MenuID}`"
          class="block py-3 font-bold link_color"
          :class="
            active_category == item.MenuID
              ? 'text-secondary'
              : 'text-basic_black'
          "
        >
          {{ item.Title }}
        </router-link>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'ProductCategoryMenu',
  props: {
    active_category: {
      type: String,
      require: true,
    },
    category_data: {
      type: Array,
      require: true,
    },
  },
};
</script>
