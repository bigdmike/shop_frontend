<template>
  <nav class="fixed bottom-0 left-0 right-0 z-20 block md:hidden" v-if="show">
    <ol class="flex items-stretch w-full border-t border-zinc-300">
      <li class="w-1/4 text-center border-r border-zinc-300">
        <button
          @click="$router.push('/')"
          class="flex items-center justify-center w-full py-3 text-white bg-primary sm:py-4"
        >
          <HomeIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </li>
      <li class="w-1/4 text-center border-r border-zinc-300">
        <button
          @click="$emit('open-menu')"
          class="flex items-center justify-center w-full py-3 bg-white text-primary sm:py-4"
        >
          <ListIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </li>
      <li class="w-1/4 text-center border-r border-zinc-300">
        <button
          @click="OpenShopCart"
          class="flex items-center justify-center w-full py-3 bg-white text-primary sm:py-4"
        >
          <div class="relative">
            <span
              class="absolute top-0 right-0 flex items-center justify-center w-4 h-4 transform translate-x-2 -translate-y-2 rounded-full bg-primary"
            >
              <p class="text-xs font-bold text-white transform scale-75">
                {{ shopcart_count }}
              </p>
            </span>
            <ShopCartIcon class="relative z-0 w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        </button>
      </li>
      <li class="w-1/4 text-center">
        <button
          @click="$router.push('/account/account_edit')"
          class="flex items-center justify-center w-full py-3 bg-white text-primary sm:py-4"
        >
          <MemberIcon class="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </li>
    </ol>
  </nav>
</template>

<script>
import HomeIcon from '@/components/svg/HomeIcon.vue';
import ListIcon from '@/components/svg/ListIcon.vue';
import MemberIcon from '@/components/svg/MemberIcon.vue';
import ShopCartIcon from '@/components/svg/ShopCartIcon.vue';
export default {
  name: 'MainFooterNav',
  components: {
    HomeIcon,
    ListIcon,
    MemberIcon,
    ShopCartIcon,
  },
  data() {
    return {
      show: true,
    };
  },
  methods: {
    OpenShopCart() {
      this.$store.commit('SetShopcartDrawer', true);
    },
  },
  computed: {
    shopcart() {
      return this.$store.state.shopcart;
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
      if (this.$route.name == '購物車結帳') {
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
