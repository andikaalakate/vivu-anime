<template>
  <div
    v-if="api"
    class="animate__animated animate__fadeInUp -z-10 animate__slow grid p-4 grid-cols-1 gap-4"
  >
    <div
      v-for="Anime in api"
      :key="Anime.slug"
      class="group rounded-lg border-2 border-color-whity bg-gradient-to-br from-color-whity to-white transition-all duration-500 hover:scale-105 hover:border-color-primary hover:from-color-primary hover:to-blue-500 active:scale-110 cursor-pointer"
    >
      <RouterLink :to="`${hrefLink}/${Anime.slug}`" class="flex flex-nowrap h-full">
        <div
          class="relative rounded-tl-lg rounded-bl-lg overflow-hidden aspect-[3/4] max-w-20 min-h-full"
        >
          <img
            :src="Anime.poster"
            :alt="Anime.judul"
            class="w-full h-full object-cover transition-transform duration-300"
          />
        </div>
        <div class="py-2 px-4">
          <h3
            class="text-lg text-ellipsis whitespace-nowrap overflow-hidden text-wrap text-left font-bold group-hover:text-color-whity md:text-xl text-color-dark"
            :title="Anime.judul"
          >
            {{ Anime.judul }}
          </h3>
          <div class="text-sm flex flex-nowrap">
            <div class="bg-color-primary 
            border 
            border-color-whity px-2 py-1 mr-2 my-2 font-semibold rounded-lg text-color-whity">
              <p class="text-left">
                <span class="text-white underline">{{ Anime.jumlahEpisode }} Episode</span>
              </p>
            </div>
            <div class="bg-color-primary 
            border 
            border-color-whity px-2 py-1 mr-2 my-2 font-semibold rounded-lg text-color-whity flex  items-center justify-center">
              <p class="text-left align-middle">
                <PhStar :size="15" class="inline mr-1 -mt-1" /><span class="text-white underline">{{ Anime.rating }}</span>
              </p>
            </div>
          </div>
        </div>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <div
      class="animate__animated animate__fadeInUp animate__slow min-h-[calc(100vh-341px)] flex justify-center items-center"
    >
      <div class="text-center">
        <h1 class="text-3xl font-bold text-color-whity">Tidak ada anime</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    api: {
      type: Object,
      default: () => ({
        data: []
      })
    },
    hrefLink: {
      type: String,
      default: ''
    }
  }
}
</script>
