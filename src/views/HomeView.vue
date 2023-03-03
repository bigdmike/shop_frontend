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
      :content="$GetCloumn('about_section_1_content')"
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
// mapGetters,
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
      console.log('load gsap');
      this.$refs.CarouselSection.SetGsap();
      this.$refs.NewsListSection.SetGsap();
      this.$refs.MainProductSection.SetGsap();
      this.$refs.AboutSection.SetGsap();
    },
  },
  computed: {
    // ...mapGetters(['promote_product_data', 'new_product_data', 'home_ad_data']),
    ...mapState([
      'carousel_data',
      'news_data',
      // 'product_data',
      // 'category_data',
      // 'promotes_data',
    ]),
    image_loaded() {
      return this.$store.state.image_loaded;
    },
  },
  watch: {
    image_loaded() {
      console.log(this.image_loaded);
      this.image_loaded ? this.SetGsap() : '';
    },
  },
  created() {
    this.meta_data = GetMetaData('home', '', '');
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
