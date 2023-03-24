<template>
  <div class="relative z-10 w-full bg-black aspect-video">
    <img
      :alt="$GetColumn('brand_name')"
      src="/img/video_overlay.webp"
      class="absolute top-0 bottom-0 left-0 z-10 w-auto h-full"
    />
    <div class="absolute top-0 bottom-0 left-0 z-10 w-full h-full"></div>
    <iframe
      v-if="video_id != ''"
      class="absolute top-0 left-0 z-0 object-cover w-full h-full md:h-full"
      :src="`https://www.youtube.com/embed/${video_id}?controls=0&autoplay=1&mute=1&playlist=${video_id}&loop=1`"
      title="YouTube video player"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      autoplay
      muted
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'HomeVideoSection',
  computed: {
    video_id() {
      let video_link = this.$GetColumn('home_video');
      if (video_link != '') {
        let id = video_link.split('/');
        id = id[id.length - 1].split('?')[0];
        return id;
      } else {
        return '';
      }
    },
  },
};
</script>
