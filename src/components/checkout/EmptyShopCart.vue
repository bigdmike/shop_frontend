<template>
  <div class="w-full max-w-screen-xl px-5 py-64 mx-auto text-center xl:px-0">
    <h4 class="mb-4 text-2xl font-bold text-white">購物車內目前沒有商品</h4>
    <p class="mb-10 text-white">
      您可以前往<a href="/collections?category=all" class="text-primary"
        >瀏覽商品</a
      >，選購您想要得商品
    </p>
    <div class="flex items-center justify-center">
      <router-link
        to="/"
        class="px-4 py-2 mr-2 transition-all duration-300 rounded-lg text-primary hover:text-primary hover:bg-primary hover:bg-opacity-30"
      >
        回到首頁
      </router-link>
      <router-link
        to="/collections?category=all"
        class="px-4 py-2 text-white transition-all duration-300 rounded-lg bg-primary hover:bg-opacity-70"
      >
        瀏覽商品
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmptyShopCart',
};
</script>
