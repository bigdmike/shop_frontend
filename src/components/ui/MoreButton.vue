<template>
  <button
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    @click="$emit('click')"
    class="relative z-10 inline-block px-10 py-2 overflow-hidden rounded-md"
  >
    <div
      class="relative z-10 inline-flex items-center justify-center font-bold tracking-wider text-basic_white font-anybody"
    >
      {{ text }} <span class="ml-4 text-2xl icon-arrow_right"></span>
    </div>
    <div
      :class="hover ? 'opacity-0' : 'opacity-100'"
      class="absolute transition-opacity duration-1000 top-0 bottom-0 left-0 right-0 z-0 bg-gradient-to-l from-disable_white to-[#f6f6f61e]"
    ></div>
    <div
      :class="hover ? '-translate-x-0' : '-translate-x-[150%]'"
      class="absolute -skew-x-[45deg] scale-x-150 transform transition-all duration-1000 top-0 bottom-0 left-0 right-0 z-[1] bg-gradient-to-l to-[#CC14155e] from-[#CC14151e]"
    ></div>
  </button>
</template>

<script>
export default {
  name: 'MoreLinkButton',
  props: {
    text: {
      type: String,
      default: 'Learn More',
    },
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>
