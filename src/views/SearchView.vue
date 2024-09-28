<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAnimeResponse } from '@libs/api'
import TheLoading from '@/components/Utilities/TheLoading.vue'
import HeaderMenu from '@/components/Utilities/Pagination/HeaderMenu.vue'
import AnimeList from '@/components/AnimeList/TheIndex.vue'
import ThePagination from '@/components/Utilities/Pagination/ThePagination.vue'

// State management
const route = useRoute()
const query = ref(route.query.q)
const animeByGenre = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(0)
let intervalId // Untuk menyimpan ID interval

// Fungsi untuk mengambil data dari API
const fetchData = async () => {
  try {
    isLoading.value = true
    const response = await getAnimeResponse(
      'otakudesu/search',
      `q=${query.value}&page=${currentPage.value}`
    )

    // Simpan hasil anime ke dalam state
    animeByGenre.value = response.data
    totalPages.value = response.pagination.totalPages // Update totalPages berdasarkan respons API
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

// Fungsi untuk mengatur halaman
const setPage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage
    fetchData()
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

// Watch untuk memantau perubahan query
watch(
  () => route.query.q,
  (newQuery) => {
    query.value = newQuery || '' // Update query
    currentPage.value = 1 // Reset halaman ke 1 saat query berubah
    fetchData() // Ambil data baru
  }
)

onBeforeUnmount(() => {
  stopInterval() // Hentikan interval saat komponen dilepas
})
</script>

<template>
  <TheLoading v-if="isLoading" />

  <div v-else>
    <div class="min-h-[calc(100vh-155px)]">
      <HeaderMenu :title="`Mencari: ${query}`" />
      <div class="pb-16">
        <AnimeList :api="animeByGenre" hrefLink="/anime" />
      </div>
    </div>
    <div class="relative">
      <ThePagination :page="currentPage" :last-page="totalPages" :set-page="setPage" />
    </div>
  </div>
</template>
