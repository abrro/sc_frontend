<template>
  <div>
    <Header subtitle="Add to collection:"/>

    <b-container>
        <b-form @submit="saveChanges">
          <b-button size="md" variant="primary" type="submit">Save changes</b-button>
        </b-form>
      </b-container>

    <b-container v-if="editCollection">
      <b-table
        id="movies-to-add"
        hover
        :items="editCollection.movies"
        :fields="collectionFields"
      >
        <template v-slot:cell(action)="row">
          <b-button size="sm" @click="removeMovie(row.item.id)">Remove</b-button>
        </template>
      </b-table>

    </b-container>

    <SearchForm/>

    <b-container v-if="moviesSearchResult.count">

      <h3>Results:</h3>

      <b-pagination
          v-model="currentPage"
          :total-rows="moviesSearchResult.count"
          :per-page="perPage"
          aria-controls="movies-table"
        ></b-pagination>

        <b-table
          id="movies-table"
          hover
          :items="moviesSearchResult.rows"
          :fields="searchFields"
          :per-page="perPage"
          :current-page="currentPage"
          head-variant="dark"
        >
          <template v-slot:cell(action)="row">
          <b-button size="sm" @click="addMovie(row.item)">Add</b-button>
          </template>
        </b-table>

        <b-pagination
          v-model="currentPage"
          :total-rows="moviesSearchResult.count"
          :per-page="perPage"
          aria-controls="movies-table"
        ></b-pagination>

    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import SearchForm from '@/components/SearchForm.vue';
  import {mapState, mapActions, mapMutations} from 'vuex';

  export default {
    name: 'EditCollection',

    components: {
      Header,
      SearchForm
    },

    data() {
      return {
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
        'collection',
        'editCollection',
        'moviesSearchResult',
      ])
    },

    watch: {
      currentPage(nVal, oVal) {
        this.searchMovies({"page" : this.currentPage, "title" : this.searchTitle});
      }
    },

    methods: {
      ...mapActions([
        'getCollectionById',
        'collectionSave'
      ]),

      ...mapMutations([
        'copyToEditCollection',
        'addEditCollection',
        'removeEditCollection',
      ]),

      addMovie : function(item) {
        this.addEditCollection(item);
      },

      removeMovie : function(id) {
        this.removeEditCollection(id);
      },

      saveChanges : function(e) {
        e.preventDefault();

        const payload = [];
        const collectionId = this.$route.params.id;
        this.editCollection.movies.forEach(el => {
          payload.push({"movielistsId" : collectionId, "movieId": el.id});
        });
        this.collectionSave({"payload" : {"list_body" : payload}, "movielistsId": collectionId});
        this.$router.push({name: 'collection', params: {id: collectionId}});
        // fetch(`http://127.0.0.1:8000/api/movielists/${collectionId}`, {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
        //   body: JSON.stringify({"list_body" : payload})
        // }).then( res => res.json() ).then(res => console.log(res));
      }

      // addAll : function(e) {
      //   e.preventDefault();
        
      //   const payload = [];
      //   const collectionId = this.$route.params.id;

      //   this.selectedMovies.forEach(element => {
      //     payload.push({"movielistsId" : collectionId, "movieId" : element.id});
      //   });

      //   fetch(`http://127.0.0.1:8000/api/movielists/${collectionId}`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json', 'Authorization' : `Bearer ${localStorage.token}`},
      //     body: JSON.stringify(payload)
      //   }).then( res => res.json() ).then(res => console.log(res));
      // }
    },

    mounted() {
      if(!this.collection){
        this.getCollectionById(this.$route.params.id);
      }
      this.copyToEditCollection();
    }
  }

</script>

<style scoped>
  .pagination {
          justify-content: center;
      }
</style>