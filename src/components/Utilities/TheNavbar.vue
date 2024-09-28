<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header
    class="bg-gradient-to-br from-color-primary to-blue-500 tablet-l:sticky tablet-l:bg-opacity-75 tablet-l:shadow-lg top-0 z-50"
  >
    <div class="flex md:flex-row flex-col gap-2 items-center md:justify-between p-4">
      <RouterLink class="font-bold text-white text-2xl" to="/">VantaNime.</RouterLink>
      <div class="relative mini:top-0 mini:w-full md:w-1/2 md:px-24 mini:inset-0">
        <input
          type="text"
          placeholder="Cari Anime ..."
          class="w-full rounded p-2 text-color-dark placeholder:text-slate-800 ring-color-primary bg-color-whity"
        />
        <button
          class="absolute right-2 -top-[0.14rem] rounded px-3 py-[0.65rem] text-color-dark md:right-24"
        >
          <PhMagnifyingGlass :size="20" />
        </button>
      </div>
      <div class="text-color-whity flex mini:justify-between mini:flex-row gap-4 pt-1">
        <RouterLink
          class="hover:text-white transition-all duration-500 bg-color-dark py-1 px-4 rounded self-end"
          to="/ongoing"
        >
          Ongoing
        </RouterLink>
        <RouterLink
          class="hover:text-white transition-all duration-500 bg-color-dark py-1 px-4 rounded self-end"
          to="/completed"
        >
          Completed
        </RouterLink>
      </div>
    </div>
  </header>
</template>
