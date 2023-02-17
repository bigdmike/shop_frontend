<template>
  <div
    ref="MainContent"
    class="absolute z-10 flex items-center transform md:-translate-y-1/2 md:top-1/2 sm:top-32 top-20 md:right-14 md:left-auto sm:left-10 left-5 md:block"
  >
    <p data-number-box class="relative sm:h-6 h-[14px] overflow-hidden">
      <span
        class="block text-sm font-bold leading-none tracking-widest text-center sm:text-base font-anybody text-primary"
        v-for="number in carousel_data.length"
        :key="`now_number_${number}`"
      >
        {{ $AddZeroPad(number) }}
      </span>
    </p>
    <span
      class="md:block hidden w-[1.5px] h-32 bg-basic_gray relative mx-auto my-2"
    >
      <i
        data-progress-vertical
        class="absolute top-0 bottom-0 left-0 right-0 block origin-top transform bg-primary"
      ></i>
    </span>
    <span
      class="md:hidden block h-[1.5px] w-32 bg-basic_gray relative my-auto mx-2"
    >
      <i
        data-progress-horizontal
        class="absolute top-0 bottom-0 left-0 right-0 block origin-left transform bg-primary"
      ></i>
    </span>
    <p data-number-box class="relative sm:h-6 h-[14px] overflow-hidden">
      <span
        class="block text-sm font-bold leading-none tracking-widest text-center sm:text-base font-anybody text-basic_gray"
        v-for="number in carousel_data.length"
        :key="`now_number_${number}`"
      >
        {{ $AddZeroPad(number) }}
      </span>
    </p>
  </div>
</template>

<script>
import { home_carousel_timeline } from '@/gsap/home/carousel_timeline.js';
export default {
  name: 'CarouselTimeline',
  props: {
    carousel_data: {
      require: true,
      type: Array,
    },
  },
  data() {
    return {
      progress_timeline: null,
    };
  },
  methods: {
    Next(now_index, next_index) {
      this.progress_timeline.next(now_index, next_index);
    },
  },
  mounted() {
    this.progress_timeline = new home_carousel_timeline(this.$refs.MainContent);
  },
};
</script>
