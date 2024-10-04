<script setup>
defineProps({
  comments: {
    type: Array,
    default: () => [
      {
        id: 1,
        username: 'User 1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quidem.'
      },
      {
        id: 2,
        username: 'User 2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quidem.'
      },
      {
        id: 3,
        username: 'User 3',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quidem.'
      },
      {
        id: 4,
        username: 'User 4',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quidem.'
      },
      {
        id: 5,
        username: 'User 5',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quidem.'
      },
      {
        id: 6,
        username: 'User 6',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, quidem.'
      }
    ]
  }
})
</script>

<template>
  <div
    class="grid grid-cols-1 max-h-[30rem] gap-4 m-4 -mr-1 pr-2 overflow-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300"
  >
    <div v-for="comm in comments" :key="comm.id">
      <div
        class="text-color-whity bg-color-secondary border border-slate-500 p-4 rounded-lg shadow-lg"
      >
        <p class="font-bold text-lg mb-1">{{ comm.username }}</p>
        <p class="font-light">{{ comm.comment }}</p>
      </div>
    </div>
  </div>
</template>
