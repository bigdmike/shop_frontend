<template>
  <div class="w-full">
    <div class="mb-5 w-full">
      <div class="flex items-start mb-2">
        <p class="w-20 flex-shrink-0 text-secondary text-sm">收件人</p>
        <div class="w-full">
          <input
            v-model="form_data.name"
            type="text"
            name="name"
            placeholder="請輸入收件人姓名"
            class="w-full border border-zinc-200 rounded-md px-3 py-2"
          />
          <p v-if="GetError('name')" class="text-red-600 text-xs">
            請輸入正確的中文姓名
          </p>
        </div>
      </div>
      <div class="flex items-start mb-2">
        <p class="w-20 flex-shrink-0 text-secondary text-sm">聯絡電話</p>
        <div class="w-full">
          <input
            v-model="form_data.phone"
            type="tel"
            name="phone"
            placeholder="請輸入聯絡電話"
            class="w-full border border-zinc-200 rounded-md px-3 py-2"
          />
          <p v-if="GetError('phone')" class="text-red-600 text-xs">
            請輸入正確的手機號碼
          </p>
        </div>
      </div>
      <div class="flex items-start">
        <p class="w-20 flex-shrink-0 text-secondary text-sm">收件地址</p>
        <div class="flex flex-wrap w-full">
          <div class="w-1/3 mb-2">
            <div class="relative">
              <SelectArrowIcon
                class="absolute top-1/2 right-5 w-5 pointer-events-none text-black z-10 transform -translate-y-1/2"
              />
              <select
                v-model="form_data.city"
                class="w-full focus:outline-none appearance-none relative z-0 py-2 border border-zinc-200 rounded-md px-2"
              >
                <option value="">選擇縣市</option>
                <option v-for="item in city_list" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
            <p v-if="GetError('city')" class="text-red-600 text-xs">
              請選擇縣市
            </p>
          </div>
          <div class="w-1/3 mb-2 px-2">
            <div class="relative">
              <SelectArrowIcon
                class="absolute top-1/2 right-5 w-5 pointer-events-none text-black z-10 transform -translate-y-1/2"
              />

              <select
                v-model="form_data.area"
                class="w-full focus:outline-none appearance-none relative z-0 py-2 border border-zinc-200 rounded-md px-2"
              >
                <option value="">選擇區域</option>
                <option v-for="item in area_list" :key="item">
                  {{ item }}
                </option>
              </select>
            </div>
            <p v-if="GetError('area')" class="text-red-600 text-xs">
              請選擇區域
            </p>
          </div>
          <div class="w-1/3 mb-2">
            <input
              type="text"
              v-model="form_data.zip_code"
              placeholder="郵遞區號"
              readonly
              class="w-full border border-zinc-200 rounded-md px-3 py-2"
            />
            <p v-if="GetError('area')" class="text-red-600 text-xs">
              請選擇區域
            </p>
          </div>
          <input
            v-model="form_data.address"
            type="text"
            placeholder="請輸入詳細地址"
            class="w-full border border-zinc-200 rounded-md px-3 py-2"
          />
          <p v-if="GetError('address')" class="text-red-600 text-xs">
            請輸入詳細地址
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-end w-full">
      <button
        @click="ValidateForm"
        class="px-4 py-2 mr-2 bg-primary text-white border border-primary md:text-sm text-xs rounded-lg transition-colors duration-200 hover:bg-transparent hover:text-primary"
      >
        新增
      </button>
      <button
        class="px-4 py-2 border border-secondary text-secondary md:text-sm text-xs rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-white"
      >
        取消
      </button>
    </div>
  </div>
</template>

<script>
import SelectArrowIcon from '@/components/svg/SelectArrowIcon';
import { validName, validPhone } from '@/common/validate';
export default {
  name: 'AddressCreateCard',
  components: {
    SelectArrowIcon,
  },
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
