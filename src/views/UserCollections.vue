<template>
  <div>
    <Header subtitle="My collections"/>

    <b-container fluid>

      <b-form @submit="newCollection">

        <b-form-group
            id="collection-label-group"
            label="New Collection:"
            label-for="collection-label"
        >
          <b-form-input
              id="collection-label"
              v-model="form.label"
              type="text"
              placeholder="Enter label..."
              required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>

      </b-form>
    </b-container>

    <b-container v-if="userCollections.length">
      <b-table
        id="movies-table"
        hover
        :items="userCollections"
        :fields="fields"
        small
      >
      <template v-slot:cell(action)="row">
        <b-button size="sm" @click="viewCollection(row.item.id)">View</b-button>
        <b-button size="sm" @click="removeCollection(row.item.id)">Delete</b-button>
      </template>
      </b-table>

    </b-container>

  </div>
</template>

<script>
  import Header from '@/components/Header.vue';
  import {mapState, mapActions} from 'vuex';

  export default {
    name: 'UserCollections',

    components: {
      Header,
    },

    data() {
      return {
        form: {
          label: '',
          userId: -1
        },

        fields: [
          { key: 'label' },
          { key: 'action' },
        ]
      }
    },

    computed: {
      ...mapState([
        'userCollections',
        'user',
        'initCollections'
      ])
    },

    methods: {
      ...mapActions([
        'createCollection',
        'deleteCollection',
        'getUserCollections',
        'getCollectionById'
      ]),

      newCollection : function(e) {
        e.preventDefault();
        this.form.userId = this.user.userId;
        this.createCollection(this.form);
      },

      viewCollection : function(id) {
        this.$router.push({name : 'collection', params : {id : id}});
      },

      removeCollection : function(id) {
        this.deleteCollection(id);
      },
    },

    mounted() {
      this.getUserCollections();
    }
    
  }

</script>

<style scoped>
  
</style>