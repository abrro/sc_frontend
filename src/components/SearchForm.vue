<template>
  <b-container>

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

  </b-container>
</template>

<script>

  import { mapActions, mapMutations } from 'vuex';

  export default {
    name: 'SearchForm',
    
    components: {
    },

    data() {
      return {
          searchInput: '',
          searchTitle: '',
          firstPage: 1,
        }
    },

    methods : {
      ...mapActions([
        'searchMovies'
      ]),

      ...mapMutations([
        'resetMovieSearchResults',
        'setSearchTitle'
      ]),

      submitSearch : function(e){
        e.preventDefault();

        this.searchTitle = this.searchInput;
        this.setSearchTitle(this.searchTitle);
        this.searchMovies({"page" : this.firstPage, "title" : this.searchTitle});
        this.searchInput = '';
      }
    },

    mounted() {
      this.resetMovieSearchResults();
    }
  }
</script>

<style scoped>
  
</style>