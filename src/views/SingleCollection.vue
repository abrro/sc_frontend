<template>
  <div>
    <Header v-if="collection" :subtitle="subtitle + collection.label"/>

    <b-container>
      <b-button size="md" variant="primary" @click="editCollection()">Edit this collection</b-button>
    </b-container>

    <b-container v-if="collection">

      <b-table
        id="single-collection"
        hover
        :items="collection.movies"
        :fields="fields"
      >
      <template v-slot:cell(title)="link">
          <b-link @click="viewMovie(link.item.id)">{{ link.item.title }}</b-link>
      </template>
      </b-table>

    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapActions} from 'vuex';

  export default {
    name: 'SingleCollection',

    components: {
      Header
    },

    data() {
      return {
        fields: [
          {key : 'title'},
          {key : 'category.label', label : 'Category'},
          {key : 'release_date', label : 'Released on'}
          ],
        subtitle: 'Your collection: ',
        collection: null
      }
    },

    methods: {
      ...mapActions([
        'getCollectionById'
      ]),

      editCollection : function() {
        this.$router.push({name : 'editCollection', params: {id : this.collection.id}});
      },

      viewMovie : function(id){
        this.$router.push({name : 'movie', params : {id : id}})
      },

    },

    mounted() {
      this.getCollectionById(this.$route.params.id).then(obj => {
        this.collection = obj;
      });
    }
    
  }

</script>

<style scoped>
  
</style>