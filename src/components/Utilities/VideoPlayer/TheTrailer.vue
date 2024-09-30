<template>
  <div class="flex justify-center mx-auto rounded-lg py-2 aspect-video items-center px-4">
    <div
      class="w-full h-full p-1 bg-color-primary rounded-xl border-color-primary border-4 shadow-xl"
    >
      <vue-plyr v-if="code != null">
        <div class="plyr__video-embed">
          <iframe
            class="rounded-xl -z-10"
            :src="
              'https://www.youtube.com/embed/' +
              code +
              '?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1'
            "
            :title="title"
            allowfullscreen
            allowtransparency
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          ></iframe>
        </div>
      </vue-plyr>
      <div v-else class="flex justify-center min-h-full items-center">
        <div
          class="animate__animated animate__fadeIn animate__slower h-full"
        >
          <div class="text-center mx-auto">
            <h1 class="text-3xl font-bold text-color-whity">Tidak ada trailer</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: null
    }
  }
}
</script>
