<template>
  <main id="NewsPage" class="relative z-10 w-full">
    <div
      v-if="news_data != null && news_data != 'error'"
      class="w-full max-w-screen-xl px-5 pb-40 mx-auto xl:px-0 sm:px-10"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <h2 class="mb-5 text-2xl font-semibold sm:text-4xl">
        {{ news_data.Title }}
      </h2>
      <div
        class="flex items-center justify-between pb-2 mb-10 border-b border-zinc-300"
      >
        <div class="flex items-center">
          <p class="mr-2 text-sm font-semibold text-basic_gray sm:text-base">
            {{ news_data.created_at.slice(0, 10) }}
          </p>
          <span
            class="text-xs inline-block px-2 py-[2px] bg-primary text-white font-medium rounded-md"
            >{{ news_data.CategoryTitle }}</span
          >
        </div>
        <div class="flex items-center">
          <input
            class="hidden"
            v-on:focus="$event.target.select()"
            ref="clone"
            readonly
          />
          <button
            @click="CopyLink"
            class="flex items-center justify-center mr-1 transition-colors duration-200 rounded-md sm:w-9 sm:h-9 h-7 w-7 sm:mr-2 bg-basic_black hover:bg-secondary"
          >
            <ShareLinkIcon class="w-4 text-white sm:w-5" />
          </button>
          <button
            @click="ShareToFB"
            class="flex items-center justify-center mr-1 transition-colors duration-200 rounded-md sm:w-9 sm:h-9 h-7 w-7 sm:mr-2 bg-basic_black hover:bg-secondary"
          >
            <FacebookIcon class="w-4 text-white sm:w-5" />
          </button>
          <button
            @click="ShareToLine"
            class="flex items-center justify-center transition-colors duration-200 rounded-md sm:w-9 sm:h-9 h-7 w-7 bg-basic_black hover:bg-secondary"
          >
            <LineIcon class="w-4 text-white sm:w-5" />
          </button>
        </div>
      </div>
      <div class="mb-10">
        <img :src="$ImageUrl(news_data.Image1)" class="block w-full" />
      </div>
      <div
        id="NewsContent"
        class="w-full mb-20 text-basic_black"
        v-html="news_data.Content"
      ></div>
      <div
        class="pt-1 border-t border-zinc-300"
        v-if="next_news_data != 'error'"
      >
        <p class="mb-2 text-sm text-basic_gray">下一篇</p>
        <router-link
          :to="`/news/${next_news_data.NewsCategoryID}/page/${next_news_data.NewsID}`"
          class="flex items-start justify-between mb-10"
        >
          <div>
            <h3 class="mb-3 text-2xl font-semibold sm:text-3xl">
              {{ next_news_data.Title }}
            </h3>
            <div class="flex items-center">
              <p class="mr-2 text-sm font-semibold text-basic_gray">
                {{ next_news_data.created_at.slice(0, 10) }}
              </p>
              <span
                class="text-xs inline-block px-2 py-[2px] bg-primary text-white font-medium rounded-md"
                >{{ next_news_data.CategoryTitle }}</span
              >
            </div>
          </div>
          <button
            class="flex items-center justify-center transition-colors duration-200 rounded-full sm:w-16 sm:h-16 h-14 w-14 bg-primary bg-opacity-20 text-primary hover:bg-opacity-100 hover:text-white"
          >
            <NextIcon class="w-3 sm:w-4" />
          </button>
        </router-link>
        <div class="flex items-center">
          <router-link
            :to="bread_crumb_path[1].link"
            class="flex items-center flex-shrink-0 mr-3 transition-colors duration-200 hover:text-secondary"
          >
            <PrevIcon class="w-2 mr-3" />
            回到列表
          </router-link>
          <span class="flex h-[1px] w-full bg-zinc-300"></span>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import ShareLinkIcon from '@/components/svg/ShareLinkIcon.vue';
import FacebookIcon from '@/components/svg/FacebookIcon.vue';
import LineIcon from '@/components/svg/LineIcon.vue';
import NextIcon from '@/components/svg/Carousel/NextIcon.vue';
import PrevIcon from '@/components/svg/Carousel/PrevIcon.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'NewsPageView',
  components: {
    BreadCrumb,
    ShareLinkIcon,
    FacebookIcon,
    LineIcon,
    NextIcon,
    PrevIcon,
  },
  data() {
    return {
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '最新消息',
          link: '/news/all',
        },
        {
          title: '文章標題',
          link: '/news/all',
        },
      ],
    };
  },
  methods: {
    CopyLink() {
      this.$refs.clone.focus();
      document.execCommand('copy');
      alert('已複製到剪貼簿');
    },
    ShareToFB() {
      window
        .open(
          `https://www.facebook.com/sharer.php?u=${window.location.href}`,
          '_blank'
        )
        .focus();
    },
    ShareToLine() {
      window.open(`line://msg/text/${window.location.href}`, '_blank').focus();
    },
  },
  created() {
    if (this.news_data != 'error') {
      this.bread_crumb_path[1].title = this.active_caregory.Title;
      this.bread_crumb_path[1].link = `/news/${this.active_caregory.NewsCategoryID}`;
      this.bread_crumb_path[2].title = this.news_data.Title;
      this.bread_crumb_path[2].link = `/news/${this.news_data.NewsID}`;

      let description = this.news_data.Content.replaceAll(/<[^>]+>/g, '');
      this.meta_data = GetMetaData(
        this.news_data.Title,
        description.slice(0, 150),
        this.news_data.Image1
      );

      this.$nextTick(() => {
        this.$refs.clone.value = window.location.href;
        window.prerenderReady = true;
      });
    } else {
      this.$router.push('/error_page');
    }
  },
  metaInfo() {
    return this.meta_data;
  },
  watch: {
    news_data() {
      this.news_data == 'error' ? this.$router.push('/error_page') : '';
    },
  },
  computed: {
    news_category_data() {
      return this.$store.state.news_category_data;
    },
    active_caregory() {
      const active_caregory = this.news_category_data.filter(
        (item) => item.NewsCategoryID == this.$route.params.category
      );
      return active_caregory.length > 0 ? active_caregory[0] : 'error';
    },
    news_list() {
      return this.$store.state.news_data;
    },
    news_data() {
      const news_data = this.news_list.filter(
        (item) => item.NewsID == this.$route.params.id
      );
      return news_data.length > 0 ? news_data[0] : 'error';
    },
    next_news_data() {
      if (this.news_data == 'error') {
        return 'error';
      } else {
        let index = -1;
        this.news_list.forEach((item, item_index) => {
          item.NewsID == this.news_data.NewsID ? (index = item_index) : '';
        });
        index == this.news_list.length - 1 ? (index = 0) : (index += 1);
        return this.news_list[index];
      }
    },
  },
};
</script>

<style>
#NewsContent img {
  display: inline-block;
}
</style>
