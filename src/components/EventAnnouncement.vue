<template>
  <div
    class="fixed top-0 left-0 right-0 z-20 py-1 text-center text-white bg-primary"
  >
    <p class="text-sm tracking-wider text-center sm:text-base">
      {{ $GetCloumn('event_announcement') }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'EventAnnouncement',
};
</script>
