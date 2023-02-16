<template>
  <main
    id="ProductPage"
    v-if="event_data != null && event_data != 'error'"
    class="relative z-10 w-full"
  >
    <BreadCrumb class="hidden mb-20" :path="bread_crumb_path" />
    <ProductDialog ref="ProductDialog" :product_data="product_data[0]" />
    <section class="relative w-full max-w-screen-xl mx-auto">
      <img
        :alt="'耀聞水果世界 ' + event_data.Title"
        :src="$ImageUrl(event_data.Image1)"
        class="block w-full"
      />
    </section>
    <EventTimer ref="EventTimer" :event_data="event_data" />
    <div class="w-full max-w-screen-xl px-5 mx-auto xl:px-0">
      <section class="relative block w-full max-w-screen-xl py-10 mx-auto">
        <h2 class="mb-2 text-3xl font-bold text-secondary">
          {{ event_data.Title }}
        </h2>
        <h4 class="mb-5 text-xl font-bold">{{ event_data.Subtitle }}</h4>
        <div v-html="event_data.Content" class="text-basic_gray"></div>
      </section>
      <section class="relative block w-full max-w-screen-xl py-10 mx-auto">
        <h2 class="mb-2 text-3xl font-bold text-secondary">團購商品</h2>
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
        <FixedProductTabList
          :active_tab="active_tab"
          :tabs="tabs"
          @change-tab="ChangeTab"
        />

        <ProductTabList
          :active_tab="active_tab"
          :tabs="tabs"
          @change-tab="ChangeTab"
        />
        <div id="Description" class="mb-10" v-html="event_data.Content2"></div>
        <div
          id="Workflow"
          class="pt-10 mb-10 border-t border-zinc-300"
          v-html="event_data.Content3"
        ></div>
        <div
          id="Precautions"
          class="pt-10 mb-10 border-t border-zinc-300"
          v-html="event_data.Content4"
        ></div>
      </section>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import EventTimer from '@/components/event_page/EventTimer.vue';
import ProductCard from '@/components/event_page/ProductCard.vue';
import ProductTabList from '@/components/product_page/tab_list.vue';
import FixedProductTabList from '@/components/product_page/fixed_tab_list.vue';
import ProductDialog from '@/components/event_page/ProductDialog.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'EventPageView',
  components: {
    BreadCrumb,
    EventTimer,
    ProductCard,
    ProductTabList,
    FixedProductTabList,
    ProductDialog,
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
    InitPage() {
      this.bread_crumb_path[1].title = this.event_data.Title;
      this.bread_crumb_path[1].link += this.event_data.MenuID;
      this.meta_data = GetMetaData(
        this.event_data.Title,
        this.event_data.Content.replaceAll(/<[^>]+>/g, '').slice(0, 150),
        this.$ImageUrl(this.event_data.Image1)
      );
      this.$nextTick(() => {
        this.SetNavTrigger();
        this.$refs.EventTimer.SetTimer();
        this.$PageReady(this.meta_data.title);
      });
    },
    OpenProductDialog(item) {
      this.$refs.ProductDialog.Open(item);
    },
  },
  computed: {
    event_data() {
      return this.$store.getters.event_data(this.$route.params.id);
    },
    product_data() {
      return this.$store.state.product_data.filter((item) => {
        let enable = true;
        const category = item.Menu.filter(
          (menu) => menu.MenuID == this.$route.params.id
        );

        category.length <= 0 ? (enable = false) : '';
        // item.Status == 'N' ? (enable = false) : '';
        if (item.GoodsTimeEnd != null) {
          new Date() > new Date(item.GoodsTimeEnd) ? (enable = false) : '';
        }

        return enable;
      });
    },
  },
  created() {
    if (this.event_data != 'error') {
      this.InitPage();
    } else {
      this.$RedirectError();
    }
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>