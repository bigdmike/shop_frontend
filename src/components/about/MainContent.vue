<template>
  <section ref="MainContent" class="relative z-10 w-full max-w-screen-md mb-60">
    <header
      class="relative z-10 flex flex-col-reverse items-start w-full md:mb-36 sm:mb-36 mb-28"
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
    <div data-section-content>
      <h3
        class="mb-10 text-2xl font-bold leading-relaxed text-black md:text-3xl font-anybody md:leading-relaxed"
        v-html="$GetColumn('about_slogan')"
      ></h3>
      <div class="mb-20 font-medium" v-html="$GetColumn('about_content')"></div>
      <div class="w-full overflow-hidden section_corner">
        <img :src="$ImageUrl($GetColumn('about_image'))" class="block w-full" />
      </div>
    </div>
  </section>
</template>

<script>
import { section_animation } from '@/gsap/section.js';
export default {
  name: 'AboutMainContent',
  data() {
    return {
      section_animation: null,
    };
  },
  methods: {
    SetGsap() {
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
  },
};
</script>
<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% calc(100% - 60px),
    calc(100% - 60px) 100%,
    0 100%,

    0% 0%,
    0% 0%
  );
  clip-path: polygon(
    100% 0,
    100% calc(100% - 60px),
    calc(100% - 60px) 100%,
    0 100%,

    0% 0%,
    0% 0%
  );
}

.section_corner_tl {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0% 60px,
    60px 0%
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0% 60px,
    60px 0%
  );
}

@media (max-width: 768px) {
  .section_corner {
    -webkit-clip-path: polygon(
      100% 0,
      100% calc(100% - 40px),
      calc(100% - 40px) 100%,
      0 100%,

      0% 0%,
      0% 0%
    );
    clip-path: polygon(
      100% 0,
      100% calc(100% - 40px),
      calc(100% - 40px) 100%,
      0 100%,

      0% 0%,
      0% 0%
    );
  }

  .section_corner_tl {
    -webkit-clip-path: polygon(
      100% 0,
      100% 100%,

      100% 100%,
      0 100%,

      0% 40px,
      40px 0%
    );
    clip-path: polygon(
      100% 0,
      100% 100%,

      100% 100%,
      0 100%,

      0% 40px,
      40px 0%
    );
  }
}
</style>
