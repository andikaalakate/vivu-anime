<script setup>
import { RouterView } from 'vue-router'
import TheNavbar from '@components/Utilities/TheNavbar.vue';
import ScrollToTop from '@components/Utilities/ScrollToTop.vue';
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
