import { defineStore } from 'pinia'
import { axiosClient } from '../apiClient'

const API_KEY = '?api_key=8ec40bcc94012375e61c9ea5ece65513'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movie: {},
    reviews: [],
    images: [],
    similar: [],
    loading: {
      movie: false,
      images: false,
      providers: false,
      similar: false,
    },
    errorLoadingMovie: undefined,
  }),

  actions: {
    async fetchMovieDetails({ movieId }) {
      return axiosClient(`movie/${movieId}${API_KEY}`)
    },

    async fetchMovieReviews({ movieId }) {
      return axiosClient(`movie/${movieId}/reviews${API_KEY}`)
    },

    async fetchMovieImages({ movieId }) {
      return axiosClient(`movie/${movieId}/images${API_KEY}`)
    },

    async fetchSimilarMovies({ movieId }) {
      return axiosClient(`movie/${movieId}/similar${API_KEY}`)
    },

    async getMovieDetails({ movieId }) {
      try {
        this.loading.movie = true

        const { data } = await this.fetchMovieDetails({ movieId });

        this.movie = data

      } catch (error) {
        console.error(error.message)

        this.errorLoadingMovie = error.message
      } finally {
        this.loading.movie = false
      }
    },

    async getMovieReviews({ movieId }) {
      try {
        this.loading.reviews = true

        const { data } = await this.fetchMovieReviews({ movieId });
        const { results } = data

        this.reviews = results

      } catch (error) {
        console.error(error.message)

        this.errorLoadingMovie = error.message
      } finally {
        this.loading.reviews = false
      }
    },

    async getMovieImages({ movieId }) {
      try {
        this.loading.images = true

        const { data } = await this.fetchMovieImages({ movieId });

        this.images = data

      } catch (error) {
        console.error(error.message)

        this.errorLoadingMovie = error.message
      } finally {
        this.loading.images = false
      }
    },

    async getSimilarMovies({ movieId }) {
      try {
        this.loading.similar = true

        const { data } = await this.fetchSimilarMovies({ movieId });
        const { results } = data

        this.similar = results

      } catch (error) {
        console.error(error.message)

        this.errorLoadingMovie = error.message
      } finally {
        this.loading.similar = false
      }
    }
  },
})
