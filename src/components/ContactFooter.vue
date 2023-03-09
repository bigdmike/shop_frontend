<template>
  <section
    data-scroll-section
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="relative z-10 w-full py-32 overflow-hidden bg-basic_black"
  >
    <div
      class="relative flex items-center justify-center w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10"
    >
      <router-link
        to="/contact"
        class="relative z-10 inline-block py-5 sm:px-14"
      >
        <div class="relative w-full max-w-screen-md">
          <img
            src="/img/ContactButtonBg.webp"
            :class="hover ? 'opacity-0' : 'opacity-100'"
            class="relative z-0 hidden object-contain w-full transition-all duration-500 sm:block"
          />
          <img
            src="/img/ContactButtonBg_active.webp"
            :class="hover ? 'opacity-100' : 'opacity-0'"
            class="absolute top-0 bottom-0 left-0 z-0 hidden object-contain w-full h-full transition-all duration-500 sm:block"
          />
          <img
            src="/img/ContactButtonBg@sm.webp"
            :class="hover ? 'opacity-0' : 'opacity-100'"
            class="relative z-0 block object-contain w-full transition-all duration-500 sm:hidden"
          />
          <img
            src="/img/ContactButtonBg@sm_active.webp"
            :class="hover ? 'opacity-100' : 'opacity-0'"
            class="absolute top-0 bottom-0 left-0 z-0 block object-contain w-full h-full transition-all duration-500 sm:hidden"
          />
          <span
            :class="
              hover
                ? 'md:-translate-y-6 -translate-y-6 -translate-x-6 opacity-20'
                : '-translate-y-20 -translate-x-12 opacity-0'
            "
            class="absolute -scale-100 top-0 left-0 transform md:text-[180px] text-[180px] z-[-1] transition-all duration-700 icon-triangle text-primary"
          ></span>
        </div>
      </router-link>
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
  mounted() {
    console.log('Contact footer loaded');
  },
};
</script>
