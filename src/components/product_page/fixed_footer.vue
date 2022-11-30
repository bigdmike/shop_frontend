<template>
  <div class="fixed bottom-0 left-0 z-20 flex w-full border-t border-zinc-300">
    <router-link
      to="/collections?category=all"
      class="px-10 py-4 text-sm bg-white text-primary"
      >返回列表</router-link
    >
    <button
      @click="$emit('add-cart')"
      class="flex-1 py-4 text-sm font-bold text-white bg-primary"
    >
      加入購物車
    </button>
  </div>
</template>
