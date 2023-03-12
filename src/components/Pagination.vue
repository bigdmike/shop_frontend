<template>
  <div class="flex justify-center w-full text-white">
    <ul v-if="total_pages > 1" class="flex pl-0 my-2 list-none rounded">
      <li
        class="flex items-center justify-center mr-4 sm:w-9 sm:h-9 w-7 h-7 md:mr-10"
      >
        <button
          type="button "
          class="px-3 py-2 font-anybody"
          :class="{ 'cursor-not-allowed': isInFirstPage }"
          :disabled="isInFirstPage"
          @click="gotoPrevious"
        >
          <span class="icon-chevron_left"></span>
        </button>
      </li>

      <li
        class="mx-1 leading-none rounded-full sm:w-9 sm:h-9 w-7 h-7"
        v-for="(page, index) in pages"
        :key="`pages_${index}`"
        :class="page === currentPage ? 'bg-primary' : ''"
      >
        <button
          type="button"
          class="flex items-center justify-center text-sm sm:w-9 sm:h-9 w-7 h-7 font-anybody"
          :class="{ 'cursor-not-allowed': page === currentPage }"
          :disabled="page === currentPage"
          @click="gotoPageNumber(page)"
        >
          {{ page }}
        </button>
      </li>

      <template v-if="showDots('right')">
        <li class="flex items-center justify-center sm:w-9 sm:h-9 w-7 h-7">
          <button type="button" class="font-anybody" :disabled="true">
            ...
          </button>
        </li>

        <li class="flex items-center justify-center sm:w-9 sm:h-9 w-7 h-7">
          <button
            type="button"
            class="px-3 py-2 font-anybody"
            :class="{ 'cursor-not-allowed': isInLastPage }"
            :disabled="isInLastPage"
            @click="gotoPageNumber(total_pages)"
          >
            {{ total_pages }}
          </button>
        </li>
      </template>

      <li
        class="flex items-center justify-center ml-4 sm:w-9 sm:h-9 w-7 h-7 md:ml-10"
      >
        <button
          type="button"
          class="px-3 py-2 font-anybody"
          :class="{ 'cursor-not-allowed': isInLastPage }"
          :disabled="isInLastPage"
          @click="gotoNext"
        >
          <span class="icon-chevron_right"></span>
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'PaginationComponent',
  props: {
    currentPage: { type: Number, required: true, default: 1 },
    pagination: { type: Object, required: true, default: () => ({}) },
    maxVisibleButtons: { type: Number, required: false, default: 5 },
  },
  data() {
    return {
      per_page: 5,
      total: 0,
      total_pages: 0,
    };
  },
  methods: {
    showDots(position = 'left') {
      const number = position === 'left' ? 1 : this.total_pages;
      const nextNumber = position === 'left' ? 2 : this.total_pages - 1;

      return !this.pages.includes(number) || !this.pages.includes(nextNumber);
    },

    gotoFirst() {
      this.gotoPageNumber(1);
    },

    gotoLast() {
      this.gotoPageNumber(this.total_pages);
    },

    gotoPrevious() {
      this.gotoPageNumber(this.currentPage - 1);
    },

    gotoNext() {
      this.gotoPageNumber(this.currentPage + 1);
    },

    gotoPageNumber(pageNumber) {
      this.$emit('pagechanged', pageNumber);
    },
  },
  watch: {
    'pagination.total_pages'() {
      this.per_page = this.pagination.per_page || 5;
      this.total = this.pagination.total || 0;
      this.total_pages = this.pagination.total_pages || 0;
    },
  },
  created() {
    this.per_page = this.pagination.per_page || 5;
    this.total = this.pagination.total || 0;
    this.total_pages = this.pagination.total_pages || 0;
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.total_pages;
    },

    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }

      return range;
    },

    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.total_pages) {
        return this.total_pages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },

    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.total_pages
      );
    },
  },
};
</script>
