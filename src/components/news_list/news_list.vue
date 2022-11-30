<template>
  <div>
    <ol class="flex flex-wrap items-stretch justify-start -mx-2">
      <li
        v-for="(item, item_index) in page_news_data"
        :key="`news_${item_index}`"
        class="md:w-1/3 sm;w-1/2 w-full px-2 md:mb-20 mb-8 flex flex-col"
      >
        <router-link
          :to="`/news/page/${item.NewsID}`"
          class="flex-1 block mb-2 overflow-hidden rounded-xl"
        >
          <img
            :src="$ImageUrl(item.Image1)"
            class="block w-full transition-all duration-200 transform hover:scale-110"
          />
        </router-link>
        <h4 class="mb-2 font-semibold truncate">{{ item.Title }}</h4>
        <div class="flex items-center">
          <p class="mr-5 text-sm font-semibold text-basic_gray">
            {{ item.created_at.slice(0, 10) }}
          </p>
          <span
            class="inline-block px-2 py-1 text-xs font-medium text-white rounded-md bg-primary"
            >{{ item.CategoryTitle }}</span
          >
        </div>
      </li>
      <li class="w-full text-center">
        <button
          @click="$emit('next-page')"
          v-if="page_news_data.length != news_data.length"
          class="px-16 py-3 font-bold transition-colors duration-200 bg-transparent border rounded-full text-primary border-primary hover:bg-primary hover:text-white"
        >
          查看更多文章
        </button>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  name: 'NewsList',
  props: {
    news_data: {
      require: true,
      type: Array,
    },
    page_news_data: {
      require: true,
      type: Array,
    },
  },
};
</script>
