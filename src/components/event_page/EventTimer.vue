<template>
  <div
    class="w-full max-w-screen-xl py-2 mx-auto text-center bg-primary bg-opacity-20"
  >
    <p class="mb-2 text-sm font-bold text-white">活動剩餘時間</p>
    <div class="flex items-end justify-center">
      <h4 class="mr-1 text-3xl font-medium text-primary font-anybody">
        {{ day }}
      </h4>
      <p class="mr-5 text-sm text-white">天</p>
      <h4 class="mr-1 text-3xl font-medium text-primary font-anybody">
        {{ hr }}
      </h4>
      <p class="mr-5 text-sm text-white">時</p>
      <h4 class="mr-1 text-3xl font-medium text-primary font-anybody">
        {{ min }}
      </h4>
      <p class="mr-5 text-sm text-white">分</p>
      <h4 class="mr-1 text-3xl font-medium text-primary font-anybody">
        {{ sec }}
      </h4>
      <p class="text-sm text-white">秒</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventTimer',
  props: {
    event_data: {
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
      // MenuTimeEnd 2023-01-31 00:00:00
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
        ? '距離活動開始還有'
        : this.event_status == 'start'
        ? '活動剩餘時間'
        : '活動已結束';
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
      time.setFullYear(this.event_data.MenuTimeStart.slice(0, 4)); // 設定結束年份
      time.setMonth(parseInt(this.event_data.MenuTimeStart.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
      time.setDate(parseInt(this.event_data.MenuTimeStart.slice(8, 10))); //   獲取結束 日
      time.setHours(parseInt(this.event_data.MenuTimeStart.slice(11, 13))); //   獲取結束 時
      time.setMinutes(parseInt(this.event_data.MenuTimeStart.slice(14, 16))); //   獲取結束 分
      time.setSeconds(parseInt(this.event_data.MenuTimeStart.slice(17, 19)));
      return time.getTime();
    },
    end_time() {
      let time = new Date();
      time.setFullYear(this.event_data.MenuTimeEnd.slice(0, 4)); // 設定結束年份
      time.setMonth(parseInt(this.event_data.MenuTimeEnd.slice(5, 7)) - 1); //   獲取結束 月份 (從 '0' 開始算)
      time.setDate(parseInt(this.event_data.MenuTimeEnd.slice(8, 10))); //   獲取結束 日
      time.setHours(parseInt(this.event_data.MenuTimeEnd.slice(11, 13))); //   獲取結束 時
      time.setMinutes(parseInt(this.event_data.MenuTimeEnd.slice(14, 16))); //   獲取結束 分
      time.setSeconds(parseInt(this.event_data.MenuTimeEnd.slice(17, 19)));
      return time.getTime();
    },
  },
};
</script>
