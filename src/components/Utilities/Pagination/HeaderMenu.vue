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
    <div class="lg:static mini:sticky mini:top-0 mini:z-50">
      <div class="flex justify-between px-4 py-2 mx-4 items-center my-6 animate__animated animate__fadeIn animate__slower bg-gradient-to-br from-color-primary to-blue-500 rounded-b-lg shadow-lg">
        <h3 class="text-2xl text-color-whity text-center font-bold">
          {{ title }}
        </h3>
        <button
          @click="handleBack"
          class="text-color-whity hover:text-white transition-all duration-500"
        >
          <PhArrowSquareLeft :size="35" />
        </button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>