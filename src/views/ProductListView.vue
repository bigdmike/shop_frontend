<template>
  <main id="ProductList" class="w-full relative z-10 pb-40">
    <div
      class="w-full max-w-screen-xl mx-auto xl:px-0 px-5 flex items-stretch flex-wrap"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <FilterBar
        class="w-full flex items-center justify-end mb-10"
        :active_category="active_category"
        :sort_type="sort_type"
        :category_data="category_data"
        @change-type="ChangeSortType"
        @change-category="ChangeCategory"
      />
      <CategoryMenu
        :active_category="active_category"
        :category_data="category_data"
        class="w-1/4 md:block hidden pr-10"
      />
      <ProductList
        class="md:w-3/4 w-full"
        :page_product_data="page_product_data"
        :product_data="product_data"
        @next-page="page += 1"
      />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import CategoryMenu from '@/components/product_list/category_menu.vue';
import ProductList from '@/components/product_list/product_list.vue';
import FilterBar from '@/components/product_list/filter_bar.vue';
export default {
  name: 'ProductListView',
  components: {
    BreadCrumb,
    CategoryMenu,
    ProductList,
    FilterBar,
  },
  data() {
    return {
      active_category: 'all',
      count_per_page: 9,
      page: 0,
      sort_type: '推薦排序',
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '全部商品',
          link: '/collections/all',
        },
      ],
    };
  },
  methods: {
    SetActiveCategoru() {
      this.active_category = this.$route.params.id;
      if (this.active_category == 'all') {
        this.bread_crumb_path[1].title = '全部商品';
        this.bread_crumb_path[1].link = '/collections/all';
      } else {
        const category = this.category_data.filter(
          (item) => item.MenuID == this.active_category
        )[0];
        this.bread_crumb_path[1].title = category.Title;
        this.bread_crumb_path[1].link = `/collections/${category.MenuID}`;
      }
    },
    ChangeSortType(val) {
      this.sort_type = val;
    },
    ChangeCategory(val) {
      this.active_category = val;
    },
    GetPrice(item) {
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
  },
  created() {
    this.SetActiveCategoru();
  },
  watch: {
    active_category() {
      this.$router.push(`/collections/${this.active_category}`);
    },
    $route() {
      this.SetActiveCategoru();
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
      if (this.active_category == 'all') {
        return this.product_list;
      } else {
        return this.product_list.filter((item) => {
          return (
            item.Menu.filter((menu) => menu.MenuID == this.active_category)
              .length > 0
          );
        });
      }
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
};
</script>
