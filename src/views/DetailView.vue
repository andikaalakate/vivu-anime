<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getAnimeResponse } from '@/libs/api'
import MetaData from '@/components/AnimeList/MetaData.vue'
import TheLoading from '@/components/Utilities/TheLoading.vue'
import ButtonBack from '@/components/Utilities/ButtonBack.vue'
import CommentBox from '@/components/AnimeList/CommentBox.vue'
import CommentInput from '@/components/AnimeList/CommentInput.vue'
import EpisodeList from '@/components/Utilities/EpisodeList.vue'

const route = useRoute()
const anime = ref(null)
const episodes = ref([])
const downloads = ref([])
const slug = route.params.slug
const slugBatch = ref(null)
const isLoading = ref(true)
const isComment = ref(false)

const expanded = ref(false) // Untuk mengontrol status apakah sudah diklik "Baca Selengkapnya"
const characterLimit = 100 // Batas karakter awal sebelum memotong teks

// Fungsi untuk mendapatkan paragraf yang terlihat
const visibleParagraphs = () => {
  if (!anime.value || !anime.value.sinopsis) return []
  return expanded.value
    ? anime.value.sinopsis.paragraphs
    : anime.value.sinopsis.paragraphs.slice(0, 1)
}

// Periksa apakah ada teks yang dipotong
const hasOverflowedText = () => {
  if (!anime.value || !anime.value.sinopsis) return false
  return anime.value.sinopsis.paragraphs.some((paragraph) => paragraph.length > characterLimit)
}

// Memotong teks jika panjangnya melebihi batas
const truncatedText = (paragraph, index) => {
  if (expanded.value) {
    return paragraph // Jika mode expanded, tampilkan seluruh teks
  }
  return paragraph.length > characterLimit && index === 0
    ? paragraph.slice(0, characterLimit) + '...'
    : paragraph
}

// Fungsi untuk mengganti status expanded
const toggleReadMore = () => {
  expanded.value = !expanded.value // Ubah state antara expanded dan collapsed
}

// Fungsi untuk fetch data anime
const fetchAnimeData = async () => {
  try {
    const response = await getAnimeResponse(`otakudesu/anime/${slug}`)
    anime.value = response.data

    // Proses episodeList untuk mendapatkan nomor episode
    if (response.data.episodeList) {
      episodes.value = response.data.episodeList
        .map((episode) => {
          const episodeSlug = episode.slug // Ambil slug episode
          const episodeNumberMatch = episodeSlug.match(/episode-(\d+)-sub-indo/) // Sesuaikan regex sesuai format slug
          const episodeNumber = episodeNumberMatch ? episodeNumberMatch[1] : null // Ambil nomor episode
          return {
            slug: episodeSlug,
            nomor: episodeNumber,
            judul: `Episode ${episodeNumber}` // Kustomisasi judul jika diperlukan
          }
        })
        .filter((episode) => episode.nomor) // Hanya ambil episode yang valid
    }

    // Proses ambil url download
    if (response.data.batch) {
      slugBatch.value = response.data.batch.slug
      const responseB = await getAnimeResponse(`otakudesu/batch/${slugBatch.value}`)

      downloads.value = responseB.data.batchList[0].qualities
    }
  } catch (error) {
    console.error('Error fetching anime data:', error)
  } finally {
    isLoading.value = false
  }
}

// Fungsi untuk toggle komentar
const toggleComment = () => {
  isComment.value = !isComment.value
}

const scrollToTop = () => {
  scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  scrollToTop()
  fetchAnimeData()
})
</script>

<template>
  <!-- Loading Screen -->
  <TheLoading v-if="isLoading" />

  <!-- Anime Detail View -->
  <div v-else>
    <div
      class="p-2 mx-4 mt-4 mb-6 flex justify-between items-center gap-4 animate__animated animate__fadeIn animate__slower bg-gradient-to-br from-color-primary to-blue-500 rounded-lg shadow-lg"
    >
      <h3 class="text-color-whity text-xl px-2 title">{{ anime?.judul }}</h3>
      <ButtonBack />
    </div>

    <!-- Konten Anime -->
    <div class="px-4 flex lg:flex-nowrap flex-wrap gap-4 text-color-whity">
      <div class="img-card">
        <img :src="anime?.poster" :alt="anime?.poster" class="img" />
      </div>

      <div class="text-justify text-xl bg-color-dark rounded-lg p-4 w-full relative">
        <div v-if="anime?.sinopsis?.paragraphs?.length > 0" class="p-2">
          <p v-for="(paragraph, index) in visibleParagraphs()" :key="index" class="p-2">
            {{ truncatedText(paragraph, index) }}
          </p>
          <button
            v-if="!expanded && hasOverflowedText()"
            @click="toggleReadMore"
            class="text-blue-500 mx-2"
          >
            Baca Selengkapnya
          </button>
          <button
            v-else-if="expanded && hasOverflowedText()"
            @click="toggleReadMore"
            class="text-blue-500 mx-2"
          >
            Tampilkan Lebih Sedikit
          </button>
        </div>
        <div v-else class="p-4">
          <p>Sinopsis Belum Tersedia</p>
        </div>

        <div
          class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 mt-2 gap-4 justify-center items-center rounded-lg bg-color-darker text-color-whity"
        >
          <MetaData title="Skor" :detail="anime?.skor" />
          <MetaData title="Episode" :detail="anime?.totalEpisode" />
          <MetaData title="Tipe" :detail="anime?.tipe" />
          <MetaData title="Durasi" :detail="anime?.durasi" />
          <MetaData title="Tanggal Rilis" :detail="anime?.tanggalRilis" />
          <MetaData title="Status" :detail="anime?.status" />
          <MetaData title="Studio" :detail="anime?.studio" />
        </div>
        <EpisodeList :episodes="episodes" />
      </div>
    </div>

    <div class="bg-color-dark p-4 m-4 rounded-lg shadow-lg transition-all duration-500">
      <!-- Downloads URL -->
      <h3 class="text-color-whity text-2xl font-bold mx-4 my-2 border-b pb-2">
        Batch {{ anime?.judul }}
      </h3>
      <div class="grid grid-cols-1 gap-4 m-4 lg:grid-cols-3">
        <div
          v-for="download in downloads"
          :key="download.judul"
          class="text-color-whity p-3 rounded-lg bg-color-primary"
        >
          <p>{{ download.judul }} - {{ download.size }}</p>
          <div class="flex flex-wrap gap-2 mt-2">
            <a
              v-for="url in download.urls"
              :key="url.judul"
              :href="url.url"
              target="_blank"
              class="text-color-whity bg-blue-800 py-2 px-4 border-2 border-color-primary hover:border-color-whity rounded-lg hover:text-white transition-all duration-500"
              >{{ url.judul }}</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bg-color-dark p-4 m-4 rounded-lg shadow-lg transition-all duration-500">
      <h3 class="text-color-whity text-2xl font-bold mx-4 my-2 border-b pb-2">Komentar</h3>
      <div class="flex flex-col">
        <button
          @click="toggleComment"
          v-show="isComment === false"
          class="text-color-whity p-3 mx-4 rounded-lg bg-color-primary"
        >
          Buka Komentar
        </button>
      </div>
      <div v-if="isComment">
        <CommentInput />
        <CommentBox />
      </div>
      <div class="flex flex-col">
        <button
          @click="toggleComment"
          v-show="isComment === true"
          class="text-color-whity p-3 mx-4 rounded-lg bg-color-primary"
        >
          Tutup Komentar
        </button>
      </div>
    </div>
  </div>
</template>
