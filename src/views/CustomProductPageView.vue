<template>
  <main
    id="ProductPage"
    :class="page_ready ? '' : 'opacity-0'"
    class="relative z-10 w-full min-h-screen pt-24 pb-20 md:pt-40 bg-bg_black"
    data-scroll-section
    itemtype="https://schema.org/Product"
    itemscope
  >
    <div
      v-if="product_data != null && product_list != null"
      class="w-full max-w-screen-xl px-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="my-5 md:mb-20 md:pt-0" :path="bread_crumb_path" />
      <div class="flex flex-wrap items-start mb-20 -mx-10">
        <div class="w-full px-10 mb-10 md:w-1/2 md:mb-0">
          <ImageGallery
            v-if="product_data.CustomImagePath == ''"
            :images="product_data.Picture"
            :title="product_data.Title"
          />
          <CustomImageBox
            v-else
            ref="ImageBox"
            :active_option="active_option"
            :category_list="product_data.SpecCategoryList"
            :spec_list="product_data.CustomSpecList"
            :image_path="product_data.CustomImagePath"
            :product_data="product_data"
          />
        </div>
        <div class="w-full px-10 md:w-1/2">
          <InfoBox
            ref="Info"
            :product_data="product_data"
            :active_option="active_option"
            :amount="amount"
            @change-amount="ChangeAmount"
            @change-option="ChangeOption"
            @add-cart="AddShopCart"
          />
        </div>
      </div>

      <IntroContent
        :description="product_data.Memo1"
        :shipping_info="product_data.Memo2"
        :warning="product_data.Memo3"
        :show_image_gallery="product_data.CustomImagePath != ''"
        :images="product_data.Picture"
        :title="product_data.Title"
      />

      <RecommendProducts
        v-if="recommend_product_list != null"
        ref="RecommendProducts"
        :category_data="filter_category_data(this.product_data.RecommendMenuID)"
        :recommend_product_list="recommend_product_list"
      />

      <!-- json ld -->
      <meta itemprop="name" :content="product_data.Title" />
      <div
        itemprop="offers"
        itemtype="https://schema.org/AggregateOffer"
        itemscope
      >
        <meta
          itemprop="lowPrice"
          :content="product_data.CustomGoodsStock[0].SellPrice"
        />
        <meta
          itemprop="highPrice"
          :content="product_data.CustomGoodsStock[0].SellPrice"
        />
        <meta itemprop="offerCount" content="99" />
        <meta itemprop="priceCurrency" content="TWD" />
      </div>
      <meta itemprop="sku" :content="`yaowen_${product_data.GoodsID}`" />
      <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
        <meta itemprop="name" :content="$GetColumn('brand_name')" />
      </div>
      <div
        itemprop="aggregateRating"
        itemtype="https://schema.org/AggregateRating"
        itemscope
      >
        <meta itemprop="reviewCount" content="10" />
        <meta itemprop="ratingValue" content="5" />
      </div>
      <meta itemprop="description" :content="product_data.Memo1" />
      <link itemprop="image" :href="$ImageUrl(product_data.Image1)" />
      <link
        v-for="(image, image_index) in product_data.Picture"
        :key="`image_${image_index}`"
        itemprop="image"
        :href="$ImageUrl(image.Image)"
      />
      <!-- json ld -->
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ImageGallery from '@/components/product_page/ImageGallery.vue';
import CustomImageBox from '@/components/product_page/CustomImageBox.vue';
import InfoBox from '@/components/product_page/CustomInfoBox.vue';
import RecommendProducts from '@/components/product_page/RecommendProducts.vue';
import IntroContent from '@/components/product_page/IntroContent.vue';
import { getLocalStorage } from '@/common/cookie';
import { getSingleProductData } from '@/api/page_data';
import { GetMetaData } from '@/common/meta';
import {
  ConvertProductData,
  ConvertAddShopCartData,
} from '@/common/gtm_methods';
import customize_image_data from '@/assets/data/customize.json';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'ProductPage',
  components: {
    BreadCrumb,
    ImageGallery,
    InfoBox,
    CustomImageBox,
    IntroContent,
    RecommendProducts,
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
      active_option: [],
      product_data: null,
      meta_data: null,
      customize_image_data: customize_image_data,
      page_ready: false,
    };
  },
  methods: {
    SetBreadCrumb() {
      this.bread_crumb_path[2].title = this.product_data.Title;
      this.bread_crumb_path[2].link = `/product/${this.product_data.GoodsID}`;
    },
    AddShopCart() {
      if (this.CheckActiveOption()) {
        window.dataLayer.push({
          event: 'add_to_cart',
          items: [
            ConvertAddShopCartData(
              this.product_data,
              this.active_option,
              this.amount,
              this.$refs.Info.GetPrice()[0]
            ),
          ],
          value: 0,
          currency: 'TWD',
        });
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
          this.PageInit();
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

      // 設定客製化圖片
      const custom_image_data = this.customize_image_data.filter(
        (item) => item.GoodsID == data.GoodsID
      );
      data.CustomImagePath =
        custom_image_data.length > 0 ? custom_image_data[0].ImagePath : '';
      return data;
    },
    PageInit() {
      window.dataLayer.push({
        event: 'viewProduct',
        items: [ConvertProductData(this.product_data)],
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
        this.$emit('load-image');
      });
    },
    SetGsap() {
      this.page_ready = true;
      this.$PageReady(this.meta_data.title);
      if (this.product_data.CustomImagePath != '') {
        this.$nextTick(() => {
          this.$refs.ImageBox.SetGsap();
        });
      }
      if (this.recommend_product_list != null) {
        this.$nextTick(() => {
          this.$refs.RecommendProducts.SetGsap();
        });
      }
      this.$nextTick(() => {
        this.$emit('page-mounted');
      });
    },
  },
  created() {
    this.GetProductData();
  },
  watch: {
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
    product_data() {
      if (this.product_data != null) {
        this.SetBreadCrumb();
      }
    },
    $route() {
      this.GetProductData();
    },
  },
  computed: {
    ...mapState({
      product_list: 'product_data',
      category_data: 'category_data',
      image_loaded: 'image_loaded',
    }),
    ...mapGetters(['filter_category_data', 'filter_product_data']),
    recommend_product_list() {
      if (
        this.product_data.RecommendMenuID == '' ||
        this.product_data.RecommendMenuID == '0'
      ) {
        return null;
      } else {
        return this.filter_product_data(this.product_data.RecommendMenuID);
      }
    },
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
