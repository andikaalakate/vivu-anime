<script setup>
defineProps({
  episodes: {
    type: Array,
    required: true
  }
});
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
        class="mb-2 -mr-2 bg-blue-900 p-2 rounded-lg"
      >
        <RouterLink 
          :to="`/episode/${episode.slug}`"
        >
          <span class="font-semibold">{{ episode.judul }}</span>
        </RouterLink>
      </li>
    </ul>
  </div>
</template>
