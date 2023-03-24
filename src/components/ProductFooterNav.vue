<template>
  <Teleport to="#app"
    ><div
      v-if="$route.name == '商品介紹' || $route.name == '客製化商品介紹'"
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
          v-if="stock > 0 && time_status != 'end' && time_status != 'prepare'"
          class="flex-1 py-4 text-sm font-bold text-white bg-primary"
        >
          加入購物車
          <span class="ml-3 text-xl icon-arrow_right"></span>
        </button>
        <button
          v-else
          class="flex-1 py-4 text-sm font-bold text-white cursor-not-allowed bg-zinc-600"
        >
          {{
            time_status == 'end'
              ? '已結束販售'
              : time_status == 'prepare'
              ? '尚未開賣'
              : '商品已售完'
          }}
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';
export default {
  name: 'ProductFixedFotoer',
  components: {
    Teleport,
  },
  props: {
    stock: {
      type: Number,
    },
    time_status: {
      type: String,
    },
  },
};
</script>
