<template>
  <main id="Home" class="relative w-full">
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
      console.log('load gsap');
      this.$refs.CarouselSection.SetGsap();
      this.$refs.NewsListSection.SetGsap();
      this.$refs.MainProductSection.SetGsap();
      this.$refs.AboutSection.SetGsap();
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
  mounted() {
    // this.SetGsap();
    console.log('home mounted');
    console.log(this.image_loaded);
    this.$nextTick(() => {
      this.$emit('load-image', 'home');
      console.log(this.image_loaded);
    });
  },
  created() {
    console.log(this.image_loaded);
    this.meta_data = GetMetaData('home', '', '');
    // this.$nextTick(() => {
    //   this.$PageReady(this.meta_data.title);
    // });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
