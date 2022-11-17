<template>
  <Teleport to="#app">
    <div
      ref="MainContent"
      class="fixed top-0 bottom-0 z-30 flex items-center justify-center w-full left-full"
    >
      <div
        data-dialog-box
        class="w-[600px] max-w-[95%] bg-white relative z-10 p-10 rounded-2xl"
      >
        <ol class="w-full max-h-[300px] overflow-y-auto mb-5">
          <li
            class="w-full mb-5"
            v-for="(item, item_index) in address_list"
            :key="`address_${item_index}`"
          >
            <button
              @click="active_index = item_index"
              :class="
                item_index == active_index
                  ? 'border-secondary bg-secondary bg-opacity-10 '
                  : 'border-zinc-300'
              "
              class="block w-full px-5 py-5 transition-colors duration-200 border rounded-md hover:border-secondary hover:bg-secondary hover:bg-opacity-10"
            >
              <div class="flex items-center mb-2">
                <p class="mr-5">{{ item.Name }}</p>
                <p class="text-sm">{{ item.Phone }}</p>
              </div>
              <div class="flex items-center">
                <p class="text-sm text-basic_gray">
                  {{ GetZipData(item.Zip).City }}
                  {{ GetZipData(item.Zip).Area }} {{ item.Address }}
                </p>
              </div>
            </button>
          </li>
        </ol>
        <div class="flex items-center justify-center">
          <button
            @click="Close"
            class="px-10 py-2 mr-1 text-sm font-bold transition-colors duration-200 bg-transparent border rounded-full text-primary border-primary hover:bg-primary hover:text-white"
          >
            取消
          </button>
          <button
            @click="Submit"
            class="px-10 py-2 ml-1 text-sm font-bold text-white transition-colors duration-200 border rounded-full bg-primary border-primary hover:bg-transparent hover:text-primary"
          >
            確定
          </button>
        </div>
      </div>
      <div
        data-dialog-bg
        class="absolute top-0 bottom-0 left-0 right-0 z-0 bg-basic_white bg-opacity-80"
      ></div></div
  ></Teleport>
</template>

<script>
import Teleport from 'vue2-teleport';
import { dialog_animation } from '@/gsap/dialog';
import { getAddressData } from '@/api/member';
import { delLocalStorage, getLocalStorage } from '@/common/cookie';
export default {
  name: 'AddressDeleteDialog',
  components: {
    Teleport,
  },
  data() {
    return {
      dialog_animation: null,
      status: false,
      address_list: [],
      active_index: 0,
    };
  },
  methods: {
    Open() {
      this.active_index = 0;
      this.status = true;
    },
    Close() {
      this.status = false;
    },
    Submit() {
      const active_address_data = this.address_list[this.active_index];
      const form_data = {
        consignee_first_name: active_address_data.Name.slice(1, 3),
        consignee_last_name: active_address_data.Name.slice(0, 1),
        consignee_phone: active_address_data.Phone,
        consignee_city: this.GetZipData(active_address_data.Zip).City,
        consignee_area: this.GetZipData(active_address_data.Zip).Area,
        consignee_address: active_address_data.Address,
      };
      this.$emit('update-action', form_data);
      this.status = false;
    },
    GetData() {
      getAddressData().then((res) => {
        if (res.code == 302) {
          // token過期
          delLocalStorage('account_token');
          this.$router.push('/');
          this.$store.commit('SetDialog', {
            status: true,
            content: '帳號授權過期，請重新登入',
          });
        } else {
          this.address_list = res.data;
        }
      });
    },
    GetZipData(code) {
      return this.zipcode_data.filter((item) => item.ZipCode == code)[0];
    },
  },
  watch: {
    status() {
      if (this.status) {
        this.dialog_animation.open();
      } else {
        this.dialog_animation.close();
      }
    },
  },
  computed: {
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
  },
  mounted() {
    this.dialog_animation = new dialog_animation(this.$refs.MainContent);
  },
  created() {
    if (getLocalStorage('account_token')) {
      this.GetData();
    }
  },
};
</script>
