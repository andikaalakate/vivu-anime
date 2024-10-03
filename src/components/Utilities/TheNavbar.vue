<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'

const searchQuery = ref('')
const router = useRouter()
const isOpen = ref(false)

const searchAnime = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: '/search', query: { q: searchQuery.value } })
  }
}

const hamburgerOpen = () => {
  isOpen.value = !isOpen.value;
  console.log("isOpen: " + isOpen.value)
}

</script>

<template>
  <header
    class="bg-gradient-to-br from-color-primary to-blue-500 tablet-l:sticky tablet-l:bg-opacity-75 tablet-l:shadow-lg top-0 z-50">
    <div class="flex md:flex-row flex-col gap-4 items-center md:justify-between p-4 mx-6">
      <div class="flex flex-row justify-start w-full text-color-whity gap-4">
        <button @click="hamburgerOpen" class="align-middle mt-1 lg:hidden">
          <PhList v-if="!isOpen" :size="28" />
          <PhX v-if="isOpen" :size="28" />
        </button>
        <RouterLink class="font-bold text-white text-2xl" to="/">VantaNime.</RouterLink>
      </div>

      <div class="relative mini:top-0 mini:w-full md:px-8 mini:inset-0">
        <input v-model="searchQuery" @keydown.enter="searchAnime" type="text" placeholder="Cari Anime ..."
          class="w-full rounded p-2 text-color-dark placeholder:text-slate-800 ring-color-primary bg-color-whity" />
        <button @click="searchAnime"
          class="absolute right-2 -top-[0.20rem] rounded px-3 py-[0.65rem] text-color-dark md:right-8">
          <PhMagnifyingGlass :size="20" />
        </button>
      </div>

      <div class="text-color-whity mini:justify-between mini:flex-row lg:flex gap-4 pt-1 hidden">
        <RouterLink class="hover:text-white transition-all duration-500 bg-color-dark py-1 px-4 rounded self-end"
          to="/anime">
          Anime
        </RouterLink>
        <RouterLink class="hover:text-white transition-all duration-500 bg-color-dark py-1 px-4 rounded self-end"
          to="/ongoing">
          Ongoing
        </RouterLink>
        <RouterLink class="hover:text-white transition-all duration-500 bg-color-dark py-1 px-4 rounded self-end"
          to="/completed">
          Completed
        </RouterLink>
      </div>
    </div>
    <div v-if="isOpen" class="relative min-h-14 min-w-svh lg:hidden">
      <div
        class="text-color-whity text-sm md:text-lg font-bold w-full bg-color-primary px-8 grid-cols-3 gap-4 pt-1 grid absolute top-0 bottom-0 lg:hidden justify-center items-center">
        <RouterLink
          class="hover:text-white transition-all duration-500 bg-color-dark flex w-full mx-2 py-2 px-4 rounded items-center title"
          to="/anime">
          Anime
        </RouterLink>
        <RouterLink
          class="hover:text-white transition-all duration-500 bg-color-dark flex w-full mx-2 py-2 px-4 rounded items-center title"
          to="/ongoing">
          Ongoing
        </RouterLink>
        <RouterLink
          class="hover:text-white transition-all duration-500 bg-color-dark flex w-full mx-2 py-2 px-4 rounded items-center title"
          to="/completed">
          Completed
        </RouterLink>
      </div>
    </div>
  </header>
</template>
