<template>
  <section
    ref="MainContent"
    class="relative w-full py-32 -mt-20 sm:py-40 bg-basic_gray section_corner"
  >
    <div class="w-full max-w-screen-xl px-5 mx-auto sm:px-10 xl:px-0">
      <header
        :class="block_ready ? '' : 'opacity-0'"
        class="relative z-10 flex flex-col-reverse items-start w-full mb-10"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_black"
            >關於我們</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <h3 class="overflow-hidden">
          <span
            data-section-title
            data-text="About Us"
            class="block text-5xl font-black md:text-8xl sm:text-7xl text-primary font-anybody"
          >
            About Us
          </span>
        </h3>
      </header>

      <Skeleton v-if="!block_ready" />
      <div
        v-else
        data-section-content
        class="relative z-10 text-center md:flex md:items-center md:text-left md:justify-between"
      >
        <p
          class="mb-20 font-semibold md:mr-10 md:mb-0"
          v-html="$GetColumn('about_slogan')"
        ></p>
        <router-link
          @mouseenter.native="button_hover = true"
          @mouseleave.native="button_hover = false"
          to="/about"
          :class="button_hover ? 'border-transparent' : 'border-basic_black'"
          class="flex-shrink-0 inline-block px-12 py-6 border rounded-[100%] border-basic_black relative transition-all duration-500"
        >
          <div
            :class="button_hover ? 'text-basic_white' : 'text-basic_black'"
            class="relative z-10 inline-flex items-center justify-center font-bold tracking-wider transition-all duration-500 text-basic_black font-anybody"
          >
            Learn More <span class="ml-4 text-4xl icon-arrow_right"></span>
          </div>
          <span
            :class="button_hover ? 'scale-1' : 'scale-0'"
            class="transition-all duration-500 absolute top-0 left-0 right-0 bottom-0 transform rounded-[100%] bg-primary"
          ></span>
        </router-link>
      </div>

      <img
        src="/img/logo.svg"
        alt="Krace"
        class="absolute bottom-0 left-0 right-0 w-full opacity-5"
      />
    </div>
  </section>
</template>

<script>
import Skeleton from '@/components/home/Skeleton/About.vue';
import { section_animation } from '@/gsap/section.js';
export default {
  name: 'ImageTextSection',
  components: {
    Skeleton,
  },
  data() {
    return {
      button_hover: false,
      section_animation: null,
      block_ready: false,
    };
  },
  methods: {
    SetGsap() {
      this.block_ready = true;
      this.$nextTick(() => {
        this.section_animation = new section_animation(this.$refs.MainContent);
      });
    },
  },
};
</script>

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    0 0,
    0 100%,

    0 100%,
    100% 100%,

    100% 100%,
    100% 80px,

    calc(100% - 80px) 0
  );
  clip-path: polygon(
    0 0,
    0 100%,

    0 100%,
    100% 100%,

    100% 100%,
    100% 80px,

    calc(100% - 80px) 0
  );
}
</style>
