<template>
  <div class="relative w-full">
    <CarouselSection :carousel_data="carousel_data" />
    <ImageTextSection :image="about_image" :content="about_content" />
    <ProductSection
      :product_data="new_product_data"
      title="最新商品"
      sub_title="Hot Products"
      :background_image="$ImageUrl(home_main_product_bg)"
    />
    <ProductSection
      :product_data="promote_product_data"
      title="推薦商品"
      sub_title="Discount Products"
      :background_image="$ImageUrl(home_new_product_bg)"
    />
    <AdGallerySection :gallery="promotes_data" />
    <CompanyInfoSection :image="company_image" />
  </div>
</template>

<script>
import CarouselSection from '@/components/home/Carousel.vue';
import ImageTextSection from '@/components/home/ImageTextSection.vue';
import ProductSection from '@/components/home/ProductSection.vue';
import AdGallerySection from '@/components/home/AdGallerySection.vue';
import CompanyInfoSection from '@/components/home/CompantInfoSection.vue';
export default {
  name: 'HomeView',
  components: {
    CarouselSection,
    ImageTextSection,
    ProductSection,
    AdGallerySection,
    CompanyInfoSection,
  },
  computed: {
    carousel_data() {
      return this.$store.state.carousel_data;
    },
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    home_main_product_bg() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'home_main_product_bg'
      )[0].Content;
      return tmp_data;
    },
    home_new_product_bg() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'home_new_product_bg'
      )[0].Content;
      return tmp_data;
    },
    company_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'company_image'
      )[0].Content;
      return tmp_data;
    },
    about_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_1_image'
      )[0].Content;
      return tmp_data;
    },
    about_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'about_section_1_content'
      )[0].Content;
      return tmp_data.length > 150 ? tmp_data.slice(0, 150) + '...' : tmp_data;
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
  },
};
</script>
