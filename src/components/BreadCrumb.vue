<template>
  <div class="w-full relative z-10">
    <ol class="flex items-center flex-wrap">
      <template v-for="(item, item_index) in path">
        <li class="mr-2" :key="`path_${item_index}_link`">
          <router-link
            :to="item.link"
            class="link_color"
            :class="
              item_index == path.length - 1
                ? 'text-basic_black font-bold '
                : 'text-basic_gray'
            "
            >{{ item.title }}</router-link
          >
        </li>
        <li
          v-if="item_index != path.length - 1"
          class="mr-2"
          :key="`path_${item_index}_arrow`"
        >
          <span>></span>
        </li>
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
