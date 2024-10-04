<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getAnimeResponse } from '@libs/api'
import TheLoading from '@/components/Utilities/TheLoading.vue'

// State management
const animeList = ref([])
const isLoading = ref(true)
let intervalId // Untuk menyimpan ID interval

// Fungsi untuk mengambil data dari API
const fetchData = async () => {
  try {
    isLoading.value = true
    const response = await getAnimeResponse('otakudesu/anime')

    animeList.value = response.data
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

// Memulai interval pengambilan data setiap 5 menit
const startInterval = () => {
  stopInterval() // Bersihkan interval sebelumnya jika ada
  intervalId = setInterval(fetchData, 300000) // 5 menit
}

// Menghentikan interval saat komponen dilepas
const stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
}

const scrollToTop = () => {
  scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  scrollToTop()
  fetchData()
  startInterval() // Mulai interval untuk memperbarui data setiap 5 menit
})

onBeforeUnmount(() => {
  stopInterval() // Hentikan interval saat komponen dilepas
})
</script>

<template>
  <TheLoading v-if="isLoading" />

  <div v-else>
    <h1 class="text-4xl mb-8 mt-10 font-bold col-span-2 text-center text-color-whity">
      Daftar Anime
    </h1>
    <div class="grid grid-cols-1 2xl:grid-cols-2 m-8 gap-6">
      <div v-for="anime in animeList" :key="anime.berdasarkan" class="bg-color-dark rounded-xl">
        <div
          class="p-4 text-color-whity bg-color-primary lg:static mini:sticky mini:top-0 mini:z-50"
        >
          <h1 class="text-2xl font-bold">{{ anime.berdasarkan }}</h1>
        </div>
        <div class="px-8 py-4">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <div v-for="list in anime.animeList" :key="list.slug">
              <RouterLink
                :to="`/anime/${list.slug}`"
                class="text-color-whity hover:text-white hover:font-bold transition-all duration-100"
              >
                <p>{{ list.judul }}</p>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
