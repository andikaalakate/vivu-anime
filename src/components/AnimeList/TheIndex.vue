<template>
  <div
    v-if="api"
    class="animate__animated animate__fadeInUp animate__slow grid p-4 mini:grid-cols-2 mini:gap-6 hmin:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5"
  >
    <div
      v-for="Anime in api"
      :key="Anime.slug"
      class="group rounded-lg border-2 border-color-primary transition-all duration-500 hover:scale-105 hover:border-color-primary hover:from-color-primary hover:to-blue-500 active:scale-[1.07]"
    >
      <RouterLink :to="`${hrefLink}/${Anime.slug}`" class="relative cursor-pointer">
        <div class="absolute top-0 right-0 left-0 z-10 flex justify-between text-color-whity group-hover:text-color-whity text-sm transition-all duration-500">
          <h1 v-if="Anime.rating" class="bg-color-dark bg-opacity-50 font-semibold rounded-t-lg rounded-br-lg px-2 py-1 group-hover:bg-color-primary">
            <PhStar :size="15" class="inline mr-1 -mt-1"/>
            <span>
              {{ Anime.rating }}

            </span>
          </h1>
          <h1 v-else class="bg-color-dark bg-opacity-50 font-semibold rounded-t-lg rounded-br-lg px-2 py-1 group-hover:bg-color-primary">N/A</h1>
          <h1 v-if="Anime.totalEpisode" class="bg-color-dark bg-opacity-50 font-semibold rounded-t-lg rounded-bl-lg px-2 py-1 group-hover:bg-color-primary">{{ Anime.totalEpisode }}</h1>
          <h1 v-else class="bg-color-dark bg-opacity-50 font-semibold rounded-t-lg rounded-bl-lg px-2 py-1 group-hover:bg-color-primary">N/A</h1>
        </div>
        <div class="overflow-hidden aspect-[3/4] top-0 rounded-lg">
          <img
            :src="Anime.poster"
            :alt="Anime.judul"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div class="transition-all duration-500">
          <h3
            class="title p-4 font-bold group-hover:text-color-whity md:text-xl text-color-whity bg-gradient-to-t from-[rgba(34,40,49,1)] to-[rgba(45,42,49,0.15)] group-hover:bg-color-primary group-hover:bg-opacity-15 group-hover:from-color-primary group-hover:to-[rgba(45,42,49,0.15)] absolute bottom-0 left-0 right-0 rounded-b-md group-hover:rounded-b-md"
            :title="Anime.judul"
          >
            {{ Anime.judul }}
          </h3>
        </div>
      </RouterLink>
    </div>
  </div>
  <div v-else>
    <div class="animate__animated animate__fadeInUp animate__slow min-h-[calc(100vh-292px)] flex justify-center items-center">
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
