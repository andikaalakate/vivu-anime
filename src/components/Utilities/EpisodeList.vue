<script setup>
import { useRoute } from 'vue-router'

// Mendapatkan parameter dari route
const route = useRoute()

// Mendefinisikan props untuk episodes
defineProps({
  episodes: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <!-- Daftar Episode -->
  <div class="p-4">
    <h4 class="text-lg font-bold text-color-whity mb-2">Daftar Episode</h4>
    <ul
      class="text-color-whity bg-color-primary rounded-lg p-4 max-h-[15rem] overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300"
    >
      <li
        v-for="episode in episodes"
        :key="episode.slug"
        :class="episode.slug === route.params.slug ? 'bg-blue-900' : 'bg-blue-800'"
        class="mb-2 -mr-2 p-2 rounded-lg"
      >
        <RouterLink :to="`/episode/${episode.slug}`" class="flex">
          <span class="font-semibold w-full h-full">{{ episode.judul }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
