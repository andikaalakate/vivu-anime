<template>
  <div
    class="animate__animated animate__fadeInUp animate__slow grid p-4 mini:grid-cols-2 mini:gap-6 hmin:grid-cols-2 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6"
  >
    <div
      v-for="Anime in api"
      :key="Anime.slug"
      class="group rounded-lg border-2 border-color-whity bg-gradient-to-br from-color-whity to-white shadow-xl shadow-color-dark transition-all duration-500 hover:scale-105 hover:border-color-primary hover:from-color-primary hover:to-blue-500 active:scale-110"
    >
      <RouterLink :to="`${hrefLink}/${Anime.slug}`" class="cursor-pointer">
        <div class="relative rounded-t-lg overflow-hidden aspect-[3/4]">
          <img
            :src="Anime.poster"
            :alt="Anime.judul"
            class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <h3
          class="text-md title p-4 font-bold transition-all duration-500 group-hover:text-color-whity md:text-xl text-color-dark"
          :title="Anime.judul"
        >
          {{ Anime.judul }}
        </h3>
      </RouterLink>
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
