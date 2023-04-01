<script setup lang="ts">
import TrendingSection from '../components/TrendingSection.vue'
import { onMounted } from 'vue'
import { useTrendingStore } from '@/stores/trending.js'

const store = useTrendingStore()

onMounted(async () => {
  store.getTrending({ element: 'all', timeWindow: 'day' })
})
</script>

<template>
  <v-container>
    <trending-section
      :elements="store.trendingMovies"
      :title="`Trending Movies`"
      :loading="store.loadingTrending"
      element="movie"
      :show-toolbar="true"
    ></trending-section>

    <trending-section
      :elements="store.trendingTv"
      :title="`Trending TV Shows`"
      :loading="store.loadingTrending"
      element="tv"
      :show-toolbar="true"
    ></trending-section>

    <trending-section
      :elements="store.trendingPerson"
      :title="`Trending Person`"
      :loading="store.loadingTrending"
      element="person"
      :show-toolbar="true"
    ></trending-section>
  </v-container>
</template>
