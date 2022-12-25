<template>
  <main id="NewsList" class="relative z-10 w-full pb-40">
    <div
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <FilterBar
        class="flex items-center justify-end w-full mb-10"
        :active_category="active_category"
        :sort_type="sort_type"
        :category_data="category_data"
        @change-type="sort_type = $event"
        @change-category="$router.push(`/news?category=${$event}`)"
      />
      <CategoryMenu
        :active_category="active_category"
        :category_data="category_data"
        class="hidden w-1/4 pr-10 md:block"
      />
      <ProductList
        class="w-full md:w-3/4"
        :page_news_data="page_news_data"
        :news_data="news_data"
        @next-page="page += 1"
      />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import CategoryMenu from '@/components/news_list/category_menu.vue';
import ProductList from '@/components/news_list/news_list.vue';
import FilterBar from '@/components/news_list/filter_bar.vue';
import { GetMetaData } from '@/common/meta';
import { redirectErrorPage } from '@/common/prerender';
export default {
  name: 'NewsListView',
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
          title: '最新消息',
          link: '/news?category=all',
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
        this.bread_crumb_path[1].title = '最新消息';
        this.bread_crumb_path[1].link = '/news?category=all';
        this.$nextTick(() => {
          this.meta_data = GetMetaData('newslist', '', '');
          window.prerenderReady = true;

          window.dataLayer.push({
            event: 'page_view',
            page_title: this.meta_data.title,
          });
        });
      } else {
        let category = this.category_data.filter(
          (item) => item.NewsCategoryID == this.active_category
        );

        if (category.length > 0) {
          category = category[0];
          this.bread_crumb_path[1].title = category.Title;
          this.bread_crumb_path[1].link = `/news?category=${category.NewsCategoryID}`;
          this.$nextTick(() => {
            this.meta_data = GetMetaData('newslist', '', '');
            window.prerenderReady = true;

            window.dataLayer.push({
              event: 'page_view',
              page_title: this.meta_data.title,
            });
          });
        } else {
          // this.$router.push('/error_page');
          redirectErrorPage();
        }
      }
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
      return this.$store.state.news_category_data;
    },
    news_list() {
      return this.$store.state.news_data;
    },
    news_data() {
      if (this.active_category == 'all') {
        return this.news_list;
      } else {
        return this.news_list.filter((item) => {
          return item.NewsCategoryID == this.active_category;
        });
      }
    },
    sort_news_data() {
      let tmp_news_data = JSON.parse(JSON.stringify(this.news_data));
      if (this.sort_type == '時間由舊到新') {
        return tmp_news_data.sort((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });
      } else if (this.sort_type == '時間由新到舊') {
        return tmp_news_data.sort((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });
      } else {
        return tmp_news_data;
      }
    },
    page_news_data() {
      return this.sort_news_data.slice(
        0,
        this.page * this.count_per_page + this.count_per_page
      );
    },
  },
};
</script>
