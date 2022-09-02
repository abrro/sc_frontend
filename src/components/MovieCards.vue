<template>
    <div v-if="movies.length > 0">
      <div v-for="movie in movies" :key="movie.id">
        <b-card>
          <b-card-title>
            {{movie.title}}
          </b-card-title>
          <b-card-text>
            <div>{{movie.synopsis | slicedContent}}</div>
            <b-link :to="{ name : 'movie', params: { id : movie.id } }">
              Click to see more...
            </b-link>
            <div v-if="mode == 1">
              Number of reviews: {{movie.reviewsCount}}
            </div>
            <div v-else-if="mode == 2">
              Average rating: {{movie.avgRating | rating}}
            </div>
          </b-card-text>
          <b-card-sub-title>
            Released : {{movie.release_date}}
          </b-card-sub-title>
        </b-card>
        <br>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'MovieCards',

    props : {
      mode : { 
        type : Number
      },
      movies : {
        type : Array
      },
    },

    filters: {
      slicedContent(value) {
        if (value.length < 80) {
          return value;
        }
        return value.slice(0, 80) + '...'
      },

      rating(value) {
        if(value == null){
          return 'Not rated yet';
        }
        return value + "/10";
      }
    },

  }
</script>

<style scoped>
  
</style>