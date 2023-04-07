<template>
  <main
    id="NewsPage"
    ref="MainContent"
    data-scroll-section
    :class="page_ready ? '' : 'opacity-0'"
    class="relative z-10 w-full pt-40 pb-20 bg-basic_black"
  >
    <div
      v-if="news_list != null && news_data != 'error'"
      class="w-full max-w-screen-xl px-5 pt-5 mx-auto xl:px-0 sm:px-10"
    >
      <BreadCrumb class="mb-2" :path="bread_crumb_path" />
      <router-link
        to="/news"
        data-section-content
        class="inline-flex items-center mb-8 font-semibold text-primary"
        ><span class="mr-3 icon-chevron_left"></span>回到列表</router-link
      >
      <div class="overflow-hidden">
        <h1
          data-section-content
          itemprop="headline"
          class="mb-5 text-2xl font-semibold text-white sm:text-4xl font-anybody"
        >
          {{ news_data.Title }}
        </h1>
      </div>
      <span
        class="hidden"
        itemprop="author"
        itemscope
        itemtype="https://schema.org/Person"
      >
        <span itemprop="name">{{ $GetColumn('brand_name') }}</span>
      </span>
      <div
        data-section-content
        class="flex items-center justify-between pb-2 mb-10 border-b border-zinc-300"
      >
        <div class="flex items-center">
          <p
            itemprop="datePublished"
            :content="news_data.created_at"
            class="mr-2 text-sm font-semibold font-anybody text-basic_gray sm:text-base"
          >
            {{ news_data.created_at.slice(0, 10) }}
          </p>
          <span
            itemprop="dateModified"
            :content="news_data.updated_at"
            class="hidden"
          >
            {{ news_data.updated_at }}
          </span>
          <span
            class="text-xs inline-block px-2 py-[2px] bg-primary text-white font-medium rounded-sm"
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
            class="flex items-center justify-center w-8 h-8 mr-1 transition-colors duration-200 bg-white rounded-md text-basic_black hover:text-white sm:mr-2 hover:bg-primary"
          >
            <span class="text-xl icon-link"></span>
          </button>
          <button
            @click="ShareToFB"
            class="flex items-center justify-center w-8 h-8 mr-1 transition-colors duration-200 bg-white rounded-md text-basic_black hover:text-white sm:mr-2 hover:bg-primary"
          >
            <span class="text-xl icon-facebook"></span>
          </button>
          <button
            @click="ShareToLine"
            class="flex items-center justify-center w-8 h-8 mr-1 transition-colors duration-200 bg-white rounded-md text-basic_black hover:text-white sm:mr-2 hover:bg-primary"
          >
            <span class="text-xl icon-line"></span>
          </button>
        </div>
      </div>
      <div data-section-content class="mb-10">
        <img
          width="1280"
          height="1280"
          :alt="news_data.Title"
          itemprop="image"
          :src="$ImageUrl(news_data.Image1)"
          class="block w-full"
        />
      </div>
      <div
        data-section-content
        id="NewsContent"
        class="w-full mb-20 text-white"
        v-html="news_data.Content"
      ></div>
      <RelatedList ref="RelatedList" />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import RelatedList from '@/components/news_page/RelatedSection.vue';
import { GetMetaData } from '@/common/meta';
// import { section_animation } from '@/gsap/section';
import { mapState, mapGetters } from 'vuex';
export default {
  name: 'NewsPageView',
  components: {
    BreadCrumb,
    RelatedList,
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
          link: '/news?category=all',
        },
      ],
      page_ready: false,
      meta_data: null,
      // section_animation: null,
    };
  },
  methods: {
    // 複製連結
    async CopyLink() {
      this.$refs.clone.value = `${window.location.href}`;
      var copyText = this.$refs.clone;
      copyText.select();
      copyText.setSelectionRange(0, 99999);
      await navigator.clipboard.writeText(copyText.value);
      alert('已複製連結！');
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
    SetGsap() {
      this.$emit('page-mounted');
      this.page_ready = true;
      this.$refs.RelatedList.SetGsap();
      // this.section_animation = new section_animation(this.$refs.MainContent);
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
    PageInit() {
      if (this.news_data != 'error') {
        this.bread_crumb_path[1].title = this.active_category.Title;
        this.bread_crumb_path[1].link = `/news?category=${this.active_category.NewsCategoryID}`;

        let description = this.news_data.Content.replaceAll(/<[^>]+>/g, '');
        this.meta_data = GetMetaData(
          this.news_data.Title,
          description.slice(0, 150),
          this.news_data.Image1
        );

        this.$nextTick(() => {
          this.$refs.clone.value = window.location.href;
          this.$emit('load-image', 'home');
        });
      } else {
        this.$RedirectError();
      }
    },
  },
  watch: {
    news_data() {
      this.news_data == 'error' ? this.$RedirectError() : '';
    },
  },
  computed: {
    ...mapState({
      news_category_data: 'news_category_data',
      news_list: 'news_data',
    }),
    ...mapGetters(['active_news_data', 'active_news_category_data']),
    active_category() {
      return this.active_news_category_data(this.news_data.NewsCategoryID);
    },
    news_data() {
      return this.active_news_data(this.$route.params.id);
    },
  },
  created() {
    this.$LoadDataMixin(this);
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>

<style>
#NewsContent img {
  display: inline-block;
}
</style>
