<template>
  <div class="relative w-full">
    <CarouselSection :carousel_data="carousel_data" />
    <ImageTextSection :image="about_image" :content="about_content" />
    <ProductSection
      :product_data="hot_product_data"
      title="熱門商品"
      sub_title="Hot Products"
      background_image="/img/home/hot.jpg"
    />
    <ProductSection
      :product_data="event_product_data"
      title="優惠商品"
      sub_title="Discount Products"
      background_image="/img/home/1643010499_d9983336efd678d66241 拷貝.jpg"
    />
    <AdGallerySection :gallery="promotes_data" />
  </div>
</template>

<script>
import CarouselSection from '@/components/home/Carousel.vue';
import ImageTextSection from '@/components/home/ImageTextSection.vue';
import ProductSection from '@/components/home/ProductSection.vue';
import AdGallerySection from '@/components/home/AdGallerySection.vue';
export default {
  name: 'HomeView',
  components: {
    CarouselSection,
    ImageTextSection,
    ProductSection,
    AdGallerySection,
  },
  computed: {
    carousel_data() {
      return this.$store.state.carousel_data;
    },
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    about_image() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'AboutCover'
      )[0].Content;
      return tmp_data;
    },
    about_content() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'AboutContent'
      )[0].Content;
      return tmp_data.length > 150 ? tmp_data.slice(0, 150) + '...' : tmp_data;
    },
    product_data() {
      return this.$store.state.product_data;
    },
    event_product_category_id() {
      return this.category_data.filter((item) => item.Title == '組合優惠')[0]
        .MenuID;
    },
    event_product_data() {
      return this.product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => {
            return menu.MenuID == this.event_product_category_id;
          }).length > 0
        );
      });
    },
    hot_product_category_id() {
      return this.category_data.filter((item) => item.Title == '熱門商品')[0]
        .MenuID;
    },
    hot_product_data() {
      return this.product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => {
            return menu.MenuID == this.hot_product_category_id;
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
