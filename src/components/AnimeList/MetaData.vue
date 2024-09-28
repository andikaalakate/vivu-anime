<template>
  <div
    class="flex flex-col items-start p-3 title bg-opacity-80 bg-color-dark border border-slate-400 rounded-xl shadow-md hover:bg-opacity-100 transition-all duration-500"
  >
    <h3 class="text-lg font-semibold text-blue-200">{{ title }}</h3>
    <p class="text-base text-color-whity mt-1">{{ detail || 'N/A' }}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    detail: {
      type: String,
      default: ''
    }
  }
}
</script>
