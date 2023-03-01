<template>
  <main
    id="ProductList"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full pt-40 pb-20 bg-bg_black"
  >
    <div
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 pt-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <header
        class="relative z-10 flex flex-col-reverse items-center w-full mb-20"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_white"
            >產品列表</span
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
            Products
          </span>
        </h3>
      </header>
      <div data-section-content class="flex justify-end w-full pb-8 md:mb-10">
        <FilterBar
          class="flex items-center justify-end w-full"
          :active_category="active_category"
          :sort_type="sort_type"
          :category_data="category_data"
          @change-type="sort_type = $event"
          @change-category="$router.push(`/collections?category=${$event}`)"
        />
      </div>
      <div class="w-full" data-section-content>
        <div v-if="active_category == 'all'">
          <div
            v-if="promote_category_data != null"
            class="w-full py-5 border-t border-basic_gray border-opacity-10"
          >
            <div class="mb-5">
              <h2 class="relative inline-block px-8">
                <span
                  data-section-subtitle-arrow
                  class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
                ></span>
                <span
                  data-section-subtitle
                  class="block text-lg font-bold leading-none md:leading-none text-basic_white"
                >
                  {{ promote_category_data.Title }}</span
                >
                <span
                  data-section-subtitle-arrow
                  class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
                ></span>
              </h2>
            </div>
            <EventTimer ref="EventTimer" :event_data="promote_category_data" />

            <ProductList
              class="w-full"
              :promote="true"
              :page_product_data="GetCategoryProduct(promote_category_data)"
              :category_data="promote_category_data"
            />
            <div class="flex justify-end">
              <MoreLinkButton
                text="SEE MORE"
                :link="`/collections?category=${promote_category_data.MenuID}`"
              />
            </div>
          </div>
          <template v-for="(item, item_index) in list_category_data">
            <div
              class="w-full py-5 border-t border-basic_gray border-opacity-10"
              :key="`category_${item_index}`"
              v-if="GetCategoryProduct(item).length > 0"
            >
              <div class="mb-5">
                <h2 class="relative inline-block px-8">
                  <span
                    data-section-subtitle-arrow
                    class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
                  ></span>
                  <span
                    data-section-subtitle
                    class="block text-lg font-bold leading-none md:leading-none text-basic_white"
                    >{{ item.Title }}</span
                  >
                  <span
                    data-section-subtitle-arrow
                    class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
                  ></span>
                </h2>
              </div>
              <EventTimer ref="EventTimer" :event_data="item" />

              <ProductList
                class="w-full"
                :page_product_data="GetCategoryProduct(item)"
                :category_data="item"
              />
              <div class="flex justify-end">
                <MoreLinkButton
                  text="SEE MORE"
                  :link="`/collections?category=${item.MenuID}`"
                />
              </div>
            </div>
          </template>
        </div>
        <div
          v-else
          class="w-full py-5 border-t border-basic_gray border-opacity-10"
        >
          <div class="mb-5">
            <h2 class="relative inline-block px-8">
              <span
                data-section-subtitle-arrow
                class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
              ></span>
              <span
                data-section-subtitle
                class="block text-lg font-bold leading-none md:leading-none text-basic_white"
              >
                {{ active_category_data.Title }}</span
              >
              <span
                data-section-subtitle-arrow
                class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
              ></span>
            </h2>
          </div>
          <EventTimer ref="EventTimer" :event_data="active_category_data" />

          <AllProductList
            class="w-full"
            :promote="true"
            :page_product_data="GetCategoryProduct(active_category_data)"
            :category_data="active_category_data"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ProductList from '@/components/product_list/product_list.vue';
import FilterBar from '@/components/product_list/filter_bar.vue';
import EventTimer from '@/components/product_list/EventTimer.vue';
import { GetMetaData, ChangeTitle } from '@/common/meta';
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
import AllProductList from '@/components/product_list/all_product_list.vue';
import { section_animation } from '@/gsap/section';
export default {
  name: 'ProductListView',
  components: {
    BreadCrumb,
    ProductList,
    FilterBar,
    EventTimer,
    MoreLinkButton,
    AllProductList,
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
      section_animation: null,
    };
  },
  methods: {
    SetActiveCategory() {
      this.active_category = this.$route.query.category
        ? this.$route.query.category
        : 'all';

      this.SetMetaGTM();

      this.$emit('scroll-top');
      this.$nextTick(() => {
        this.$emit('update-scroll');
      });
    },
    SetMetaGTM() {
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
        if (this.active_category_data != null) {
          this.bread_crumb_path[1].title = this.active_category_data.Title;
          this.bread_crumb_path[1].link = `/collections?category=${this.active_category_data.MenuID}`;
          this.$nextTick(() => {
            this.meta_data = GetMetaData('productlist', '', '');
            this.meta_data = ChangeTitle(
              this.meta_data,
              this.active_category_data.Title
            );

            window.dataLayer.push({
              event: 'viewItemList',
              item_list_name: this.active_category_data.Title,
              item_list_id: this.active_category_data.MenuID,
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
    GetPrice(item) {
      let tmp_data = JSON.parse(JSON.stringify(item.Stock));
      tmp_data = tmp_data.sort((a, b) => {
        return a.SellPrice < b.SellPrice;
      });
      return tmp_data[0];
    },
    GetCategoryProduct(category) {
      return this.sort_product_data.filter((item) => {
        return (
          item.Menu.filter((menu) => menu.MenuID == category.MenuID).length > 0
        );
      });
    },
    SetGsap() {
      this.SetActiveCategory();
      this.section_animation == null
        ? (this.section_animation = new section_animation(
            this.$refs.MainContent
          ))
        : '';
    },
    CheckDataLoaded() {
      if (this.product_list != null && this.category_data != null) {
        this.$nextTick(() => {
          this.$emit('load-image', 'home');
        });
      }
    },
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    $route() {
      console.log('router change');
      this.$nextTick(() => {
        console.log('router change after tick');
        this.$emit('load-image', 'home');
      });
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
    category_data() {
      this.category_data != null ? this.CheckDataLoaded() : '';
    },
    product_list() {
      this.product_list != null ? this.CheckDataLoaded() : '';
    },
  },
  computed: {
    image_loaded() {
      return this.$store.state.image_loaded;
    },
    category_data() {
      if (this.$store.state.category_data == null) {
        return [];
      }
      return this.$store.state.category_data;
    },
    promote_category_data() {
      const category = this.category_data.filter((item) => item.MenuID == 7);
      return category.length > 0 ? category[0] : null;
    },
    list_category_data() {
      let all_category = JSON.parse(JSON.stringify(this.category_data));
      all_category = all_category.filter((item) => item.MenuID != 7);
      return all_category;
    },
    active_category_data() {
      let active_category_data = this.category_data.filter(
        (item) => item.MenuID == this.active_category
      );
      return active_category_data.length > 0 ? active_category_data[0] : null;
    },
    product_list() {
      if (this.$store.state.product_data == null) {
        return [];
      }
      return this.$store.state.product_data.filter(
        (item) => item.Status == 'Y'
      );
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
  },
};
</script>
