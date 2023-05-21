<script setup lang="ts">
// @ts-nocheck
import { onMounted, computed, ref, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useMovieStore } from '@/stores/movie.js'
import ElementCard from '../components/ElementCard.vue'
import MediaSection from '../components/MediaSection.vue'
import ReviewsSection from '../components/ReviewsSection.vue'

const expand = reactive({
  reviews: false,
  media: false,
  similar: false
})
const store = useMovieStore()
const route = useRoute()
const promises = [
  store.getMovieDetails({ movieId: route.params.id }),
  store.getSimilarMovies({ movieId: route.params.id })
]

onMounted(async () => {
  Promise.all(promises)
})
</script>

<template>
  <v-container>
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

    <media-section></media-section>

    <reviews-section></reviews-section>
    <!-- <template v-if="store.reviews.length">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-toolbar>
              <v-app-bar-nav-icon icon="mdi-message-outline"></v-app-bar-nav-icon>

              <v-toolbar-title> Reviews </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn @click="expand.reviews = !expand.reviews">
                {{ expand.reviews ? 'Collapse' : 'Expand' }}
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if="expand.reviews">
        <v-col>
          <v-card class="mb-4" v-for="review in store.reviews" :key="review.id">
            <v-card-text>
              {{ review.content }}
            </v-card-text>

            <v-card-actions>
              <v-list-item class="w-100">
                <template v-slot:prepend>
                  <v-avatar color="primary">
                    <v-icon icon="mdi-account-circle"></v-icon>
                  </v-avatar>
                </template>

                <v-list-item-title>
                  {{ review.author }}
                </v-list-item-title>

                <template v-slot:append>
                  <div class="justify-self-end">
                    <v-btn
                      icon="mdi-open-in-new"
                      color="primary"
                      :href="review.url"
                      target="_blank"
                    >
                    </v-btn>
                  </div>
                </template>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </template> -->

    <v-row>
      <v-col cols="12">
        <v-card>
          <v-toolbar>
            <v-app-bar-nav-icon icon="mdi-shuffle"></v-app-bar-nav-icon>

            <v-toolbar-title> Similar Movies </v-toolbar-title>

            <v-btn @click="expand.similar = !expand.similar">
              {{ expand.similar ? 'Collapse' : 'Expand' }}
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="expand.similar">
      <v-col v-for="movie in store.similar" :key="movie.id" cols="6" md="4" lg="3" xl="2">
        <element-card :element="movie"></element-card>
      </v-col>
    </v-row>
  </v-container>
</template>
