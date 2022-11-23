<template>
  <main id="ProductList" class="relative z-10 w-full pb-40">
    <div
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <FilterBar
        class="flex items-center justify-end w-full mb-10"
        :sort_type="sort_type"
        :product_data="product_data"
        @change-type="ChangeSortType"
      />
      <ProductList
        class="w-full"
        :page_product_data="page_product_data"
        :product_data="product_data"
        @next-page="page += 1"
      />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ProductList from '@/components/search_result/product_list.vue';
import FilterBar from '@/components/search_result/filter_bar.vue';
import { GetMetaData } from '@/common/meta';
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
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
  },
  computed: {
    category_data() {
      return this.$store.state.category_data;
    },
    product_list() {
      return this.$store.state.product_data;
    },
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
    page_product_data() {
      return this.sort_product_data.slice(
        0,
        this.page * this.count_per_page + this.count_per_page
      );
    },
  },
  created() {
    this.meta_data = GetMetaData('商品搜尋', '', '');
    this.$nextTick(() => {
      window.prerenderReady = true;
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
