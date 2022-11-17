<template>
  <Teleport to="#app">
    <div
      ref="MainContent"
      class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen left-full"
    >
      <div
        data-dialog-box
        class="w-[400px] max-w-full bg-white relative z-10 p-5 rounded-2xl"
      >
        <div class="w-full mb-3" v-if="event_data != null">
          <img :src="$ImageUrl(event_data.Image1)" class="block w-full" />
        </div>
        <!-- <p>{{event_data.GiveName}}</p> -->
        <p
          v-if="event_data != null"
          class="mb-5 text-sm text-center text-primary"
        >
          贈品名稱
        </p>
        <div class="flex items-center justify-center">
          <button
            @click="Close"
            class="px-10 py-2 mr-1 text-sm font-bold transition-colors duration-200 bg-transparent border rounded-full text-primary border-primary hover:bg-primary hover:text-white"
          >
            關閉
          </button>
        </div>
      </div>
      <div
        data-dialog-bg
        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-basic_white bg-opacity-80"
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
