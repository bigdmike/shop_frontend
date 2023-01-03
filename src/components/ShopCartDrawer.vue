<template>
  <nav ref="MainContent" class="fixed top-0 bottom-0 z-30 w-screen left-full">
    <div
      data-menu
      class="absolute top-0 bottom-0 left-full sm:w-[432px] xs:w-5/6 w-full bg-white z-10 sm:pt-32 xs:pt-20 pt-10 md:pb-0"
    >
      <button @click="Close" class="absolute xs:top-7 xs:right-7 top-5 right-5">
        <CloseIcon class="w-5 text-black" />
      </button>

      <h4 class="px-5 mb-10 text-xl font-bold sm:text-2xl xs:px-7">
        您的購物車
      </h4>
      <ol class="max-h-[70vh] overflow-y-auto xs:px-7 px-5">
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
          <div
            class="w-3/4 pl-3 mb-8 sm:mb-14"
            v-if="GetActiveOption(item) != 'error'"
          >
            <p class="mb-2 text-sm font-bold xs:text-base">
              {{ item.product_data.Title }}
            </p>
            <p class="text-sm text-basic_gray">
              {{ GetActiveOption(item).ColorTitle }}
            </p>
            <p
              v-if="GetActiveOption(item).SizeTitle != '無'"
              class="text-sm text-basic_gray"
            >
              {{ GetActiveOption(item).SizeTitle }}
            </p>
          </div>
          <div class="flex justify-end w-full">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center">
                <div
                  class="inline-flex items-stretch mr-5 border rounded-sm border-zinc-300"
                >
                  <button @click="Remove(item_index, 1)" class="p-2">
                    <MinusIcon class="w-3 text-black" />
                  </button>
                  <input
                    type="text"
                    readonly
                    :value="item.amount"
                    class="w-10 text-center"
                  />
                  <button @click="Add(item_index)" class="p-2">
                    <PlusIcon class="w-3 text-black" />
                  </button>
                </div>
                <button
                  @click="Remove(item_index, item.amount)"
                  class="text-sm underline text-secondary"
                >
                  移除
                </button>
              </div>
              <p class="text-sm font-bold xs:text-base">
                NT$
                {{
                  $MoneyFormat(
                    parseInt(GetActiveOption(item).SellPrice) * item.amount
                  )
                }}
              </p>
            </div>
          </div>
        </li>
      </ol>

      <router-link
        to="/shopcart"
        @click.native="Close"
        class="absolute bottom-0 left-0 right-0 py-5 font-bold text-center text-white transition-colors duration-200 md:bottom-0 bg-primary hover:bg-secondary"
      >
        結帳
      </router-link>
    </div>
    <div
      @click="Close"
      data-menu-bg
      class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-white bg-opacity-60"
    ></div>
  </nav>
</template>

<script>
import CloseIcon from '@/components/svg/CloseIcon.vue';
import PlusIcon from '@/components/svg/PlusIcon.vue';
import MinusIcon from '@/components/svg/MinusIcon.vue';
import { menu_gsap_animation } from '@/gsap/main_menu';
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
  },
  mounted() {
    this.menu_gsap_animation = new menu_gsap_animation(this.$refs.MainContent);
  },
  created() {
    // 檢查商品選項是否可用 如果不能用就移除
    this.shopcart.forEach((item, item_index) => {
      const stock = this.GetActiveOption(item);
      if (stock == 'error') {
        let count = 0;
        while (count < item.amount) {
          this.Remove(item_index, count + 1);
          count += 1;
        }
      }
    });
  },
};
</script>
