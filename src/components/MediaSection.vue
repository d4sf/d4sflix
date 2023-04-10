<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue'
import { useMovieStore } from '@/stores/movie.js'
import { useRoute } from 'vue-router'

const dialog = ref(false)
const store = useMovieStore()
const route = useRoute()
const promises = [store.getMovieImages({ movieId: route.params.id })]
const expand = reactive({
  media: false
})
const movieImages = computed(() => {
  if (store.images.length) return store.images.backdrops.slice(0, 12)

  return []
})

onMounted(() => {
  Promise.all(promises)
})
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar>
            <v-app-bar-nav-icon icon="mdi-image-outline"></v-app-bar-nav-icon>

            <v-toolbar-title> Media </v-toolbar-title>

            <v-btn @click="expand.media = !expand.media">
              {{ expand.media ? 'Collapse' : 'Expand' }}
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="movieImages.length">
      <v-row v-if="expand.media">
        <v-col cols="6" sm="4" md="2" v-for="(image, index) in movieImages" :key="index">
          <v-card @click="dialog = true">
            <v-img :src="`https://image.tmdb.org/t/p/original/${image.file_path}`"></v-img>
          </v-card>
        </v-col>
      </v-row>
    </template>

    <template v-else>
      <v-row v-if="expand.media">
        <v-col>
          <v-alert icon="mdi-emoticon-sad" title="Oops" text="There's nothing here :("></v-alert>
        </v-col>
      </v-row>
    </template>

    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-toolbar density="compact">
          <v-spacer></v-spacer>
          <v-btn icon="mdi-close" @click="dialog = false"> </v-btn>
        </v-toolbar>

        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="(image, index) in movieImages"
            :key="index"
            :src="`https://image.tmdb.org/t/p/original/${image.file_path}`"
          ></v-carousel-item>
        </v-carousel>
      </v-card>
    </v-dialog>
  </div>
</template>
