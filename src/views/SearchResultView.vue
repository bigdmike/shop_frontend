<template>
  <main
    id="ProductList"
    data-scroll-section
    class="relative z-10 w-full pt-40 pb-20 bg-bg_black"
  >
    <div
      v-if="data_load_finish"
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />

      <header
        class="relative z-10 flex flex-col-reverse items-start w-full mb-20 md:mb-10"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_white"
            >搜尋結果</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <h3 class="overflow-hidden">
          <span
            data-section-title
            data-text="News"
            class="block text-5xl font-black md:text-8xl sm:text-7xl text-basic_white text-opacity-20 font-anybody"
          >
            Result
          </span>
        </h3>
      </header>
      <FilterBar
        class="flex items-center justify-end w-full mb-10"
        :sort_type="sort_type"
        :product_data="sort_product_data"
        @change-type="ChangeSortType"
      />
      <ProductList class="w-full" :product_data="product_data" />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ProductList from '@/components/search_result/product_list.vue';
import FilterBar from '@/components/search_result/filter_bar.vue';
import { GetMetaData } from '@/common/meta';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'ProductListView',
  components: {
    BreadCrumb,
    ProductList,
    FilterBar,
  },
  data() {
    return {
      count_per_page: 9,
      page: 0,
      sort_type: '推薦排序',
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '搜尋商品',
          link: '/search/',
        },
      ],
    };
  },
  methods: {
    ChangeSortType(val) {
      this.sort_type = val;
    },
    GetPrice(item) {
      if (item.IsCustom == 'N') {
        // 一般商品，讀取Stock資料
        let tmp_data = JSON.parse(JSON.stringify(item.Stock));
        tmp_data = tmp_data.sort((a, b) => {
          return a.SellPrice < b.SellPrice;
        });
        return tmp_data[0];
      } else {
        // 客製化商品，讀取CustomGoodsStock資料
        return item.CustomGoodsStock[0];
      }
    },
    PageInit() {
      this.$emit('load-image');
      this.meta_data = GetMetaData('商品搜尋', '', '');
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
    SetGsap() {},
  },
  watch: {
    data_load_finish() {
      this.data_load_finish ? this.PageInit() : '';
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
  },
  computed: {
    ...mapState({
      category_data: 'category_data',
      product_list: 'product_data',
      image_loaded: 'image_loaded',
    }),
    ...mapGetters(['data_load_finish']),
    product_data() {
      return this.product_list.filter(
        (item) => item.Title.indexOf(this.$route.params.key_word) != -1
      );
    },
    sort_product_data() {
      let tmp_product_data = JSON.parse(JSON.stringify(this.product_data));
      if (this.sort_type == '價錢由低到高') {
        return tmp_product_data.sort((a, b) => {
          return (
            parseInt(this.GetPrice(a).SellPrice) -
            parseInt(this.GetPrice(b).SellPrice)
          );
        });
      } else if (this.sort_type == '價錢由高到低') {
        return tmp_product_data.sort((a, b) => {
          return (
            parseInt(this.GetPrice(b).SellPrice) -
            parseInt(this.GetPrice(a).SellPrice)
          );
        });
      } else if (this.sort_type == '時間由舊到新') {
        return tmp_product_data.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
      } else if (this.sort_type == '時間由新到舊') {
        return tmp_product_data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      } else {
        return tmp_product_data;
      }
    },
  },
  created() {
    this.image_loaded ? this.SetGsap() : '';
    this.data_load_finish ? this.PageInit() : '';
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
