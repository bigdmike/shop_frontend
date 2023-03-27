<template>
  <div
    ref="MainContent"
    class="w-full py-5 border-t border-basic_gray border-opacity-10"
    v-if="recommend_product_list != null"
  >
    <div class="flex flex-col-reverse items-start mb-16">
      <h2 class="relative inline-block px-8">
        <span
          data-section-subtitle-arrow
          class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
        ></span>
        <span
          data-section-subtitle
          class="block text-lg font-bold leading-none md:leading-none text-basic_white"
          >相關商品</span
        >
        <span
          data-section-subtitle-arrow
          class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
        ></span>
      </h2>
      <h3 class="overflow-hidden">
        <span
          data-section-title
          data-text="News"
          class="block text-5xl font-black sm:text-7xl text-basic_white text-opacity-20 font-anybody"
        >
          Related
        </span>
      </h3>
    </div>
    <div data-section-content>
      <ProductList
        class="w-full"
        :page_product_data="recommend_product_list"
        :category_data="category_data"
      />
      <div class="flex justify-end">
        <MoreLinkButton
          text="SEE MORE"
          :link="`/collections?category=${category_data.MenuID}`"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { section_animation } from '@/gsap/section';
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
import ProductList from '@/components/product_list/ProductList.vue';
export default {
  name: 'RecommendProducts',
  components: {
    MoreLinkButton,
    ProductList,
  },
  props: {
    recommend_product_list: {
      type: Array,
    },
    category_data: {
      type: Object,
    },
  },
  data() {
    return {
      section_animation: null,
    };
  },
  methods: {
    SetGsap() {
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
  },
};
</script>
