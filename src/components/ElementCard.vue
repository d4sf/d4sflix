<script setup lang="ts">
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
          <v-card class="mx-4" color="primary">
            <v-card-title>
              {{ element.title }}
            </v-card-title>

            <v-card-text class="d-none d-sm-block">
              {{ element.overview }}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="white">
                <span> See More </span>
                <v-icon right icon="mdi-chevron-right"> </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
      </v-card>
    </v-hover>
  </div>
</template>
