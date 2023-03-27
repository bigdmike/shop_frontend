<template>
  <section ref="MainContent" class="relative z-10 w-full">
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
          {{ $GetColumn('company_name') }}
        </p>
      </li>
      <li
        class="flex items-center py-5 border-b font-anybody border-basic_black"
      >
        <p class="w-[140px] leading-none">成立時間</p>
        <p
          class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
        >
          {{ $GetColumn('company_date') }}
        </p>
      </li>
      <li
        class="flex items-center py-5 border-b font-anybody border-basic_black"
      >
        <p class="w-[140px] leading-none">電子郵件</p>
        <p
          class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
        >
          {{ $GetColumn('company_email') }}
        </p>
      </li>
      <li
        class="flex items-center py-5 border-b font-anybody border-basic_black"
      >
        <p class="w-[140px] leading-none">聯絡電話</p>
        <p
          class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
        >
          {{ $GetColumn('company_phone') }}
        </p>
      </li>
      <li
        class="flex items-center py-5 border-b font-anybody border-basic_black"
      >
        <p class="w-[140px] leading-none">公司地址</p>
        <p
          class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
        >
          {{ $GetColumn('company_address') }}
        </p>
      </li>
      <li
        class="flex items-center py-5 border-b font-anybody border-basic_black"
      >
        <p class="w-[140px] leading-none">營業時間</p>
        <p
          class="text-sm font-semibold leading-none font-anybody md:text-base md:leading-none"
        >
          {{ $GetColumn('company_time') }}
        </p>
      </li>
    </ol>
  </section>
</template>

<script>
import { section_animation } from '@/gsap/section.js';
export default {
  name: 'AboutCompanyInfo',
  data() {
    return {
      section_animation: null,
    };
  },
  methods: {
    SetGsap() {
      this.section_animation = new section_animation(this.$refs.MainContent);
    },
  },
};
</script>
