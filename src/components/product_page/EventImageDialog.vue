<template>
  <Teleport to="#app">
    <div
      ref="MainContent"
      class="fixed top-0 bottom-0 z-[32] flex items-center justify-center w-screen left-full"
    >
      <div
        data-dialog-box
        class="w-[400px] max-w-full bg-bg_black relative z-10 p-5 rounded-md"
      >
        <div class="w-full mb-3" v-if="event_data != null">
          <img
            :alt="event_data.GiveName"
            :src="$ImageUrl(event_data.Image1)"
            class="block w-full"
          />
        </div>
        <p v-if="event_data != null" class="text-sm text-center text-primary">
          贈品名稱
        </p>
        <p v-if="event_data != null" class="mb-5 text-center text-white">
          {{ event_data.GiveName }}
        </p>
        <div class="flex items-center justify-center">
          <button
            @click="Close"
            class="px-10 py-2 mr-1 text-sm font-bold text-white transition-colors duration-200 rounded-md hover:bg-opacity-50 bg-primary"
          >
            關閉
          </button>
        </div>
      </div>
      <div
        data-dialog-bg
        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black bg-opacity-80"
      ></div></div
  ></Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';
import { dialog_animation } from '@/gsap/dialog';
export default {
  name: 'EventImageDialog',
  components: {
    Teleport,
  },
  data() {
    return {
      dialog_animation: null,
      status: false,
      event_data: null,
    };
  },
  methods: {
    Open(data) {
      this.event_data = data;
      this.status = true;
    },
    Close() {
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
