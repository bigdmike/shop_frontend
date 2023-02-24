<template>
  <nav>
    <!-- <h4 class="relative mb-5">
      <span
        data-section-subtitle
        class="block font-bold leading-none sm:text-xl md:leading-none text-basic_white"
        >商品類別</span
      >
    </h4> -->
    <ol class="pb-3">
      <li>
        <router-link
          to="/collections?category=all"
          class="relative block py-3 pr-5 font-bold link_color"
          :class="
            active_category == 'all'
              ? 'text-primary'
              : 'text-basic_gray text-opacity-50'
          "
        >
          全部商品
          <span
            class="absolute bottom-0 right-0 z-10 text-xs icon-triangle text-primary"
            :class="active_category == 'all' ? 'block' : 'hidden'"
          ></span>
        </router-link>
      </li>
      <li
        v-for="(item, item_index) in category_data"
        :key="`menu_${item_index}`"
      >
        <router-link
          :to="`/collections?category=${item.MenuID}`"
          class="relative block w-full py-3 pr-5 font-medium truncate"
          :class="
            active_category == item.MenuID
              ? 'text-primary'
              : 'text-basic_gray text-opacity-50'
          "
        >
          {{ item.Title }}

          <span
            class="absolute bottom-0 right-0 z-10 text-xs icon-triangle text-primary"
            :class="active_category == item.MenuID ? 'block' : 'hidden'"
          ></span>
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
