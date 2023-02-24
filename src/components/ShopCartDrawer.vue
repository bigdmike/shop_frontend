<template>
  <nav ref="MainContent" class="fixed top-0 bottom-0 z-30 w-screen left-full">
    <div
      data-menu
      class="absolute top-0 flex flex-col bottom-0 left-full sm:w-[432px] xs:w-5/6 w-full bg-basic_gray z-10 pt-12 pb-5"
    >
      <button @click="Close" class="absolute xs:top-7 xs:right-7 top-5 right-5">
        <CloseIcon class="w-5 text-black" />
      </button>

      <header
        class="relative z-10 flex flex-col-reverse items-start w-full mb-2 px-7"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none text-basic_black"
            >購物車</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <h3 class="overflow-hidden">
          <span
            data-section-title
            class="block text-[40px] font-black text-primary font-anybody"
          >
            My Cart
          </span>
        </h3>
      </header>

      <div class="px-7">
        <p
          class="pb-3 text-sm font-bold text-right border-b font-anybody border-basic_black"
        >
          {{ shopcart.length }} 項商品
        </p>
      </div>
      <ol class="flex-1 overflow-y-auto custom_scroll px-7">
        <li
          class="flex flex-wrap items-start py-5 border-b border-zinc-300"
          v-for="(item, item_index) in shopcart"
          :key="`shopcart_${item_index}`"
        >
          <div class="w-1/4 overflow-hidden rounded-lg aspect-square">
            <img
              :src="$ImageUrl(item.product_data.Image1)"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="w-3/4 pl-3 mb-4" v-if="GetActiveOption(item) != 'error'">
            <div class="flex items-center justify-between mb-2">
              <p class="text-sm font-bold truncate xs:text-base">
                {{ item.product_data.Title }}
              </p>
              <button
                @click="Remove(item_index, item.amount)"
                class="text-sm text-primary"
              >
                <span class="text-xl icon-trash"></span>
              </button>
            </div>
            <p class="text-sm font-medium text-opacity-60 text-basic_black">
              <span class="block mr-2 text-xs font-medium">選項一</span>
              {{ GetActiveOption(item).ColorTitle }}
            </p>
            <p
              v-if="GetActiveOption(item).SizeTitle != '無'"
              class="text-sm font-medium text-opacity-60 text-basic_black"
            >
              <span class="block mr-2 text-xs font-medium">選項二</span
              >{{ GetActiveOption(item).SizeTitle }}
            </p>
          </div>
          <div class="flex justify-end w-full mt-2">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <div
                  class="inline-flex items-stretch mr-5 bg-white border rounded-sm"
                >
                  <button @click="Remove(item_index, 1)" class="px-2">
                    <MinusIcon class="w-3 text-black" />
                  </button>
                  <input
                    :value="item.amount"
                    type="text"
                    readonly
                    class="w-10 text-center"
                  />
                  <button @click="Add(item_index)" class="px-2">
                    <PlusIcon class="w-3 text-black" />
                  </button>
                </div>
              </div>
              <p class="text-sm font-bold font-anybody xs:text-base">
                <!-- NT$9999 -->
                NT${{
                  $MoneyFormat(
                    parseInt(GetActiveOption(item).SellPrice) * item.amount
                  )
                }}
              </p>
            </div>
          </div>
        </li>
      </ol>

      <div class="px-5 pt-5">
        <div class="flex items-center mb-2">
          <p class="mr-5 text-xs font-bold">合計</p>
          <p class="font-bold font-anybody text-primary">
            NTD {{ $MoneyFormat(total_price) }}
          </p>
        </div>
        <router-link
          to="/shopcart"
          @click.native="Close"
          class="block py-3 font-bold text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-basic_black hover:text-primary"
        >
          立即購買
        </router-link>
      </div>
    </div>
    <div
      @click="Close"
      data-menu-bg
      class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black bg-opacity-60"
    ></div>
  </nav>
</template>

<script>
import CloseIcon from '@/components/svg/CloseIcon.vue';
import PlusIcon from '@/components/svg/PlusIcon.vue';
import MinusIcon from '@/components/svg/MinusIcon.vue';
import { shopcart_drawer_animation } from '@/gsap/shopcart_drawer.js';
import { getLocalStorage } from '@/common/cookie';
import { ConvertAddShopCartData } from '@/common/gtm_methods';
export default {
  name: 'ShopCartDrawer',
  components: {
    CloseIcon,
    PlusIcon,
    MinusIcon,
  },
  data() {
    return {
      menu_gsap_animation: null,
    };
  },
  methods: {
    GetActiveOption(shopcart_item) {
      const stock = shopcart_item.product_data.Stock.filter((item) => {
        return (
          item.ColorID == shopcart_item.active_option[0] &&
          item.SizeID == shopcart_item.active_option[1]
        );
      });
      return stock.length > 0 ? stock[0] : 'error';
    },
    Close() {
      this.$store.commit('SetShopcartDrawer', false);
      this.menu_gsap_animation.close();
      this.$store.commit('SetBodyLock', -1);
    },
    Add(index) {
      window.dataLayer.push({
        event: 'add_to_cart',
        items: [
          ConvertAddShopCartData(
            this.shopcart[index].product_data,
            this.shopcart[index].active_option,
            1
          ),
        ],
        value: 0,
        currency: 'TWD',
      });
      const shop_cart_item = {
        product: this.shopcart[index].product_data,
        options: this.shopcart[index].active_option,
        amount: 1,
      };
      if (getLocalStorage('account_token')) {
        this.$store.dispatch('shopcart_module/AddShopCart', shop_cart_item);
      } else {
        this.$store.commit('shopcart_module/AddShopCart', shop_cart_item);
      }
    },
    Remove(index, count) {
      window.dataLayer.push({
        event: 'remove_from_cart',
        items: [
          ConvertAddShopCartData(
            this.shopcart[index].product_data,
            this.shopcart[index].active_option,
            1
          ),
        ],
        value: 0,
        currency: 'TWD',
      });

      // RemoveShopCart({ index:index, amount:count })
      if (getLocalStorage('account_token')) {
        // this.RemoveOnline(index, count);
        this.$store.dispatch('shopcart_module/RemoveShopCart', {
          index: index,
          amount: count,
        });
      } else {
        // this.RemoveOffline(index, count);
        this.$store.commit('shopcart_module/RemoveShopCart', {
          index: index,
          amount: count,
        });
      }
    },
    OpenShopCart() {
      // GTM事件
      let products = [];
      this.shopcart.forEach((item) => {
        const product = ConvertAddShopCartData(
          item.product_data,
          item.active_option,
          1
        );
        products.push(product);
      });
      window.dataLayer.push({
        event: 'view_cart',
        items: products,
        value: 0,
        currency: 'TWD',
      });
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.menu_gsap_animation.open();
        this.$store.commit('SetBodyLock', 1);
        this.OpenShopCart();
      }
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart_module.shopcart;
    },
    dialog() {
      return this.$store.state.shopcart_drawer;
    },
    total_price() {
      let price = 0;
      this.shopcart.forEach((item) => {
        price += parseInt(this.GetActiveOption(item).SellPrice) * item.amount;
      });
      return price;
    },
  },
  mounted() {
    this.menu_gsap_animation = new shopcart_drawer_animation(
      this.$refs.MainContent
    );
  },
};
</script>
