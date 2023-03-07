<template>
  <div
    ref="MainContent"
    class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-screen left-full"
  >
    <div
      data-dialog-box
      class="w-[450px] max-w-full bg-basic_gray relative z-10 px-14 py-10 section_corner"
    >
      <button
        @click="Close"
        class="absolute z-10 text-black transition-all duration-500 transform top-4 right-5 hover:scale-110 hover:text-primary"
      >
        <span class="text-xl icon-close"></span>
      </button>
      <div class="relative z-0">
        <header
          class="relative z-10 flex flex-col-reverse items-start w-full mb-4"
        >
          <h2 class="block font-bold leading-none text-basic_black">
            搜尋商品
          </h2>
          <h3 class="block text-[20px] font-black text-primary font-anybody">
            Search Product
          </h3>
        </header>
        <div class="mb-4">
          <input
            v-model="key_word"
            type="text"
            class="w-full p-2 px-4 rounded-md font-anybody bg-basic_white bg-opacity-40 focus:outline-primary"
          />
          <p v-show="GetError('key_word')" class="text-sm text-primary">
            請輸入查詢關鍵字
          </p>
        </div>
        <div class="flex justify-end">
          <button
            @click="Validate"
            class="px-5 py-2 text-sm font-bold text-white transition-colors duration-200 border rounded-md bg-primary border-primary hover:bg-transparent hover:text-primary"
          >
            搜尋
          </button>
        </div>
      </div>
    </div>
    <div
      data-dialog-bg
      class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-black bg-opacity-80"
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
      key_word: '',
      errors: [],
    };
  },
  methods: {
    Close() {
      this.$store.commit('SetSearchDialog', false);
    },
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    Validate() {
      this.errors = [];
      this.key_word == '' ? this.errors.push('key_word') : '';
      this.errors.length <= 0 ? this.Search() : '';
    },
    Search() {
      this.$router.push(`/search/${this.key_word}`);
      this.Close();
      this.key_word = '';
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
      return this.$store.state.search_dialog;
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
