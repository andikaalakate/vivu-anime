<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Header from '@components/AnimeList/TheHeader.vue'
import AnimeList from '@components/AnimeList/TheIndex.vue'
import Trailer from '@components/Utilities/VideoPlayer/TheTrailer.vue'
import { getAnimeResponse, getTrailerResponse } from '@libs/api'
import TheLoading from '@/components/Utilities/TheLoading.vue'
import RandomAnime from '@/components/AnimeList/RandomAnime.vue'

// State management
const homeOnGoing = ref([])
const homeCompleted = ref([])
const homeGenres = ref([])
const trailer = ref(null)
const randomAnime = ref(null)
const randomPage = ref(1)
const randomPageTrailer = ref(1)
const isLoading = ref(true)
let intervalId

// Fungsi untuk mengambil data dari API
const fetchData = async () => {
  try {
    const response = await getAnimeResponse('otakudesu/home')

    // Simpan data yang diambil ke dalam state
    homeOnGoing.value = response.data.onGoing
    homeCompleted.value = response.data.completed

    // Hapus cache lama dan simpan data baru ke localStorage
    localStorage.removeItem('ongoingAnime')
    localStorage.removeItem('completedAnime')
    localStorage.setItem('ongoingAnime', JSON.stringify(response.data.onGoing))
    localStorage.setItem('completedAnime', JSON.stringify(response.data.completed))
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    isLoading.value = false
  }
}

const getRandomAnime = async () => {
  try {
    const firstPageResponse = await getAnimeResponse('otakudesu/completed', 'page=1')

    const totalPages = firstPageResponse.pagination.totalPages

    randomPage.value = Math.floor(Math.random() * totalPages) + 1

    const randomPageResponse = await getAnimeResponse(
      'otakudesu/completed',
      `page=${randomPage.value}`
    )

    const animes = randomPageResponse.data.slice(0, 6)
    randomAnime.value = animes
  } catch (error) {
    console.error('Error fetching random anime:', error)
  } finally {
    isLoading.value = false
  }
}

const getTrailerAnime = async () => {
  try {
    const firstPageResponse = await getTrailerResponse('seasons/now', 'page=1')

    if (!firstPageResponse.pagination || !firstPageResponse.pagination.items) {
      throw new Error('Invalid response from the API')
    }

    const totalPages = firstPageResponse.pagination.last_visible_page || 1

    randomPageTrailer.value = Math.floor(Math.random() * totalPages) + 1

    const randomPageResponse = await getTrailerResponse(
      'seasons/now',
      `page=${randomPageTrailer.value}`
    )

    if (!randomPageResponse || !randomPageResponse.data || randomPageResponse.data.length === 0) {
      throw new Error('No anime found on the fetched page')
    }

    const randomAnime =
      randomPageResponse.data[Math.floor(Math.random() * randomPageResponse.data.length)]

    trailer.value = randomAnime.trailer.youtube_id
    console.log('Trailer:', trailer.value)

    console.log('Selected anime:', randomAnime)
  } catch (error) {
    console.error('Error fetching random trailer:', error)
  } finally {
    isLoading.value = false
  }
}

const fetchGenres = async () => {
  try {
    const response = await getAnimeResponse('otakudesu/genres')

    // Simpan data yang diambil ke dalam state
    homeGenres.value = response.data

    // Hapus cache lama dan simpan data baru ke localStorage
    localStorage.removeItem('genres')
    localStorage.setItem('genres', JSON.stringify(response.data))
  } catch (error) {
    console.error('Error fetching genres:', error)
  } finally {
    isLoading.value = false
  }
}

// Memulai interval pengambilan data setiap 5 menit (300000 ms)
const startInterval = () => {
  stopInterval() // Bersihkan interval sebelumnya jika ada
  intervalId = setInterval(() => {
    fetchData()
    fetchGenres()
  }, 300000) // Setiap 5 menit
}

// Menghentikan interval saat komponen dilepas
const stopInterval = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
}

// Fungsi untuk scroll ke atas
const scrollToTop = () => {
  scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  scrollToTop()
  getRandomAnime()
  getTrailerAnime()

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
        <Trailer title="Akasaki Kajitsu" :code="trailer" />
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
    <aside class="mt-2">
      <section class="py-2">
        <Header title="Random Anime" />
        <RandomAnime :api="randomAnime" hrefLink="/anime" />
      </section>
      <section class="py-2">
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
      </section>
      <section class="py-2"></section>
    </aside>
  </div>
</template>
