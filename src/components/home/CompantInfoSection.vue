<template>
  <section class="w-full relative py-40">
    <div class="w-full max-w-screen-xl mx-auto">
      <header class="text-center mb-20">
        <h2
          class="md:text-6xl sm:text-4xl text-3xl font-bold text-secondary sm:mb-4"
        >
          門市資訊
        </h2>
        <span class="md:text-2xl sm:text-xl font-bold text-secondary">
          Shop List
        </span>
      </header>
      <div class="w-full flex items-center">
        <div class="lg:w-1/2 w-full rounded-3xl overflow-hidden lg:mb-0 mb-10">
          <img class="block w-full" :src="$ImageUrl(image)" />
        </div>
        <div class="lg:w-1/2 w-full lg:pl-10">
          <h4 class="text-2xl font-semibold mb-4">耀聞水果世界</h4>
          <ol class="text-basic_gray">
            <li class="mb-2">一至六 9:00~21:00 / 日11:00~19:00</li>
            <li class="mb-2">臺中市南屯區公益路二段931號</li>
            <li>04-2382-1555</li>
          </ol>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'CompanyInfoSection',
  props: {
    image: {
      require: true,
      type: String,
    },
  },
};
</script>
