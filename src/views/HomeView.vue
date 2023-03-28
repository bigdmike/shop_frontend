<template>
  <main id="Home" data-scroll-section class="relative w-full">
    <CarouselSection ref="CarouselSection" :carousel_data="carousel_data" />
    <MainProductSection ref="MainProductSection" />
    <AboutSection ref="AboutSection" />
    <VideoSection ref="VideoSection" />
    <NewsListSection ref="NewsListSection" :news_list="news_data" />
  </main>
</template>

<script>
import CarouselSection from '@/components/home/Carousel.vue';
import MainProductSection from '@/components/home/MainProductSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import VideoSection from '@/components/home/VideoSection.vue';
import NewsListSection from '@/components/home/NewsListSection.vue';
import { GetMetaData } from '@/common/meta';
import { mapState } from 'vuex';
export default {
  name: 'HomeView',
  components: {
    CarouselSection,
    MainProductSection,
    AboutSection,
    VideoSection,
    NewsListSection,
  },
  data() {
    return {
      meta_data: null,
    };
  },
  methods: {
    SetGsap() {
      this.$emit('page-mounted');
      this.$refs.CarouselSection.SetGsap();
      this.$refs.NewsListSection.SetGsap();
      this.$refs.MainProductSection.SetGsap();
      this.$refs.AboutSection.SetGsap();

      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
    PageInit() {
      this.meta_data = GetMetaData('home', '', '');
      this.$nextTick(() => {
        this.$emit('load-image', 'home');
      });
    },
  },
  computed: {
    ...mapState({
      carousel_data: (state) => {
        return state.carousel_data != null ? state.carousel_data : [];
      },
      news_data: 'news_data',
    }),
  },
  created() {
    this.$LoadDataMixin(this);
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
