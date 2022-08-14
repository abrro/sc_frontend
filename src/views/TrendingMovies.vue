<template>
  <div>
    <Header subtitle="Trending" />
    <b-container>
      <div v-for="movie in trendingMovies" :key="movie.id">
        <b-card>
          <b-card-title>
            {{movie.title}}
          </b-card-title>
          <!-- <b-card-sub-title>
            In category :  {{article.category}}
          </b-card-sub-title> -->
          <b-card-text>
            <div>{{movie.synopsis | slicedContent}}</div>
            <b-link :to="{name : 'movie', params: {id : movie.id}}">
              Click to see more...
            </b-link>
            <div>
              Number of reviews: {{movie.reviewsCount}}
            </div>
          </b-card-text>
          <b-card-sub-title>
            Released : {{movie.release_date}}
          </b-card-sub-title>
        </b-card>
        <br>
      </div>
    </b-container>
  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {
    mapState,
    mapActions
  } from 'vuex';

  export default {
    name: 'TrendingMovies',

    components: {
      Header
    },

    filters: {
      slicedContent(value) {
        if (value.length < 80) {
          return value;
        }
        return value.slice(0, 80) + '...'
      }
    },

    computed: {
      ...mapState([
        'trendingMovies'
      ])
    },

    methods: {
      ...mapActions([
        'getTrendingMovies'
      ]),
    },

    mounted() {
      this.getTrendingMovies();
    }

  }
</script>

<style scoped>

</style>