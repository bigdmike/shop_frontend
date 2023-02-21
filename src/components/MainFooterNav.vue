<template>
  <nav
    class="fixed z-20 block w-11/12 max-w-lg transform -translate-x-1/2 rounded-lg bottom-5 left-1/2 md:hidden bg-basic_black"
    v-if="show"
  >
    <ol class="flex items-stretch w-full">
      <li class="w-1/4 text-center border-r border-white border-opacity-10">
        <button
          @click="$router.push('/')"
          class="flex items-center justify-center w-full h-full py-3 text-white sm:py-4"
        >
          <span class="text-xl text-white icon-home"></span>
        </button>
      </li>
      <li class="w-1/4 text-center border-r border-white border-opacity-10">
        <button
          @click="$emit('open-menu')"
          class="flex items-center justify-center w-full h-full py-3 text-white sm:py-4"
        >
          <span class="text-xl text-white icon-menu"></span>
        </button>
      </li>
      <li class="w-1/4 text-center border-r border-white border-opacity-10">
        <button
          @click="OpenShopCart"
          class="flex items-center justify-center w-full h-full pb-[10px] pt-[14px] text-white sm:py-4"
        >
          <div class="relative">
            <span
              class="absolute top-0 right-0 flex items-center justify-center w-4 h-4 transform translate-x-2 -translate-y-1 rounded-full bg-primary"
            >
              <p class="text-xs font-bold text-white transform scale-75">
                {{ shopcart_count }}
              </p>
            </span>
            <span class="text-xl leading-none text-white icon-cart"></span>
          </div>
        </button>
      </li>
      <li class="w-1/4 text-center">
        <button
          @click="OpenSearchDialog"
          class="flex items-center justify-center w-full h-full py-3 text-white sm:py-4"
        >
          <span class="text-xl text-white icon-search"></span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  name: 'MainFooterNav',
  components: {},
  data() {
    return {
      show: true,
    };
  },
  methods: {
    OpenShopCart() {
      this.$store.commit('SetShopcartDrawer', true);
    },
    OpenSearchDialog() {
      this.$store.commit('SetSearchDialog', true);
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart_module.shopcart;
    },
    shopcart_count() {
      let count = 0;
      this.shopcart.forEach((item) => {
        count += parseInt(item.amount);
      });

      return count;
    },
  },
  watch: {
    $route() {
      if (this.$route.name == '購物車結帳' || this.$route.name == '商品介紹') {
        this.show = false;
      } else {
        this.show = true;
      }
    },
  },
  created() {
    if (this.$route.name == '購物車結帳') {
      this.show = false;
    }
  },
};
</script>
