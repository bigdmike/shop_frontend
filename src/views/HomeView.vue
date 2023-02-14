<template>
  <main class="relative w-full">
    <CarouselSection ref="CarouselSection" :carousel_data="carousel_data" />
    <MainProductSection ref="MainProductSection" />
    <AboutSection
      ref="AboutSection"
      :content="$GetCloumn('about_section_1_content')"
    />
    <VideoSection ref="VideoSection" />
    <NewsListSection ref="NewsListSection" />
  </main>
</template>

<script>
import CarouselSection from '@/components/home/Carousel.vue';
import MainProductSection from '@/components/home/MainProductSection.vue';
import AboutSection from '@/components/home/AboutSection.vue';
import VideoSection from '@/components/home/VideoSection.vue';
import NewsListSection from '@/components/home/NewsListSection.vue';
import { GetMetaData } from '@/common/meta';
// import { mapGetters, mapState } from 'vuex';
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
      carousel_data: [
        {
          Image1: '/img/home/carousel/banner_1.webp',
          Image2: '/img/home/carousel/banner_1@sm.webp',
        },
        {
          Image1: '/img/home/carousel/banner_2.webp',
          Image2: '/img/home/carousel/banner_2@sm.webp',
        },
      ],
    };
  },
  methods: {
    SetGsap() {
      this.$refs.CarouselSection.SetGsap();
      this.$refs.NewsListSection.SetGsap();
    },
  },
  computed: {
    // ...mapGetters(['promote_product_data', 'new_product_data', 'home_ad_data']),
    // ...mapState([
    //   'carousel_data',
    //   'product_data',
    //   'category_data',
    //   'promotes_data',
    // ]),
  },
  mounted() {
    this.SetGsap();
  },
  created() {
    this.meta_data = GetMetaData('home', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
