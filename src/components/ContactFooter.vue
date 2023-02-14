<template>
  <section
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="relative z-10 w-full py-32 overflow-hidden bg-basic_black"
  >
    <div
      class="relative flex items-center justify-center w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10"
    >
      <button class="relative z-10 inline-block py-5 px-14">
        <div class="relative z-10">
          <h3
            :class="
              hover ? 'text-basic_black' : 'text-basic_white text-opacity-20'
            "
            class="md:text-[100px] text-[70px] sm:text-center text-left transition-colors duration-500 leading-none font-black font-anybody"
          >
            Contact Us
          </h3>
          <h4
            :class="hover ? 'text-basic_black' : 'text-basic_white'"
            class="text-2xl font-bold leading-none text-left transition-colors duration-500 sm:text-center md:text-3xl"
          >
            聯絡我們
          </h4>
        </div>

        <img
          src="/img/ContactButtonBg.webp"
          class="absolute top-0 bottom-0 left-0 z-0 w-full h-full"
        />

        <span
          class="absolute bottom-0 right-0 text-2xl md:text-4xl icon-triangle text-primary"
        ></span>
        <span
          :class="
            hover
              ? 'md:-translate-y-10 -translate-y-6 -translate-x-6 opacity-20'
              : '-translate-y-20 -translate-x-12 opacity-0'
          "
          class="absolute -scale-100 top-0 left-0 transform md:text-[240px] text-[180px] z-0 transition-all duration-700 icon-triangle text-primary"
        ></span>
      </button>
    </div>

    <div
      :class="hover ? 'scale-150' : 'scale-0'"
      class="absolute top-0 left-0 z-0 w-full h-full bg-primary bg-opacity-60 rounded-[100%] transform transition-all duration-700"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'ContactFooter',
  data() {
    return {
      hover: false,
    };
  },
};
</script>
