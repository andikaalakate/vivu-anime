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
const isLoading = ref(true)
const selectedQuality = ref(null) // Store the selected quality
const selectedSource = ref('') // Store the selected streaming source URL
const availableSources = ref([]) // Store available sources for selected quality

const fetchAnimeData = async (slug) => {
  isLoading.value = true
  try {
    const responseA = await getAnimeResponse(`otakudesu/episode/${slug}`)
    const responseB = await getAnimeResponse(`otakudesu/episode/embed/${slug}`)

    anime.value = responseA.data
    epStream.value = responseB.data

    // Set default streaming URL
    if (responseA.data.defaultStreamingUrl) {
      selectedSource.value = responseA.data.defaultStreamingUrl // Use the default streaming URL first
    }

    // Set default quality and sources on load
    if (responseB.data.length > 0) {
      selectedQuality.value = responseB.data[0] // Default to the first quality
      availableSources.value = responseB.data[0].urls // Default to the sources of the first quality

      // Update source only if default streaming URL is not set
      if (!responseA.data.defaultStreamingUrl) {
        selectedSource.value = responseB.data[0].urls[0].url // Default to the first source of the first quality
      }
    }

    // Process episode list to get episode numbers
    if (responseA.data.info.episodeList) {
      episodes.value = responseA.data.info.episodeList
        .map((episode) => {
          const episodeSlug = episode.slug // Extract slug
          const episodeNumberMatch = episodeSlug.match(/episode-(\d+)-sub-indo/) // Regex to match episode number
          const episodeNumber = episodeNumberMatch ? episodeNumberMatch[1] : null // Extract episode number
          return {
            slug: episodeSlug,
            nomor: episodeNumber,
            judul: `Episode ${episodeNumber}` // Customize the title if necessary
          }
        })
        .filter((episode) => episode.nomor) // Only take valid episodes
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

    <div class="grid lg:grid-cols-2 grid-cols-1 p-4 gap-4">
      <!-- Video Player -->
      <div>
        <iframe
          class="w-full h-[32rem] rounded-xl border-color-primary border-4 shadow-xl"
          :src="selectedSource"
          frameborder="0"
          allowfullscreen
        ></iframe>
      </div>

      <!-- Quality and Source Dropdown -->
      <div class="bg-color-dark rounded-lg p-4">
        <h3 class="text-white mb-2">Select Quality & Source</h3>

        <!-- Quality Dropdown -->
        <div class="mb-4">
          <label class="block text-gray-300 mb-1">Quality:</label>
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
          <label class="block text-gray-300 mb-1">Source:</label>
          <select
            v-model="selectedSource"
            @change="onSourceChange(selectedSource)"
            class="w-full p-2 rounded bg-gray-800 text-white border border-gray-600"
          >
            <option selected disabled>Pilih Source</option>
            <option v-for="source in availableSources" :key="source.judul" :value="source.url">
              {{ source.judul }}
            </option>
          </select>
        </div>

        <!-- Episode List -->
        <div class="-m-4">
          <EpisodeList :episodes="episodes" />
        </div>
      </div>
    </div>

     <div class="bg-color-dark p-4 m-4 rounded-lg shadow-lg transition-all duration-500">
      <h3 class="text-color-whity text-2xl font-bold mx-4 my-2 border-b pb-2">Komentar</h3>
      <CommentInput />
      <CommentBox />
    </div>
  </div>
</template>
