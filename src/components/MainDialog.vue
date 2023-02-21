<template>
  <div
    ref="MainContent"
    class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen left-full"
  >
    <div
      data-dialog-box
      class="w-[450px] max-w-full bg-basic_gray relative z-10 px-14 py-14 section_corner"
    >
      <div v-html="content" class="mb-8 font-semibold text-center"></div>
      <div class="text-center">
        <button
          @click="Close"
          class="px-5 py-2 text-sm font-bold text-white transition-colors duration-200 border rounded-md bg-primary border-primary hover:bg-transparent hover:text-primary"
        >
          關閉
        </button>
      </div>
    </div>
    <div
      data-dialog-bg
      class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-basic_black bg-opacity-80"
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

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    0 40px,
    40px 0,
    100% 0,
    100% calc(100% - 40px),
    calc(100% - 40px) 100%,
    0 100%,
    0 40px
  );
  clip-path: polygon(
    0 40px,
    40px 0,
    100% 0,
    100% calc(100% - 40px),
    calc(100% - 40px) 100%,
    0 100%,
    0 40px
  );
}
</style>
