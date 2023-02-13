<template>
  <main class="relative w-full">
    <CarouselSection ref="CarouselSection" :carousel_data="carousel_data" />
    <MainProductSection ref="MainProductSection" />
    <!-- <ImageTextSection
      :image="$GetCloumn('about_section_1_image')"
      :content="$GetCloumn('about_section_1_content')"
    />
    <ProductSection
      v-if="new_product_data.length > 0"
      :product_data="new_product_data"
      title="最新商品"
      sub_title="New Products"
      :background_image="$ImageUrl($GetCloumn('home_main_product_bg'))"
    />
    <ProductSection
      v-if="promote_product_data.length > 0"
      :product_data="promote_product_data"
      title="店長推薦"
      sub_title="Early Bird Discount"
      :background_image="$ImageUrl($GetCloumn('home_new_product_bg'))"
    />
    <AdGallerySection :images="home_ad_data" />
    <CompanyInfoSection :image="$GetCloumn('company_image')" /> -->
  </main>
</template>

<script>
import CarouselSection from '@/components/home/Carousel.vue';
import MainProductSection from '@/components/home/MainProductSection.vue';
// import ImageTextSection from '@/components/home/ImageTextSection.vue';
// import ProductSection from '@/components/home/ProductSection.vue';
// import AdGallerySection from '@/components/home/AdGallerySection.vue';
// import CompanyInfoSection from '@/components/home/CompantInfoSection.vue';
import { GetMetaData } from '@/common/meta';
// import { mapGetters, mapState } from 'vuex';
export default {
  name: 'HomeView',
  components: {
    CarouselSection,
    MainProductSection,
    // ImageTextSection,
    // ProductSection,
    // AdGallerySection,
    // CompanyInfoSection,
  },
  data() {
    return {
      meta_data: null,
      carousel_data: [
        {
          Image1: '/img/home/carousel/banner_1.webp',
          Image2: '/img/home/carousel/banner_1@sm.webp',
        },
        {
          Image1: '/img/home/carousel/banner_2.webp',
          Image2: '/img/home/carousel/banner_2@sm.webp',
        },
      ],
    };
  },
  methods: {
    SetGsap() {
      this.$refs.CarouselSection.SetGsap();
    },
  },
  computed: {
    // ...mapGetters(['promote_product_data', 'new_product_data', 'home_ad_data']),
    // ...mapState([
    //   'carousel_data',
    //   'product_data',
    //   'category_data',
    //   'promotes_data',
    // ]),
  },
  mounted() {
    this.SetGsap();
  },
  created() {
    this.meta_data = GetMetaData('home', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
