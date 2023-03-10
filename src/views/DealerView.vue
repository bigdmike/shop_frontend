<template>
  <main
    id="DealerList"
    ref="MainContent"
    data-scroll-section
    class="relative z-10 w-full pb-20 md:pt-40 pt-28 bg-basic_black"
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
      <div id="Content" class="w-full">
        <div
          data-section-content
          class="relative z-20 flex flex-wrap justify-end w-full pb-8 md:mb-10"
        >
          <div
            data-scroll
            data-scroll-sticky
            data-scroll-target="#Content"
            id="MenuList"
            class="absolute left-0 z-10 hidden w-1/4 pr-20 md:block top-28"
          >
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
                    @click="active_area = item.AreaName"
                    class="block w-full py-1 text-sm text-left transition-colors duration-500 text-basic_gray hover:text-primary"
                  >
                    {{ item.AreaName }}
                  </button>
                </li>
              </ol>
            </div>
          </div>
          <div class="relative block w-full mb-5 md:hidden">
            <span
              class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
            ></span>
            <select
              v-model="active_area"
              class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-opacity-5 bg-basic_gray focus:outline-none"
            >
              <option value="">全部地區</option>
              <optgroup
                :label="group.Title"
                v-for="(group, group_index) in dealer_group_data"
                :key="`option_group_${group_index}`"
              >
                <option
                  v-for="(item, item_index) in group.Area"
                  :key="`option_${group_index}_${item_index}`"
                >
                  {{ item.AreaName }}
                </option>
              </optgroup>
            </select>
          </div>
          <div class="relative w-full md:w-3/4">
            <span
              class="absolute text-white transform -translate-y-1/2 pointer-events-none icon-search top-1/2 right-4"
            ></span>
            <input
              type="text"
              name="keyword"
              v-model="key_word"
              placeholder="請輸入關鍵字"
              class="relative z-0 block w-full px-4 py-3 text-white placeholder-gray-700 bg-transparent border rounded-md focus:outline-primary border-zinc-600"
            />
          </div>
        </div>
        <div
          id="ListContent"
          class="relative flex justify-end w-full"
          data-section-content
        >
          <div v-if="active_area == ''" class="w-full md:w-3/4">
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
                      <div
                        class="flex flex-wrap items-center justify-start sm:flex-nowrap"
                      >
                        <span
                          class="w-full font-medium text-left text-white md:text-lg sm:w-60"
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

                    <div
                      :class="
                        CheckDealerOpen(dealer.dealer_id)
                          ? ' pt-5 max-h-auto'
                          : 'pt-0 max-h-0'
                      "
                      class="flex flex-wrap items-end justify-between w-full overflow-hidden transition-all duration-500 sm:flex-nowrap"
                    >
                      <ol class="mb-5 sm:mb-0">
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
                      <div
                        class="flex items-center justify-end w-full sm:w-auto"
                      >
                        <a
                          :href="`tel://${dealer.phone}`"
                          target="_blank"
                          class="flex items-center justify-center w-8 h-8 mr-3 text-white transition-all duration-500 rounded-md md:w-10 md:h-10 bg-primary hover:bg-opacity-70"
                        >
                          <span class="text-lg md:text-xl icon-phone"></span>
                        </a>
                        <a
                          :href="`https://www.google.com.tw/maps/dir//${dealer.address}`"
                          target="_blank"
                          class="flex items-center h-8 px-3 text-xs font-medium text-white transition-all duration-500 rounded-md md:px-4 md:h-10 md:test-sm bg-primary hover:bg-opacity-70"
                        >
                          立即前往
                          <span class="block ml-2 text-lg icon-location"></span>
                        </a>
                      </div>
                    </div>
                  </li>
                </ol>
              </div>
            </template>
          </div>
          <div v-else class="w-full md:w-3/4">
            <h2 class="relative inline-block px-8 mb-10">
              <span
                data-section-subtitle-arrow
                class="absolute top-0 left-0 block leading-none transform icon-triangle text-primary -scale-100"
              ></span>
              <span
                data-section-subtitle
                class="block font-semibold leading-none md:leading-none text-basic_white"
                >{{ active_area }}</span
              >
              <span
                data-section-subtitle-arrow
                class="absolute bottom-0 right-0 block leading-none icon-triangle text-primary"
              ></span>
            </h2>
            <ol class="w-full">
              <li
                v-for="(dealer, dealer_index) in dealer_data"
                :key="`dealer_${dealer_index}`"
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

                <div
                  :class="
                    CheckDealerOpen(dealer.dealer_id)
                      ? ' pt-5 max-h-auto'
                      : 'pt-0 max-h-0'
                  "
                  class="flex items-end justify-between w-full overflow-hidden transition-all duration-500"
                >
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
                  <div class="flex items-center">
                    <a
                      :href="`tel://${dealer.phone}`"
                      target="_blank"
                      class="flex items-center justify-center w-8 h-8 mr-3 text-white transition-all duration-500 rounded-md md:w-10 md:h-10 bg-primary hover:bg-opacity-70"
                    >
                      <span class="text-lg md:text-xl icon-phone"></span>
                    </a>
                    <a
                      :href="`https://www.google.com.tw/maps/dir//${dealer.address}`"
                      target="_blank"
                      class="flex items-center h-8 px-3 text-xs font-medium text-white transition-all duration-500 rounded-md md:px-4 md:h-10 md:test-sm bg-primary hover:bg-opacity-70"
                    >
                      立即前往
                      <span class="block ml-2 text-lg icon-location"></span>
                    </a>
                  </div>
                </div>
              </li>
            </ol>
          </div>
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
      key_word: '',
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

        if (match) {
          if (this.key_word == '') {
            return item;
          } else {
            return (
              item.address.indexOf(this.key_word) != -1 ||
              item.name.indexOf(this.key_word) != -1 ||
              item.phone.indexOf(this.key_word) != -1
            );
          }
        }
      });
    },
    SetGsap() {
      this.section_animation == null
        ? (this.section_animation = new section_animation(
            this.$refs.MainContent
          ))
        : '';

      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    },
    PageInit() {
      this.meta_data = GetMetaData('dealer', '', '');
      this.$nextTick(() => {
        document.querySelector('#ListContent').style.minHeight =
          document.querySelector('#MenuList').getBoundingClientRect().height +
          'px';
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
    active_area() {
      this.open_list = [];
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
      let tmp_dealer_list = this.dealer_list;
      if (this.key_word != '') {
        tmp_dealer_list = tmp_dealer_list.filter((item) => {
          return (
            item.address.indexOf(this.key_word) != -1 ||
            item.name.indexOf(this.key_word) != -1 ||
            item.phone.indexOf(this.key_word) != -1
          );
        });
      }

      if (this.active_area == '') {
        return tmp_dealer_list;
      } else {
        let city_list = dealer_group_data.filter(
          (item) => item.AreaName == this.active_area
        )[0].City;
        let dealer_data = [];
        tmp_dealer_list.forEach((item) => {
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
