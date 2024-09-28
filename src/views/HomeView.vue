<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '@components/AnimeList/TheHeader.vue'
import AnimeList from '@components/AnimeList/TheIndex.vue'
import Trailer from '@components/Utilities/VideoPlayer/TheTrailer.vue'
import { getAnimeResponse } from '@libs/api'
import TheLoading from '@/components/Utilities/TheLoading.vue'

// State management
const homeOnGoing = ref([])
const homeCompleted = ref([])
const homeGenres = ref([])
const isLoading = ref(true)
let intervalId // Untuk menyimpan ID interval

// Fungsi untuk mengambil data dari API
const fetchData = async () => {
  try {
    const response = await getAnimeResponse('otakudesu/home')
    homeOnGoing.value = response.data.onGoing
    homeCompleted.value = response.data.completed

    // Simpan ke localStorage agar data dapat digunakan ulang
    localStorage.setItem('ongoingAnime', JSON.stringify(response.data.onGoing))
    localStorage.setItem('completedAnime', JSON.stringify(response.data.completed))
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchGenres = async () => {
  try {
    const response = await getAnimeResponse('otakudesu/genres')
    homeGenres.value = response.data

    // Simpan ke localStorage agar data dapat digunakan ulang
    localStorage.setItem('genres', JSON.stringify(response.data))
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

// Fungsi untuk scroll keatas
const scrollToTop = () => {
  scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  scrollToTop()
  // Cek apakah data sudah ada di localStorage
  const storedOnGoingData = localStorage.getItem('ongoingAnime')
  const storedCompletedData = localStorage.getItem('completedAnime')
  const storedGenresData = localStorage.getItem('genres')

  if (storedOnGoingData && storedCompletedData && storedGenresData) {
    // Gunakan data dari localStorage jika tersedia
    homeOnGoing.value = JSON.parse(storedOnGoingData)
    homeCompleted.value = JSON.parse(storedCompletedData)
    homeGenres.value = JSON.parse(storedGenresData)
    isLoading.value = false
  } else {
    // Ambil data dari API jika tidak ada di localStorage
    fetchData()
    fetchGenres()
  }

  // Mulai interval untuk memperbarui data setiap 5 menit
  startInterval()
})

onBeforeUnmount(() => {
  // Hentikan interval saat komponen dilepas
  stopInterval()
})
</script>

<template>
  <TheLoading v-if="isLoading" />

  <div v-else class="grid grid-cols-1 lg:grid-cols-3 mx-0 lg:mx-6 xl:mx-12">
    <main class="bg-color-secondary max-w-6xl mx-auto col-span-2">
      <!-- Bagian Trailer -->
      <section class="py-4">
        <Header title="Trailer" />
        <Trailer title="Akasaki Kajitsu" />
      </section>

      <!-- Bagian Ongoing Anime -->
      <section class="py-4">
        <Header title="Terbaru" linkHref="/ongoing" linkTitle="Lainnya" />
        <AnimeList :api="homeOnGoing" hrefLink="/anime" />
      </section>

      <!-- Bagian Completed Anime -->
      <section class="py-4">
        <Header title="Completed" linkHref="/completed" linkTitle="Lainnya" />
        <AnimeList :api="homeCompleted" hrefLink="/anime" />
      </section>
    </main>

    <!-- Bagian Right Sidebar -->
    <aside class="py-4">
      <Header title="Genre" />

      <div class="m-4 bg-color-primary rounded-lg">
        <div class="flex flex-wrap gap-2 p-4">
          <RouterLink
            v-for="genre in homeGenres"
            :key="genre"
            class="text-color-whity hover:text-white transition-all duration-500 bg-color-dark py-1 px-4 rounded-lg self-end"
            :to="`/genre/${genre.slug}`"
          >
            {{ genre.judul }}
          </RouterLink>
        </div>
      </div>
    </aside>
  </div>
</template>
