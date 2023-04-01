<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movie.js'

const store = useMovieStore()
const route = useRoute()

onMounted(async () => {
  store.getMovieDetails({ movieId: route.params.id })
})
</script>

<template>
  <div>
    <v-row>
      <v-col>
        <v-card max-height="400">
          <v-img
            cover
            gradient="to top right, rgba(100,115,201,.33), rgba(25,32,72,.7)"
            :src="`https://image.tmdb.org/t/p/original/${store.movie.backdrop_path}`"
          >
            <v-card-title class=""> {{ store.movie.tagline }} </v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h4 class="text-h4">
          {{ store.movie.title }}
        </h4>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" sm="6" md="4">
        <v-card>
          <v-card-title class="font-weight-bold"> Overview </v-card-title>

          <v-card-text>
            {{ store.movie.overview }}
          </v-card-text>

          <div class="d-flex justify-soace-between">
            <v-list lines="two">
              <v-list-item :title="`Original Language`" :subtitle="store.movie.original_language">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="primary">mdi-translate</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>

              <v-list-item :title="`Popularity`" :subtitle="store.movie.popularity">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="primary">mdi-trending-up</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>

              <v-list-item :title="`Release Date`" :subtitle="store.movie.release_date">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="primary">mdi-calendar</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>

              <v-list-item :title="`Runtime`" :subtitle="`${store.movie.runtime} minutes`">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="primary">mdi-clock-outline</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>

              <v-list-item :title="`Averag Vote Rating`" :subtitle="store.movie.vote_average">
                <template v-slot:prepend>
                  <v-avatar>
                    <v-icon color="primary">mdi-star</v-icon>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>
          </div>

          <v-card-actions>
            <v-chip-group column>
              <v-chip rounded v-for="genre in store.movie.genres" :key="genre.id">
                {{ genre.name }}
              </v-chip>
            </v-chip-group>
          </v-card-actions>

          <v-card-actions>
            <v-btn block color="primary" :href="store.movie.homepage" target="_blank">
              See More
              <v-icon end icon="mdi-open-in-new"> </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
