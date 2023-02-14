<template>
  <section
    class="relative w-full py-32 -mt-20 sm:py-40 bg-basic_gray section_corner"
  >
    <div class="w-full max-w-screen-xl px-5 mx-auto sm:px-10 xl:px-0">
      <header
        class="relative z-10 flex flex-col-reverse w-full mb-10 text-center md:mb-5 md:text-left"
      >
        <h2 class="relative font-bold sm:text-xl md:text-2xl text-basic_black">
          <span
            class="inline-block mr-[2px] text-lg transform icon-triangle text-primary -scale-100"
          ></span>
          關於我們
          <span
            class="text-lg inline-block ml-[2px] icon-triangle text-primary"
          ></span>
        </h2>
        <h3
          class="text-5xl font-black md:text-8xl sm:text-7xl text-primary font-anybody"
        >
          About us
        </h3>
      </header>
      <div
        class="relative z-10 text-center md:flex md:items-center md:text-left md:justify-between"
      >
        <p class="mb-20 font-semibold md:mr-10 md:mb-0">
          KRACE創立於2016年，著重於CNC、車銑製品開發，展現加工工藝於機車部品上，豐富您的視覺。
        </p>
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
export default {
  name: 'ImageTextSection',
  props: {
    image: {
      require: true,
      type: String,
    },
    content: {
      require: true,
      type: String,
    },
  },
  data() {
    return {
      button_hover: false,
    };
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
