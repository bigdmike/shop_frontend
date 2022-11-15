<template>
  <nav>
    <h4 class="text-basic_gray font-bold mb-5 text-xl">文章類別</h4>
    <ol class="border-b border-zinc-300 pb-3">
      <li>
        <router-link
          to="/news/all"
          class="py-3 block font-bold link_color"
          :class="
            active_category == 'all' ? 'text-secondary' : 'text-basic_black'
          "
        >
          全部文章
        </router-link>
      </li>
      <li
        v-for="(item, item_index) in category_data"
        :key="`menu_${item_index}`"
      >
        <router-link
          :to="`/news/${item.NewsCategoryID}`"
          class="py-3 block font-bold link_color"
          :class="
            active_category == item.NewsCategoryID
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
  name: 'NewsCategoryMenu',
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
