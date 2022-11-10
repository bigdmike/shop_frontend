<template>
  <div class="fixed bottom-0 left-0 w-full z-20 flex border-t border-zinc-300">
    <router-link
      to="/collections/all"
      class="py-4 px-10 bg-white text-primary text-sm"
      >返回列表</router-link
    >
    <button
      @click="$emit('add-cart')"
      class="bg-primary py-4 text-white font-bold flex-1 text-sm"
    >
      加入購物車
    </button>
  </div>
</template>
