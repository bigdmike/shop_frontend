<template>
  <div
    class="fixed top-0 left-0 right-0 z-20 py-1 text-center text-white bg-primary"
  >
    <p class="tracking-wider text-center">{{ event_announcement }}</p>
  </div>
</template>

<script>
export default {
  name: 'EventAnnouncement',
  props: {
    text: {
      require: true,
      type: String,
    },
  },
  computed: {
    common_column_data() {
      return this.$store.state.common_column_data;
    },
    event_announcement() {
      let tmp_data = this.common_column_data.filter(
        (item) => item.Title == 'event_announcement'
      )[0].Content;
      return tmp_data;
    },
  },
};
</script>
