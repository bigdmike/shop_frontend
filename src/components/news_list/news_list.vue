<template>
  <div>
    <ol class="flex items-stretch justify-start flex-wrap -mx-2">
      <li
        v-for="(item, item_index) in page_news_data"
        :key="`news_${item_index}`"
        class="md:w-1/3 sm;w-1/2 w-full px-2 md:mb-20 mb-8 flex flex-col"
      >
        <router-link
          :to="`/news/${item.NewsCategoryID}/page/${item.NewsID}`"
          class="rounded-xl overflow-hidden mb-2 flex-1 block"
        >
          <img
            :src="$ImageUrl(item.Image1)"
            class="w-full block hover:scale-110 transform transition-all duration-200"
          />
        </router-link>
        <h4 class="truncate mb-2 font-semibold">{{ item.Title }}</h4>
        <div class="flex items-center">
          <p class="mr-5 text-sm text-basic_gray font-semibold">
            {{ item.created_at.slice(0, 10) }}
          </p>
          <span
            class="text-xs inline-block px-2 py-1 bg-primary text-white font-medium rounded-md"
            >{{ item.CategoryTitle }}</span
          >
        </div>
      </li>
      <li class="w-full text-center">
        <button
          @click="$emit('next-page')"
          v-if="page_news_data.length != news_data.length"
          class="px-16 py-3 font-bold text-primary bg-transparent rounded-full border border-primary transition-colors duration-200 hover:bg-primary hover:text-white"
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
