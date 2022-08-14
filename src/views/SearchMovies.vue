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

    <b-container v-if="searchCount > 0">

      {{movies}}

      <h3>Results:</h3>

      <b-pagination
          v-model="currentPage"
          :total-rows="searchCount"
          :per-page="perPage"
          aria-controls="movies-table"
        ></b-pagination>

        <b-table
          id="movies-table"
          hover
          :per-page="perPage"
          :current-page="currentPage"
          :items="movies"
          :fields="fields"
          >
        </b-table>
    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  //import {mapActions, mapMutations, mapState} from 'vuex';

  export default {
    name: 'SearchMovies',

    components: {
      Header,
    },

    data() {
      return {
          movies: [],
          searchInput: '',
          searchTitle: '',
          searchCount: 0,
          currentPage : 1,
          perPage : 10,
          fields: ['title', 'release_date']
        }
    },

    // computed: {
    //   ...mapState([
    //     'moviesSearchResult',
    //     'searchCount'
    //   ])
    // },
    watch: {
      currentPage (nVal, oVal) {
        //da vraca promise...count ---> vezbe
        //this.searchMovies({"page" : this.currentPage, "title" : this.searchTitle});
        fetch(`http://127.0.0.1:8000/api/movies/page/${nVal}/search?title=${this.searchTitle}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(obj => obj.json())
          .then(res => {
            this.movies = res.rows;
          });
      }
    },

    methods: {
      // ...mapActions([
      //   'searchMovies',
      // ]),

      // ...mapMutations([
      //   'resetMovieSearchResults',
      // ]),

      submitSearch : function(e){
        e.preventDefault();

        this.currentPage = 1;
        this.searchTitle = this.searchInput;
        this.searchInput = '';
        //this.setSearchTitle(this.searchTitle);
        //this.searchMovies({"page" : this.currentPage, "title" : this.searchTitle});
        fetch(`http://127.0.0.1:8000/api/movies/page/${this.currentPage}/search?title=${this.searchTitle}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.token}`
            }
          })
          .then(obj => obj.json())
          .then(res => {
            this.searchCount = res.count;
            this.movies = res.rows;
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