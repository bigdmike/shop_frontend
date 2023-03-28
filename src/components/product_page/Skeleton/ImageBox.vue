<template>
  <div>
    <div ref="BigSwiper" class="relative mb-5 swiper">
      <div
        class="relative w-full section_corner_tl aspect-square skeleton opacity-10"
      ></div>
    </div>
    <div>
      <div class="flex w-full">
        <div class="w-1/4 mx-2 aspect-square skeleton"></div>
        <div class="w-1/4 mx-2 aspect-square skeleton"></div>
        <div class="w-1/4 mx-2 aspect-square skeleton"></div>
        <div class="w-1/4 mx-2 aspect-square skeleton"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductImageSkeleton',
};
</script>
