<template>
  <div class="relative w-full">
    <div
      :class="reverse ? 'ml-auto ' : ''"
      class="relative z-0 w-full md:w-2/3"
    >
      <div
        :class="
          reverse
            ? ' translate-x-5 sm:translate-x-10'
            : '-translate-x-5 sm:-translate-x-10'
        "
        class="relative z-0 block w-full overflow-hidden transform md:translate-x-0"
      >
        <div
          class="relative z-0 overflow-hidden aspect-[853/480] skeleton opacity-10"
        ></div>
      </div>
    </div>

    <div
      :class="reverse ? 'md:left-0 md:pl-10' : 'md:right-0 md:pr-10'"
      class="z-10 min-w-[45%] transform md:absolute md:-translate-y-1/2 -translate-y-1/3 md:top-1/2"
    >
      <div class="flex flex-col-reverse items-start">
        <div class="block w-1/2 h-12 rounded-md bg-bg_black">
          <div class="w-full h-full rounded-md opacity-40 skeleton"></div>
        </div>
        <div class="w-2/5 mb-5 h-7 md:mb-10 lg:h-8 bg-bg_black">
          <span class="block w-full h-full skeleton opacity-20"></span>
        </div>

        <div class="block w-1/2 mb-4 h-7 sm:h-10 lg:h-12 bg-bg_black">
          <span class="block w-full h-full skeleton opacity-40"></span>
        </div>

        <div class="block w-3/5 mb-2 h-7 sm:h-10 lg:h-12 bg-bg_black">
          <span class="block w-full h-full skeleton opacity-40"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainProductSectionCard',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
