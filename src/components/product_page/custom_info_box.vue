<template>
  <section class="relative z-10 w-full">
    <EventImageDialog ref="EventImageDialog" />
    <div class="flex items-center mb-5">
      <router-link class="text-primary font-anybody" to="/collections"
        >商品列表</router-link
      >
      <span class="block mx-1 text-opacity-50 text-basic_gray font-anybody"
        >/</span
      >
      <p class="text-basic_white font-anybody">{{ product_data.Title }}</p>
    </div>
    <h1
      class="mb-5 text-xl font-bold text-white font-anybody xs:text-2xl sm:text-3xl"
    >
      {{ product_data.Title }}
    </h1>
    <meta itemprop="name" :content="product_data.Title" />
    <div
      itemprop="offers"
      itemtype="https://schema.org/AggregateOffer"
      itemscope
    >
      <meta
        itemprop="lowPrice"
        :content="product_data.CustomGoodsStock[0].SellPrice"
      />
      <meta
        itemprop="highPrice"
        :content="product_data.CustomGoodsStock[0].SellPrice"
      />
      <meta itemprop="offerCount" content="99" />
      <meta itemprop="priceCurrency" content="TWD" />
    </div>
    <div
      itemprop="aggregateRating"
      itemtype="https://schema.org/AggregateRating"
      itemscope
    >
      <meta itemprop="reviewCount" content="10" />
      <meta itemprop="ratingValue" content="5" />
    </div>
    <meta itemprop="sku" :content="`yaowen_${product_data.GoodsID}`" />
    <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
      <meta itemprop="name" :content="$GetCloumn('company_name')" />
    </div>
    <div class="mb-5 text-right">
      <p class="font-semibold sm:text-2xl text-primary font-anybody">
        NT$ {{ $MoneyFormat(GetPrice()[0]) }}
      </p>
    </div>

    <EventTimer
      ref="EventTimer"
      :product_data="product_data"
      v-if="product_data.GoodsTimeEnd != null"
    />

    <div v-if="product_data.Discount.length > 0" class="mb-5">
      <p class="mb-2 text-sm text-primary">此商品參與的優惠活動</p>
      <ol
        class="py-2 border rounded-lg text-primary bg-primary bg-opacity-10 border-primary"
      >
        <li
          class="flex items-center px-4 py-1 text-sm"
          :key="`event_${item_index}`"
          v-for="(item, item_index) in product_data.Discount"
        >
          {{ item.Title }}
          <a
            @click="OpenEventImageDialog(item)"
            v-if="item.Image1 != ''"
            class="block ml-2 text-xs font-bold underline cursor-pointer"
            >查看贈品</a
          >
        </li>
      </ol>
    </div>
    <div class="w-full mt-5 mb-10">
      <div
        class="mb-5"
        v-for="(item, item_index) in product_data.SpecCategoryList"
        :key="`category_${item_index}`"
      >
        <p class="flex-shrink-0 mb-2 mr-10 font-medium text-white font-anybody">
          {{ item.SpecCategoryTitle }}
        </p>
        <div class="relative w-full">
          <span
            class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
          ></span>
          <select
            @input="$emit('change-option', item_index, $event.target.value)"
            :value="active_option[item_index]"
            class="relative z-0 w-full py-3 pl-5 pr-12 font-bold text-white rounded-md appearance-none bg-basic_black focus:outline-none"
          >
            <option value="">請選擇</option>
            <option
              v-for="(option, option_index) in GetCategorySpec(
                item.SpecCategoryID,
                item_index
              )"
              :value="option.CustomSpecID"
              :key="`option_${item_index}_${option_index}`"
            >
              {{ option.SpecTitle }}
            </option>
          </select>
        </div>
      </div>

      <div>
        <div
          v-if="product_data.Stock.length > 0"
          class="relative flex items-stretch w-full overflow-hidden rounded-md bg-basic_black"
        >
          <button
            @click="$emit('change-amount', -1)"
            class="px-5 py-3 duration-200 text-primary transition-color hover:bg-primary hover:text-white"
          >
            <span class="text-sm icon-minus"></span>
          </button>
          <input
            class="flex-1 text-center text-white focus:outline-none bg-basic_black"
            type="text"
            :value="amount"
            readonly
          />
          <button
            @click="$emit('change-amount', 1)"
            class="px-5 py-3 duration-200 text-primary transition-color hover:bg-primary hover:text-white"
          >
            <span class="text-sm icon-plus"></span>
          </button>
        </div>
      </div>
    </div>

    <div class="items-center hidden md:flex">
      <div class="flex items-center mr-8">
        <button
          @click="CopyLink"
          class="flex items-center justify-center w-12 h-12 mr-2 transition-colors duration-200 rounded-md bg-basic_black hover:bg-primary"
        >
          <span class="text-2xl text-white icon-link"></span>
        </button>
        <button
          @click="ShareToFB"
          class="flex items-center justify-center w-12 h-12 mr-2 transition-colors duration-200 rounded-md bg-basic_black hover:bg-primary"
        >
          <span class="text-2xl text-white icon-facebook"></span>
        </button>
        <button
          @click="ShareToLine"
          class="flex items-center justify-center w-12 h-12 transition-colors duration-200 rounded-md bg-basic_black hover:bg-primary"
        >
          <span class="text-2xl text-white icon-line"></span>
        </button>
      </div>
      <button
        @click="$emit('add-cart')"
        v-if="time_status != 'end' && time_status != 'prepare'"
        class="flex items-center justify-center w-full h-12 font-bold text-center text-white transition-colors duration-200 rounded-md bg-primary hover:bg-opacity-80"
      >
        加入購物車
        <span class="ml-3 text-xl icon-arrow_right"></span>
      </button>
      <button
        v-else
        class="block w-full h-12 font-bold text-center text-white transition-colors duration-200 rounded-md cursor-not-allowed bg-zinc-600 hover:bg-opacity-80"
      >
        {{
          time_status == 'end'
            ? '已結束販售'
            : time_status == 'prepare'
            ? '尚未開賣'
            : '商品已售完'
        }}
      </button>
    </div>
  </section>
</template>

<script>
import EventImageDialog from '@/components/product_page/EventImageDialog.vue';
import EventTimer from '@/components/product_page/EventTimer.vue';
export default {
  name: 'ProductInfoBox',
  components: {
    EventImageDialog,
    EventTimer,
  },
  props: {
    product_data: {
      require: true,
      type: Object,
    },
    active_option: {
      require: true,
      type: Array,
    },
    amount: {
      require: true,
      type: Number,
    },
  },
  methods: {
    GetCategorySpec(id, index) {
      let first_empty_option = this.active_option.indexOf('');
      if (index == 0) {
        //第一個選項
        return this.product_data.CustomSpecList.filter(
          (item) => item.SpecCategoryID == id
        );
      } else if (first_empty_option < index && first_empty_option != -1) {
        // 前面的選項還沒選
        return [];
      } else {
        const spec_list = this.GetAvailableSpec();
        return spec_list.filter((item) => item.SpecCategoryID == id);
      }
    },
    GetAvailableSpec() {
      let disable_id = [];
      this.product_data.CustomGoodsSpecBlacklist.forEach((blacklist) => {
        const need_filter_id = this.GetDisableSpecID(
          blacklist.CustomSpecID,
          this.active_option.filter((item) => item != '')
        );
        if (need_filter_id.length > 0) {
          // 取出除了active_option其餘的ID
          disable_id = disable_id.concat(need_filter_id);
        }
      });
      disable_id = disable_id.filter(function (item, index) {
        return disable_id.indexOf(item) === index;
      });
      return this.product_data.CustomSpecList.filter((item) => {
        return disable_id.indexOf(item.CustomSpecID) == -1;
      });
    },
    GetDisableSpecID(black_list, active_list) {
      let match_id = [];
      let dismatch_id = [];
      // 統計與目前傳入的黑名單陣列符合的ID與不符合的ID
      black_list.forEach((id) => {
        active_list.indexOf(id) != -1
          ? match_id.push(id)
          : dismatch_id.push(id);
      });
      // 若只差一個就符合則將該選項禁用
      if (match_id.length >= black_list.length - 1) {
        return dismatch_id;
      } else {
        return [];
      }
    },
    GetPrice() {
      let change_price = 0;
      this.product_data.CustomGoodsChangePrice.forEach((change_item) => {
        let match_count = 0;
        change_item.CustomSpecID.forEach((id) => {
          this.active_option.indexOf(id) != -1 ? (match_count += 1) : '';
        });
        if (match_count == change_item.CustomSpecID.length) {
          change_price += parseInt(change_item.ChangePrice);
        }
      });

      const product_data = {
        product_data: this.product_data,
        active_option: this.active_option,
      };

      this.$GetCustomPrice(product_data);
      return [
        parseInt(this.product_data.CustomGoodsStock[0].SellPrice) +
          change_price,
        parseInt(this.product_data.CustomGoodsStock[0].MemberSellPrice) +
          change_price,
      ];
    },
    OpenEventImageDialog(item) {
      this.$refs.EventImageDialog.Open(item);
    },
    CopyLink() {
      this.$refs.clone.focus();
      document.execCommand('copy');
      alert('已複製到剪貼簿');
    },
    ShareToFB() {
      window
        .open(
          `https://www.facebook.com/sharer.php?u=${window.location.href}`,
          '_blank'
        )
        .focus();
    },
    ShareToLine() {
      window.open(`line://msg/text/${window.location.href}`, '_blank').focus();
    },
  },
  mounted() {
    if (this.product_data.GoodsTimeEnd != null) {
      this.$refs.EventTimer.SetTimer();
    }
  },
  computed: {
    time_status() {
      if (this.start_time == null || this.end_time == null) {
        return 'none';
      }
      let nowTime = new Date().getTime(); // 獲取當前毫秒數
      if (nowTime < this.start_time) {
        // 活動尚未開始
        return 'prepare';
      } else if (nowTime > this.start_time && nowTime < this.end_time) {
        // 活動進行中
        return 'start';
      } else {
        // 活動結束
        return 'end';
      }
    },
    start_time() {
      if (
        this.product_data.GoodsTimeStart == '' ||
        this.product_data.GoodsTimeStart == null
      ) {
        return null;
      }
      let time = new Date();
      time.setFullYear(this.product_data.GoodsTimeStart.slice(0, 4)); // 設定結束年份
      time.setMonth(parseInt(this.product_data.GoodsTimeStart.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
      time.setDate(parseInt(this.product_data.GoodsTimeStart.slice(8, 10))); //   獲取結束 日
      time.setHours(parseInt(this.product_data.GoodsTimeStart.slice(11, 13))); //   獲取結束 時
      time.setMinutes(parseInt(this.product_data.GoodsTimeStart.slice(14, 16))); //   獲取結束 分
      time.setSeconds(parseInt(this.product_data.GoodsTimeStart.slice(17, 19)));
      return time.getTime();
    },
    end_time() {
      if (
        this.product_data.GoodsTimeEnd == '' ||
        this.product_data.GoodsTimeEnd == null
      ) {
        return null;
      }
      let time = new Date();
      time.setFullYear(this.product_data.GoodsTimeEnd.slice(0, 4)); // 設定結束年份
      time.setMonth(parseInt(this.product_data.GoodsTimeEnd.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
      time.setDate(parseInt(this.product_data.GoodsTimeEnd.slice(8, 10))); //   獲取結束 日
      time.setHours(parseInt(this.product_data.GoodsTimeEnd.slice(11, 13))); //   獲取結束 時
      time.setMinutes(parseInt(this.product_data.GoodsTimeEnd.slice(14, 16))); //   獲取結束 分
      time.setSeconds(parseInt(this.product_data.GoodsTimeEnd.slice(17, 19)));
      return time.getTime();
    },
  },
};
</script>
