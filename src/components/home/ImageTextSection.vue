<template>
  <section class="w-full relative py-40">
    <div
      class="w-full max-w-screen-xl xl:px-0 md:px-5 px-10 mx-auto flex flex-wrap items-center"
    >
      <div class="lg:w-1/2 w-full rounded-3xl overflow-hidden lg:mb-0 mb-10">
        <img class="block w-full" :src="$ImageUrl(image)" />
      </div>
      <div class="lg:w-1/2 w-full text-center lg:pl-10">
        <header class="md:mb-10 mb-5">
          <h2 class="md:text-5xl sm:text-4xl text-3xl font-bold mb-2">
            關於我們
          </h2>
          <span class="md:text-2xl sm:text-xl">About Us</span>
        </header>
        <div class="tracking-wider mb-10" v-html="content"></div>
        <router-link
          to="/About"
          class="px-16 py-3 font-bold text-primary bg-transparent rounded-full border border-primary transition-colors duration-200 hover:bg-primary hover:text-white"
          >瞭解更多</router-link
        >
      </div>
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
};
</script>
