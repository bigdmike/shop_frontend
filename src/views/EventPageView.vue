<template>
  <main>
    <BreadCrumb class="hidden mb-20" :path="bread_crumb_path" />
  </main>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue';
import { GetMetaData } from '@/common/meta';
export default {
  name: 'EventPageView',
  components: {
    BreadCrumb,
  },
  data() {
    return {
      meta_data: null,
      bread_crumb_path: [
        {
          title: '首頁',
          link: '/',
        },
        {
          title: '關於我們',
          link: '/event/',
        },
      ],
    };
  },
  methods: {},
  computed: {
    event_data() {
      return this.$store.getters.event_data(this.$route.params.id);
    },
  },
  created() {
    if (this.event_data != 'error') {
      this.bread_crumb_path[1].title = this.event_data.Title;
      this.bread_crumb_path[1].link += this.event_data.MenuID;
      this.meta_data = GetMetaData(
        this.event_data.Title,
        this.event_data.Content.replaceAll(/<[^>]+>/g, '').slice(0, 150),
        this.$ImageUrl(this.event_data.Image1)
      );
      this.$nextTick(() => {
        this.$PageReady(this.meta_data.title);
      });
    } else {
      this.$RedirectError();
    }
  },
  metaInfo() {
    return this.meta_data;
  },
};
</script>
