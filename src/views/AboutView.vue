<template>
  <main class="relative z-10 w-full">
    <div class="w-full max-w-screen-xl px-5 pt-5 mx-auto xl:px-0 sm:px-10">
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img
            :alt="$GetCloumn('company_name')"
            :src="$ImageUrl($GetCloumn('about_section_1_image'))"
            class="block w-full"
          />
        </div>
        <div class="w-full md:w-1/2 md:pl-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">01.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ $GetCloumn('about_section_1_title') }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ $GetCloumn('about_section_1_sub_title') }}
          </p>
          <div v-html="$GetCloumn('about_section_1_content')"></div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:flex-row-reverse md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img
            :alt="$GetCloumn('company_name')"
            :src="$ImageUrl($GetCloumn('about_section_2_image'))"
            class="block w-full"
          />
        </div>
        <div class="w-full md:w-1/2 md:pr-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">02.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ $GetCloumn('about_section_2_title') }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ $GetCloumn('about_section_2_sub_title') }}
          </p>
          <div v-html="$GetCloumn('about_section_2_content')"></div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img
            :alt="$GetCloumn('company_name')"
            :src="$ImageUrl($GetCloumn('about_section_3_image'))"
            class="block w-full"
          />
        </div>
        <div class="w-full md:w-1/2 md:pl-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">03.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ $GetCloumn('about_section_3_title') }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ $GetCloumn('about_section_3_sub_title') }}
          </p>
          <div v-html="$GetCloumn('about_section_3_content')"></div>
        </div>
      </div>
      <div
        class="flex flex-wrap items-center justify-between mb-10 md:flex-row-reverse md:mb-28 sm:mb-20"
      >
        <div class="w-full mb-10 overflow-hidden md:w-1/2 rounded-2xl md:mb-0">
          <img
            :alt="$GetCloumn('company_name')"
            :src="$ImageUrl($GetCloumn('about_section_4_image'))"
            class="block w-full"
          />
        </div>
        <div class="w-full md:w-1/2 md:pr-20">
          <p class="mb-2 sm:text-2xl font-yeseva sm:mb-4 text-primary">04.-</p>
          <h3 class="mb-3 text-3xl font-bold sm:text-5xl text-primary">
            {{ $GetCloumn('about_section_4_title') }}
          </h3>
          <p class="mb-5 sm:text-2xl font-yeseva sm:mb-10">
            {{ $GetCloumn('about_section_4_sub_title') }}
          </p>
          <div v-html="$GetCloumn('about_section_4_content')"></div>
        </div>
      </div>
      <CompanyInfoSection :image="$GetCloumn('company_image')" />
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import CompanyInfoSection from '@/components/home/CompantInfoSection.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'AboutView',
  components: {
    BreadCrumb,
    CompanyInfoSection,
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
    };
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
