<template>
  <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
    <div class="mb-10">
      <h2 class="relative inline-block px-8">
        <span
          data-section-subtitle-arrow
          class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
        ></span>
        <span
          data-section-subtitle
          class="block text-base font-medium leading-none md:leading-none text-basic_white"
          >商品圖片</span
        >
        <span
          data-section-subtitle-arrow
          class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
        ></span>
      </h2>
    </div>
    <div id="Gallery" class="flex flex-wrap items-stretch -mx-2">
      <div
        v-for="(item, item_index) in image_list"
        :key="`image_${item_index}`"
        class="w-full px-2 mb-4 md:w-1/3 sm:w-1/2"
      >
        <img :src="$ImageUrl(item.Image)" class="block w-full" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CustomProductGallery',
  props: {
    image_list: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
};
</script>
