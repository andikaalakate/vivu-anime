<template>
  <div class="flex justify-center mx-auto rounded-lg py-2 aspect-video items-center px-4">
    <iframe
      class="w-full h-full rounded-xl border-color-primary border-4 shadow-xl"
      :src="'https://www.youtube.com/embed/' + code"
      :title="title"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    code: {
      type: String,
      default: '0REcgigxH6w'
    }
  }
}
</script>
