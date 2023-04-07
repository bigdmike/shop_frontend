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
            :images="product_data.Picture"
            :title="product_data.Title"
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
        :show_image_gallery="false"
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
        <meta itemprop="lowPrice" :content="low_price" />
        <meta itemprop="highPrice" :content="high_price" />
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
import RecommendProducts from '@/components/product_page/RecommendProducts.vue';
import InfoBox from '@/components/product_page/InfoBox.vue';
import IntroContent from '@/components/product_page/IntroContent.vue';
import { getLocalStorage } from '@/common/cookie';
import { getSingleProductData } from '@/api/page_data';
import { GetMetaData } from '@/common/meta';
import {
  ConvertProductData,
  ConvertAddShopCartData,
} from '@/common/gtm_methods';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'ProductPage',
  components: {
    BreadCrumb,
    ImageGallery,
    InfoBox,
    RecommendProducts,
    IntroContent,
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
      page_ready: false,
    };
  },
  methods: {
    // 設定BreadCrumb
    SetBreadCrumb() {
      this.bread_crumb_path[2].title = this.product_data.Title;
      this.bread_crumb_path[2].link = `/product/${this.product_data.GoodsID}`;
    },
    // 加入購物車
    AddShopCart() {
      // GTM事件
      window.dataLayer.push({
        event: 'add_to_cart',
        items: [
          ConvertAddShopCartData(
            this.product_data,
            this.active_option,
            this.amount,
            this.$refs.Info.active_stock.SellPrice
          ),
        ],
        value: 0,
        currency: 'TWD',
      });

      // 加入購物車物件
      const shop_cart_item = {
        product: this.product_data, //商品資料
        options: this.active_option, //選用選項
        amount: this.amount, //數量
        show_message: true, //是否顯示加入購物車訊息
      };

      // 判斷是否登入會員決定呼叫線上購物車API或本地儲存
      if (getLocalStorage('account_token')) {
        this.$store.dispatch('shopcart_module/AddShopCart', shop_cart_item);
      } else {
        this.$store.commit('shopcart_module/AddShopCart', shop_cart_item);
      }
    },
    // 改變選購數量
    ChangeAmount(val) {
      this.amount + val <= 1 ? (this.amount = 1) : (this.amount += val);
    },
    // 改變商品選項
    ChangeOption(index, val) {
      this.$set(this.active_option, index, val);
      if (index == 0) {
        let default_option = this.product_data.Stock.filter(
          (item) => item.ColorID == val
        )[0];
        setTimeout(() => {
          this.$set(this.active_option, 1, default_option.SizeID);
        }, 100);
      }
    },
    // 取得商品資料
    GetProductData() {
      getSingleProductData(this.$route.params.id).then((res) => {
        if (res.code == 200) {
          // 排序商品圖片
          res.data.Picture.sort((a, b) => {
            return a.Seq - b.Seq;
          });
          // 篩選庫存，去除已停用的庫存
          res.data.Stock = res.data.Stock.filter((item) => item.Status == 'Y');
          // 篩選優惠活動，去除已經過期的優惠活動
          res.data.Discount = res.data.Discount.filter(
            (item) => new Date(item.EndTime) > new Date()
          );
          // 若商品沒有任何圖片，則放入一張預設圖片
          if (res.data.Picture.length <= 0) {
            res.data.Picture.push({
              Image: '/image/product_default.webp',
            });
          }
          this.product_data = res.data;
          this.PageInit();
        } else if (res.code == 500) {
          this.$RedirectError();
        }
      });
    },
    // 初始化
    PageInit() {
      // GA4 電子商務事件『瀏覽商品』
      window.dataLayer.push({
        event: 'viewProduct',
        items: [ConvertProductData(this.product_data)],
        value: 0,
        currency: 'TWD',
      });

      // META TAG設定
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
    // 動畫初始化
    SetGsap() {
      this.page_ready = true;
      this.$refs.RecommendProducts.SetGsap();
      this.$emit('page-mounted');
      this.$PageReady(this.meta_data.title);
    },
  },
  created() {
    this.GetProductData();
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    // 第一次商品載入的時候，設定BreadCrumb以及預設選項
    product_data() {
      if (this.product_data != null) {
        this.SetBreadCrumb();
        if (this.product_data.Stock.length > 0) {
          this.active_option[0] = this.product_data.Stock[0].ColorID;
          this.active_option[1] = this.product_data.Stock[0].SizeID;
        }
      }
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
  },
  computed: {
    ...mapState({
      product_list: 'product_data',
      category_data: 'category_data',
      image_loaded: 'image_loaded',
    }),
    ...mapGetters(['filter_product_data', 'filter_category_data']),
    // 取得推薦商品
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
    // 篩選庫存最低價錢
    low_price() {
      let price = 99999999;
      this.product_data.Stock.forEach((item) => {
        parseInt(item.SellPrice) < price ? (price = item.Price) : '';
      });
      return price == 99999999 ? 0 : price;
    },
    // 篩選庫存最高價錢
    high_price() {
      let price = 0;
      this.product_data.Stock.forEach((item) => {
        parseInt(item.SellPrice) > price ? (price = item.Price) : '';
      });
      return price;
    },
  },
};
</script>
