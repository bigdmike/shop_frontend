<template>
  <div class="relative w-full">
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
            >商品描述</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
          ></span>
        </h2>
      </div>
      <div
        id="Description"
        class="text-white editor_content"
        v-html="description"
      ></div>
    </div>
    <CustomImageGallery
      v-if="show_image_gallery"
      :image_list="images"
      :title="title"
    />
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
            >運送說明</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
          ></span>
        </h2>
      </div>
      <div
        id="Workflow"
        class="text-white editor_content"
        v-html="shipping_info"
      ></div>
    </div>
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
            >注意事項</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
          ></span>
        </h2>
      </div>

      <div
        id="Precautions"
        class="text-white editor_content"
        v-html="warning"
      ></div>
    </div>
  </div>
</template>

<script>
import CustomImageGallery from '@/components/product_page/CustomImageGallery.vue';
export default {
  name: 'CustomizeProductIntroBlock',
  components: {
    CustomImageGallery,
  },
  props: {
    description: {
      type: String,
    },
    shipping_info: {
      type: String,
    },
    warning: {
      type: String,
    },
    show_image_gallery: {
      type: Boolean,
    },
    images: {
      type: Array,
    },
    title: {
      type: String,
    },
  },
};
</script>

<style>
.editor_content p {
  margin-bottom: 10px;
}
</style>
