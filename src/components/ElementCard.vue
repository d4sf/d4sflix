<script setup lang="ts">
// @ts-nocheck
const props = defineProps({
  element: Object
})
</script>

<template>
  <div>
    <v-hover v-slot="{ isHovering, props }">
      <v-card v-bind="props">
        <v-img
          :src="`https://image.tmdb.org/t/p/w500/${
            element.poster_path ? element.poster_path : element.profile_path
          }`"
          cover
        ></v-img>

        <v-overlay
          :model-value="isHovering"
          contained
          scrim="primary"
          class="align-center justify-center"
        >
          <v-card class="mx-4 d-none d-sm-block" color="primary">
            <v-card-title>
              {{ element.title }}
            </v-card-title>

            <v-card-text>
              {{ element.overview }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="white" :to="`/${element.media_type}/${element.id}`">
                <span> See More </span>
                <v-icon end icon="mdi-chevron-right"> </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>

          <div class="d-block d-sm-none text-center">
            <span class="text-center font-weight-bold">
              {{ element.title }}
            </span>
          </div>

          <div class="d-flex justify-center">
            <v-btn
              variant="outlined"
              color="white"
              icon="mdi-chevron-right"
              :to="`/${element.media_type}/${element.id}`"
            >
            </v-btn>
          </div>
        </v-overlay>
      </v-card>
    </v-hover>
  </div>
</template>
