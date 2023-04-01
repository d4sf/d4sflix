<script setup lang="ts">
import TrendingSection from '../components/TrendingSection.vue'
import { onMounted } from 'vue'
import { useMovieStore } from '@/stores/movies.js'

const store = useMovieStore()

onMounted(async () => {
  // trendingMovies = await getTrendingMovies()

  store.getTrending()
})
</script>

<template>
  <v-container>
    <trending-section
      :elements="store.trendingMovies"
      :title="`Trending Movies`"
      :loading="store.loadingTrending"
    ></trending-section>

    <trending-section
      :elements="store.trendingTv"
      :title="`Trending TV Shows`"
      :loading="store.loadingTrending"
    ></trending-section>

    <trending-section
      :elements="store.trendingPerson"
      :title="`Trending Person`"
      :loading="store.loadingTrending"
    ></trending-section>
  </v-container>
</template>
