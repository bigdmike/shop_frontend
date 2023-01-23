<template>
  <main id="ProductList" class="relative z-10 w-full pb-40">
    <div
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 pt-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <FilterBar
        class="flex items-center justify-end w-full mb-10"
        :active_category="active_category"
        :sort_type="sort_type"
        :category_data="category_data"
        @change-type="ChangeSortType"
        @change-category="$router.push(`/collections/${$event}`)"
      />
      <CategoryMenu
        :active_category="active_category"
        :category_data="category_data"
        class="hidden w-1/4 pr-10 md:block"
      />
      <ProductList
        class="w-full md:w-3/4"
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
import { GetMetaData, ChangeTitle } from '@/common/meta';
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
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '全部商品',
          link: '/collections?category=all',
        },
      ],
    };
  },
  methods: {
    SetActiveCategory() {
      this.active_category = this.$route.query.category
        ? this.$route.query.category
        : 'all';
      if (this.active_category == 'all') {
        this.bread_crumb_path[1].title = '全部商品';
        this.bread_crumb_path[1].link = '/collections?category=all';
        this.$nextTick(() => {
          this.meta_data = GetMetaData('productlist', '', '');
          window.dataLayer.push({
            event: 'viewItemList',
            item_list_name: '全部商品',
            item_list_id: 'all',
            value: 0,
            currency: 'TWD',
          });

          this.$PageReady(this.meta_data.title);
        });
      } else {
        let category = this.category_data.filter(
          (item) => item.MenuID == this.active_category
        );
        if (category.length > 0) {
          category = category[0];
          this.bread_crumb_path[1].title = category.Title;
          this.bread_crumb_path[1].link = `/collections?category=${category.MenuID}`;
          this.$nextTick(() => {
            this.meta_data = GetMetaData('productlist', '', '');
            this.meta_data = ChangeTitle(this.meta_data, category.Title);

            window.dataLayer.push({
              event: 'viewItemList',
              item_list_name: category.Title,
              item_list_id: category.MenuID,
              value: 0,
              currency: 'TWD',
            });

            this.$PageReady(this.meta_data.title);
          });
        } else {
          this.$RedirectError();
        }
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
    this.SetActiveCategory();
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    $route() {
      this.SetActiveCategory();
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
