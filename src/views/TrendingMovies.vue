<template>
  <div>
    <Header subtitle="Top rated movies" />
    <MovieCards v-if="trendingMovies.length > 0" :mode="1" :movies="trendingMovies" />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import MovieCards from '@/components/MovieCards.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'TrendingMovies',

    components: {
      Header,
      MovieCards
    },

    data(){
      return {
        trendingMovies : []
      }
    },

    methods: {
      ...mapActions([
        'getTrendingMovies'
      ]),
    },

    mounted() {
      this.getTrendingMovies().then(obj => {
        this.trendingMovies = obj;
      });
    }

  }
</script>

<style scoped>

</style>