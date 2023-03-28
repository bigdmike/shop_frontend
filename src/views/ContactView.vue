<template>
  <main
    id="ContactPage"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full min-h-screen pt-40 pb-20 bg-basic_gray"
  >
    <div
      :class="page_ready ? '' : 'opacity-0'"
      class="relative z-10 w-full max-w-screen-xl px-5 mx-auto xl:px-0 sm:px-10"
    >
      <header
        class="relative z-10 flex flex-col-reverse items-start w-full mb-20"
      >
        <h2 class="relative inline-block px-8">
          <span
            data-section-subtitle-arrow
            class="absolute top-0 left-0 block text-lg leading-none transform icon-triangle text-primary -scale-100"
          ></span>
          <span
            data-section-subtitle
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_black"
            >聯絡我們</span
          >
          <span
            data-section-subtitle-arrow
            class="absolute bottom-0 right-0 block text-lg leading-none icon-triangle text-primary"
          ></span>
        </h2>
        <h3 class="overflow-hidden">
          <span
            data-section-title
            data-text="News"
            class="block text-5xl font-black md:text-8xl sm:text-7xl text-primary font-anybody"
          >
            Contact Us
          </span>
        </h3>
      </header>

      <div data-section-content class="flex justify-end w-full">
        <div>
          <p class="mb-10">
            請告訴我們您的建議、需求或異業合作的想法，我們將在收到信件後盡快回覆您，謝謝！
          </p>
          <div class="mb-5">
            <label for="NameInput" class="block mb-1 text-sm font-semibold"
              >姓名<span class="text-primary">＊</span></label
            >
            <input
              v-model="form_data.name"
              id="NameInput"
              type="text"
              placeholder="請輸入真實姓名"
              class="w-full px-5 py-3 mb-2 rounded-md bg-basic_white bg-opacity-40 focus:outline-primary"
            />
            <p v-show="GetError('name')" class="text-sm text-primary">
              請輸入真實姓名
            </p>
          </div>
          <div class="mb-5">
            <label for="PhoneInput" class="block mb-1 text-sm font-semibold"
              >聯絡電話<span class="text-primary">＊</span></label
            >
            <input
              v-model="form_data.phone"
              id="PhoneInput"
              type="tel"
              placeholder="請輸入電話號碼"
              class="w-full px-5 py-3 mb-2 rounded-md bg-basic_white bg-opacity-40 focus:outline-primary"
            />
            <p v-show="GetError('phone')" class="text-sm text-primary">
              請輸入電話號碼
            </p>
          </div>
          <div class="mb-5">
            <label for="EmailInput" class="block mb-1 text-sm font-semibold"
              >電子信箱<span class="text-primary">＊</span></label
            >
            <input
              v-model="form_data.email"
              id="EmailInput"
              type="email"
              placeholder="請輸入電子信箱"
              class="w-full px-5 py-3 mb-2 rounded-md bg-basic_white bg-opacity-40 focus:outline-primary"
            />
            <p v-show="GetError('email')" class="text-sm text-primary">
              請輸入電子信箱
            </p>
          </div>
          <div class="mb-5">
            <label for="CommentInput" class="block mb-1 text-sm font-semibold"
              >訊息內容</label
            >
            <textarea
              v-model="form_data.comment"
              id="CommentInput"
              placeholder="請詳細說明您的問題"
              class="w-full px-5 py-3 mb-2 rounded-md min-h-[150px] bg-basic_white bg-opacity-40 focus:outline-primary"
            >
            </textarea>
            <p v-show="GetError('email')" class="text-sm text-primary">
              請輸入電子信箱
            </p>
          </div>
          <div class="flex justify-end">
            <div
              class="inline-block w-full rounded-md sm:w-auto sm:bg-basic_black bg-primary"
            >
              <MoreButton
                @click="Validate"
                text="確認送出"
                class="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <img
      src="/img/ContactBg.svg"
      class="absolute top-0 bottom-0 left-0 z-0 object-cover object-center w-auto h-full"
    />
  </main>
</template>

<script>
import { GetMetaData } from '@/common/meta';
import { validEmail } from '@/common/validate';
import { section_animation } from '@/gsap/section';
import MoreButton from '@/components/ui/MoreButton.vue';
import { mapGetters } from 'vuex';
import { postContact } from '@/api/page_data';
export default {
  name: 'ContactView',
  components: {
    MoreButton,
  },
  data() {
    return {
      meta_data: null,
      form_data: {
        name: '',
        phone: '',
        email: '',
        comment: '',
      },
      errors: [],
      section_animation: null,
      page_ready: false,
    };
  },
  methods: {
    PageInit() {
      this.meta_data = GetMetaData('contact', '', '');
      this.$nextTick(() => {
        this.$emit('load-image', 'home');
      });
    },
    SetGsap() {
      this.page_ready = true;
      this.$emit('page-mounted');
      this.section_animation = new section_animation(this.$refs.MainContent);
      this.section_animation.setup();
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
    Validate() {
      this.errors = [];
      this.form_data.name == '' ? this.errors.push('name') : '';
      this.form_data.phone == '' ? this.errors.push('phone') : '';
      !validEmail(this.form_data.email) ? this.errors.push('email') : '';
      this.form_data.comment == '' ? this.errors.push('comment') : '';
      if (this.errors.length == 0) {
        this.SendData();
      }
    },
    SendData() {
      postContact(this.form_data).then(() => {
        this.$store.commit('SetDialog', {
          status: true,
          content: '訊息已送出，我們將會盡快與您聯絡',
        });
      });
    },
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
  },
  computed: {
    ...mapGetters(['data_load_finish']),
  },
  created() {
    this.$LoadDataMixin(this);
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
