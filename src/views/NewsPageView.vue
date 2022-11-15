<template>
  <main class="w-full relative z-10">
    <div class="w-full max-w-screen-xl mx-auto xl:px-0 sm:px-10 px-5 pb-40">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <h2 class="sm:text-4xl text-2xl font-semibold mb-5">
        {{ news_data.Title }}
      </h2>
      <div
        class="flex items-center justify-between pb-2 border-b border-zinc-300 mb-10"
      >
        <div class="flex items-center">
          <p class="text-basic_gray font-semibold sm:text-base text-sm mr-2">
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
            class="sm:w-9 sm:h-9 h-7 w-7 sm:mr-2 mr-1 bg-basic_black flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-secondary"
          >
            <ShareLinkIcon class="text-white sm:w-5 w-4" />
          </button>
          <button
            @click="ShareToFB"
            class="sm:w-9 sm:h-9 h-7 w-7 sm:mr-2 mr-1 bg-basic_black flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-secondary"
          >
            <FacebookIcon class="text-white sm:w-5 w-4" />
          </button>
          <button
            @click="ShareToLine"
            class="sm:w-9 sm:h-9 h-7 w-7 bg-basic_black flex items-center justify-center rounded-md transition-colors duration-200 hover:bg-secondary"
          >
            <LineIcon class="text-white sm:w-5 w-4" />
          </button>
        </div>
      </div>
      <div class="mb-10">
        <img :src="$ImageUrl(news_data.Image1)" class="w-full block" />
      </div>
      <div
        class="w-full text-basic_black mb-20"
        v-html="news_data.Content"
      ></div>
      <div
        class="border-t border-zinc-300 pt-1"
        v-if="next_news_data != 'error'"
      >
        <p class="text-sm text-basic_gray mb-2">下一篇</p>
        <router-link
          :to="`/news/${next_news_data.NewsCategoryID}/page/${next_news_data.NewsID}`"
          class="flex items-start justify-between mb-10"
        >
          <div>
            <h3 class="font-semibold sm:text-3xl text-2xl mb-3">
              {{ next_news_data.Title }}
            </h3>
            <div class="flex items-center">
              <p class="text-basic_gray font-semibold mr-2 text-sm">
                {{ next_news_data.created_at.slice(0, 10) }}
              </p>
              <span
                class="text-xs inline-block px-2 py-[2px] bg-primary text-white font-medium rounded-md"
                >{{ next_news_data.CategoryTitle }}</span
              >
            </div>
          </div>
          <button
            class="sm:w-16 sm:h-16 h-14 w-14 flex items-center justify-center bg-primary bg-opacity-20 text-primary rounded-full transition-colors duration-200 hover:bg-opacity-100 hover:text-white"
          >
            <NextIcon class="sm:w-4 w-3" />
          </button>
        </router-link>
        <div class="flex items-center">
          <router-link
            :to="bread_crumb_path[1].link"
            class="flex items-center mr-3 flex-shrink-0 transition-colors duration-200 hover:text-secondary"
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
    }
  },
  mounted() {
    this.$refs.clone.value = window.location.href;
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
