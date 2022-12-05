<template>
  <section class="relative w-full">
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0">
      <div class="flex flex-wrap -mx-2">
        <div class="w-full px-2 mb-4 md:w-1/2">
          <a
            target="_blank"
            :href="images[0].Link"
            class="block w-full overflow-hidden rounded-xl"
          >
            <img :src="$ImageUrl(images[0].Image1)" class="block w-full" />
          </a>
        </div>
        <div class="w-full px-2 mb-4 md:w-1/2">
          <a
            target="_blank"
            :href="images[1].Link"
            class="block w-full overflow-hidden rounded-xl"
          >
            <img :src="$ImageUrl(images[1].Image1)" class="block w-full" />
          </a>
        </div>
        <div class="w-full px-2 mb-4">
          <a
            target="_blank"
            :href="images[2].Link"
            class="block w-full overflow-hidden rounded-xl"
          >
            <img :src="$ImageUrl(images[2].Image1)" class="block w-full" />
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
    images: {
      require: true,
      type: Array,
    },
  },
};
</script>
