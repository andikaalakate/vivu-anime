<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAnimeResponse } from '@/libs/api'
import HeaderMenu from '@/components/Utilities/Pagination/HeaderMenu.vue'
import EpisodeList from '@/components/Utilities/EpisodeList.vue'
import TheLoading from '@/components/Utilities/TheLoading.vue'
import CommentInput from '@/components/AnimeList/CommentInput.vue'
import CommentBox from '@/components/AnimeList/CommentBox.vue'

const route = useRoute()
const anime = ref(null)
const epStream = ref(null)
const episodes = ref([])
const downloads = ref([])
const epPrev = ref(null) // Episode sebelumnya
const epNext = ref(null) // Episode selanjutnya
const isLoading = ref(true)
const isComment = ref(false)
const selectedQuality = ref(null) // Menyimpan kualitas yang dipilih
const selectedSource = ref('') // Menyimpan URL streaming yang dipilih
const availableSources = ref([]) // Menyimpan sumber yang tersedia untuk kualitas yang dipilih

const fetchAnimeData = async (slug) => {
  isLoading.value = true
  try {
    const responseA = await getAnimeResponse(`otakudesu/episode/${slug}`)
    const responseB = await getAnimeResponse(`otakudesu/episode/embed/${slug}`)

    anime.value = responseA.data
    epStream.value = responseB.data

    // Setel URL streaming default
    if (responseA.data.defaultStreamingUrl) {
      selectedSource.value = responseA.data.defaultStreamingUrl // Gunakan URL streaming default
    }

    // Setel kualitas dan sumber default saat memuat
    if (responseB.data.length > 0) {
      selectedQuality.value = responseB.data[0] // Kualitas default ke kualitas pertama
      availableSources.value = responseB.data[0].urls // Sumber default ke sumber kualitas pertama

      // Perbarui sumber hanya jika URL streaming default tidak disetel
      if (!responseA.data.defaultStreamingUrl) {
        selectedSource.value = responseB.data[0].urls[0].url // Gunakan sumber pertama dari kualitas pertama
      }
    }

    // Proses daftar episode untuk mendapatkan nomor episode
    if (responseA.data.info.episodeList) {
      episodes.value = responseA.data.info.episodeList
        .map((episode) => {
          const episodeSlug = episode.slug // Ambil slug
          const episodeNumberMatch = episodeSlug.match(/episode-(\d+)-sub-indo/) // Regex untuk mendapatkan nomor episode
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
    if (
      responseA.data.downloadUrl &&
      responseA.data.downloadUrl.qualities &&
      responseA.data.downloadUrl.qualities.length > 0
    ) {
      downloads.value = responseA.data.downloadUrl.qualities
    }

    // Ambil episode sebelumnya dan selanjutnya
    if (responseA.data.episodeSebelumnya) {
      epPrev.value = responseA.data.episodeSebelumnya.slug // Set episode sebelumnya
    }

    if (responseA.data.episodeSelanjutnya) {
      epNext.value = responseA.data.episodeSelanjutnya.slug // Set episode selanjutnya
    }
  } catch (error) {
    console.error('Error fetching anime data:', error)
  } finally {
    isLoading.value = false
  }
}

// Handle quality change
const onQualityChange = (quality) => {
  selectedQuality.value = quality
  availableSources.value = quality.urls
  selectedSource.value = quality.urls[0].url // Default to the first source of the selected quality
}

// Handle source change
const onSourceChange = (sourceUrl) => {
  selectedSource.value = sourceUrl
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
  fetchAnimeData(route.params.slug)
})

watch(
  () => route.params.slug,
  (newSlug) => {
    scrollToTop()
    fetchAnimeData(newSlug)
  }
)
</script>

<template>
  <TheLoading v-if="isLoading" />

  <div v-else>
    <HeaderMenu :title="anime.judul" />

    <div class="grid xl:grid-cols-2 grid-cols-1 p-4 gap-4">
      <!-- Video Player -->
      <div>
        <iframe
          class="w-full xl:h-[28rem] lg:h-[35rem] mini:h-[11rem] minni:h-[12rem] minnii:h-[14rem] hmin:h-[16rem] hp:h-[20rem] sm:h-[24rem] md:h-[26rem] tablet:h-[28rem] tablet-sm:h-[32rem] tablet-l:h-[33rem] rounded-xl border-color-primary border-4 shadow-xl"
          :src="selectedSource"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <div
          v-if="epPrev || epNext"
          class="flex flex-wrap justify-between gap-4 mt-4 mb-2 text-color-whity border-2 rounded-lg bg-color-dark border-color-primary"
        >
          <RouterLink
            v-if="epPrev"
            class="flex flex-nowrap font-semibold hover:bg-color-primary transition-all duration-500 p-2 text-left"
            :to="`/episode/${epPrev}`"
            ><PhArrowLeft :size="27" class="mr-2" /> Sebelumnya</RouterLink
          >
          <RouterLink
            v-if="epNext"
            class="flex flex-nowrap font-semibold hover:bg-color-primary transition-all duration-500 p-2 text-right"
            :to="`/episode/${epNext}`"
            >Selanjutnya <PhArrowRight :size="27" class="ml-2"
          /></RouterLink>
        </div>
      </div>

      <!-- Quality and Source Dropdown -->
      <div class="bg-color-dark rounded-lg p-4">
        <h3 class="text-white mb-2">Pilih Kualitas dan Sumber</h3>

        <!-- Quality Dropdown -->
        <div class="mb-4">
          <label class="block text-gray-300 mb-1">Kualitas:</label>
          <select
            v-model="selectedQuality"
            @change="onQualityChange(selectedQuality)"
            class="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option selected disabled>Pilih Kualitas</option>
            <option v-for="quality in epStream" :key="quality.judul" :value="quality">
              {{ quality.judul }} ({{ quality.size }})
            </option>
          </select>
        </div>

        <!-- Source Dropdown -->
        <div class="mb-4">
          <label class="block text-gray-300 mb-1">Sumber:</label>
          <select
            v-model="selectedSource"
            @change="onSourceChange(selectedSource)"
            class="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option selected disabled>Pilih Sumber</option>
            <option v-for="source in availableSources" :key="source.judul" :value="source.url">
              {{ source.judul }}
            </option>
          </select>
        </div>

        <!-- Episode List -->
        <div class="-mx-4">
          <EpisodeList :episodes="episodes" />
        </div>
      </div>
    </div>

    <div class="bg-color-dark p-4 m-4 rounded-lg shadow-lg transition-all duration-500">
      <!-- Downloads URL -->
      <h3 class="text-color-whity text-2xl font-bold mx-4 my-2 border-b pb-2">
        Download {{ anime?.judul }}
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
