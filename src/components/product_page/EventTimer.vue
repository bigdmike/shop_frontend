<template>
  <div
    class="w-full max-w-screen-xl py-2 mx-auto text-center bg-secondary bg-opacity-20"
  >
    <p class="mb-2 text-sm text-basic_gray">限時販售剩餘時間</p>
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
    };
  },
  methods: {
    SetTimer() {
      // GoodsTimeEnd 2023-01-31 00:00:00
      setInterval(() => {
        // 設置倒數計時: 結束時間 - 當前時間
        // 當前時間
        let time = new Date();
        let nowTime = time.getTime(); // 獲取當前毫秒數

        time.setFullYear(this.product_data.GoodsTimeEnd.slice(0, 4)); // 設定結束年份
        time.setMonth(parseInt(this.product_data.GoodsTimeEnd.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
        time.setDate(parseInt(this.product_data.GoodsTimeEnd.slice(8, 10))); //   獲取結束 日
        time.setHours(parseInt(this.product_data.GoodsTimeEnd.slice(11, 13))); //   獲取結束 時
        time.setMinutes(parseInt(this.product_data.GoodsTimeEnd.slice(14, 16))); //   獲取結束 分
        time.setSeconds(parseInt(this.product_data.GoodsTimeEnd.slice(17, 19)));
        let endTime = time.getTime();
        // 倒數計時: 差值
        let offsetTime = (endTime - nowTime) / 1000; // ** 以秒為單位
        this.sec = parseInt(offsetTime % 60); // 秒
        this.min = parseInt((offsetTime / 60) % 60); // 分 ex: 90秒
        this.hr = parseInt((offsetTime / 60 / 60) % 24); // 時
        this.day = parseInt(offsetTime / 60 / 60 / 24); // 天
      }, 1000);
    },
  },
};
</script>
