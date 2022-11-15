<template>
  <div
    :class="status ? 'top-full' : 'top-0'"
    class="absolute z-0 bg-white left-0 w-full transition-all duration-200 shadow-xl"
  >
    <div class="relative border-t border-zinc-300">
      <SearchIcon
        class="absolute top-1/2 left-5 transform -translate-y-1/2 w-6"
      />
      <input
        type="text"
        name="search"
        v-model="key_word"
        @keypress.enter="Search"
        class="w-full pl-14 py-3 focus:outline-none"
        placeholder="搜尋商品關鍵字"
      />
    </div>
  </div>
</template>

<script>
import SearchIcon from '@/components/svg/SearchIcon.vue';
export default {
  name: 'MainMenuSearchBar',
  data() {
    return {
      key_word: '',
      status: false,
    };
  },
  components: {
    SearchIcon,
  },
  methods: {
    Search() {
      if (this.key_word != '') {
        this.$router.push(`/search/${this.key_word}`);
        this.status = false;
        this.key_word = '';
      }
    },
    TriggerStatus() {
      this.status = !this.status;
      this.key_word = '';
    },
  },
};
</script>
