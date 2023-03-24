<template>
  <div class="flex items-stretch mb-10 -mx-5 md:mx-0">
    <div
      class="flex flex-wrap items-center justify-between flex-shrink-0 w-full px-5 md:px-0 md:w-11/12"
    >
      <span class="relative w-full md:w-1/2 lg:w-2/3">
        <span
          class="absolute bottom-0 right-0 z-20 transition-all duration-700 transform translate-x-0 translate-y-0 image_corner -scale-100"
        ></span>
        <div class="absolute top-0 bottom-0 left-0 right-0 z-10"></div>
        <div
          class="relative z-0 block w-full aspect-[782/469] skeleton opacity-10"
        ></div>
      </span>

      <div
        class="w-full pt-5 md:pl-10 md:pr-0 md:w-1/2 md:pt-0 lg:pl-20 lg:w-1/3"
      >
        <div class="overflow-hidden">
          <span class="block w-2/5 h-3 mb-3 skeleton opacity-20 sm:h-4"></span>
        </div>
        <div class="block w-full h-8 mb-2 sm:h-9 skeleton opacity-80"></div>
        <div class="block w-3/5 h-8 mb-5 sm:h-9 skeleton opacity-80"></div>
        <div class="block w-full h-3 mb-2 opacity-50 sm:h-4 skeleton"></div>
        <div class="block w-2/3 h-3 mb-2 opacity-50 sm:h-4 skeleton"></div>
        <div class="block w-2/3 h-3 mb-5 opacity-50 sm:h-4 skeleton"></div>

        <div class="overflow-hidden">
          <div
            class="block w-11/12 h-12 mb-2 rounded-md opacity-50 skeleton"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeNewsSkeleton',
};
</script>
