<template>
  <Teleport to="#app">
    <div
      ref="MainContent"
      class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen left-full"
    >
      <div
        data-dialog-box
        class="w-[400px] max-w-full bg-black text-white relative z-10 p-10 section_corner_y"
      >
        <div class="mb-5 text-center">此操作無法還原，確定要刪除嗎？</div>
        <div class="flex items-center justify-center">
          <button
            @click="Close"
            class="px-10 py-2 mr-1 text-sm font-bold transition-colors duration-200 bg-transparent border rounded-md text-primary border-primary hover:bg-primary hover:text-white"
          >
            取消
          </button>
          <button
            @click="Submit"
            class="px-10 py-2 ml-1 text-sm font-bold text-white transition-colors duration-200 border rounded-md bg-primary border-primary hover:bg-transparent hover:text-primary"
          >
            確定
          </button>
        </div>
      </div>
      <div
        data-dialog-bg
        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-basic_black bg-opacity-80"
      ></div></div
  ></Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';
import { dialog_animation } from '@/gsap/dialog';
export default {
  name: 'AddressDeleteDialog',
  components: {
    Teleport,
  },
  data() {
    return {
      dialog_animation: null,
      status: false,
      id: 0,
    };
  },
  methods: {
    Open(id) {
      this.id = id;
      this.status = true;
    },
    Close() {
      this.id = 0;
      this.status = false;
    },
    Submit() {
      this.$emit('delete-action', this.id);
      this.status = false;
    },
  },
  watch: {
    status() {
      if (this.status) {
        this.dialog_animation.open();
      } else {
        this.dialog_animation.close();
      }
    },
  },
  mounted() {
    this.dialog_animation = new dialog_animation(this.$refs.MainContent);
  },
};
</script>
