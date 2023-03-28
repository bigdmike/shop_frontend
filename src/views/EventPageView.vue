<template>
  <main
    id="ProductPage"
    class="relative z-10 w-full min-h-screen pt-24 pb-20 md:pt-40 bg-bg_black"
    data-scroll-section
  >
    <div
      class="relative z-10 w-full"
      v-if="data_load_finish && event_data != null && event_data != 'error'"
    >
      <BreadCrumb class="hidden mb-20" :path="bread_crumb_path" />
      <ProductDialog
        ref="ProductDialog"
        @stop-scroll="$emit('stop-scroll')"
        @start-scroll="$emit('start-scroll')"
      />
      <CustomProductDialog
        ref="CustomProductDialog"
        @stop-scroll="$emit('stop-scroll')"
        @start-scroll="$emit('start-scroll')"
      />
      <section class="relative w-full max-w-screen-xl mx-auto">
        <img
          :alt="'Krace 凱鋭斯 ' + event_data.Title"
          :src="$ImageUrl(event_data.Image1)"
          class="block w-full"
        />
      </section>
      <EventTimer ref="EventTimer" :event_data="event_data" />
      <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0">
        <section class="relative block w-full max-w-screen-xl py-10 mx-auto">
          <h2 class="mb-2 text-3xl font-bold text-primary">
            {{ event_data.Title }}
          </h2>
          <h4 class="mb-5 text-xl font-bold text-white">
            {{ event_data.Subtitle }}
          </h4>
          <div v-html="event_data.Content" class="text-white"></div>
        </section>
        <section class="relative block w-full max-w-screen-xl py-10 mx-auto">
          <h2 class="mb-2 text-3xl font-bold text-primary">團購商品</h2>
          <ol class="flex flex-wrap -mx-4">
            <li
              class="w-full px-4 mb-8 lg:w-1/3 md:w-1/2"
              v-for="(item, item_index) in product_data"
              :key="`product_card_${item_index}`"
            >
              <ProductCard
                :product_data="item"
                @open-dialog="OpenProductDialog"
              />
            </li>
          </ol>
        </section>

        <section>
          <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
            <div class="mb-10">
              <h2 class="relative inline-block px-8">
                <span
                  data-section-subtitle-arrow
                  class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
                ></span>
                <span
                  data-section-subtitle
                  class="block text-base font-medium leading-none md:leading-none text-basic_white"
                  >商品描述</span
                >
                <span
                  data-section-subtitle-arrow
                  class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
                ></span>
              </h2>
            </div>
            <div
              id="Description"
              class="text-white"
              v-html="event_data.Content2"
            ></div>
          </div>
          <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
            <div class="mb-10">
              <h2 class="relative inline-block px-8">
                <span
                  data-section-subtitle-arrow
                  class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
                ></span>
                <span
                  data-section-subtitle
                  class="block text-base font-medium leading-none md:leading-none text-basic_white"
                  >運送說明</span
                >
                <span
                  data-section-subtitle-arrow
                  class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
                ></span>
              </h2>
            </div>
            <div
              id="Workflow"
              class="text-white"
              v-html="event_data.Content3"
            ></div>
          </div>
          <div class="pt-5 mb-20 border-t border-basic_gray border-opacity-20">
            <div class="mb-10">
              <h2 class="relative inline-block px-8">
                <span
                  data-section-subtitle-arrow
                  class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
                ></span>
                <span
                  data-section-subtitle
                  class="block text-base font-medium leading-none md:leading-none text-basic_white"
                  >注意事項</span
                >
                <span
                  data-section-subtitle-arrow
                  class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
                ></span>
              </h2>
            </div>

            <div
              id="Precautions"
              class="text-white"
              v-html="event_data.Content4"
            ></div>
          </div>
        </section>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import EventTimer from '@/components/event_page/EventTimer.vue';
import ProductCard from '@/components/event_page/ProductCard.vue';
import ProductDialog from '@/components/event_page/ProductDialog.vue';
import CustomProductDialog from '@/components/event_page/CustomProductDialog.vue';
import { GetMetaData } from '@/common/meta';
import { mapGetters } from 'vuex';
export default {
  name: 'EventPageView',
  components: {
    BreadCrumb,
    EventTimer,
    ProductCard,
    ProductDialog,
    CustomProductDialog,
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
          title: '',
          link: '/event/',
        },
      ],
      tabs: ['商品介紹', '下單流程', '購物須知'],
      active_tab: '商品介紹',
    };
  },
  methods: {
    SetNavTrigger() {
      const description = document.querySelector('#Description');
      const workflow = document.querySelector('#Workflow');
      const precautions = document.querySelector('#Precautions');

      window.addEventListener('scroll', () => {
        if (precautions.getBoundingClientRect().top < window.innerHeight) {
          this.active_tab = '購物須知';
        } else if (workflow.getBoundingClientRect().top < window.innerHeight) {
          this.active_tab = '下單流程';
        } else if (
          description.getBoundingClientRect().top < window.innerHeight
        ) {
          this.active_tab = '商品介紹';
        }
      });
    },
    ChangeTab(val) {
      const description = document.querySelector('#Description');
      const workflow = document.querySelector('#Workflow');
      const precautions = document.querySelector('#Precautions');
      const offset_top = window.innerWidth <= 640 ? 112 : 128;
      let offsetPosition = 0;

      this.active_tab = val;
      if (this.active_tab == '購物須知') {
        offsetPosition =
          precautions.getBoundingClientRect().top +
          window.pageYOffset -
          offset_top -
          38;
      } else if (this.active_tab == '下單流程') {
        offsetPosition =
          workflow.getBoundingClientRect().top +
          window.pageYOffset -
          offset_top -
          38;
      } else if (this.active_tab == '商品介紹') {
        offsetPosition =
          description.getBoundingClientRect().top +
          window.pageYOffset -
          offset_top -
          38;
      }

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    },
    OpenProductDialog(item, custom) {
      custom
        ? this.$refs.CustomProductDialog.Open(item)
        : this.$refs.ProductDialog.Open(item);
    },
    PageInit() {
      this.bread_crumb_path[1].title = this.event_data.Title;
      this.bread_crumb_path[1].link += this.event_data.MenuID;

      this.meta_data = GetMetaData(
        this.event_data.Title,
        this.event_data.Content.replaceAll(/<[^>]+>/g, '').slice(0, 150),
        this.$ImageUrl(this.event_data.Image1)
      );
      this.$emit('load-image');
    },
    SetGsap() {
      this.$emit('page-mounted');
      this.$nextTick(() => {
        this.SetNavTrigger();
        this.$refs.EventTimer.SetTimer();
        this.$PageReady(this.meta_data.title);
      });
    },
  },
  watch: {
    event_data() {
      this.event_data == 'error' ? this.$RedirectError() : '';
    },
  },
  computed: {
    ...mapGetters({
      data_load_finish: 'data_load_finish',
      get_event_data: 'event_data',
    }),
    event_data() {
      return this.get_event_data(this.$route.params.id);
    },
    product_data() {
      return this.$store.state.product_data.filter((item) => {
        let enable = true;
        const category = item.Menu.filter(
          (menu) => menu.MenuID == this.$route.params.id
        );
        category.length <= 0 ? (enable = false) : '';
        if (item.GoodsTimeEnd != null) {
          new Date() > new Date(item.GoodsTimeEnd) ? (enable = false) : '';
        }

        return enable;
      });
    },
  },
  created() {
    this.$LoadDataMixin(this);
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
