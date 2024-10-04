<template>
  <div v-if="isVisible" class="fixed bottom-2 right-2 m-2 flex justify-end z-50">
    <button
      @click="scrollToTop"
      class="rounded-full opacity-95 bg-color-primary text-color-whity text-xl hover:text-white hover:bg-blue-900 transition-all duration-500"
    >
      <PhArrowCircleUp :size="46" />
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)

const handleScroll = () => {
  const currentScrollY = window.scrollY
  isVisible.value = currentScrollY > 0
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
