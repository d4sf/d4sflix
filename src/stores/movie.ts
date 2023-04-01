import { defineStore } from 'pinia'
import { axiosClient } from '../apiClient'

const API_KEY = '?api_key=8ec40bcc94012375e61c9ea5ece65513'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie: {},
    loadingMovie: false,
    errorLoadingMovie: undefined,
  }),

  actions: {
    async fetchMovieDetails({ movieId }) {
      return axiosClient(`movie/${movieId}${API_KEY}`)
    },

    async getMovieDetails({ movieId }) {
      try {
        this.loadingMovie = true

        const { data } = await this.fetchMovieDetails({ movieId });

        this.movie = data

      } catch (error) {
        console.error(error.message)

        this.errorLoadingMovie = error.message
      } finally {
        this.loadingMovie = false
      }
    }
  },
})
