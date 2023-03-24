<template>
  <div
    class="relative z-10 text-center md:flex md:items-center md:text-left md:justify-between"
  >
    <div class="w-full mb-20 md:mr-10 md:mb-0">
      <span class="block w-full h-4 mb-2 bg-bg_black">
        <span class="block w-full h-full skeleton opacity-80"></span>
      </span>
      <span class="block w-2/3 h-4 bg-bg_black">
        <span class="block w-full h-full skeleton opacity-80"></span>
      </span>
    </div>
    <span
      class="relative flex-shrink-0 inline-block px-12 py-6 border border-transparent rounded-md bg-bg_black opacity-20"
    >
      <div class="relative z-10">
        <div
          class="inline-flex items-center justify-center font-bold tracking-wider opacity-0 font-anybody"
        >
          Learn More <span class="ml-4 text-4xl icon-arrow_right"></span>
        </div>
      </div>
    </span>
  </div>
</template>

<script>
export default {
  name: 'HomeAboutSkeleton',
};
</script>
