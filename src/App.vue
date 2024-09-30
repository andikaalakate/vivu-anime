<script setup>
import { onBeforeMount } from 'vue'
import { RouterView } from 'vue-router'
import TheNavbar from '@components/Utilities/TheNavbar.vue'
import ScrollToTop from '@components/Utilities/ScrollToTop.vue'
const disableRightClick = (e) => {
  e.preventDefault()
}

document.addEventListener('contextmenu', disableRightClick)

onBeforeMount(() => {
  document.removeEventListener('contextmenu', disableRightClick)
})
</script>

<template>
  <div
    class="animate__animated animate__fadeIn animate__slow bg-color-secondary scrollbar-thin scrollbar-track-color-primary scrollbar-thumb-color-whity min-h-screen"
  >
    <TheNavbar />

    <RouterView />

    <ScrollToTop />
  </div>
</template>
