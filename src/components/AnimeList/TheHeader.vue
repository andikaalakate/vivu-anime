<template>
  <div
    class="animate__animated animate__fadeIn animate__slower mini:sticky lg:static mini:top-0 z-50 mx-4 my-2 flex items-center justify-between rounded-b-lg bg-gradient-to-br from-color-primary to-blue-500 px-4 py-2 shadow-lg"
  >
    <div class="relative">
      <h1 class="title mr-4 text-2xl font-bold text-color-whity" :title="title">
        {{ title }}
      </h1>
    </div>
    <RouterLink
      v-if="linkHref && linkTitle"
      :to="linkHref"
      class="title ml-4 text-color-whity underline transition-all hover:text-white sm:text-sm md:text-xl"
      :title="linkTitle"
    >
      {{ linkTitle }}
    </RouterLink>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    linkHref: {
      type: String,
      default: null
    },
    linkTitle: {
      type: String,
      default: null
    }
  }
}
</script>
