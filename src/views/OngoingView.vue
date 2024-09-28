<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { getAnimeResponse } from '@libs/api'
import TheLoading from '@/components/Utilities/TheLoading.vue'
import HeaderMenu from '@/components/Utilities/Pagination/HeaderMenu.vue'
import AnimeList from '@/components/AnimeList/TheIndex.vue'
import ThePagination from '@/components/Utilities/Pagination/ThePagination.vue'

// State management
const animeOnGoing = ref([])
const isLoading = ref(true)
const currentPage = ref(1)
const totalPages = ref(0)
let intervalId // Untuk menyimpan ID interval

// Fungsi untuk mengambil data dari API
const fetchData = async () => {
  try {
    isLoading.value = true
    const response = await getAnimeResponse('otakudesu/ongoing', `page=${currentPage.value}`)

    animeOnGoing.value = response.data
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

onMounted(() => {
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
    <HeaderMenu title="Ongoing" />
    <div class="pb-16">
      <AnimeList :api="animeOnGoing" hrefLink="/anime" />
    </div>
    <div class="relative">
      <ThePagination :page="currentPage" :last-page="totalPages" :set-page="setPage" />
    </div>
  </div>
</template>
