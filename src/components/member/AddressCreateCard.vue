<template>
  <div class="w-full">
    <div class="w-full mb-5">
      <div class="flex items-start mb-2">
        <p class="flex-shrink-0 w-20 text-sm text-primary">收件人</p>
        <div class="w-full">
          <input
            v-model="form_data.name"
            type="text"
            name="name"
            placeholder="請輸入收件人姓名"
            class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          />
          <p v-if="GetError('name')" class="text-xs text-red-600">
            請輸入正確的中文姓名
          </p>
        </div>
      </div>
      <div class="flex items-start mb-2">
        <p class="flex-shrink-0 w-20 text-sm text-primary">聯絡電話</p>
        <div class="w-full">
          <input
            v-model="form_data.phone"
            type="tel"
            name="phone"
            placeholder="請輸入聯絡電話"
            class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          />
          <p v-if="GetError('phone')" class="text-xs text-red-600">
            請輸入正確的手機號碼
          </p>
        </div>
      </div>
      <div class="flex items-start">
        <p class="flex-shrink-0 w-20 text-sm text-primary">收件地址</p>
        <div class="flex flex-wrap w-full">
          <div class="w-1/3 mb-2">
            <div class="relative">
              <span
                class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
              ></span>
              <select
                v-model="form_data.city"
                class="relative z-0 w-full px-4 py-3 pr-10 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
              >
                <option value="">選擇縣市</option>
                <option v-for="item in city_list" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
            <p v-if="GetError('city')" class="text-xs text-red-600">
              請選擇縣市
            </p>
          </div>
          <div class="w-1/3 px-2 mb-2">
            <div class="relative">
              <span
                class="absolute z-10 text-white transform rotate-90 -translate-y-1/2 pointer-events-none right-5 icon-chevron_right top-1/2"
              ></span>
              <select
                v-model="form_data.area"
                class="relative z-0 w-full px-4 py-3 pr-10 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
              >
                <option value="">選擇區域</option>
                <option v-for="item in area_list" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
            <p v-if="GetError('area')" class="text-xs text-red-600">
              請選擇區域
            </p>
          </div>
          <div class="w-1/3 mb-2">
            <input
              type="text"
              v-model="form_data.zip_code"
              placeholder="郵遞區號"
              readonly
              class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
            />
            <p v-if="GetError('area')" class="text-xs text-red-600">
              請選擇區域
            </p>
          </div>
          <input
            v-model="form_data.address"
            type="text"
            placeholder="請輸入詳細地址"
            class="relative z-0 w-full px-4 py-3 text-white rounded-md appearance-none bg-basic_gray bg-opacity-20 focus:outline-primary"
          />
          <p v-if="GetError('address')" class="text-xs text-red-600">
            請輸入詳細地址
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end w-full">
      <button
        @click="ValidateForm"
        class="px-4 py-2 mr-2 text-xs text-white transition-colors duration-200 border rounded-lg bg-primary border-primary md:text-sm hover:bg-transparent hover:text-primary"
      >
        新增
      </button>
      <button
        @click="Cancel"
        class="px-4 py-2 text-xs transition-colors duration-200 border rounded-lg border-primary text-primary md:text-sm hover:bg-primary hover:text-white"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script>
import { validName, validPhone } from '@/common/validate';
export default {
  name: 'AddressCreateCard',
  components: {},
  data() {
    return {
      errors: [],
      form_data: {
        name: '',
        phone: '',
        zip_code: '',
        area: '',
        city: '',
        address: '',
      },
    };
  },
  methods: {
    GetError(key) {
      return this.errors.indexOf(key) != -1;
    },
    ValidateForm() {
      this.errors = [];
      !validName(this.form_data.name) ? this.errors.push('name') : '';
      !validPhone(this.form_data.phone) ? this.errors.push('phone') : '';
      this.form_data.city == '' ? this.errors.push('city') : '';
      this.form_data.area == '' ? this.errors.push('area') : '';
      this.form_data.address == '' ? this.errors.push('address') : '';
      if (this.errors.length <= 0) {
        this.CreateData();
      }
    },
    CreateData() {
      const tmp_data = JSON.parse(JSON.stringify(this.form_data));
      this.$emit('create-action', tmp_data);
      this.Cancel();
    },
    Cancel() {
      this.$emit('cancel-action');
      this.form_data = {
        name: '',
        phone: '',
        zip_code: '',
        area: '',
        city: '',
        address: '',
      };
    },
  },
  watch: {
    'form_data.city'() {
      this.form_data.area = '';
      this.form_data.zip_code = '';
    },
    'form_data.area'() {
      if (this.form_data.area == '') {
        this.form_data.zip_code = '';
      } else {
        this.form_data.zip_code = this.zipcode_data.filter(
          (item) => item.Area == this.form_data.area
        )[0].ZipCode;
      }
    },
  },
  computed: {
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
    city_list() {
      let city = [];
      this.zipcode_data.forEach((item) => {
        let if_exist = city.indexOf(item.City) != -1;
        if (!if_exist) {
          city.push(item.City);
        }
      });
      return city;
    },
    area_list() {
      if (this.form_data.city == '') {
        return [];
      } else {
        let area_list = [];
        this.zipcode_data.forEach((item) => {
          if (item.City == this.form_data.city) {
            area_list.push(item.Area);
          }
        });
        return area_list;
      }
    },
  },
};
</script>
