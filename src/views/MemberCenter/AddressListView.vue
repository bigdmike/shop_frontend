<template>
  <div class="relative z-10 w-full pb-32">
    <AddressDeleteDialog
      ref="AddressDeleteDialog"
      @delete-action="DeleteData"
    />
    <div class="flex items-center justify-end mb-5" v-if="!create_mode">
      <button
        @click="create_mode = true"
        class="px-5 py-2 text-white rounded-full bg-primary"
      >
        新增收件地址
      </button>
    </div>
    <ol class="w-full">
      <li
        v-if="create_mode"
        class="w-full px-5 py-5 mb-5 border rounded-md border-zinc-300"
      >
        <AddressCreateCard
          @create-action="CreateResiverData"
          @cancel-action="create_mode = false"
        />
      </li>
      <li
        class="flex flex-wrap items-center justify-between px-5 py-5 mb-5 border rounded-md border-zinc-300"
        v-for="(item, item_index) in address_list"
        :key="`address_${item_index}`"
      >
        <div class="mb-5 md:mb-0">
          <div class="flex items-center mb-2">
            <p class="w-20 text-sm text-secondary">收件人</p>
            <p class="text-sm">{{ item.Name }}</p>
          </div>
          <div class="flex items-center mb-2">
            <p class="w-20 text-sm text-secondary">聯絡電話</p>
            <p class="text-sm">{{ item.Phone }}</p>
          </div>
          <div class="flex items-center">
            <p class="w-20 text-sm text-secondary">收件地址</p>
            <p class="text-sm">
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
            class="px-4 py-2 text-xs transition-colors duration-200 border rounded-lg border-secondary text-secondary md:text-sm hover:bg-secondary hover:text-white"
          >
            刪除
          </button>
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
import { getAddressData, createReceiver, deleteReceiver } from '@/api/member';
import { delLocalStorage } from '@/common/cookie';
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
          delLocalStorage('account_token');
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
          delLocalStorage('account_token');
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
          delLocalStorage('account_token');
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
