<template>
  <main
    id="ProductPage"
    class="relative z-10 w-full pt-24 pb-20 md:pt-40 bg-bg_black"
    data-scroll-section
    v-if="product_data != null && product_list != null"
    itemtype="https://schema.org/Product"
    itemscope
  >
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0">
      <BreadCrumb class="my-5 md:mb-20 md:pt-0" :path="bread_crumb_path" />
      <div class="flex flex-wrap items-start mb-20 -mx-10">
        <div class="w-full px-10 mb-10 md:w-1/2 md:mb-0">
          <ImageGallery
            :images="product_data.Picture"
            :title="product_data.Title"
          />
        </div>
        <div class="w-full px-10 md:w-1/2">
          <InfoBox
            :product_data="product_data"
            :active_option="active_option"
            :amount="amount"
            @change-amount="ChangeAmount"
            @change-option="ChangeOption"
            @add-cart="AddShopCart"
          />
        </div>
      </div>

      <meta itemprop="description" :content="product_data.Memo1" />
      <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
        <div class="mb-10">
          <h2 class="relative inline-block px-8">
            <span
              data-section-subtitle-arrow
              class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
            ></span>
            <span
              data-section-subtitle
              class="block text-base font-medium leading-none md:leading-none text-basic_white"
              >商品描述</span
            >
            <span
              data-section-subtitle-arrow
              class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
            ></span>
          </h2>
        </div>
        <div
          id="Description"
          class="text-white"
          v-html="product_data.Memo1"
        ></div>
      </div>
      <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
        <div class="mb-10">
          <h2 class="relative inline-block px-8">
            <span
              data-section-subtitle-arrow
              class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
            ></span>
            <span
              data-section-subtitle
              class="block text-base font-medium leading-none md:leading-none text-basic_white"
              >運送說明</span
            >
            <span
              data-section-subtitle-arrow
              class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
            ></span>
          </h2>
        </div>
        <div id="Workflow" class="text-white" v-html="product_data.Memo2"></div>
      </div>
      <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
        <div class="mb-10">
          <h2 class="relative inline-block px-8">
            <span
              data-section-subtitle-arrow
              class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
            ></span>
            <span
              data-section-subtitle
              class="block text-base font-medium leading-none md:leading-none text-basic_white"
              >注意事項</span
            >
            <span
              data-section-subtitle-arrow
              class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
            ></span>
          </h2>
        </div>

        <div
          id="Precautions"
          class="text-white"
          v-html="product_data.Memo3"
        ></div>
      </div>
      <div
        class="w-full py-5 border-t border-basic_gray border-opacity-10"
        v-if="recommend_category_data != null"
      >
        <div class="flex flex-col-reverse items-start mb-16">
          <h2 class="relative inline-block px-8">
            <span
              data-section-subtitle-arrow
              class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
            ></span>
            <span
              data-section-subtitle
              class="block text-lg font-bold leading-none md:leading-none text-basic_white"
              >相關商品</span
            >
            <span
              data-section-subtitle-arrow
              class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
            ></span>
          </h2>
          <h3 class="overflow-hidden">
            <span
              data-section-title
              data-text="News"
              class="block text-5xl font-black sm:text-7xl text-basic_white text-opacity-20 font-anybody"
            >
              Related
            </span>
          </h3>
        </div>
        <ProductList
          class="w-full"
          :page_product_data="GetCategoryProduct()"
          :category_data="recommend_category_data"
        />
        <div class="flex justify-end">
          <MoreLinkButton
            text="SEE MORE"
            :link="`/collections?category=${recommend_category_data.MenuID}`"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ImageGallery from '@/components/product_page/image_gallery.vue';
import InfoBox from '@/components/product_page/custom_info_box.vue';
import ProductList from '@/components/product_list/product_list.vue';
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
import { getLocalStorage } from '@/common/cookie';
import { getSingleProductData } from '@/api/page_data';
import { GetMetaData } from '@/common/meta';
import {
  ConvertProductData,
  // ConvertAddShopCartData,
} from '@/common/gtm_methods';
// import product_list from '@/assets/data/goods.json';
// import product_data from '@/assets/data/single_good.json';
// import category_data from '@/assets/data/menu.json';
export default {
  name: 'ProductPage',
  components: {
    BreadCrumb,
    ImageGallery,
    InfoBox,
    ProductList,
    MoreLinkButton,
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
          link: '/collections?category=all',
        },
        {
          title: '商品名稱',
          link: '/product/0',
        },
      ],
      amount: 1,
      tabs: ['商品介紹', '下單流程', '注意事項'],
      active_option: [],
      active_tab: '商品介紹',
      product_data: null,
      meta_data: null,
    };
  },
  methods: {
    SetNavTrigger() {
      const description = document.querySelector('#Description');
      const workflow = document.querySelector('#Workflow');
      const precautions = document.querySelector('#Precautions');

      window.addEventListener('scroll', () => {
        if (precautions.getBoundingClientRect().top < window.innerHeight) {
          this.active_tab = '注意事項';
        } else if (workflow.getBoundingClientRect().top < window.innerHeight) {
          this.active_tab = '下單流程';
        } else if (
          description.getBoundingClientRect().top < window.innerHeight
        ) {
          this.active_tab = '商品介紹';
        }
      });
    },
    SetActiveProduct() {
      this.bread_crumb_path[2].title = this.product_data.Title;
      this.bread_crumb_path[2].link = `/product/${this.product_data.GoodsID}`;
    },
    AddShopCart() {
      if (this.CheckActiveOption()) {
        // window.dataLayer.push({
        //   event: 'add_to_cart',
        //   items: [
        //     ConvertAddShopCartData(
        //       this.product_data,
        //       this.active_option,
        //       this.amount
        //     ),
        //   ],
        //   value: 0,
        //   currency: 'TWD',
        // });
        const shop_cart_item = {
          product: this.product_data,
          is_custom: 'Y',
          options: this.active_option,
          amount: this.amount,
          show_message: true,
        };
        if (getLocalStorage('account_token')) {
          this.$store.dispatch('shopcart_module/AddShopCart', shop_cart_item);
        } else {
          this.$store.commit('shopcart_module/AddShopCart', shop_cart_item);
        }
      } else {
        this.$store.commit('SetDialog', {
          status: true,
          content: '請確認所有選項都有選取',
        });
      }
    },
    CheckActiveOption() {
      let empty_count = 0;
      this.active_option.forEach((item) => {
        item == '' ? (empty_count += 1) : '';
      });
      return empty_count > 0 ? false : true;
    },
    ChangeAmount(val) {
      this.amount + val <= 1 ? (this.amount = 1) : (this.amount += val);
    },
    ChangeTab(val) {
      const description = document.querySelector('#Description');
      const workflow = document.querySelector('#Workflow');
      const precautions = document.querySelector('#Precautions');
      const offset_top = window.innerWidth <= 640 ? 112 : 128;
      let offsetPosition = 0;

      this.active_tab = val;
      if (this.active_tab == '注意事項') {
        offsetPosition =
          precautions.getBoundingClientRect().top +
          window.pageYOffset -
          offset_top -
          38;
      } else if (this.active_tab == '下單流程') {
        offsetPosition =
          workflow.getBoundingClientRect().top +
          window.pageYOffset -
          offset_top -
          38;
      } else if (this.active_tab == '商品介紹') {
        offsetPosition =
          description.getBoundingClientRect().top +
          window.pageYOffset -
          offset_top -
          38;
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    },
    ChangeOption(index, val) {
      this.active_option.forEach((item, item_index) => {
        item_index > index ? this.$set(this.active_option, item_index, '') : '';
      });
      this.$set(this.active_option, index, val);
    },
    GetProductData() {
      getSingleProductData(this.$route.params.id).then((res) => {
        if (res.code == 200) {
          // 圖片排序，若無圖片則放入預設圖片
          res.data.Picture.sort((a, b) => {
            return a.Seq - b.Seq;
          });
          if (res.data.Picture.length <= 0) {
            res.data.Picture.push({
              Image: '/image/product_default.webp',
            });
          }
          // 過濾優惠資訊
          res.data.Discount = res.data.Discount.filter(
            (item) => new Date(item.EndTime) > new Date()
          );
          this.product_data = this.InitActiveOption(res.data);

          window.dataLayer.push({
            event: 'viewProduct',
            items: [ConvertProductData(res.data)],
            value: 0,
            currency: 'TWD',
          });

          let description = this.product_data.Memo1.replaceAll(/<[^>]+>/g, '');
          let image =
            this.product_data.Image2 != ''
              ? this.product_data.Image2
              : this.product_data.Image1;
          this.meta_data = GetMetaData(
            this.product_data.Title,
            description.slice(0, 150),
            this.$ImageUrl(image)
          );
          this.$nextTick(() => {
            this.$PageReady(this.meta_data.title);
          });
        } else if (res.code == 500) {
          this.$RedirectError();
        }
      });
    },
    InitActiveOption(data) {
      let category = [];
      // 取出所有選項ID
      data.CustomSpecList.forEach((item) => {
        const exist_category = category.filter(
          (category) => category.SpecCategoryID == item.SpecCategoryID
        );
        if (exist_category.length <= 0) {
          category.push({
            SpecCategoryID: item.SpecCategoryID,
            SpecCategoryTitle: item.SpecCategoryTitle,
            SpecCategoryStatus: item.SpecCategoryStatus,
            SpecCategorySeq: item.SpecCategorySeq,
          });
        }
      });
      data.SpecCategoryList = category;
      // 黑名單id list 轉換成array
      data.CustomGoodsSpecBlacklist.forEach((item) => {
        item.CustomSpecID = item.CustomSpecID.split(',');
      });
      // 價格變動id list 轉為array
      data.CustomGoodsChangePrice.forEach((item) => {
        item.CustomSpecID = item.CustomSpecID.split(',');
      });
      // 設定所有選項預設規格
      this.active_option = [];
      category.forEach(() => {
        this.active_option.push('');
      });
      return data;
    },
    GetCategoryProduct() {
      return this.product_list.filter((item) => {
        return (
          item.Menu.filter(
            (menu) => menu.MenuID == this.product_data.RecommendMenuID
          ).length > 0
        );
      });
    },
  },
  created() {
    this.GetProductData();
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    product_data() {
      if (this.product_data != null) {
        this.SetActiveProduct();
        if (this.product_data.Stock.length > 0) {
          this.active_option[0] = this.product_data.Stock[0].ColorID;
          this.active_option[1] = this.product_data.Stock[0].SizeID;
        }
        this.$nextTick(() => {
          this.SetNavTrigger();
        });
      }
    },
  },
  computed: {
    product_list() {
      return this.$store.state.product_data;
    },
    category_data() {
      return this.$store.state.category_data;
    },
    recommend_category_data() {
      if (this.product_data.RecommendMenuID == '') {
        return null;
      } else {
        return this.category_data.filter(
          (item) => item.MenuID == this.product_data.RecommendMenuID
        )[0];
      }
    },
    shopcart() {
      return this.$store.state.shopcart_module.shopcart;
    },
  },
};
</script>
