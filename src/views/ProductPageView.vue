<template>
  <main id="ProductPage" class="relative w-full" v-if="product_data != null">
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0">
      <BreadCrumb class="my-5 md:mb-20 md:pt-0" :path="bread_crumb_path" />
      <div class="flex flex-wrap items-start mb-20 -mx-10">
        <div class="w-full px-10 mb-10 md:w-1/2 md:mb-0">
          <ImageGallery :images="product_data.Picture" />
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

      <FixedProductTabList
        :active_tab="active_tab"
        :tabs="tabs"
        @change-tab="ChangeTab"
      />

      <ProductTabList
        :active_tab="active_tab"
        :tabs="tabs"
        @change-tab="ChangeTab"
      />
      <div id="Description" class="mb-10" v-html="product_data.Memo1"></div>
      <div
        id="Workflow"
        class="pt-10 mb-10 border-t border-zinc-300"
        v-html="product_data.Memo2"
      ></div>
      <div
        id="Precautions"
        class="pt-10 mb-10 border-t border-zinc-300"
        v-html="product_data.Memo3"
      ></div>
      <FixedFooter class="flex md:hidden" @add-cart="AddShopCart" />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ImageGallery from '@/components/product_page/image_gallery.vue';
import InfoBox from '@/components/product_page/info_box.vue';
import ProductTabList from '@/components/product_page/tab_list.vue';
import FixedProductTabList from '@/components/product_page/fixed_tab_list.vue';
import FixedFooter from '@/components/product_page/fixed_footer.vue';
import { SaveShopCart, SaveOnlineShopCart } from '@/common/shopcart';
import { getLocalStorage } from '@/common/cookie';
import { addShopcart, getShopcart } from '@/api/member';
import { getSingleProductData } from '@/api/page_data';
import { GetMetaData } from '@/common/meta';
import { redirectErrorPage } from '@/common/prerender';
export default {
  name: 'ProductPage',
  components: {
    BreadCrumb,
    ImageGallery,
    InfoBox,
    ProductTabList,
    FixedProductTabList,
    FixedFooter,
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
      if (getLocalStorage('account_token')) {
        this.AddShopCartOnline();
      } else {
        this.AddShopCartOffline();
      }
    },
    AddShopCartOnline() {
      // 1.call 加入購物車 api
      const shopcart = [
        {
          product_data: this.product_data,
          active_option: this.active_option,
          amount: this.amount,
        },
      ];
      addShopcart(shopcart).then((res) => {
        if (res.code == 302) {
          // token 過期
          this.$store.commit('SetShopCart', []);
          this.AddShopCartOffline();
        } else {
          // 2.call 取得購物車 api 並存入 store
          getShopcart().then((res) => {
            if (res.code == 302) {
              this.$store.commit('SetShopCart', []);
              SaveShopCart([]);
            } else {
              const shop_cart = SaveOnlineShopCart(res.data);
              this.$store.commit('SetShopCart', shop_cart);
            }
            this.$store.commit('SetAddCartMessage', true);
          });
        }
      });
    },
    AddShopCartOffline() {
      let product_exist = false;
      let tmp_shopcart = JSON.parse(JSON.stringify(this.shopcart));
      tmp_shopcart.forEach((item, item_index) => {
        // check if product exist
        if (item.product_data.GoodsID === this.product_data.GoodsID) {
          // chek if option exist
          if (
            item.active_option[0] === this.active_option[0] &&
            item.active_option[1] === this.active_option[1]
          ) {
            product_exist = true;
            tmp_shopcart[item_index].amount += this.amount;
          }
        }
      });
      if (!product_exist) {
        let shopcart_item = {
          product_data: this.product_data,
          active_option: JSON.parse(JSON.stringify(this.active_option)),
          amount: JSON.parse(JSON.stringify(this.amount)),
        };
        tmp_shopcart.push(shopcart_item);
      }
      this.$store.commit('SetShopCart', tmp_shopcart);
      SaveShopCart(tmp_shopcart);
      this.$store.commit('SetAddCartMessage', true);
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
    GetProductData() {
      getSingleProductData(this.$route.params.id).then((res) => {
        if (res.code == 200) {
          res.data.Picture.sort((a, b) => {
            return a.Seq - b.Seq;
          });
          res.data.Stock = res.data.Stock.filter((item) => item.Status == 'Y');
          res.data.Discount = res.data.Discount.filter(
            (item) => new Date(item.EndTime) > new Date()
          );
          if (res.data.Picture.length <= 0) {
            res.data.Picture.push({
              Image: '/image/product_default.webp',
            });
          }
          this.product_data = res.data;

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
            window.prerenderReady = true;
          });
        } else if (res.code == 500) {
          // this.$router.push('/error_page');
          redirectErrorPage();
        }
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
    shopcart() {
      return this.$store.state.shopcart;
    },
  },
};
</script>
