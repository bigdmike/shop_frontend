<template>
  <div>
    <button
      @click="status = !status"
      class="p-5 font-bold w-full flex items-center justify-between link_color text-basic_black"
    >
      <p :class="status ? 'text-basic_gray' : ''">{{ title }}</p>
      <PlusIcon v-if="!status" class="w-4" />
      <MinusIcon v-else class="w-4" />
    </button>
    <ol
      class="overflow-hidden transition-all duration-200"
      :class="status ? 'max-h-screen' : 'max-h-0'"
    >
      <li v-for="(item, item_index) in list" :key="`list_${item_index}`">
        <router-link
          @click.native="$emit('close-action')"
          :to="item.link"
          class="px-5 py-3 block text-sm link_color text-basic_black"
        >
          {{ item.title }}
        </router-link>
      </li>
    </ol>
  </div>
</template>

<script>
import PlusIcon from '@/components/svg/PlusIcon.vue';
import MinusIcon from '@/components/svg/MinusIcon.vue';
export default {
  name: 'MenuCollapse',
  components: {
    PlusIcon,
    MinusIcon,
  },
  props: {
    title: {
      type: String,
      require: true,
    },
    list: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      status: false,
    };
  },
};
</script>
