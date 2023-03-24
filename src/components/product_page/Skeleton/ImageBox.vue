<template>
  <div>
    <div ref="BigSwiper" class="relative mb-5 swiper">
      <div
        class="relative w-full section_corner aspect-square skeleton opacity-10"
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

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0 100%,
    0 50px,

    50px 0
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,
    0 100%,
    0 50px,
    50px 0
  );
}
</style>
