<template>
  <div
    ref="MainContent"
    class="fixed top-0 left-full w-screen bottom-0 z-30 flex items-center justify-center"
  >
    <div
      data-dialog-box
      class="w-[400px] max-w-full bg-white relative z-10 p-10 rounded-2xl"
    >
      <div v-html="content" class="text-center mb-5"></div>
      <div class="text-center">
        <button
          @click="Close"
          class="px-10 py-2 text-sm font-bold text-white bg-primary rounded-full border border-primary transition-colors duration-200 hover:bg-transparent hover:text-primary"
        >
          關閉
        </button>
      </div>
    </div>
    <div
      data-dialog-bg
      class="absolute top-0 left-0 right-0 bottom-0 bg-basic_white z-0 bg-opacity-80"
    ></div>
  </div>
</template>

<script>
import { dialog_animation } from '@/gsap/dialog';
export default {
  name: 'MainDialog',
  data() {
    return {
      dialog_animation: null,
    };
  },
  methods: {
    Close() {
      this.$store.commit('SetDialog', {
        status: false,
        content: this.content,
      });
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
  computed: {
    status() {
      return this.$store.state.main_dialog.status;
    },
    content() {
      return this.$store.state.main_dialog.content;
    },
  },
  mounted() {
    this.dialog_animation = new dialog_animation(this.$refs.MainContent);
  },
};
</script>
