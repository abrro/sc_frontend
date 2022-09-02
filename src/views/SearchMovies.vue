<template>
  <div>
    <Header subtitle="Search movies"/>

    <b-container fluid>

      <b-form @submit="submitSearch">

        <b-form-group
            id="serach-input-group"
            label="Search:"
            label-for="search-input"
        >
          <b-form-input
              id="search-input"
              v-model="searchInput"
              type="text"
              placeholder="Search movies by title..."
              required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>
    </b-container>

    <MovieSearchTable v-if="searchCount > 0" :searchCount="searchCount"  :searchTitle="searchTitle"/>
    <h2 v-else-if="searchCount == 0">No results found for: {{searchTitle}}</h2>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import MovieSearchTable from '@/components/MovieSearchTable.vue'
  export default {
    name: 'SearchMovies',

    components: {
      Header,
      MovieSearchTable
    },

    data() {
      return {
        searchInput: '',
        searchTitle: '',
        searchCount: -1
      }
    },

    methods: {
      submitSearch: function (e) {
        e.preventDefault();

        this.searchTitle = this.searchInput;
        this.searchInput = '';

        fetch(`http://127.0.0.1:8000/api/movies/count/search?title=${this.searchTitle}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(obj => obj.json())
          .then(res => {
            this.searchCount = res;
          });
      }
    }
  }

</script>

<style scoped>
  .pagination {
        justify-content: center;
    }
</style>