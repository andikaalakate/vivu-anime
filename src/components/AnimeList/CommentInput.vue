<script setup>
import { ref } from 'vue'

const isComment = ref(false)
const commentText = ref('') // Untuk mengikat nilai textarea
const commentSubmitted = ref(false) // Untuk menunjukkan jika komentar telah dikirim

const toggleComment = () => {
  isComment.value = !isComment.value
  if (!isComment.value) {
    commentText.value = ''
    commentSubmitted.value = false
  }
}

const submitComment = () => {
  if (commentText.value) {
    commentSubmitted.value = true // Set komentar terkirim
    commentText.value = '' // Kosongkan textarea setelah mengirim
    isComment.value = false
  }

  setTimeout(() => {
    commentSubmitted.value = false
  }, 3000)
}
</script>

<template>
  <div class="flex flex-col">
    <button
      @click="toggleComment"
      v-show="isComment === false"
      class="text-color-whity p-3 mx-4 rounded-lg bg-color-primary"
    >
      Tulis Komentar
    </button>
  </div>

  <!-- Transisi Input Komentar -->
  <div
    v-if="isComment"
    class="m-4 flex flex-col gap-2 animate__animated"
    :class="isComment ? 'animate__fadeIn' : 'animate__fadeOut'"
  >
    <textarea
      v-model="commentText"
      class="h-32 w-full rounded-lg bg-gray-200 p-4 text-color-dark shadow-lg"
      placeholder="Tulis komentar..."
    />

    <div class="flex justify-end gap-2">
      <!-- Tombol Batal -->
      <button
        @click="toggleComment"
        class="my-2 flex self-end rounded-md bg-color-primary px-4 py-2 text-base font-bold text-color-whity shadow-lg transition-all duration-500 hover:bg-[#0041C8] hover:text-slate-200"
      >
        Batalkan
      </button>

      <!-- Tombol Submit -->
      <button
        @click="submitComment"
        class="my-2 flex self-end rounded-md bg-color-primary px-4 py-2 text-base font-bold text-color-whity shadow-lg transition-all duration-500 hover:bg-[#0041C8] hover:text-slate-200"
      >
        Posting Komentar
      </button>
    </div>
  </div>
  <!-- Pesan Terkirim -->
  <p v-if="commentSubmitted" class="text-color-whity p-4 font-bold text-lg">Komentar terkirim...</p>
</template>
