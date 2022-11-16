<template>
  <div class="w-full relative z-10 pb-32">
    <AddressDeleteDialog
      ref="AddressDeleteDialog"
      @delete-action="DeleteData"
    />
    <div class="flex items-center justify-end mb-5" v-if="!create_mode">
      <button
        @click="create_mode = true"
        class="px-5 py-2 bg-primary rounded-full text-white"
      >
        新增收件地址
      </button>
    </div>
    <ol class="w-full">
      <li
        v-if="create_mode"
        class="px-5 w-full py-5 rounded-md border border-zinc-300 mb-5"
      >
        <AddressCreateCard
          @create-action="CreateResiverData"
          @cancel-action="create_mode = false"
        />
      </li>
      <li
        class="px-5 py-5 rounded-md border border-zinc-300 mb-5 flex flex-wrap items-center justify-between"
        v-for="(item, item_index) in address_list"
        :key="`address_${item_index}`"
      >
        <div class="md:mb-0 mb-5">
          <div class="flex items-center mb-2">
            <p class="w-20 text-secondary text-sm">收件人</p>
            <p class="text-sm">{{ item.Name }}</p>
          </div>
          <div class="flex items-center mb-2">
            <p class="w-20 text-secondary text-sm">聯絡電話</p>
            <p class="text-sm">{{ item.Phone }}</p>
          </div>
          <div class="flex items-center">
            <p class="w-20 text-secondary text-sm">收件地址</p>
            <p class="text-sm">{{ item.Zip }} {{ item.Address }}</p>
          </div>
        </div>
        <div
          class="flex items-center md:justify-center justify-end md:w-auto w-full"
        >
          <button
            @click="OpenDeleteDialog(item.ReceiverID)"
            class="px-4 py-2 border border-secondary text-secondary md:text-sm text-xs rounded-lg transition-colors duration-200 hover:bg-secondary hover:text-white"
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
  },
  created() {
    this.GetData();
  },
};
</script>
