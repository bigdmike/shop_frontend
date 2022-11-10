<template>
  <nav data-nav class="flex justify-center mb-10 border-b border-zinc-300">
    <ol class="flex items-end md:w-auto w-full">
      <li
        v-for="item in tabs"
        :key="item"
        :class="
          active_tab == item
            ? 'text-secondary border-secondary'
            : 'border-transparent text-basic_gray'
        "
        class="border-b-2 md:w-auto w-1/3"
      >
        <button
          @click="$emit('change-tab', item)"
          class="md:px-20 md:w-auto w-full sm:text-base text-sm py-2 font-semibold link_color"
        >
          {{ item }}
        </button>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'ProductTabList',
  props: {
    active_tab: {
      type: String,
    },
    tabs: {
      type: Array,
    },
  },
};
</script>
