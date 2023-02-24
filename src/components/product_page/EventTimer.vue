<template>
  <div
    class="w-full max-w-screen-xl py-2 mx-auto text-center bg-secondary bg-opacity-20"
  >
    <p class="mb-2 text-sm text-basic_gray">{{ event_title }}</p>
    <div class="flex items-end justify-center">
      <h4 class="mr-1 text-3xl font-medium text-secondary">{{ day }}</h4>
      <p class="mr-5 text-sm text-basic_gray">天</p>
      <h4 class="mr-1 text-3xl font-medium text-secondary">{{ hr }}</h4>
      <p class="mr-5 text-sm text-basic_gray">時</p>
      <h4 class="mr-1 text-3xl font-medium text-secondary">{{ min }}</h4>
      <p class="mr-5 text-sm text-basic_gray">分</p>
      <h4 class="mr-1 text-3xl font-medium text-secondary">{{ sec }}</h4>
      <p class="text-sm text-basic_gray">秒</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventTimer',
  props: {
    product_data: {
      require: true,
    },
  },
  data() {
    return {
      day: 0,
      hr: 0,
      min: 0,
      sec: 0,
      timer: null,
    };
  },
  methods: {
    SetTimer() {
      // GoodsTimeEnd 2023-01-31 00:00:00
      new Date().getTime() < this.start_time
        ? this.SetEventPrepareCountDown()
        : this.SetEventEndCountDown();
    },
    SetEventPrepareCountDown() {
      this.timer != null ? clearInterval(this.timer) : '';
      this.timer = setInterval(() => {
        // 設置倒數計時: 結束時間 - 當前時間
        // 當前時間
        let time = new Date();
        let nowTime = time.getTime(); // 獲取當前毫秒數
        if (this.start_time < nowTime) {
          this.SetEventEndCountDown();
          return false;
        }
        // 倒數計時: 差值
        let offsetTime = (this.start_time - nowTime) / 1000; // ** 以秒為單位
        this.sec = parseInt(offsetTime % 60); // 秒
        this.min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
        this.hr = parseInt((offsetTime / 60 / 60) % 24); // 時
        this.day = parseInt(offsetTime / 60 / 60 / 24); // 天
      }, 1000);
    },
    SetEventEndCountDown() {
      this.timer != null ? clearInterval(this.timer) : '';
      this.timer = setInterval(() => {
        // 設置倒數計時: 結束時間 - 當前時間
        // 當前時間
        let time = new Date();
        let nowTime = time.getTime(); // 獲取當前毫秒數
        if (this.end_time < nowTime) {
          clearInterval(this.timer);
          this.sec = 0;
          this.min = 0;
          this.hr = 0;
          this.day = 0;
          return false;
        }
        // 倒數計時: 差值
        let offsetTime = (this.end_time - nowTime) / 1000; // ** 以秒為單位
        this.sec = parseInt(offsetTime % 60); // 秒
        this.min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
        this.hr = parseInt((offsetTime / 60 / 60) % 24); // 時
        this.day = parseInt(offsetTime / 60 / 60 / 24); // 天
      }, 1000);
    },
  },
  computed: {
    event_title() {
      return this.event_status == 'prepare'
        ? '距離商品開賣還有'
        : this.event_status == 'start'
        ? '販售時間剩餘'
        : '販售已結束';
    },
    event_status() {
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
