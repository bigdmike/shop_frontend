<template>
  <main class="w-full relative">
    <div class="w-full max-w-screen-xl mx-auto xl:px-0 px-5">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div class="flex items-start flex-wrap">
        <div class="w-1/2">
          <ImageGallery />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ImageGallery from '@/components/product_page/image_gallery.vue';
export default {
  name: 'ProductPage',
  components: {
    BreadCrumb,
    ImageGallery,
  },
  data() {
    return {
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '全部商品',
          link: '/collections/all',
        },
        {
          title: '商品名稱',
          link: '/product/0',
        },
      ],
    };
  },
  methods: {
    SetActiveProduct() {
      this.bread_crumb_path[2].title = this.product_data.Title;
      this.bread_crumb_path[2].link = `/product/${this.product_data.GoodsID}`;
    },
  },
  created() {
    if (this.product_data != 'error') {
      this.SetActiveProduct();
    }
  },
  computed: {
    product_list() {
      return this.$store.state.product_data;
    },
    product_data() {
      const tmp_product = this.product_list.filter(
        (item) => item.GoodsID == this.$route.params.id
      );
      return tmp_product.length <= 0 ? 'error' : tmp_product[0];
    },
    category_data() {
      return this.$store.state.category_data;
    },
  },
};
</script>
