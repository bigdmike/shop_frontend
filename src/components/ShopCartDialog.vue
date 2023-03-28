<template>
  <div
    ref="MainContent"
    class="fixed top-0 bottom-0 right-0 z-[32] flex items-center justify-center w-screen overflow-hidden left-full"
  >
    <div
      data-dialog-box
      class="w-11/12 max-w-[400px] overflow-hidden section_corner_y p-10 bg-basic_black text-white flex items-center justify-center relative z-10"
    >
      <h4 class="relative z-10 font-bold">已將商品加入購物車</h4>
      <div
        data-dialog-progress
        class="absolute top-0 bottom-0 left-0 right-0 origin-left opacity-50 bg-primary"
      ></div>
    </div>
    <div
      data-dialog-bg
      class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black bg-opacity-50"
    ></div>
  </div>
</template>

<script>
import { shopcart_dialog_gsap_animation } from '@/gsap/shopcart_dialog';
export default {
  name: 'ShopCartDialog',
  computed: {
    add_cart_message() {
      return this.$store.state.shopcart_module.add_cart_message;
    },
  },
  data() {
    return {
      shopcart_dialog_gsap_animation: null,
    };
  },
  watch: {
    add_cart_message() {
      if (this.add_cart_message) {
        this.shopcart_dialog_gsap_animation.open();
      }
    },
  },
  mounted() {
    this.shopcart_dialog_gsap_animation = new shopcart_dialog_gsap_animation(
      this.$refs.MainContent
    );
  },
};
</script>
