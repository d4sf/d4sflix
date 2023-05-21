<script setup lang="ts">
// @ts-nocheck
import ElementCard from './ElementCard.vue'

const props = defineProps({
  title: String,
  elements: Array,
  loading: Boolean,
  element: String,
  showToolbar: Boolean
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
      <v-row v-if="showToolbar">
        <v-col cols="12">
          <v-card>
            <v-toolbar color="transparent">
              <v-app-bar-nav-icon>
                <v-icon icon="mdi-fire" />
              </v-app-bar-nav-icon>

              <v-toolbar-title>{{ title }}</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn primary :to="`/trending/${element}`">
                <span class="d-none d-sm-block"> See More </span>
                <v-icon right icon="mdi-chevron-right"> </v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col v-for="element in elements" :key="element.id" cols="6" md="4" lg="3" xl="2">
          <element-card :element="element"></element-card>
        </v-col>
      </v-row>
    </template>
  </div>
</template>
