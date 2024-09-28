<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const scrollTop = () => {
  window.scrollTo({
    behavior: 'smooth',
    top: 0
  })
}

const handleBack = (event) => {
  event.preventDefault()
  scrollTop()
  router.back()
}
</script>

<template>
  <div class="md:min-h-[calc(100vh-72px)] mini:min-h-[calc(100vh-175px)] max-w-xl flex flex-col justify-center items-center mx-auto">
    <div
      class="flex items-center justify-center group hover:scale-125 transition-transform duration-500"
    >
      <PhFileSearch
        :size="64"
        class="text-color-whity group-hover:text-color-primary transition-colors duration-500 cursor-pointer"
      />
      <h3
        class="text-color-whity group-hover:text-color-primary text-5xl font-bold px-4 transition-colors duration-500 cursor-pointer"
      >
        NOT FOUND
      </h3>
    </div>
    <div>
      <button
        @click="handleBack"
        class="text-color-whity block hover:text-color-primary text-2xl font-bold px-4 transition-all duration-500 cursor-pointer pt-8 underline"
      >
        Kembali
      </button>
    </div>
  </div>
</template>
