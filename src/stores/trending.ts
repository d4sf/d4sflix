import { defineStore } from 'pinia'
import { axiosClient } from '../apiClient'

const API_KEY = `?api_key=${process.env.APY_KEY}`

export const useTrendingStore = defineStore('trending', {
  state: () => ({
    trendingMovies: [],
    trendingTv: [],
    trendingPerson: [],
    loadingTrending: false,
    errorLoadingTrending: undefined,
  }),

  actions: {
    async fetchTrending({ element = "all", timeWindow = "day" }) {
      return axiosClient(`trending/${element}/${timeWindow}${API_KEY}`)
    },

    async getTrending({ element = "all", timeWindow = "day" }) {
      try {
        this.loadingTrending = true

        const { data } = await this.fetchTrending({ element, timeWindow });
        const { results } = data;

        this.trendingMovies = results.filter((el) => el.media_type === 'movie')
        this.trendingTv = results.filter((el) => el.media_type === 'tv')
        this.trendingPerson = results.filter((el) => el.media_type === 'person')
      } catch (error) {
        console.error(error.message)

        this.errorLoadingTrending = error.message
      } finally {
        this.loadingTrending = false
      }
    }
  },
})
