<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

// Function to handle back navigation and scroll to the top
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
  <div class="flex justify-end items-center">
    <button
      @click="handleBack"
      class="text-color-whity hover:text-color-white transition-all duration-500"
    >
      <PhArrowSquareLeft :size="35" />
    </button>
  </div>
</template>
