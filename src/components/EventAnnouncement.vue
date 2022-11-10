<template>
  <div
    class="fixed z-20 top-0 left-0 right-0 py-1 bg-primary text-white text-center"
  >
    <p class="text-center tracking-wider">{{ text }}</p>
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
};
</script>
