<template>
  <main
    id="DealerList"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full pt-40 pb-20 bg-basic_black"
  >
    <div
      v-if="data_load_finish"
      class="flex flex-wrap items-stretch w-full max-w-screen-xl px-5 pt-5 mx-auto xl:px-0"
    >
      <BreadCrumb class="mb-20" :path="bread_crumb_path" />
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
            class="block font-bold leading-none sm:text-xl md:text-2xl md:leading-none text-basic_white"
            >經銷據點</span
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
            class="block text-5xl font-black md:text-8xl sm:text-7xl text-basic_white text-opacity-20 font-anybody"
          >
            Dealer
          </span>
        </h3>
      </header>
      <div
        data-section-content
        class="flex justify-end w-full pb-8 md:mb-10"
      ></div>
      <div class="flex w-full" id="Content" data-section-content>
        <div class="w-1/4 pr-20">
          <div
            v-for="(group, group_index) in dealer_group_data"
            :key="`group_${group_index}`"
            class="mb-5"
          >
            <button
              class="block w-full px-1 py-1 mb-2 font-semibold text-left border-b text-primary border-primary"
            >
              {{ group.Title }}
            </button>
            <ol class="w-full">
              <li
                v-for="(item, item_index) in group.Area"
                :key="`area_${group_index}_${item_index}`"
              >
                <button
                  class="block w-full py-1 text-sm text-left transition-colors duration-500 text-basic_gray hover:text-primary"
                >
                  {{ item.AreaName }}
                </button>
              </li>
            </ol>
          </div>
        </div>
        <div v-if="active_area == ''" class="w-3/4">
          <template v-for="(group, group_index) in dealer_group_data">
            <div
              v-for="(item, item_index) in group.Area"
              :key="`group_${group_index}_${item_index}`"
              class="mb-20"
            >
              <h2 class="relative inline-block px-8 mb-10">
                <span
                  data-section-subtitle-arrow
                  class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
                ></span>
                <span
                  data-section-subtitle
                  class="block font-semibold leading-none md:leading-none text-basic_white"
                  >{{ item.AreaName }}</span
                >
                <span
                  data-section-subtitle-arrow
                  class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
                ></span>
              </h2>
              <ol class="w-full">
                <li
                  v-for="(dealer, dealer_index) in GetAreaDealer(item.City)"
                  :key="`dealer_${group_index}_${item_index}_${dealer_index}`"
                  class="py-4 border-b border-zinc-700"
                >
                  <button
                    @click="OpenDealer(dealer.dealer_id)"
                    class="flex items-center justify-between w-full"
                  >
                    <div class="flex items-center justify-start">
                      <span
                        class="text-lg font-medium text-left text-white w-60"
                        >{{ dealer.name }}</span
                      >
                      <span
                        v-show="!CheckDealerOpen(dealer.dealer_id)"
                        class="inline-block text-sm text-left text-basic_gray text-opacity-40"
                        >{{ dealer.address }}</span
                      >
                    </div>
                    <span
                      v-show="!CheckDealerOpen(dealer.dealer_id)"
                      class="text-white icon-plus"
                    ></span>
                    <span
                      v-show="CheckDealerOpen(dealer.dealer_id)"
                      class="text-white icon-minus"
                    ></span>
                  </button>

                  <div class="flex items-end justify-between w-full pt-5">
                    <ol>
                      <li class="flex items-center mb-5">
                        <span
                          class="inline-block px-4 py-1 mr-10 text-sm font-medium text-white rounded-md bg-bg_black"
                          >地址</span
                        >
                        <p class="text-sm font-medium text-white">
                          {{ dealer.address }}
                        </p>
                      </li>
                      <li class="flex items-center">
                        <span
                          class="inline-block px-4 py-1 mr-10 text-sm font-medium text-white rounded-md bg-bg_black"
                          >電話</span
                        >
                        <p class="text-sm font-medium text-white">
                          {{ dealer.phone }}
                        </p>
                      </li>
                    </ol>
                    <div class="flex items-stretch">
                      <button class="text-white bg-primary">
                        <span class="icon-call"></span>
                      </button>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </template>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
import { section_animation } from '@/gsap/section';
import { mapState, mapGetters } from 'vuex';
import dealer_data from '@/assets/data/dealer.json';
import dealer_group_data from '@/assets/data/dealer_group.json';
export default {
  name: 'ProductListView',
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
          title: '全部商品',
          link: '/collections?category=all',
        },
      ],
      section_animation: null,
      dealer_list: dealer_data,
      active_area: '',
      open_list: [],
    };
  },
  methods: {
    OpenDealer(id) {
      const index = this.open_list.indexOf(id);
      if (index == -1) {
        this.open_list.push(id);
      } else {
        this.open_list.splice(index, 1);
      }
    },
    CheckDealerOpen(id) {
      return this.open_list.indexOf(id) != -1;
    },
    GetAreaDealer(city_list) {
      return this.dealer_list.filter((item) => {
        const address = item.address.replaceAll('台', '臺');
        let match = false;
        city_list.forEach((city) => {
          address.indexOf(city) != -1 ? (match = true) : '';
        });
        return match;
      });
    },
    SetGsap() {
      this.section_animation == null
        ? (this.section_animation = new section_animation(
            this.$refs.MainContent
          ))
        : '';
    },
    PageInit() {
      this.meta_data = GetMetaData('dealer', '', '');
      this.$nextTick(() => {
        this.$emit('load-image', 'home');
      });
    },
  },
  watch: {
    $route() {
      this.$nextTick(() => {
        this.$emit('load-image', 'home');
      });
    },
    data_load_finish() {
      this.data_load_finish ? this.PageInit() : '';
    },
    image_loaded() {
      this.image_loaded ? this.SetGsap() : '';
    },
  },
  computed: {
    ...mapState({
      image_loaded: 'image_loaded',
    }),
    ...mapGetters([
      'data_load_finish',
      'filter_category_data',
      'filter_product_data',
    ]),
    dealer_group_data() {
      let dealer_group = [];
      let dealer_category = [];

      dealer_group_data.forEach((group) => {
        let count = 0;
        this.dealer_list.forEach((item) => {
          const address = item.address.replaceAll('台', '臺');
          group.City.forEach((city) => {
            address.indexOf(city) != -1 ? (count += 1) : '';
          });
        });
        count > 0 ? dealer_group.push(group) : '';
      });

      dealer_group.forEach((group) => {
        let category = -1;
        dealer_category.forEach((item, item_index) =>
          item.Title == group.Group ? (category = item_index) : ''
        );

        if (category == -1) {
          dealer_category.push({
            Title: group.Group,
            Area: [group],
          });
        } else {
          dealer_category[category].Area.push(group);
        }
      });

      return dealer_category;
    },
    dealer_data() {
      if (this.active_area == '') {
        return this.dealer_list;
      } else {
        let city_list = dealer_group_data.filter(
          (item) => item.Area == this.active_area
        )[0].City;
        let dealer_data = [];
        this.dealer_list.forEach((item) => {
          let city_match = false;
          city_list.forEach((city) => {
            const address = item.address.replaceAll('台', '臺');
            address.indexOf(city) != -1 ? (city_match = true) : '';
          });
          city_match ? dealer_data.push(item) : '';
        });
        return dealer_data;
      }
    },
  },
  mounted() {
    this.data_load_finish ? this.PageInit() : '';
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
