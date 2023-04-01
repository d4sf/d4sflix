<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTrendingStore } from '@/stores/trending.js'
import TrendingSection from '../components/TrendingSection.vue'

const store = useTrendingStore()
const route = useRoute()
const model = ref('day')
const timeWindow = [
  {
    text: 'Week',
    value: 'week'
  },
  {
    text: 'Day',
    value: 'day'
  }
]

onMounted(async () => {
  if (typeof route.params.element === 'string')
    store.getTrending({ element: route.params.element, timeWindow: model.value })
})

const title = computed(() => {
  switch (route.params.element) {
    case 'movie':
      return 'Trending Movies'
    case 'tv':
      return 'Trending TV Shows'
    case 'person':
      return 'Trending Persons'
    default:
      return 'Trending'
  }
})

const elements = computed(() => {
  switch (route.params.element) {
    case 'movie':
      return store.trendingMovies
    case 'tv':
      return store.trendingTv
    case 'person':
      return store.trendingPerson
    default:
      return 'Trending'
  }
})
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <v-card>
          <v-toolbar color="transparent">
            <v-app-bar-nav-icon>
              <v-icon icon="mdi-fire" />
            </v-app-bar-nav-icon>

            <v-toolbar-title>{{ title }}</v-toolbar-title>

            <v-spacer></v-spacer>

            <template v-slot:extension>
              <v-tabs v-model="model" grow>
                <v-tab
                  v-for="i in timeWindow"
                  :key="i.value"
                  :value="i.value"
                  @click="store.getTrending({ element: $route.params.element, timeWindow: model })"
                >
                  {{ i.text }}
                </v-tab>
              </v-tabs>
            </template>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>

    <trending-section
      :elements="elements"
      :loading="store.loadingTrending"
      :element="$route.params.element"
      :show-toolbar="false"
    ></trending-section>
  </div>
</template>
