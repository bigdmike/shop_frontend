<template>
  <section class="relative w-full py-20 sm:py-40">
    <div
      class="flex flex-wrap items-center w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <div
        class="w-full mb-10 overflow-hidden lg:w-1/2 sm:rounded-3xl rounded-xl lg:mb-0"
      >
        <img
          class="block w-full"
          :alt="$GetCloumn('company_name')"
          :src="$ImageUrl(image)"
        />
      </div>
      <div class="w-full text-center lg:w-1/2 lg:pl-10">
        <header class="mb-5 md:mb-10">
          <h2 class="mb-2 text-3xl font-bold md:text-5xl sm:text-4xl">
            關於我們
          </h2>
          <span class="md:text-2xl sm:text-xl font-yeseva">About Us</span>
        </header>
        <div class="mb-10 tracking-wider" v-html="content"></div>
        <router-link
          to="/About"
          class="px-16 py-3 text-sm font-bold transition-colors duration-200 bg-transparent border rounded-full sm:text-base text-primary border-primary hover:bg-primary hover:text-white"
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
