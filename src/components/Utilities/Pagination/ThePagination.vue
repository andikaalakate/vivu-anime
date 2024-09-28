<script setup>
const scrollTop = () => {
  scrollTo({
    behavior: 'smooth',
    top: 0
  })
}

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  lastPage: {
    type: Number,
    required: true
  },
  setPage: {
    type: Function,
    required: true
  }
})

const handleNextPage = () => {
  if (props.page < props.lastPage) {
    props.setPage(props.page + 1)
    scrollTop()
  }
}

const handlePrevPage = () => {
  if (props.page > 1) {
    props.setPage(props.page - 1)
    scrollTop()
  }
}

const handleLastPage = () => {
  props.setPage(props.lastPage)
  scrollTop()
}

const handleFirstPage = () => {
  props.setPage(1)
  scrollTop()
}
</script>

<template>
  <div class="bottom-0 w-full mx-auto flex justify-center">
    <div
      class="flex w-full items-center justify-center gap-4 bg-gradient-to-br from-color-primary to-blue-500 px-2 py-3 text-color-whity shadow-lg mini:text-lg md:text-2xl mx-4 rounded-t-lg"
    >
      <div v-if="page > 1" class="mini:text-lg md:text-2xl items-center flex gap-4">
        <button @click="handleFirstPage" class="transition-all duration-500 hover:text-white">
          <PhCaretDoubleLeft />
        </button>
        <button @click="handlePrevPage" class="transition-all duration-500 hover:text-white">
          <PhCaretLeft />
        </button>
      </div>
      <p class="px-2">
        {{ page }} of
        <button @click="handleLastPage" class="pl-2 transition-all duration-500 hover:text-white">
          {{ lastPage }}
        </button>
      </p>
      <div v-if="page < lastPage" class="mini:text-lg md:text-2xl items-center flex gap-4">
        <button @click="handleNextPage" class="transition-all duration-500 hover:text-white">
          <PhCaretRight />
        </button>
        <button @click="handleLastPage" class="transition-all duration-500 hover:text-white">
          <PhCaretDoubleRight />
        </button>
      </div>
    </div>
  </div>
</template>
