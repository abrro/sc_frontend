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
        small
      >
      </b-table>

    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'SingleCollection',

    components: {
      Header
    },

    data() {
      return {
        fields : ['title', 'release_date'],
        subtitle: 'Your collection: '
      }
    },

    computed: {
      ...mapState([
        'collection'
      ])
    },


    methods: {
      ...mapActions([
        'getCollectionById'
      ]),

      editCollection : function() {
        this.$router.push({name : 'editCollection', params: {id : this.collection.id}});
      }

    },

    mounted() {
      this.getCollectionById(this.$route.params.id);
    }
    
  }

</script>

<style scoped>
  
</style>