<template>
  <section class="w-full relative">
    <div class="w-full max-w-screen-xl xl:px-0 px-5 mx-auto">
      <div class="flex flex-wrap -mx-2">
        <div
          class="md:w-1/2 w-full px-2 mb-4"
          v-for="(item, item_index) in gallery"
          :key="`gallery_${item_index}`"
        >
          <a
            target="_blank"
            :href="item.Link"
            class="block w-full rounded-xl overflow-hidden"
          >
            <img :src="$ImageUrl(item.Image1)" class="block w-full" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AdGallerySection',
  props: {
    gallery: {
      require: true,
      type: Array,
    },
  },
};
</script>
