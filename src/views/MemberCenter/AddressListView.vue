<template>
  <div class="relative z-10 w-full pb-32">
    <AddressDeleteDialog
      ref="AddressDeleteDialog"
      @delete-action="DeleteData"
    />

    <ol class="w-full mb-10">
      <li v-if="create_mode" class="w-full px-5 py-5 mb-5 bg-black rounded-md">
        <AddressCreateCard
          @create-action="CreateResiverData"
          @cancel-action="create_mode = false"
        />
      </li>
      <li
        class="flex flex-wrap items-center justify-between px-5 py-5 mb-5 rounded-md bg-basic_black"
        v-for="(item, item_index) in address_list"
        :key="`address_${item_index}`"
      >
        <div class="mb-5 md:mb-0">
          <div class="flex items-center mb-2">
            <p class="w-20 text-sm text-primary">收件人</p>
            <p class="text-sm text-white">{{ item.Name }}</p>
          </div>
          <div class="flex items-center mb-2">
            <p class="w-20 text-sm text-primary">聯絡電話</p>
            <p class="text-sm text-white">{{ item.Phone }}</p>
          </div>
          <div class="flex items-center">
            <p class="w-20 text-sm text-primary">收件地址</p>
            <p class="text-sm text-white">
              {{ GetZipData(item.Zip).City }} {{ GetZipData(item.Zip).Area }}
              {{ item.Address }}
            </p>
          </div>
        </div>
        <div
          class="flex items-center justify-end w-full md:justify-center md:w-auto"
        >
          <button
            @click="OpenDeleteDialog(item.ReceiverID)"
            class="px-4 py-2 text-xs transition-colors duration-200 border rounded-lg border-primary text-primary md:text-sm hover:bg-primary hover:text-white"
          >
            刪除
          </button>
        </div>
      </li>
    </ol>
    <div class="flex items-center justify-center" v-if="!create_mode">
      <button
        @click="create_mode = true"
        class="px-5 py-2 font-bold text-white rounded-md bg-primary"
      >
        新增收件地址
      </button>
    </div>
  </div>
</template>

<script>
import { getAddressData, createReceiver, deleteReceiver } from '@/api/member';
import { logoutAccount } from '@/common/cookie';
import AddressCreateCard from '@/components/member/AddressCreateCard.vue';
import AddressDeleteDialog from '@/components/member/AddressDeleteDialog.vue';
export default {
  name: 'AddressListView',
  components: {
    AddressCreateCard,
    AddressDeleteDialog,
  },
  data() {
    return {
      address_list: [],
      create_mode: false,
    };
  },
  methods: {
    GetData() {
      getAddressData().then((res) => {
        if (res.code == 302) {
          // token過期
          logoutAccount();
          this.$router.push('/account/login');
        }
        this.address_list = res.data;
      });
    },
    CreateResiverData(data) {
      const form_data = {
        Name: data.name,
        Zip: data.zip_code,
        Address: data.address,
        Phone: data.phone,
        Seq: 0,
      };
      createReceiver(form_data).then((res) => {
        if (res.code == 302) {
          // token過期
          logoutAccount();
          this.$router.push('/account/login');
        } else {
          this.$store.commit('SetDialog', {
            status: true,
            content: '已成功新增收件地址',
          });
          this.GetData();
        }
      });
    },
    OpenDeleteDialog(id) {
      this.$refs.AddressDeleteDialog.Open(id);
    },
    DeleteData(id) {
      deleteReceiver(id).then((res) => {
        if (res.code == 302) {
          // token過期
          logoutAccount();
          this.$router.push('/account/login');
        } else {
          this.$store.commit('SetDialog', {
            status: true,
            content: '已成功刪除收件地址',
          });
          this.GetData();
        }
      });
    },
    GetZipData(code) {
      return this.zipcode_data.filter((item) => item.ZipCode == code)[0];
    },
  },
  computed: {
    zipcode_data() {
      return this.$store.state.zipcode_data;
    },
  },
  created() {
    this.GetData();
  },
};
</script>
