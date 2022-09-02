<template>
  <div>
    <Header subtitle="Top rated movies" />
    <MovieCards v-if="topRatedMovies.length > 0" :mode="2" :movies="topRatedMovies" />
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import MovieCards from '@/components/MovieCards.vue';
  import { mapActions } from 'vuex';

  export default {
    name: 'TopRatedMovies',

    components: {
      Header,
      MovieCards
    },

    data() {
      return {
        topRatedMovies : []
      }
    },

    methods: {
      ...mapActions([
        'getTopRatedMovies'
      ]),
    },

    mounted() {
      this.getTopRatedMovies().then(obj => {
        this.topRatedMovies = obj;
      });
    }

  }
</script>

<style scoped>

</style>