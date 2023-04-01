<script setup lang="ts">
const props = defineProps({
  title: String,
  elements: Array,
  loading: Boolean
})
</script>

<template>
  <div>
    <v-container v-if="loading">
      <v-row>
        <v-col cols="12">
          <v-card height="60"></v-card>
        </v-col>
      </v-row>

      <v-row class>
        <v-col v-for="n in 6" :key="n" cols="6" md="4" lg="3" xl="2">
          <v-card height="200">
            <v-card-text class="fill-height d-flex justify-center align-center">
              <v-progress-circular indeterminate color="primary"></v-progress-circular>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <template v-else>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-toolbar color="transparent">
              <v-app-bar-nav-icon>
                <v-icon icon="mdi-fire" />
              </v-app-bar-nav-icon>

              <v-toolbar-title>{{ title }}</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn primary>
                <span class="d-none d-sm-block"> See More </span>
                <v-icon right icon="mdi-chevron-right"> </v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="element in elements" :key="element.id" cols="6" md="4" lg="3" xl="2">
          <v-card>
            <v-img :src="`https://image.tmdb.org/t/p/w500/${element.poster_path}`" cover></v-img>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
