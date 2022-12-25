<template>
  <div class="relative z-10 w-full">
    <ol
      itemscope
      itemtype="https://schema.org/BreadcrumbList"
      class="flex flex-wrap items-center"
    >
      <template v-for="(item, item_index) in path">
        <li
          itemprop="itemListElement"
          itemscope
          itemtype="https://schema.org/ListItem"
          class="mr-2"
          :key="`path_${item_index}_link`"
        >
          <router-link
            itemscope
            itemtype="https://schema.org/WebPage"
            itemprop="item"
            :itemid="`https://www.yaowenfruit.com${item.link}`"
            :to="item.link"
            class="link_color"
            :class="
              item_index == path.length - 1
                ? 'text-basic_black font-bold '
                : 'text-basic_gray'
            "
          >
            <span itemprop="name">
              {{ item.title }}
            </span>
          </router-link>
          <meta itemprop="position" :content="item_index + 1" />
        </li>
        <span
          v-if="item_index != path.length - 1"
          class="mr-2"
          :key="`path_${item_index}_arrow`"
        >
          >
        </span>
      </template>
    </ol>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumb',
  props: {
    path: {
      require: true,
      type: Array,
    },
  },
};
</script>
