<template>
  <section class="relative w-full py-40">
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0">
      <header class="mb-20 text-center">
        <h2
          class="text-3xl font-bold md:text-6xl sm:text-4xl text-secondary sm:mb-4"
        >
          門市資訊
        </h2>
        <span
          class="font-bold md:text-2xl sm:text-xl text-secondary font-yeseva"
        >
          Shop List
        </span>
      </header>
      <div class="flex flex-wrap items-center w-full">
        <div class="w-full mb-10 overflow-hidden lg:w-1/2 rounded-3xl lg:mb-0">
          <img
            class="block w-full"
            :src="$ImageUrl(image)"
            :alt="$GetCloumn('company_name')"
          />
        </div>
        <div class="w-full lg:w-1/2 lg:pl-10">
          <h4 class="mb-4 text-2xl font-semibold">耀聞水果世界</h4>
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
