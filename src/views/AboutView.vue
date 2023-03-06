<template>
  <main
    id="About"
    data-scroll-section
    class="relative z-10 w-full py-40 bg-basic_gray sm:py-60"
  >
    <div
      id="AboutContainer"
      class="relative z-10 w-full"
      v-if="data_load_finish"
    >
      <div
        class="relative z-10 w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10"
      >
        <BreadCrumb class="mb-20" :path="bread_crumb_path" />

        <section
          ref="StoryContent"
          class="relative z-10 w-full max-w-screen-md mb-60"
        >
          <header
            class="relative z-10 flex flex-col-reverse items-start w-full md:mb-36 sm:mb-36 mb-28"
          >
            <h2 class="relative inline-block px-8">
              <span
                data-section-subtitle-arrow
                class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
              ></span>
              <span
                data-section-subtitle
                class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_black"
                >關於我們</span
              >
              <span
                data-section-subtitle-arrow
                class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
              ></span>
            </h2>
            <h3 class="overflow-hidden">
              <span
                data-section-title
                data-text="About Us"
                class="block text-5xl font-black md:text-8xl sm:text-7xl text-primary font-anybody"
              >
                About Us
              </span>
            </h3>
          </header>
          <div data-section-content>
            <h3
              class="mb-10 text-2xl font-bold leading-relaxed text-black md:text-3xl font-anybody md:leading-relaxed"
              v-html="$GetCloumn('about_slogan')"
            ></h3>
            <div
              class="mb-20 font-medium"
              v-html="$GetCloumn('about_content')"
            ></div>
            <div class="w-full overflow-hidden section_corner">
              <img
                :src="$ImageUrl($GetCloumn('about_image'))"
                class="block w-full"
              />
            </div>
          </div>
        </section>

        <section ref="InfoContent" class="relative z-10 w-full">
          <header
            class="relative z-10 flex flex-col-reverse items-start w-full md:mb-36 sm:mb-36 mb-28"
          >
            <h2 class="relative inline-block px-8">
              <span
                data-section-subtitle-arrow
                class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
              ></span>
              <span
                data-section-subtitle
                class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_black"
                >公司資訊</span
              >
              <span
                data-section-subtitle-arrow
                class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
              ></span>
            </h2>
            <h3 class="overflow-hidden">
              <span
                data-section-title
                data-text="Company Info"
                class="block text-5xl font-black md:text-8xl sm:text-7xl text-primary font-anybody"
              >
                Company Info
              </span>
            </h3>
          </header>
          <ol data-section-content class="max-w-screen-sm mb-20 font-medium">
            <li
              class="flex items-center py-5 border-b font-anybody border-basic_black"
            >
              <p class="w-[140px] leading-none">公司名稱</p>
              <p
                class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
              >
                {{ $GetCloumn('company_name') }}
              </p>
            </li>
            <li
              class="flex items-center py-5 border-b font-anybody border-basic_black"
            >
              <p class="w-[140px] leading-none">成立時間</p>
              <p
                class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
              >
                {{ $GetCloumn('company_date') }}
              </p>
            </li>
            <li
              class="flex items-center py-5 border-b font-anybody border-basic_black"
            >
              <p class="w-[140px] leading-none">電子郵件</p>
              <p
                class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
              >
                {{ $GetCloumn('company_email') }}
              </p>
            </li>
            <li
              class="flex items-center py-5 border-b font-anybody border-basic_black"
            >
              <p class="w-[140px] leading-none">聯絡電話</p>
              <p
                class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
              >
                {{ $GetCloumn('company_phone') }}
              </p>
            </li>
            <li
              class="flex items-center py-5 border-b font-anybody border-basic_black"
            >
              <p class="w-[140px] leading-none">公司地址</p>
              <p
                class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
              >
                {{ $GetCloumn('company_address') }}
              </p>
            </li>
            <li
              class="flex items-center py-5 border-b font-anybody border-basic_black"
            >
              <p class="w-[140px] leading-none">營業時間</p>
              <p
                class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
              >
                {{ $GetCloumn('company_time') }}
              </p>
            </li>
          </ol>
        </section>
      </div>
      <div
        data-scroll
        data-scroll-sticky
        data-scroll-target="#AboutContainer"
        class="absolute w-1/2 sm:w-[300px] md:w-[432px] md:max-w-[45%] z-0 top-28"
      >
        <div class="overflow-hidden section_corner">
          <img
            src="/img/about/about_bg_1.webp"
            class="block w-full md:opacity-20 opacity-10"
          />
        </div>
      </div>

      <div
        data-scroll
        data-scroll-sticky
        data-scroll-target="#AboutContainer"
        class="absolute w-1/2 sm:w-[300px] md:w-[432px] md:max-w-[45%] z-0 top-28 right-0"
      >
        <div
          class="overflow-hidden transform translate-y-[150%] sm:translate-y-full section_corner_tl md:translate-y-0"
        >
          <img
            src="/img/about/about_bg_2.webp"
            class="block w-full md:opacity-20 opacity-10"
          />
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
import { section_animation } from '@/gsap/section.js';
export default {
  name: 'AboutView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '關於我們',
          link: '/about',
        },
      ],
      story_secton_gsap: null,
      info_section_gsap: null,
    };
  },
  methods: {
    SetGsap() {
      console.log('gsap set');
      this.story_secton_gsap = new section_animation(this.$refs.StoryContent);
      this.info_secton_gsap = new section_animation(this.$refs.InfoContent);
    },
    PageInit() {
      console.log('page load');
      this.$nextTick(() => {
        console.log('image load');
        this.$emit('load-image', 'home');
      });
    },
  },
  computed: {
    data_load_finish() {
      return this.$store.getters.data_load_finish;
    },
    image_loaded() {
      return this.$store.state.image_loaded;
    },
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
    // this.data_load_finish ? this.PageInit() : '';
  },
  created() {
    this.meta_data = GetMetaData('about', '', '');
    this.$nextTick(() => {
      this.$PageReady(this.meta_data.title);
    });
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% calc(100% - 60px),
    calc(100% - 60px) 100%,
    0 100%,

    0% 0%,
    0% 0%
  );
  clip-path: polygon(
    100% 0,
    100% calc(100% - 60px),
    calc(100% - 60px) 100%,
    0 100%,

    0% 0%,
    0% 0%
  );
}

.section_corner_tl {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0% 60px,
    60px 0%
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0% 60px,
    60px 0%
  );
}

@media (max-width: 768px) {
  .section_corner {
    -webkit-clip-path: polygon(
      100% 0,
      100% calc(100% - 40px),
      calc(100% - 40px) 100%,
      0 100%,

      0% 0%,
      0% 0%
    );
    clip-path: polygon(
      100% 0,
      100% calc(100% - 40px),
      calc(100% - 40px) 100%,
      0 100%,

      0% 0%,
      0% 0%
    );
  }

  .section_corner_tl {
    -webkit-clip-path: polygon(
      100% 0,
      100% 100%,

      100% 100%,
      0 100%,

      0% 40px,
      40px 0%
    );
    clip-path: polygon(
      100% 0,
      100% 100%,

      100% 100%,
      0 100%,

      0% 40px,
      40px 0%
    );
  }
}
</style>
