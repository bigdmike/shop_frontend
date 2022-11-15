<template>
  <main class="w-full relative z-10">
    <div
      class="w-full max-w-screen-xl mx-auto relative flex items-center justify-center py-64 xl:px-0 px-10"
    >
      <div class="text-center">
        <img src="@/assets/img/check.svg" class="mx-auto mb-5" />
        <h2 class="text-2xl font-bold text-primary mb-1">感謝您的訂購</h2>
        <p class="text-primary mb-4">訂單編號 #{{ tade_no }}</p>
        <p class="text-basic_gray mb-10">
          您的購物明細已透過電子信箱發送<br />也可至
          <router-link to="/order_search" class="underline text-secondary"
            >訂單查詢</router-link
          >
          追蹤您的訂單。
        </p>
        <div>
          <router-link
            to="/"
            class="px-14 py-3 bg-primary text-white rounded-lg transition-colors duration-200 hover:bg-opacity-70"
          >
            回到首頁
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { SaveShopCart } from '@/common/shopcart';
import { getLocalStorage } from '@/common/cookie';
export default {
  name: 'TradeFinishView',
  computed: {
    tade_no() {
      return this.$route.params.id;
    },
  },
  created() {
    const trade_data = getLocalStorage('trade_data');
    if (this.$route.params.id && trade_data) {
      SaveShopCart([]);
      this.$store.commit('SetShopCart', []);
    } else {
      this.$router.push('/');
    }
  },
};
</script>
