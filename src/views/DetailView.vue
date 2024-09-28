<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getAnimeResponse } from '@/libs/api';
import MetaData from '@/components/AnimeList/MetaData.vue';
import TheLoading from '@/components/Utilities/TheLoading.vue';
import ButtonBack from '@/components/Utilities/ButtonBack.vue';

const route = useRoute();
const anime = ref(null);
const slug = route.params.slug;
const isLoading = ref(true);

const fetchAnimeData = async () => {
  try {
    const response = await getAnimeResponse(`otakudesu/anime/${slug}`);
    anime.value = response.data;
    // console.log(response.data);
  } catch (error) {
    console.error('Error fetching anime data:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchAnimeData();
});
</script>

<template>
  <!-- Loading Screen -->
  <TheLoading v-if="isLoading" />

  <!-- Anime Detail View -->
  <div v-else>
    <div class="p-2 mx-4 mt-4 flex justify-between items-center gap-4 animate__animated animate__fadeIn animate__slower bg-gradient-to-br from-color-primary to-blue-500 rounded-lg shadow-lg">
      <h3 class="text-color-whity text-xl">{{ anime?.judul }} - {{ anime?.status }}</h3>
      <!-- Tombol kembali bisa ditambahkan di sini -->
       <ButtonBack />
    </div>

    <!-- Konten Anime -->
    <div class="px-4 flex lg:flex-nowrap flex-wrap gap-4 text-color-whity">
      <!-- Gambar Poster -->
      <img
        :src="anime?.poster"
        :alt="anime?.poster"
        width="250"
        height="250"
        class="img-card mini:max-h-[28rem] minni:max-h-[34rem] hmin:max-h-[38rem] hp:max-h-[40rem] sm:max-h-[50rem] rounded-lg my-5 shadow-xl border-2 border-color-dark md:hover:scale-95 duration-500 transition-all delay-200 mx-auto"
      />

      <!-- Sinopsis dan MetaData -->
      <div class="text-justify text-xl my-4 bg-color-dark rounded-lg p-4 w-full relative">
        <!-- Sinopsis -->
        <div v-if="anime?.sinopsis?.paragraphs?.length > 0">
          <p v-for="(paragraph, index) in anime?.sinopsis.paragraphs" :key="index" class="p-2">
            {{ paragraph }}
          </p>
        </div>
        <div v-else>
          <p>Sinopsis Belum Tersedia</p>
        </div>

        <!-- MetaData -->
        <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 p-4 mt-6 gap-4 justify-center items-center rounded-lg bg-color-darker text-color-whity">
          <MetaData title="Skor" :detail="anime?.skor" />
          <MetaData title="Episode" :detail="anime?.totalEpisode" />
          <MetaData title="Tipe" :detail="anime?.tipe" />
          <MetaData title="Durasi" :detail="anime?.durasi" />
          <MetaData title="Tanggal Rilis" :detail="anime?.tanggalRilis" />
          <MetaData title="Status" :detail="anime?.status" />
          <MetaData title="Studio" :detail="anime?.studio" />
        </div>
      </div>
    </div>
  </div>
</template>