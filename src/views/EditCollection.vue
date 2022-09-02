<template>
  <div>
    <Header subtitle="Add or remove movies:"/>

    <b-container>
        <b-form @submit="saveChanges">
          <b-button size="md" variant="primary" type="submit">Save changes</b-button>
        </b-form>
      </b-container>

    <b-container v-if="moviesCopy.length">
      <b-table
        id="movies-to-add"
        hover
        :items="moviesCopy"
        :fields="collectionFields"
      >
        <template v-slot:cell(action)="row">
          <b-button size="sm" @click="removeMovie(row.item.id)">Remove</b-button>
        </template>
      </b-table>

    </b-container>

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

    <b-container v-if="moviesSearchResult.length">

      <h3>Results:</h3>
      
        <b-table
          hover
          :items="moviesSearchResult"
          :per-page="perPage"
          :current-page="currentPage"
          :fields="searchFields"
          >
          <template v-slot:cell(action)="row">
            <b-button size="sm" :disabled="alreadyContained(row.item)" @click="addMovie(row.item)">Add</b-button>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="moviesSearchResult.length"
          :per-page="perPage"
        ></b-pagination>

    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapState, mapActions, mapMutations} from 'vuex';

  export default {
    name: 'EditCollection',

    components: {
      Header
    },

    data() {
      return {
        collection: null,
        moviesCopy: [],
        searchInput: '',
        searchTitle: '',
        currentPage : 1,
        perPage : 10,
        searchFields: [
          { key: 'title' },
          { key: 'release_date'},
          { key: 'action' }
        ],
        collectionFields: [
          { key: 'title' },
          { key: 'release_date'},
          { key: 'action' }
        ]
      }
    },

    computed: {
      ...mapState([
        'moviesSearchResult'
      ])
    },

    methods: {
      ...mapActions([
        'getCollectionById',
        'collectionSave',
        'searchMovies'
      ]),

      ...mapMutations([
        'resetMovieSearchResult'
      ]),

      addMovie : function(item) {
        this.moviesCopy.push(item);
      },

      alreadyContained : function(item) {
        if(this.moviesCopy.map(movie => movie.id).includes(item.id)){
          return true;
        }
        return false;
      },

      removeMovie : function(id) {
        this.moviesCopy = this.moviesCopy.filter(mov => mov.id != id);
      },

      saveChanges : function(e) {
        e.preventDefault();

        const list_body = [];
        const collectionId = this.$route.params.id;
        this.moviesCopy.forEach(el => {
          list_body.push({"movielistsId" : collectionId, "movieId": el.id});
        });
        const payload = {"list_body" : list_body};
        //this.collectionSave({"payload" : {"list_body" : payload}, "movielistsId": collectionId, "movieList" : this.moviesCopy});
        this.collectionSave({payload : payload, movielistsId : collectionId, movieList : this.moviesCopy}).then(res => {
          alert(res.message);
          this.$router.push({name: 'collection', params: {id: collectionId}});
        });
      },

      submitSearch: function (e) {
        e.preventDefault();

        this.searchTitle = this.searchInput;
        this.searchInput = '';

        this.currentPage = 1;

        this.searchMovies({
          page: this.currentPage,
          title: this.searchTitle
        });
      }

    },

    mounted() {
      this.getCollectionById(this.$route.params.id).then(col => {
        this.collection = col;
        this.moviesCopy = this.collection.movies;
      });
      this.resetMovieSearchResult();
    }
  }

</script>

<style scoped>
  .pagination {
          justify-content: center;
      }
</style>