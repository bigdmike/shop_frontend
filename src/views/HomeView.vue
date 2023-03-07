<template>
  <main id="Home" data-scroll-section class="relative w-full">
    <CarouselSection
      v-if="carousel_data != null"
      ref="CarouselSection"
      :carousel_data="carousel_data"
    />
    <MainProductSection ref="MainProductSection" />
    <AboutSection
      ref="AboutSection"
      :content="$GetColumn('about_section_1_content')"
    />
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
import { mapState, mapGetters } from 'vuex';
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
      this.$refs.CarouselSection.SetGsap();
      this.$refs.NewsListSection.SetGsap();
      this.$refs.MainProductSection.SetGsap();
      this.$refs.AboutSection.SetGsap();
    },
    PageInit() {
      this.$nextTick(() => {
        this.$emit('load-image', 'home');
      });
    },
  },
  computed: {
    ...mapState(['carousel_data', 'news_data', 'image_loaded']),
    ...mapGetters(['data_load_finish']),
  },
  watch: {
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
    data_load_finish() {
      this.data_load_finish ? this.PageInit() : '';
    },
  },
  mounted() {
    this.data_load_finish ? this.PageInit() : '';
  },
  created() {
    this.meta_data = GetMetaData('home', '', '');
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
