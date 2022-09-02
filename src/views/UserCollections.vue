<template>
  <div>
    <Header subtitle="My collections"/>

    <br>

    <b-button @click="addCollection()">Add collection</b-button>

    <br>

    <b-container v-if="userCollections.length">
      <b-table
        id="movies-table"
        hover
        :items="userCollections"
        :fields="fields"
      >
      <template v-slot:cell(action)="row">
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
        <b-button size="sm" @click="viewCollection(row.item.id)">View</b-button>
        <b-button size="sm" @click="editCollection(row.item.id)">Edit</b-button>
        <b-button size="sm" @click="removeCollection(row.item.id)">Delete</b-button>
      </template>
      <template #row-details="row">
        <b-card>
          <b-card-body>Description:{{row.item.description}}</b-card-body>
        </b-card>
      </template>
      </b-table>

    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapActions} from 'vuex';

  export default {
    name: 'UserCollections',

    components: {
      Header,
    },

    data() {
      return {
        userCollections: [],
        fields: [
          { key: 'label' },
          { key: 'action' },
        ]
      }
    },

    methods: {
      ...mapActions([
        'deleteCollection',
        'getUserCollections',
      ]),

      addCollection : function() {
        this.$router.push({name : 'collectionForm'});
      },

      editCollection : function(id) {
        this.$router.push({name : 'collectionForm', params : {id : id}});
      },

      viewCollection : function(id) {
        this.$router.push({name : 'collection', params : {id : id}});
      },

      removeCollection : function(id) {
        this.deleteCollection(id).then(res => {
          alert(res.msg);
          this.getCollections();
        });
      },

      getCollections : function() {
        this.getUserCollections().then(res =>{
          this.userCollections = res;
          }
        );
      }
    },

    mounted() {
      this.getCollections();
    }
    
  }

</script>

<style scoped>
  
</style>