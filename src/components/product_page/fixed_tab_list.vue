<template>
  <nav
    data-nav-fixed
    :class="show ? '-translate-x-full' : 'translate-x-0'"
    class="flex justify-center mb-10 border-b border-zinc-300 fixed sm:top-32 top-28 transform left-full w-full bg-white z-20"
  >
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
  name: 'FixedProductTabList',
  props: {
    active_tab: {
      type: String,
    },
    tabs: {
      type: Array,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  methods: {
    SetTrigger() {
      const el = document.querySelector('#ProductPage');
      const nav = el.querySelector('[data-nav]');

      window.addEventListener('scroll', () => {
        const offset_top = window.innerWidth <= 640 ? 112 : 128;
        nav.getBoundingClientRect().top <= offset_top
          ? (this.show = true)
          : (this.show = false);
      });
    },
  },
  mounted() {
    this.SetTrigger();
  },
};
</script>
