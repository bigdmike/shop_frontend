<template>
  <nav class="fixed bottom-0 left-0 right-0 z-20">
    <ol class="w-full flex items-stretch border-t border-zinc-300">
      <li class="w-1/4 text-center border-r border-zinc-300">
        <button
          @click="$router.push('/')"
          class="w-full flex bg-primary text-white items-center justify-center sm:py-4 py-3"
        >
          <HomeIcon class="sm:w-6 sm:h-6 w-5 h-5" />
        </button>
      </li>
      <li class="w-1/4 text-center border-r border-zinc-300">
        <button
          @click="$emit('open-menu')"
          class="w-full flex bg-white text-primary items-center justify-center sm:py-4 py-3"
        >
          <ListIcon class="sm:w-6 sm:h-6 w-5 h-5" />
        </button>
      </li>
      <li class="w-1/4 text-center border-r border-zinc-300">
        <button
          @click="OpenShopCart"
          class="w-full flex bg-white text-primary items-center justify-center sm:py-4 py-3"
        >
          <div class="relative">
            <span
              class="w-4 h-4 flex items-center justify-center absolute top-0 right-0 bg-primary rounded-full transform translate-x-2 -translate-y-2"
            >
              <p class="text-xs text-white transform scale-75 font-bold">
                {{ shopcart_count }}
              </p>
            </span>
            <ShopCartIcon class="sm:w-6 sm:h-6 w-5 h-5 relative z-0" />
          </div>
        </button>
      </li>
      <li class="w-1/4 text-center">
        <button
          @click="$router.push('/account/account_edit')"
          class="w-full flex bg-white text-primary items-center justify-center sm:py-4 py-3"
        >
          <MemberIcon class="sm:w-6 sm:h-6 w-5 h-5" />
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
};
</script>
