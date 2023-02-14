<template>
  <div
    @mouseenter="hover = true"
    @mouseleave="hover = false"
    class="relative w-full"
  >
    <div
      :class="
        reverse
          ? 'ml-auto translate-x-5 sm:translate-x-10'
          : '-translate-x-5 sm:-translate-x-10'
      "
      class="relative z-0 block w-full overflow-hidden transform md:w-2/3 md:translate-x-0"
    >
      <span
        :class="
          hover
            ? '-translate-x-0 -translate-y-0'
            : 'md:-translate-x-full md:-translate-y-full -translate-x-0 -translate-y-0'
        "
        class="absolute top-0 left-0 z-20 transition-all duration-700 transform image_corner"
      ></span>
      <span
        :class="
          hover
            ? 'translate-x-0 translate-y-0'
            : 'md:translate-x-full md:translate-y-full translate-x-0 translate-y-0'
        "
        class="absolute bottom-0 right-0 z-20 transition-all duration-700 transform image_corner -scale-100"
      ></span>
      <div
        :class="reverse ? 'md:bg-gradient-to-r' : 'md:bg-gradient-to-l'"
        class="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-basic_black to-transparent"
      ></div>
      <img
        :class="hover ? 'scale-125' : 'scale-100'"
        class="relative z-0 block transition-all duration-700"
        :src="image"
        :alt="$GetCloumn('company_name')"
      />
    </div>
    <div
      :class="reverse ? 'md:left-0 md:pl-10' : 'md:right-0 md:pr-10'"
      class="z-10 min-w-[45%] transform md:absolute md:-translate-y-1/2 -translate-y-1/3 md:top-1/2"
    >
      <div class="flex flex-col-reverse items-start">
        <MoreLinkButton :link="link" />
        <h3
          class="mb-5 text-lg font-bold md:mb-10 lg:text-2xl sm:text-xl text-primary"
        >
          {{ title }}
        </h3>
        <h4
          class="text-4xl font-bold tracking-wider sm:text-5xl lg:text-6xl text-basic_white font-anybody"
        >
          {{ sub_title }}
        </h4>
        <h4
          class="text-4xl font-bold tracking-wider sm:text-5xl lg:text-6xl text-basic_white font-anybody"
        >
          {{ brand_title }}
        </h4>
      </div>
    </div>
    <span
      :class="
        reverse
          ? 'sm:right-20 sm:left-auto left-0 md:left-0'
          : 'sm:right-20 right-10 md:right-0'
      "
      class="lg:text-[200px] sm:text-[160px] text-[100px] leading-none font-anybody font-black text-basic_white text-opacity-20 absolute top-0 sm:right-20 right-10 md:right-0 z-10 transform sm:-translate-y-[60%] -translate-y-full"
      >{{ number }}</span
    >
  </div>
</template>

<script>
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
export default {
  name: 'MainProductSectionCard',
  components: {
    MoreLinkButton,
  },
  props: {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    sub_title: {
      type: String,
    },
    brand_title: {
      type: String,
    },
    link: {
      type: String,
    },
    number: {
      type: String,
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hover: false,
    };
  },
};
</script>

<style scoped>
.image_corner {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 100px 100px 0 0;
  border-color: rgb(27, 32, 34) transparent transparent transparent;
}

@media (max-width: 768px) {
  .image_corner {
    border-width: 50px 50px 0 0;
  }
}
</style>
