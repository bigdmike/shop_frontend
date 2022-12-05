<template>
  <div class="relative w-full">
    <CarouselSection :carousel_data="carousel_data" />
    <ImageTextSection
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
      title="推薦商品"
      sub_title="Discount Products"
      :background_image="$ImageUrl($GetCloumn('home_new_product_bg'))"
    />
    <AdGallerySection :images="ad_gallery_data" />
    <CompanyInfoSection :image="$GetCloumn('company_image')" />
  </div>
</template>

<script>
import CarouselSection from '@/components/home/Carousel.vue';
import ImageTextSection from '@/components/home/ImageTextSection.vue';
import ProductSection from '@/components/home/ProductSection.vue';
import AdGallerySection from '@/components/home/AdGallerySection.vue';
import CompanyInfoSection from '@/components/home/CompantInfoSection.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'HomeView',
  components: {
    CarouselSection,
    ImageTextSection,
    ProductSection,
    AdGallerySection,
    CompanyInfoSection,
  },
  data() {
    return {
      meta_data: null,
    };
  },
  computed: {
    carousel_data() {
      return this.$store.state.carousel_data;
    },
    product_data() {
      return this.$store.state.product_data;
    },
    promote_product_category_id() {
      return this.category_data.filter((item) => item.Title == '推薦商品')[0]
        .MenuID;
    },
    promote_product_data() {
      return this.product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => {
            return menu.MenuID == this.promote_product_category_id;
          }).length > 0
        );
      });
    },
    new_product_category_id() {
      return this.category_data.filter((item) => item.Title == '最新商品')[0]
        .MenuID;
    },
    new_product_data() {
      return this.product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => {
            return menu.MenuID == this.new_product_category_id;
          }).length > 0
        );
      });
    },
    category_data() {
      return this.$store.state.category_data;
    },
    promotes_data() {
      return this.$store.state.promote_data;
    },
    ad_gallery_data() {
      let images = [];
      images.push({
        Image1: this.$GetCloumn('home_promote_1_image'),
        Link: this.$GetCloumn('home_promote_1_link'),
      });
      images.push({
        Image1: this.$GetCloumn('home_promote_2_image'),
        Link: this.$GetCloumn('home_promote_2_link'),
      });
      images.push({
        Image1: this.$GetCloumn('home_promote_3_image'),
        Link: this.$GetCloumn('home_promote_3_link'),
      });
      return images;
    },
  },
  created() {
    this.meta_data = GetMetaData('home', '', '');
    this.$nextTick(() => {
      window.prerenderReady = true;
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
