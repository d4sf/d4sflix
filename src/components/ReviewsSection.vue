<script setup lang="ts">
import { onMounted, computed, reactive, ref } from 'vue'
import { useMovieStore } from '@/stores/movie.js'
import { useRoute } from 'vue-router'

const dialog = ref(false)
const store = useMovieStore()
const route = useRoute()
const promises = [store.getMovieReviews({ movieId: route.params.id })]
const expand = reactive({
  reviews: false
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
            <v-app-bar-nav-icon icon="mdi-message-outline"></v-app-bar-nav-icon>

            <v-toolbar-title> Reviews </v-toolbar-title>

            <v-btn @click="expand.reviews = !expand.reviews">
              {{ expand.reviews ? 'Collapse' : 'Expand' }}
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-col>
    </v-row>

    <template v-if="store.reviews.length">
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
    </template>

    <template v-else>
      <v-row v-if="expand.reviews">
        <v-col>
          <v-alert icon="mdi-emoticon-sad" title="Oops" text="There's nothing here :("></v-alert>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
