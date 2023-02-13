<template>
  <section class="relative w-full py-40 -mt-20 section_corner bg-bg_black">
    <div class="relative w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10">
      <header class="relative z-10 flex flex-col-reverse w-full mb-48">
        <h2 class="relative text-2xl font-bold text-basic_white">
          <span
            class="inline-block mr-[2px] text-lg transform icon-triangle text-primary -scale-100"
          ></span>
          主打商品
          <span
            class="text-lg inline-block ml-[2px] icon-triangle text-primary"
          ></span>
        </h2>
        <h3
          class="font-black text-8xl text-basic_white font-anybody text-opacity-20"
        >
          Products
        </h3>
      </header>

      <ol class="w-full">
        <li class="relative w-full">
          <div class="relative z-0 block w-2/3">
            <span class="absolute top-0 left-0 z-20 image_corner"></span>
            <span
              class="absolute bottom-0 right-0 z-20 transform image_corner -scale-100"
            ></span>
            <div
              class="absolute top-0 bottom-0 left-0 right-0 z-10 bg-gradient-to-l from-basic_black to-transparent"
            ></div>
            <img
              class="relative z-0 block"
              src="/img/home/main_product/main_product_1.webp"
              :alt="$GetCloumn('company_name')"
            />
          </div>
          <div
            class="absolute right-0 z-10 pr-10 transform -translate-y-1/2 top-1/2"
          >
            <div class="flex flex-col-reverse items-start">
              <MoreLinkButton />
              <h3 class="mb-10 text-2xl font-bold text-primary">
                把座擴充套件
              </h3>
              <h4
                class="text-6xl font-bold tracking-wider text-basic_white font-anybody"
              >
                MMBCU CNC
              </h4>
              <h4
                class="text-6xl font-bold tracking-wider text-basic_white font-anybody"
              >
                Krace
              </h4>
            </div>
          </div>
          <span
            class="text-[200px] leading-none font-anybody font-black text-basic_white text-opacity-20 absolute top-0 right-0 z-10 transform -translate-y-[60%]"
            >01</span
          >
        </li>
      </ol>
    </div>
  </section>
</template>

<script>
import MoreLinkButton from '@/components/ui/MoreLinkButton.vue';
export default {
  name: 'MainProductSection',
  components: {
    MoreLinkButton,
  },
};
</script>

<style scoped>
.section_corner {
  -webkit-clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,

    0 100%,
    0 80px,

    80px 0
  );
  clip-path: polygon(
    100% 0,
    100% 100%,

    100% 100%,
    0 100%,
    0 100%,
    0 80px,
    80px 0
  );
}

.image_corner {
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 100px 100px 0 0;
  border-color: rgb(27, 32, 34) transparent transparent transparent;
}
</style>
