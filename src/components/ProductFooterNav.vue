<template>
  <div
    v-if="$route.name == '商品介紹'"
    class="fixed z-20 block w-11/12 max-w-lg overflow-hidden transform -translate-x-1/2 rounded-lg bottom-5 left-1/2 md:hidden bg-basic_black"
  >
    <div class="relative flex w-full pointer-events-auto">
      <router-link
        to="/collections?category=all"
        class="px-8 py-4 text-sm font-medium text-white bg-basic_black"
        >返回列表</router-link
      >
      <button
        @click="$emit('add-cart')"
        class="flex-1 py-4 text-sm font-bold text-white bg-primary"
      >
        加入購物車
      </button>
    </div>
  </div>
</template>
