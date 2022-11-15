<template>
  <nav ref="MainContent" class="fixed w-screen top-0 left-full bottom-0 z-30">
    <div
      data-menu
      class="absolute top-0 bottom-0 left-full sm:w-[432px] w-5/6 bg-white z-10 sm:pt-32 pt-20"
    >
      <button @click="Close" class="absolute top-7 right-7">
        <CloseIcon class="w-5 text-black" />
      </button>

      <h4 class="font-bold sm:text-2xl text-xl mb-10 px-7">您的購物車</h4>
      <ol class="max-h-[70vh] overflow-y-auto px-7">
        <li
          class="py-5 border-b border-zinc-300 flex flex-wrap items-start"
          v-for="(item, item_index) in shopcart"
          :key="`shopcart_${item_index}`"
        >
          <div class="rounded-lg overflow-hidden w-1/4">
            <img :src="$ImageUrl(item.product_data.Image1)" class="w-full" />
          </div>
          <div class="w-3/4 pl-3 sm:mb-14 mb-8">
            <p class="font-bold mb-2">{{ item.product_data.Title }}</p>
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
          <div class="w-full flex justify-end">
            <div class="w-3/4 pl-3 flex items-center justify-between">
              <div
                class="inline-flex items-stretch border border-zinc-300 rounded-sm"
              >
                <button @click="Remove(item_index)" class="p-2">
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
              <p class="font-bold">
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
        class="absolute bottom-0 left-0 right-0 bg-primary py-5 text-white text-center font-bold transition-colors duration-200 hover:bg-secondary"
      >
        結帳
      </router-link>
    </div>
    <div
      data-menu-bg
      class="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-60 z-0"
    ></div>
  </nav>
</template>

<script>
import CloseIcon from '@/components/svg/CloseIcon.vue';
import PlusIcon from '@/components/svg/PlusIcon.vue';
import MinusIcon from '@/components/svg/MinusIcon.vue';
import { menu_gsap_animation } from '@/gsap/main_menu';
import { SaveShopCart, SaveOnlineShopCart } from '@/common/shopcart';
import { getLocalStorage } from '@/common/cookie';
import { addShopcart, getShopcart, removeShopcart } from '@/api/member';
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
      return shopcart_item.product_data.Stock.filter((item) => {
        return (
          item.ColorID == shopcart_item.active_option[0] &&
          item.SizeID == shopcart_item.active_option[1]
        );
      })[0];
    },
    Close() {
      this.$store.commit('SetShopcartDrawer', false);
      this.menu_gsap_animation.close();
      this.$store.commit('SetBodyLock', -1);
    },
    Add(index) {
      if (getLocalStorage('account_token')) {
        this.AddOnline(index);
      } else {
        this.AddOffline(index);
      }
    },
    AddOnline(index) {
      const shopcart_item = this.$store.state.shopcart[index];
      const shopcart = [
        {
          product_data: shopcart_item.product_data,
          active_option: shopcart_item.active_option,
          amount: 1,
        },
      ];
      addShopcart(shopcart).then((res) => {
        console.log(res);
        if (res.code == 302) {
          this.$store.commit('SetShopCart', []);
        } else {
          getShopcart().then((res) => {
            const shop_cart = SaveOnlineShopCart(res.data);
            this.$store.commit('SetShopCart', shop_cart);
          });
        }
      });
    },
    AddOffline(index) {
      let tmp_shopcart = JSON.parse(JSON.stringify(this.$store.state.shopcart));
      tmp_shopcart[index].amount += 1;
      this.$store.commit('SetShopCart', tmp_shopcart);
      SaveShopCart(tmp_shopcart);
    },
    Remove(index) {
      if (getLocalStorage('account_token')) {
        this.RemoveOnline(index);
      } else {
        this.RemoveOffline(index);
      }
    },
    RemoveOnline(index) {
      const shop_cart_item = this.$store.state.shopcart[index];
      removeShopcart(shop_cart_item.shopcart_id[0]).then((res) => {
        console.log(res);
        if (res.code == 302) {
          this.$store.commit('SetShopCart', []);
          SaveShopCart([]);
        } else {
          getShopcart().then((res) => {
            const shop_cart = SaveOnlineShopCart(res.data);
            this.$store.commit('SetShopCart', shop_cart);
          });
        }
      });
    },
    RemoveOffline(index) {
      let tmp_shopcart = JSON.parse(JSON.stringify(this.$store.state.shopcart));
      tmp_shopcart[index].amount -= 1;
      if (tmp_shopcart[index].amount <= 0) {
        tmp_shopcart.splice(index, 1);
      }
      this.$store.commit('SetShopCart', tmp_shopcart);
      SaveShopCart(tmp_shopcart);
    },
  },
  watch: {
    dialog() {
      if (this.dialog) {
        this.menu_gsap_animation.open();
        this.$store.commit('SetBodyLock', 1);
      }
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart;
    },
    dialog() {
      return this.$store.state.shopcart_drawer;
    },
  },
  mounted() {
    this.menu_gsap_animation = new menu_gsap_animation(this.$refs.MainContent);
  },
};
</script>
